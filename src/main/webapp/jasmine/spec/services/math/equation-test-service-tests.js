describe("equation-test-service tests", function () {

    var EquationTestService;

    beforeEach(function () {
        jasmine.addMatchers(customMatchers);
        module('mainServices');
        module('mathServices');

        inject(function (_EquationTestService_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            EquationTestService = _EquationTestService_;
        });
    });

    it("generateExercise - score starts at -1", function () {
        var exercise = EquationTestService.generateExercise(true, 3);
        expect(exercise.score).toEqual(-1);
    });

    it("generateExercise - equation : constants no bigger than max constant size", function () {
        var maxConstantsSize = 5;
        expect(constantsFromNumberOfGeneratedExercises(100, maxConstantsSize))
                .toContainElementsNoLargerThan(maxConstantsSize);
    });

    it("generateExercise - equation : solution in options", function () {
        var exercises = EquationTestService.generateExercises(100, {
            withoutZero: false,
            maxConstantsSize: 5,
            subtraction: true
        });
        var solutionInOptions = function(exercise, result) {
            result.pass = exercise.options.indexOf(exercise.solution) !== -1;
            if (!result.pass) {
                result.message = "Solution to exercise " + exercise.equation.toString() 
                        + " is not contained in the options " + exercise.options;
            }
            return result.pass;
        };
        expect(exercises).toAllMatch(solutionInOptions);
    });

    it("generateExercise - equation : options contain all elements from minConstantSize to maxConstantSize", function () {
        expect(EquationTestService.generateExercise(true, 3, true).options).toContain(1,2,3);
    });

    it("generateExercise - equation : correct answer sets score to 1", function () {
        var exercise = EquationTestService.generateExercise(false, 4, true);
        exercise.enterAnswer(exercise.solution);
        expect(exercise.score).toEqual(1);
    });

    it("generateExercise - subtraction : correct answer sets score to 1", function () {
        for (i=0; i<100; i++) {
            var exercise = EquationTestService.generateExercise(false, 9, true);
            exercise.enterAnswer(exercise.solution);
            expect(exercise.score).toEqual(1);
        }
    });

    it("generateExercise - subtraction : generated operators are + and -", function () {
        var numberOfSubtractions = 0;
        var numberOfAdditions = 0;

        var exercises = EquationTestService.generateExercises(100, {
            withoutZero: false,
            maxConstantsSize: 5,
            subtraction: true
        });

        for (i=0; i<exercises.length; i++) {
            var exercise = exercises[i];
            if (exercise.equation.lhsOperators.indexOf('-') >= 0 || exercise.equation.rhsOperators.indexOf('-') >= 0) {
                numberOfSubtractions++;
            } else {
                numberOfAdditions++;
            }
        }
        
        expect(numberOfSubtractions).toBeGreaterThan(0);
    });

    it("generateExercise - subtraction : exercises with large enough substractions are generated", function () {
        var maxSubtraction = 100;
        for (var i=0; i<100; i++) {
            var exercise = EquationTestService.generateExercise(false, 9, true);
            exercise.enterAnswer(exercise.solution);
            
            var maxSubtractionFromEquation = getLargestNegativeConstantFrom(exercise);
            if (maxSubtractionFromEquation < maxSubtraction) maxSubtraction = maxSubtractionFromEquation;
            expect(exercise.score).toEqual(1);
        }
        expect(maxSubtraction).toBeLessThan(-5);
    });

    it("generateExercise - equation : incorrect answer sets score to 0", function () {
        var exercise = EquationTestService.generateExercise(false, 4, true);
        exercise.enterAnswer(arrayValueDifferentFrom(exercise.options, exercise.solution));
        expect(exercise.score).toEqual(0);
    });
    
    it("generateExercise - equation : every generated exercise equation differs from the previous one", function () {
        var exercises = EquationTestService.generateExercises(100, {
            withoutZero: false,
            maxConstantsSize: 5,
            subtraction: true
        });
        var consecutiveExerciseEquationsNotEqual = function(exercises, result) {
            var previousExercise = exercises[0];
            for(var i=1; i < exercises.length; i++) {
                if (exercises[i].equation.equals(previousExercise.equation)) {
                    result.pass = false;
                    result.message = "Two consecutively generated exercises are equal: " 
                            + exercises[i].equation.toString() + " and " 
                            + previousExercise.equation.toString();
                    break;
                }
                previousExercise = exercises[i];
            }
            return result.pass;
        };
        expect(exercises).toMatch(consecutiveExerciseEquationsNotEqual);
    });

    it("generateIntegerNumbersTotallingBetween: with zero, no subtraction", function () {
        for (var i=0; i<100; i++) {
            // minResult, maxResult, size, maxValue, withoutZero, subtraction
            var integers = EquationTestService.generateIntegerNumbersTotallingBetween(1, 5, 2, 3, false, false);
            
            expect(sum(integers)).toBeGreaterThan(0);
            expect(sum(integers)).toBeLessThan(6);
            expect(integers).toAllMatch(valueBetween(0, 3));
        }
    });

    it("generateIntegerNumbersTotallingBetween: without zero, no subtraction", function () {
        for (var i=0; i<100; i++) {
            // minResult, maxResult, size, maxValue, withoutZero, subtraction
            var integers = EquationTestService.generateIntegerNumbersTotallingBetween(1, 5, 2, 3, true, false);
            
            expect(sum(integers)).toBeGreaterThan(0);
            expect(sum(integers)).toBeLessThan(6);
            expect(integers).toAllMatch(valueBetween(0, 3));
            expect(integers).not.toContain(0);
        }
    });

    it("generateIntegerNumbersTotallingBetween: with zero, subtraction", function () {
        for (var i=0; i<100; i++) {
            // minResult, maxResult, size, maxValue, withoutZero, subtraction
            var integers = EquationTestService.generateIntegerNumbersTotallingBetween(-2, 5, 2, 3, false, true);
            
            expect(sum(integers)).toBeGreaterThan(-3);
            expect(sum(integers)).toBeLessThan(6);
            expect(integers).toAllMatch(valueBetween(-3, 3));
        }
    });
    
    it("generateIntegerNumbersTotallingBetween: without zero, subtraction", function () {
        var minSum = 100;
        var maxSum = -100;
        for (var i=0; i<100; i++) {
            // minResult, maxResult, size, maxValue, withoutZero, subtraction
            var integers = EquationTestService.generateIntegerNumbersTotallingBetween(-4, 5, 3, 3, true, true);
            
            var integersSum = sum(integers);
            if (integersSum < minSum) minSum = integersSum;
            if (integersSum > maxSum) maxSum = integersSum;
            expect(integersSum).toBeGreaterThan(-5);
            expect(integersSum).toBeLessThan(6);
            expect(integers).toAllMatch(valueBetween(-3, 3));
            expect(integers).not.toContain(0);
        }
        expect(maxSum).toBeGreaterThan(4);
        expect(minSum).toBeLessThan(-2);

    });
    
    function valueBetween(min, max) {
        return function(element, result) {
            result.pass = true;
            if (element < min || element > max) {
                result.message = element + " should be in the range [" + min + "," + max + "]";
                result.pass = false;
            }
            return result.pass;
        };
    }
    
    function sum(array) {
        var sumFunction = function(a, b) { return a + b; };
        return array.reduce(sumFunction, 0);
    }

    function arrayValueDifferentFrom(values, notValue) {
        for (var i=0; i< values.length; i++) {
            if (values[i] !== notValue) {
                return values[i];
            }
        }
        return null;
    }
    
    function constantsFromNumberOfGeneratedExercises(numberOfExercises, maxConstantsSize) {
        var array = [];

        for(i=0; i<numberOfExercises; i++) {
            array = array.concat(constantsFromExercise(EquationTestService.generateExercise(true, maxConstantsSize)));
        }

        return array;   
    }

    function constantsFromExercise(exercise) {
        return exercise.equation.lhsConstants.concat(exercise.equation.rhsConstants);
    }
    
    function getConstantsFromEquationSide(constants, operators, solution) {
        var result = [];
        result.push(constants[0]);
        for (i=1; i<constants.length;i++) {
            var multiplier = 1;
            if (operators[i-1] === '-') {
                multiplier = -1;
            }
            if (constants[i] === '?') {
                result.push(multiplier * solution);
            } else {
                result.push(multiplier * constants[i]);
            }
        }
        return result;
    }

    function getConstantsWithOperatorFromExercise(exercise) {
        return getConstantsFromEquationSide(
                    exercise.equation.lhsConstants,
                    exercise.equation.lhsOperators,
                    exercise.solution)
            .concat(
                getConstantsFromEquationSide(
                    exercise.equation.rhsConstants,
                    exercise.equation.rhsOperators,
                    exercise.solution));

    }
        
    function getLargestNegativeConstantFrom(exercise) {
        return getConstantsWithOperatorFromExercise(exercise).reduce(function(a, b) {return a < b ? a : b;}, 100);
    }
    
});


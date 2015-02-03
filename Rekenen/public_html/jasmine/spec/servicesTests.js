describe("rekenenServices tests", function () {

    var ExerciseGenerator;

    beforeEach(function () {
        jasmine.addMatchers(customMatchers);
        module('rekenenServices');

        inject(function (_ExerciseGenerator_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            ExerciseGenerator = _ExerciseGenerator_;
        });
    });

    it("generateExercise - score starts at -1", function () {
        var exercise = ExerciseGenerator.generateExercise(1, 3);
        expect(exercise.score).toEqual(-1);
    });

    it("generateExercise - equation : constants no bigger than max constant size", function () {
        var maxConstantsSize = 5;
        expect(constantsFromNumberOfGeneratedExercises(100, maxConstantsSize))
                .toContainElementsNoLargerThan(maxConstantsSize);
    });

    it("generateExercise - equation : solution in options", function () {
        var exercises = ExerciseGenerator.generateExercises(100, 1, 3);
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
        expect(ExerciseGenerator.generateExercise(1, 3).options).toContain(1,2,3);
    });

    it("generateExercise - equation : correct answer sets score to 1", function () {
        var exercise = ExerciseGenerator.generateExercise(0, 4);
        exercise.enterAnswer(exercise.solution);
        expect(exercise.score).toEqual(1);
    });

    it("generateExercise - equation : incorrect answer sets score to 0", function () {
        var exercise = ExerciseGenerator.generateExercise(0, 4);
        exercise.enterAnswer(arrayValueDifferentFrom(exercise.options, exercise.solution));
        expect(exercise.score).toEqual(0);
    });
    
    it("generateExercise - equation : every generated exercise equation differs from the previous one", function () {
        var exercises = ExerciseGenerator.generateExercises(100, 1, 3);
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
            array = array.concat(constantsFromExercise(ExerciseGenerator.generateExercise(1, maxConstantsSize)));
        }

        return array;   
    }

    function constantsFromExercise(exercise) {
        return exercise.equation.lhsConstants.concat(exercise.equation.rhsConstants);
    }
    
});


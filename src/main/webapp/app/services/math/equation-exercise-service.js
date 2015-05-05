'use strict';

/* Services */

var mathServices = angular.module('mathServices');

mathServices.factory('EquationExerciseService', ['$log', 'CommonServices',
    function ($log, CommonServices) {
        var EquationDefinitionBuilder = function () {
            var lhsSize = 2;
            var rhsSize = 1;
            var subtraction = true;
            var withoutZero = false;
            var maxConstantsSize = 5;

            return {
                withLeftHandSideSize: function (size) {
                    lhsSize = size;
                    return this;
                },
                withRightHandSideSize: function (size) {
                    rhsSize = size;
                    return this;
                },
                withSubtraction: function (bool) {
                    subtraction = bool;
                    return this;
                },
                withoutZero: function (bool) {
                    withoutZero = bool;
                    return this;
                },
                withMaxConstantsSize: function (size) {
                    maxConstantsSize = size;
                    return this;
                },
                build: function () {
                    var equationDefinition = {
                        lhsSize: lhsSize,
                        rhsSize: rhsSize,
                        withoutZero: withoutZero,
                        minConstantsSize: withoutZero ? 1 : 0,
                        maxConstantsSize: maxConstantsSize,
                        subtraction: subtraction
                    };
                    return equationDefinition;
                }
            };
        };

        function generateExercises(numberOfExercises, options) {
            var withoutZero = options.withoutZero;
            var maxConstantsSize = options.maxConstantsSize;
            var subtraction = options.subtraction;
            var exercises = [];
            
            for (var i = 0; i < numberOfExercises; i++) {
                var exercise;
                if (i === 0) {
                    exercise = generateExercise(withoutZero, parseInt(maxConstantsSize), subtraction);
                } else {
                    exercise = generateExerciseAndCheckDifference(
                            withoutZero, 
                            parseInt(maxConstantsSize),
                            subtraction,
                            exercises[i-1]);
                }
                exercises.push(exercise);
            }
            
            return exercises;
        }

        function generateExerciseAndCheckDifference(withoutZero, maxConstantsSize, subtraction, previousExercise) {
            var exercise;
            do {
                exercise = generateExercise(withoutZero, maxConstantsSize, subtraction);
            } while (exercise.equation.equals(previousExercise.equation));
            return exercise;
        }

        function generateExercise(withoutZero, maxConstantsSize, subtraction) {
            var equation = generateEquation(withoutZero, maxConstantsSize, subtraction);
            var replaceConstantInLeftHandSide = CommonServices.randomBoolean();
            var minConstantsSize = withoutZero ? 1 : 0;
            var constantIndex;
            var solution;
            
            if (replaceConstantInLeftHandSide) {
                constantIndex = CommonServices.randomNumberBetween(0, equation.lhsConstants.length-1);
                solution = equation.lhsConstants[constantIndex];
                equation.lhsConstants[constantIndex] = '?';
            } else {
                constantIndex = CommonServices.randomNumberBetween(0, equation.rhsConstants.length-1);
                solution = equation.rhsConstants[constantIndex];
                equation.rhsConstants[constantIndex] = '?';
            }
            
            var options = [];
            for (var i = minConstantsSize; i < maxConstantsSize+1; i++) {
                options.push(i);
            }
            
            return {
                unknownInLhs: replaceConstantInLeftHandSide,
                constantIndex: constantIndex,
                equation: equation,
                solution: solution,
                answer: null,
                options: options,
                score: -1,
                enterAnswer: function(answer) {
                    this.answer = answer;
                    var correct = this.answer === this.solution;
                    if (correct) {
                        this.score = 1;
                    } else {
                        this.score = 0;
                    };
                    return correct;
                }
            };
        }

        function generateEquation(withoutZero, maxConstantsSize, subtraction) {
            var definition = new EquationDefinitionBuilder()
                    .withoutZero(withoutZero)
                    .withMaxConstantsSize(maxConstantsSize)
                    .withSubtraction(subtraction)
                    .build();
            return generateEquationForDefinition(definition);
        }

        function generateEquationForDefinition(definition) {
            var rhsMinimumResult;
            var rhsMaximumResult;
            if (definition.subtraction) {
                rhsMaximumResult = definition.rhsSize * definition.maxConstantsSize;
                rhsMinimumResult = definition.withoutZero ? 1 : 0;
            } else {
                rhsMaximumResult = definition.rhsSize * definition.maxConstantsSize;
                rhsMinimumResult = definition.rhsSize * definition.minConstantsSize;
            }
            var lhsEquation = generateEquationWithResultBetween(
                    rhsMinimumResult,
                    rhsMaximumResult, 
                    definition.lhsSize, 
                    definition.maxConstantsSize,
                    definition.withoutZero,
                    definition.subtraction);
            var lhsConstants = lhsEquation.constants;
            var lhsOperators = lhsEquation.operators;
            
            
            var lhsResult = calculate(lhsConstants, lhsOperators);
            
            var rhsEquation = generateEquationEqualTo(lhsResult, definition.rhsSize, definition.maxConstantsSize, definition.withoutZero, definition.subtraction);
            
            var rhsConstants = rhsEquation.constants;
            var rhsOperators = rhsEquation.operators;

            return {
                lhsConstants : lhsConstants,
                lhsOperators : lhsOperators,
                rhsConstants : rhsConstants,
                rhsOperators : rhsOperators,
                toString : function () {
                    var string = [];
                    
                    string.push(this.lhsConstants[0]);
                    for (var i=0; i<this.lhsOperators.length; i++) {
                        string.push(" ", this.lhsOperators[i], " ", this.lhsConstants[i+1]);
                    }
                    string.push(" = ");
                    string.push(rhsConstants[0]);
                    for (var i=0; i<this.rhsOperators.length; i++) {
                        string.push(" ", this.rhsOperators[i], " ", this.rhsConstants[i+1]);
                    }
                    
                    return string.join("");
                },
                allElements: function () {
                    var allElements = [];

                    allElements.push(this.lhsConstants[0]);
                    for (var i = 0; i < this.lhsOperators.length; i++) {
                        allElements.push(this.lhsOperators[i]);
                        allElements.push(this.lhsConstants[i + 1]);
                    }

                    allElements.push('=');

                    allElements.push(this.rhsConstants[0]);
                    for (var i = 0; i < this.rhsOperators.length; i++) {
                        allElements.push(this.rhsOperators[i]);
                        allElements.push(this.rhsConstants[i + 1]);
                    }

                    return allElements;
                },
                equals: function(other) {
                    return CommonServices.arrayEquals(this.lhsConstants, other.lhsConstants)
                        && CommonServices.arrayEquals(this.lhsOperators, other.lhsOperators)
                        && CommonServices.arrayEquals(this.rhsConstants, other.rhsConstants)
                        && CommonServices.arrayEquals(this.rhsOperators, other.rhsOperators)
                        ;
                }
            };
        }

        function generateEquationEqualTo(result, size, maxValue, withoutZero, subtraction) {
            return generateEquationWithResultBetween(result, result, size, maxValue, withoutZero, subtraction);
        }
        
        function generateEquationWithResultBetween(minResult, maxResult, numberOfConstants, maxConstantValue, withoutZero, subtraction) {
            var constants = [];
            var operators = [];
            var minConstantValue = withoutZero ? 1 : 0;
            
            if (numberOfConstants === 1) {
                return {
                    constants: [CommonServices.randomNumberBetween(Math.max(minResult, minConstantValue), Math.min(maxResult, maxConstantValue))],
                    operators: []
                };
            } else {
                // First constant needs to be positive and big enough so it is still 
                // possible to get to the result, given the remaining number of constants
                var minPossibleSumForRemainingConstants = (numberOfConstants-1) * (subtraction ? -1 * maxConstantValue : minConstantValue);
                var maxPossibleSumForRemainingConstants = (numberOfConstants-1) * maxConstantValue;
                var minValueOfFirstConstant = Math.max(minConstantValue, minResult - maxPossibleSumForRemainingConstants);
                var maxValueOfFirstConstant = Math.min(maxResult - minPossibleSumForRemainingConstants, maxConstantValue);
                
                // We add a constant 
                var firstConstant = CommonServices.randomNumberBetween(minValueOfFirstConstant, maxValueOfFirstConstant);
                constants.push(firstConstant);

                if (numberOfConstants > 1) {
                    var remainingNumbersInEquation = generateIntegerNumbersTotallingBetween(
                            minResult - firstConstant, maxResult - firstConstant, numberOfConstants - 1, 
                            maxConstantValue, withoutZero, subtraction);
                    remainingNumbersInEquation.forEach(function (number) {
                        if (number > 0) {
                            operators.push('+');
                        } else if (number < 0) {
                            operators.push('-');
                        } else {
                            operators.push(CommonServices.randomArrayElement(['+', '-']));
                        }
                        constants.push(Math.abs(number));
                    });
                }

                return {
                    constants: constants,
                    operators: operators
                };
            }
        }

        function generateIntegerNumbersTotallingBetween(minResult, maxResult, size, maxValue, withoutZero, subtraction) {
            var numbers = [];
            var minConstantsSize = withoutZero ? 1 : 0;
            var minValue = subtraction ? -1 * maxValue : minConstantsSize;
            
            if (size === 1) {
                var number;
                do {
                    number = Math.min(CommonServices.randomNumberBetween(Math.max(minResult, minValue), maxResult), maxValue);
                } while (withoutZero && number === 0)
                return [number];
            } else {
                var maxPossibleSumForRemainingConstants = (size - 1) * maxValue;
                var minValueOfFirstNumber = Math.max(minValue, minResult - maxPossibleSumForRemainingConstants);
                var maxValueOfFirstNumber = Math.min(maxValue, maxResult + maxPossibleSumForRemainingConstants);
                
                // We add a constant 
                var firstNumber;
                do {
                    firstNumber = CommonServices.randomNumberBetween(minValueOfFirstNumber, maxValueOfFirstNumber);
                } while (withoutZero && firstNumber === 0)
                numbers.push(firstNumber);

                if (size > 1) {
                    generateIntegerNumbersTotallingBetween(
                            minResult - firstNumber, 
                            maxResult - firstNumber, 
                            size - 1, maxValue, withoutZero, subtraction)
                        .forEach(function (elem) {numbers.push(elem);});
                } 

                return numbers;
            }
        }
        
        function calculate(constants, operators) {
            var result = constants[0];
            for (var i = 0; i < operators.length; i++) {
                if (operators[i] === '+') {
                    result += constants[i+1];
                } else if (operators[i] === '-') {
                    result -= constants[i+1];
                } 
            }
            return result;
        }
        
        return {
            generateEquation: generateEquation,
            generateExercise: generateExercise,
            generateExercises: generateExercises,
            generateIntegerNumbersTotallingBetween: generateIntegerNumbersTotallingBetween
        };
    }
]);
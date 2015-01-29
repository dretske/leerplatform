'use strict';

/* Services */

var rekenenServices = angular.module('rekenenServices', []);

rekenenServices.factory('ExerciseGenerator', ['$log',
    function ($log) {
        var EquationDefinitionBuilder = function () {
            var lhsSize = 2;
            var rhsSize = 1;
            var operators = ['+', '-'];
            var minConstantsSize = 0;
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
                withOperators: function (ops) {
                    operators = ops;
                    return this;
                },
                withMinConstantsSize: function (size) {
                    minConstantsSize = size;
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
                        operators: operators,
                        minConstantsSize: minConstantsSize,
                        maxConstantsSize: maxConstantsSize
                    };
                    return equationDefinition;
                }
            };
        };

        function generateExercises(numberOfExercises, minConstantsSize, maxConstantsSize) {
            var exercises = [];
            
            for (var i = 0; i < numberOfExercises; i++) {
                exercises.push(generateExercise(parseInt(minConstantsSize), parseInt(maxConstantsSize)));
            }
            
            return exercises;
        }

        function generateExercise(minConstantsSize, maxConstantsSize) {
            var equation = generateEquation(minConstantsSize, maxConstantsSize);
            var replaceConstantInLeftHandSide = randomBoolean();
            var constantIndex;
            var solution;
            
            if (replaceConstantInLeftHandSide) {
                constantIndex = randomNumberBetween(0, equation.lhsConstants.length-1);
                solution = equation.lhsConstants[constantIndex];
                equation.lhsConstants[constantIndex] = '?';
            } else {
                constantIndex = randomNumberBetween(0, equation.rhsConstants.length-1);
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

        function generateEquation(minConstantsSize, maxConstantsSize) {
            var definition = new EquationDefinitionBuilder()
                    .withMinConstantsSize(minConstantsSize)
                    .withMaxConstantsSize(maxConstantsSize)
                    .build();
            return generateEquationForDefinition(definition);
        }

        function generateEquationForDefinition(definition) {
            var lhsEquation = generateEquationWithResultBetween(
                    definition.minConstantsSize, 
                    definition.rhsSize * definition.maxConstantsSize, 
                    definition.lhsSize, 
                    definition.minConstantsSize, 
                    definition.maxConstantsSize);
            var lhsConstants = lhsEquation.constants;
            var lhsOperators = lhsEquation.operators;
            
            
            var lhsResult = calculate(lhsConstants, lhsOperators);
            
            var rhsEquation = generateEquationEqualTo(lhsResult, definition.rhsSize, definition.minConstantsSize, definition.maxConstantsSize);
            
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
                } 
            };
        }

        function generateEquationEqualTo(result, size, minValue, maxValue) {
            return generateEquationWithResultBetween(result, result, size, minValue, maxValue);
        }

        function generateEquationWithResultBetween(minResult, maxResult, numberOfConstants, minConstantValue, maxConstantValue) {
            var constants = [];
            var operators = [];
            
            if (numberOfConstants === 1) {
                return {
                    constants: [randomNumberBetween(minResult, Math.min(maxResult, maxConstantValue))],
                    operators: []
                };
            } else {
                // First constant needs to be positive and big enough so it is still 
                // possible to get to the result, given the remaining number of constants
                var maxPossibleSumForRemainingConstants = (numberOfConstants-1) * maxConstantValue;
                var minValueOfFirstConstant = Math.max(minConstantValue, minResult - maxPossibleSumForRemainingConstants);
                var maxValueOfFirstConstant = Math.min(maxResult + maxPossibleSumForRemainingConstants, maxConstantValue);

                // We add a constant 
                var firstConstant = randomNumberBetween(minValueOfFirstConstant, maxValueOfFirstConstant);
                constants.push(firstConstant);

                if (numberOfConstants > 1) {
                    var remainingNumbersInEquation = generateIntegerNumbersTotallingBetween(
                            minResult - firstConstant, maxResult - firstConstant, numberOfConstants - 1, maxConstantValue);
                    remainingNumbersInEquation.forEach(function (number) {
                        if (number > 0) {
                            operators.push('+');
                        } else if (number < 0) {
                            operators.push('-');
                        } else {
                            operators.push(randomArrayElement(['+', '-']));
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

        function generateIntegerNumbersTotallingBetween(minResult, maxResult, size, maxValue) {
            var numbers = [];
            
            if (size === 1) {
                return [Math.min(randomNumberBetween(minResult, maxResult), maxValue)];
            } else {
                var maxPossibleSumForRemainingConstants = (size - 1) * maxValue;
                var minValueOfFirstNumber = minResult - maxPossibleSumForRemainingConstants;
                var maxValueOfFirstNumber = maxResult + maxPossibleSumForRemainingConstants;

                // We add a constant 
                var firstNumber = randomNumberBetween(
                        Math.max(-1*maxValue, minValueOfFirstNumber), 
                        Math.min(maxValueOfFirstNumber, maxValue));
                numbers.push(firstNumber);

                if (size > 1) {
                    numbers.push(generateIntegerNumbersTotallingBetween(minResult - firstNumber, maxResult - firstNumber, size - 1, maxValue));
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

        function generateOperatorArray(size, operators) {
            var array = [];
            for (var i = 0; i < size; i++) {
                array.push(randomArrayElement(operators));
            } 
            return array;
        }

        function generateNumberArray(size, maxValue) {
            var array = [];
            for (var i = 0; i < size; i++) {
                array.push(randomNumberBetween(0, maxValue));
            } 
            return array;
        }

        function randomArrayElement(array) {
            var randomIndex = randomNumberBetween(0,array.length-1);
            return array[randomIndex];
        }

        function randomNumberBetween(min, max) {
            if (min > max) {
                console.error("min %s > max %s !!!!!", min, max);
            }
            return Math.floor(Math.random()*(max-min+1)+min);
        }

        function randomBoolean() {
            return Math.random() >= 0.5;
        }
        
        return {
            generateEquation: generateEquation,
            generateExercise: generateExercise,
            generateExercises: generateExercises
        };
    }]);
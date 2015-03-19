'use strict';

/* Services */

var mathServices = angular.module('mathServices');

mathServices.factory('CountingExerciseGenerator', ['CommonServices',
    function (CommonServices) {
        
        function generateExercises(numberOfExercises, max, maxOptions) {
            var exercises = [];
            
            for (var i = 0; i < numberOfExercises; i++) {
                var exercise;
                if (i === 0) {
                    exercise = generateExercise(parseInt(max), maxOptions);
                } else {
                    exercise = generateExerciseAndCheckDifference(
                            parseInt(max),
                            exercises[i-1],
                            maxOptions);
                }
                exercises.push(exercise);
            }
            
            return exercises;
        }

        function generateExerciseAndCheckDifference(max, previousExercise, maxOptions) {
            var exercise;
            do {
                exercise = generateExercise(max, maxOptions);
            } while (exercise.solution === previousExercise.solution);
            return exercise;
        }

        function generateExercise(max, maxOptions) {
            var solution = CommonServices.randomNumberBetween(1, max);
            
            var options = generateOptions(max, solution, maxOptions);
            
            return {
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
        
        function generateOptions(max, solution, maxOptions) {
            var options = [];
            if (maxOptions === undefined) {
                maxOptions = max;
            }
            var numberOfOptions = Math.min(max, maxOptions);
            var smallestPossibleOption = Math.max(solution - (maxOptions - 1), 1);
            var largestPossibleOption = Math.min(solution + (maxOptions - 1), max);
            
            var smallestOption = CommonServices.randomNumberBetween(smallestPossibleOption, largestPossibleOption - (numberOfOptions-1));
            for (var i = 0; i < numberOfOptions; i++) {
                options.push(smallestOption + i);
            }
            return options;
        }
        
        return {
            generateExercise: generateExercise,
            generateExercises: generateExercises
        };
    }
]);
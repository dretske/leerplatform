'use strict';

/* Services */

var schrijvenServices = angular.module('schrijvenServices');

schrijvenServices.factory('SchrijvenOefeningService', ['MathServices', function (MathServices) {
    
        var woordenlijst= [
            {woord: 'auto', tags: ['au']},
            {woord: 'bord', tags: ['dt']},
            {woord: 'broek', tags: ['oe']},
            {woord: 'bus', tags: ['']},
            {woord: 'fiets', tags: ['']},
            {woord: 'fles', tags: ['']},
            {woord: 'hoed', tags: ['dt']},
            {woord: 'hond', tags: ['dt']},
            {woord: 'jas', tags: ['']},
            {woord: 'kip', tags: ['pb']},
            {woord: 'koe', tags: ['oe']},
            {woord: 'mes', tags: ['']},
            {woord: 'muts', tags: ['']},
            {woord: 'schoen', tags: ['sch']},
            {woord: 'stoel', tags: ['oe']},
            {woord: 'tafel', tags: ['']},
            {woord: 'vogel', tags: ['']},
            {woord: 'vork', tags: ['']}
        ];

        function generateExercises(numberOfExercises, options) {
            var exercises = [];
            
            var woordenlijstCopy = cloneArray(woordenlijst);
            
            for (var i=0; i<numberOfExercises; i++) {
                var index = MathServices.randomNumberBetween(0,woordenlijstCopy.length-1);
                exercises.push(toOefening(woordenlijstCopy[index].woord));
                woordenlijstCopy = cloneRemovingElementAtIndex(woordenlijstCopy, index);
            }
            
            return exercises;
        }
        
        function toOefening(woord) {
            return {
                solution: woord,
                answer: null,
                options: [true, false],
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
        
        function cloneRemovingElementAtIndex(base, index) {
            var newArray = [];
            for(var i=0; i < index; i++) {
                newArray[i] = base[i];
            }
            for(var i=index+1; i < base.length; i++) {
                newArray[i-1] = base[i];
            }
            return newArray;
        };
        
        function cloneArray(base) {
            var newArray = [];
            for(var i = 0; i < base.length; i++) {
                newArray[i] = base[i];
            }
            return newArray;
        };
        
        return {
            generateExercises: generateExercises
        };
    }
]);
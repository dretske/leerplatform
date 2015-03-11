'use strict';

/* Services */

var schrijvenServices = angular.module('schrijvenServices');

schrijvenServices.factory('SchrijvenOefeningService', ['CommonServices', function (CommonServices) {
    
        var lettersVoorTagsMap = [
            {key: 'oe', value:['u']},
            {key: 'sch', value:['k']},
            {key: 'pb', value:['p', 'b']},
            {key: 'dt', value:['d', 't']},
            {key: 'au', value:['a', 'o']},
            {key: 'ou', value:['a', 'o']}            
        ];
    
        var woordenlijst= [
            {woord: 'auto', tags: ['au']},
            {woord: 'bord', tags: ['dt']},
            {woord: 'broek', tags: ['oe']},
            {woord: 'bus', tags: []},
            {woord: 'fiets', tags: []},
            {woord: 'fles', tags: []},
            {woord: 'hoed', tags: ['dt']},
            {woord: 'hond', tags: ['dt']},
            {woord: 'jas', tags: []},
            {woord: 'kip', tags: ['pb']},
            {woord: 'koe', tags: ['oe']},
            {woord: 'mes', tags: []},
            {woord: 'muts', tags: []},
            {woord: 'schoen', tags: ['sch']},
            {woord: 'stoel', tags: ['oe']},
            {woord: 'tafel', tags: []},
            {woord: 'vogel', tags: []},
            {woord: 'bed', tags: ['dt']},
            {woord: 'paard', tags: ['dt']},
            {woord: 'lepel', tags: []},
            {woord: 'heks', tags: []},
            {woord: 'wortel', tags: []},
            {woord: 'appel', tags: []},
            {woord: 'doos', tags: []},
            {woord: 'worm', tags: []},
            {woord: 'boot', tags: []},
            {woord: 'wolk', tags: []},
            {woord: 'strik', tags: []},
            {woord: 'pauw', tags: ['au']},
            {woord: 'voet', tags: ['oe']},
            {woord: 'hand', tags: ['dt']},
            {woord: 'banaan', tags: []},
            {woord: 'meisje', tags: ['ei']},
            {woord: 'ei', tags: ['ei']},
            {woord: 'aap', tags: []},
            {woord: 'vliegtuig', tags: ['ui']},
            {woord: 'ijsje', tags: ['ij']},
            {woord: 'boom', tags: []},
            {woord: 'schommel', tags: ['sch']},
            {woord: 'bloem', tags: ['oe']},
            {woord: 'huis', tags: ['ui']},
            {woord: 'muis', tags: ['ui']},
            {woord: 'deur', tags: ['eu']},
            {woord: 'vork', tags: []}
        ];

        function generateExercises(numberOfExercises, options) {
            var exercises = [];
            
            var woordenlijstCopy = CommonServices.cloneArray(woordenlijst);
            
            for (var i=0; i<numberOfExercises; i++) {
                var index = CommonServices.randomNumberBetween(0,woordenlijstCopy.length-1);
                exercises.push(toOefening(woordenlijstCopy[index]));
                woordenlijstCopy = CommonServices.cloneArrayRemovingElementAtIndex(woordenlijstCopy, index);
            }
            
            return exercises;
        }
        
        function toOefening(opgave) {
            return {
                solution: opgave.woord,
                answer: null,
                options: toOptions(opgave),
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
        
        function toOptions(opgave) {
            var options = opgave.woord.split(''); // Voegt letters voor de oplossing toe.
            // Voeg letters toe voor tags
            for (var i=0; i<opgave.tags.length; i++) {
                var tag = opgave.tags[i];
                var lettersVoorTag = CommonServices.getFromKeyValueArray(lettersVoorTagsMap, tag);
                if (lettersVoorTag !== null) {
                    options = options.concat(lettersVoorTag);
                }
            }
            // append tot we minstens 4 extra letters hebben...
            for (var i=options.length; i < opgave.woord.length + 4; i++) {
                options.push(randomCharacter());
            }

            CommonServices.shuffleArray(options);
            
            return options;
        }
        
        function randomCharacter() {
            var possible = "abcdefghijklmnopqrstuvwxyz";
            return possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return {
            generateExercises: generateExercises
        };
    }
]);
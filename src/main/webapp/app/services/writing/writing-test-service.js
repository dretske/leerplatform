'use strict';

/* Services */

var writingServices = angular.module('writingServices');

writingServices.factory('WritingTestService', ['CommonServices', function (CommonServices) {
    
        var lettersVoorTagsMap = [
            {key: 'oe', value:['u']},
            {key: 'sch', value:['k']},
            {key: 'b of p', value:['b', 'p']},
            {key: 'ei of ij', value:['e', 'i', 'j']},
            {key: '-d of -t', value:['d', 't']},
            {key: 'au of ou', value:['a', 'o']},
            {key: 'i of j', value:['i', 'j']},
            {key: 'ch of g', value:['c', 'h', 'g']}      
        ];
    
        var woordenlijst= [
            {woord: 'auto', tags: ['au of ou']},
            {woord: 'bord', tags: ['-d of -t']},
            {woord: 'broek', tags: ['oe', 'br-']},
            {woord: 'bus', tags: []},
            {woord: 'fiets', tags: ['-ts']},
            {woord: 'fles', tags: ['fl']},
            {woord: 'hoed', tags: ['-d of -t']},
            {woord: 'hond', tags: ['-d of -t']},
            {woord: 'jas', tags: []},
            {woord: 'kip', tags: ['b of p']},
            {woord: 'koe', tags: ['oe']},
            {woord: 'mes', tags: []},
            {woord: 'muts', tags: ['-ts']},
            {woord: 'schoen', tags: ['sch']},
            {woord: 'stoel', tags: ['oe']},
            {woord: 'tafel', tags: []},
            {woord: 'vogel', tags: []},
            {woord: 'bed', tags: ['-d of -t']},
            {woord: 'paard', tags: ['-rd', '-d of -t']},
            {woord: 'lepel', tags: []},
            {woord: 'heks', tags: ['-ks']},
            {woord: 'wortel', tags: []},
            {woord: 'appel', tags: []},
            {woord: 'doos', tags: []},
            {woord: 'worm', tags: []},
            {woord: 'boot', tags: []},
            {woord: 'wolk', tags: []},
            {woord: 'strik', tags: []},
            {woord: 'pauw', tags: ['au of ou']},
            {woord: 'voet', tags: ['oe']},
            {woord: 'hand', tags: ['-d of -t']},
            {woord: 'banaan', tags: []},
            {woord: 'meisje', tags: ['ei of ij']},
            {woord: 'ei', tags: ['ei of ij']},
            {woord: 'aap', tags: []},
            {woord: 'vliegtuig', tags: ['ui']},
            {woord: 'ijsje', tags: ['ei of ij']},
            {woord: 'boom', tags: []},
            {woord: 'schommel', tags: ['sch']},
            {woord: 'bloem', tags: ['oe']},
            {woord: 'huis', tags: ['ui']},
            {woord: 'muis', tags: ['ui']},
            {woord: 'deur', tags: ['eu']},
            {woord: 'vork', tags: ['-rk']},
            {woord: 'eend', tags: ['-nd', '-d of -t']},
            {woord: 'wolf', tags: ['-lf']},
            {woord: 'helm', tags: ['-lm']},
            {woord: 'gans', tags: ['-ns']},
            {woord: 'lamp', tags: ['-mp']},
            {woord: 'kaart', tags: ['-rt']},
            {woord: 'hert', tags: ['-rt']},
            {woord: 'poort', tags: ['-rt']},
            {woord: 'kers', tags: ['-rs']},
            {woord: 'ring', tags: ['-ng']},
            {woord: 'jurk', tags: ['-rk']},
            {woord: 'bank', tags: ['-nk']},
            {woord: 'klink', tags: ['-nk']},
            {woord: 'web', tags: ['b of p']},
            {woord: 'velg', tags: ['-lg', 'ch of g']},
            {woord: 'brug', tags: ['ch of g']},
            {woord: 'berg', tags: ['-rg', 'ch of g']},
            {woord: 'vlag', tags: ['vl-', 'ch of g']},
            {woord: 'kous', tags: ['au of ou']},
            {woord: 'goud', tags: ['au of ou', '-d of -t']},
            {woord: 'bijl', tags: ['ei of ij']},
            {woord: 'geit', tags: ['ei of ij']},
            {woord: 'haai', tags: ['i of j']},
            {woord: 'kooi', tags: ['i of j']},
            {woord: 'pluim', tags: ['pl-']},
            {woord: 'kraan', tags: ['kr-']},
            {woord: 'bril', tags: ['br-']},
            {woord: 'brood', tags: ['br-', '-d of -t']},
            {woord: 'drie', tags: ['ie']},
            {woord: 'slak', tags: ['sl-']},
            {woord: 'slang', tags: ['sl-']},
            {woord: 'snoep', tags: ['sn-']},
            {woord: 'spin', tags: ['sp-']},
            {woord: 'trein', tags: ['ei of ij', 'tr-']},
            {woord: 'trap', tags: ['tr-']},
            {woord: 'zwaan', tags: ['zw-']},
            {woord: 'vlieg', tags: ['vl-', 'ch of g']},
            {woord: 'baard', tags: ['-rd', '-d of -t']},
            {woord: 'koets', tags: ['-ts']},
            {woord: 'meeuw', tags: ['eeuw']},
            {woord: 'leeuw', tags: ['eeuw']}
        ];

        function generateExercises(numberOfExercises, options) {
            var exercises = [];
            
            var woordenlijstCopy = CommonServices.cloneArray(woordenlijst);
            
            for (var i=0; i<numberOfExercises; i++) {
                var index = CommonServices.randomNumberBetween(0,woordenlijstCopy.length-1);
                exercises.push(toExercise(woordenlijstCopy[index]));
                woordenlijstCopy = CommonServices.cloneArrayRemovingElementAtIndex(woordenlijstCopy, index);
            }
            
            return exercises;
        }
        
        function toExercise(opgave) {
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
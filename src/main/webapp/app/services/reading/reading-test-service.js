'use strict';

/* Services */

var readingServices = angular.module('readingServices');

readingServices.factory('ReadingTestService', ['CommonServices', function (CommonServices) {
    
        var trueOrFalseExercises = [
            {question: 'De bal is rond', trueOrFalse: true},
            {question: 'De zee is blauw', trueOrFalse: true},
            {question: 'Kaka is bruin', trueOrFalse: true},
            {question: 'Pipi is geel', trueOrFalse: true},
            {question: 'Pipi is groen', trueOrFalse: false},
            {question: 'Kaka is paars', trueOrFalse: false},
            {question: 'Papa is een jongen', trueOrFalse: true},
            {question: 'Papa is een meisje', trueOrFalse: false},
            {question: 'Mama is een meisje', trueOrFalse: true},
            {question: 'Mama is een jongen', trueOrFalse: false},
            {question: 'Hopla is een konijn', trueOrFalse: true},
            {question: 'Aster is een meisje', trueOrFalse: true},
            {question: 'Aster is een jongen', trueOrFalse: false},
            {question: 'Wies heeft groen haar', trueOrFalse: false},
            {question: 'Wies heeft blond haar', trueOrFalse: true},
            {question: 'Wies eet graag pannenkoeken', trueOrFalse: true},
            {question: 'Wies drinkt graag melk', trueOrFalse: false},
            {question: 'Wies drinkt graag oasis', trueOrFalse: true},
            {question: 'Aster drinkt graag appelsap', trueOrFalse: true},
            {question: 'Aster drinkt graag spuitwater', trueOrFalse: false},
            {question: 'Een fiets heeft drie wielen', trueOrFalse: false},
            {question: 'Een fiets heeft twee wielen', trueOrFalse: true},
            {question: 'Een auto heeft vier wielen', trueOrFalse: true},
            {question: 'Een auto heeft twee wielen', trueOrFalse: false},
            {question: 'Koekjes zijn lekker', trueOrFalse: true},
            {question: 'Koekjes zijn vies', trueOrFalse: false},
            {question: 'Frietjes zijn lekker', trueOrFalse: true},
            {question: 'Frietjes zijn vies', trueOrFalse: false},
            {question: 'Je mond zit boven je neus', trueOrFalse: false},
            {question: 'Je mond zit onder je neus', trueOrFalse: true},
            {question: 'Een poes kan blaffen', trueOrFalse: false},
            {question: 'Een hond kan blaffen', trueOrFalse: true},
            {question: 'Ezels kunnen vliegen', trueOrFalse: false},
            {question: 'Ezels kunnen niet vliegen', trueOrFalse: true},
            {question: 'Een steen is hard', trueOrFalse: true},
            {question: 'Een steen is zacht', trueOrFalse: false},
            {question: 'Als je weent ben je blij', trueOrFalse: false},
            {question: 'Als je lacht ben je blij', trueOrFalse: true},
            {question: 'Als je weent ben je verdrietig', trueOrFalse: true},
            {question: 'Als je lacht ben je verdrietig', trueOrFalse: false},
            {question: 'Een boot kan varen', trueOrFalse: true},
            {question: 'Een boot kan vliegen', trueOrFalse: false},
            {question: 'Opa Hasselt is een beetje dik', trueOrFalse: true},
            {question: 'Opa Hasselt is heel slank', trueOrFalse: false},
            {question: 'Opa Johan woont in Kortrijk', trueOrFalse: true},
            {question: 'Opa Johan woont in Hasselt', trueOrFalse: false},
            {question: 'Oma Fina woont in Hasselt', trueOrFalse: true},
            {question: 'Oma Fina woont in Kortrijk', trueOrFalse: false},
            {question: 'Een auto kan varen', trueOrFalse: false},
            {question: 'Een auto heeft een stuur', trueOrFalse: true},
            {question: 'Een kabouter is kleiner dan een reus', trueOrFalse: true},
            {question: 'Een reus is kleiner dan een kabouter', trueOrFalse: false},
            {question: 'Een olifant is groter dan een vlieg', trueOrFalse: true},
            {question: 'Een vlieg is groter dan een olifant', trueOrFalse: false},
            {question: 'Een vlieg is groter dan een olifant', trueOrFalse: false},
            {question: 'Eten doe je met je voeten', trueOrFalse: false},
            {question: 'Eten doe je met mes en vork', trueOrFalse: true},
            {question: 'Een schoen zet je op je hoofd', trueOrFalse: false},
            {question: 'Een schoen doe je aan je voet', trueOrFalse: true},
            {question: 'Met je oren kan je zien', trueOrFalse: false},
            {question: 'Met je ogen kan je zien', trueOrFalse: true},
            {question: 'Speelgoed groeit aan de bomen', trueOrFalse: false},
            {question: 'Fruit groeit aan de bomen', trueOrFalse: true},
            {question: 'Met geld kan je iets kopen', trueOrFalse: true},
            {question: 'Met geld kan je je haar kammen', trueOrFalse: false},
            {question: 'Vissen lopen rond in onze tuin', trueOrFalse: false},
            {question: 'Vissen zwemmen in het water', trueOrFalse: true},
            {question: 'Mama werkt in het ziekenhuis', trueOrFalse: true},
            {question: 'Mama werkt bij de brandweer', trueOrFalse: false}
        ];

        function generateExercises(numberOfExercises, options) {
            var exercises = [];
            
            var trueOrFalseExercisesCopy = CommonServices.cloneArray(trueOrFalseExercises);
            
            for (var i=0; i<numberOfExercises; i++) {
                var index = CommonServices.randomNumberBetween(0,trueOrFalseExercisesCopy.length-1);
                exercises.push(toTrueOrFalseExercise(trueOrFalseExercisesCopy[index]));
                trueOrFalseExercisesCopy = CommonServices.cloneArrayRemovingElementAtIndex(trueOrFalseExercisesCopy, index);
            }
            
            return exercises;
        }
        
        function toTrueOrFalseExercise(trueOrFalseExercise) {
            return {
                question: trueOrFalseExercise.question,
                solution: trueOrFalseExercise.trueOrFalse,
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
        
        return {
            generateExercises: generateExercises
        };
    }
]);
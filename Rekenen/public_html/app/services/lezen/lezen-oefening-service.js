'use strict';

/* Services */

var lezenServices = angular.module('lezenServices');

lezenServices.factory('LezenOefeningService', ['CommonServices', function (CommonServices) {
    
        var waarValsOpgaves= [
            {vraag: 'De bal is rond', waar: true},
            {vraag: 'De zee is blauw', waar: true},
            {vraag: 'Kaka is bruin', waar: true},
            {vraag: 'Pipi is geel', waar: true},
            {vraag: 'Pipi is groen', waar: false},
            {vraag: 'Kaka is paars', waar: false},
            {vraag: 'Papa is een jongen', waar: true},
            {vraag: 'Papa is een meisje', waar: false},
            {vraag: 'Mama is een meisje', waar: true},
            {vraag: 'Mama is een jongen', waar: false},
            {vraag: 'Hopla is een konijn', waar: true},
            {vraag: 'Aster is een meisje', waar: true},
            {vraag: 'Aster is een jongen', waar: false},
            {vraag: 'Wies heeft groen haar', waar: false},
            {vraag: 'Wies heeft blond haar', waar: true},
            {vraag: 'Wies eet graag pannenkoeken', waar: true},
            {vraag: 'Wies drinkt graag melk', waar: false},
            {vraag: 'Wies drinkt graag oasis', waar: true},
            {vraag: 'Aster drinkt graag appelsap', waar: true},
            {vraag: 'Aster drinkt graag spuitwater', waar: false},
            {vraag: 'Een fiets heeft drie wielen', waar: false},
            {vraag: 'Een fiets heeft twee wielen', waar: true},
            {vraag: 'Een auto heeft vier wielen', waar: true},
            {vraag: 'Een auto heeft twee wielen', waar: false},
            {vraag: 'Koekjes zijn lekker', waar: true},
            {vraag: 'Koekjes zijn vies', waar: false},
            {vraag: 'Frietjes zijn lekker', waar: true},
            {vraag: 'Frietjes zijn vies', waar: false},
            {vraag: 'Je mond zit boven je neus', waar: false},
            {vraag: 'Je mond zit onder je neus', waar: true},
            {vraag: 'Een poes kan blaffen', waar: false},
            {vraag: 'Een hond kan blaffen', waar: true},
            {vraag: 'Ezels kunnen vliegen', waar: false},
            {vraag: 'Ezels kunnen niet vliegen', waar: true},
            {vraag: 'Een steen is hard', waar: true},
            {vraag: 'Een steen is zacht', waar: false},
            {vraag: 'Als je weent ben je blij', waar: false},
            {vraag: 'Als je lacht ben je blij', waar: true},
            {vraag: 'Als je weent ben je verdrietig', waar: true},
            {vraag: 'Als je lacht ben je verdrietig', waar: false},
            {vraag: 'Een boot kan varen', waar: true},
            {vraag: 'Een boot kan vliegen', waar: false},
            {vraag: 'Opa Hasselt is een beetje dik', waar: true},
            {vraag: 'Opa Hasselt is heel slank', waar: false},
            {vraag: 'Opa Johan woont in Kortrijk', waar: true},
            {vraag: 'Opa Johan woont in Hasselt', waar: false},
            {vraag: 'Oma Fina woont in Hasselt', waar: true},
            {vraag: 'Oma Fina woont in Kortrijk', waar: false},
            {vraag: 'Een auto kan varen', waar: false},
            {vraag: 'Een auto heeft een stuur', waar: true},
            {vraag: 'Een kabouter is kleiner dan een reus', waar: true},
            {vraag: 'Een reus is kleiner dan een kabouter', waar: false},
            {vraag: 'Een olifant is groter dan een vlieg', waar: true},
            {vraag: 'Een vlieg is groter dan een olifant', waar: false},
            {vraag: 'Een vlieg is groter dan een olifant', waar: false},
            {vraag: 'Eten doe je met je voeten', waar: false},
            {vraag: 'Eten doe je met mes en vork', waar: true},
            {vraag: 'Een schoen zet je op je hoofd', waar: false},
            {vraag: 'Een schoen doe je aan je voet', waar: true},
            {vraag: 'Met je oren kan je zien', waar: false},
            {vraag: 'Met je ogen kan je zien', waar: true},
            {vraag: 'Speelgoed groeit aan de bomen', waar: false},
            {vraag: 'Fruit groeit aan de bomen', waar: true},
            {vraag: 'Met geld kan je iets kopen', waar: true},
            {vraag: 'Met geld kan je je haar kammen', waar: false},
            {vraag: 'Vissen lopen rond in onze tuin', waar: false},
            {vraag: 'Vissen zwemmen in het water', waar: true},
            {vraag: 'Mama werkt in het ziekenhuis', waar: true},
            {vraag: 'Mama werkt bij de brandweer', waar: false}
        ];

        function generateExercises(numberOfExercises, options) {
            var exercises = [];
            
            var waarValsOefeningenCopy = CommonServices.cloneArray(waarValsOpgaves);
            
            for (var i=0; i<numberOfExercises; i++) {
                var index = CommonServices.randomNumberBetween(0,waarValsOefeningenCopy.length-1);
                exercises.push(toWaarValsOefening(waarValsOefeningenCopy[index]));
                waarValsOefeningenCopy = CommonServices.cloneArrayRemovingElementAtIndex(waarValsOefeningenCopy, index);
            }
            
            return exercises;
        }
        
        function toWaarValsOefening(waarValsOpgave) {
            return {
                question: waarValsOpgave.vraag,
                solution: waarValsOpgave.waar,
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
'use strict';

/* Services */

var rekenenServices = angular.module('rekenenServices');

rekenenServices.factory('MathServices', [
    function () {

        function generateNumberArray(size, minValue, maxValue) {
            var array = [];
            for (var i = 0; i < size; i++) {
                array.push(randomNumberBetween(minValue, maxValue));
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
        
        function arrayEquals(a, b) {
            if (a === b) return true;
            if (a === null || b === null) return false;
            if (a.length !== b.length) return false;

            for (var i = 0; i < a.length; ++i) {
              if (a[i] !== b[i]) return false;
            }
            return true;
          }
        
        return {
            arrayEquals: arrayEquals,
            randomBoolean: randomBoolean,
            randomNumberBetween: randomNumberBetween,
            randomArrayElement: randomArrayElement,
            generateNumberArray: generateNumberArray
        };
    }
]);
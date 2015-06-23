'use strict';

/* Services */

var mainServices = angular.module('mainServices');

mainServices.factory('CommonServices', [
    function () {

        function createAndFillArray(size, fillValue) {
            var array = [];
            for (var i = 0; i < size; i++) {
                array.push(fillValue);
            } 
            return array;
        }

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
        
                
        function cloneArrayRemovingElementAtIndex(base, index) {
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

        function shuffleArray(o){
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };
        
        function getFromKeyValueArray(array, key) {
            for (var i=0; i<array.length; i++) {
                if (array[i].key === key) {
                    return array[i].value;
                }
            }
            return null;
        }
        
        function splitIntoSmallerArrays(array, min, max) {
            var result = [];
            var currentIndex = 0;
            var numberOfElementsInSubArray;
            if (array.length < min) {
                result.push(array);
                return result;
            }
            while (currentIndex < array.length) {
                var elementsLeftInArray = array.length - currentIndex;;
                var subArray = [];
                numberOfElementsInSubArray = randomNumberBetween(min, Math.min(elementsLeftInArray, max));
                var newElementsLeftInArray = elementsLeftInArray - numberOfElementsInSubArray;
                
                while (newElementsLeftInArray > 0 && newElementsLeftInArray < min) {
                    numberOfElementsInSubArray = randomNumberBetween(min, Math.min(elementsLeftInArray, max));
                    newElementsLeftInArray = elementsLeftInArray - numberOfElementsInSubArray;
                }
                
                for (var i=currentIndex; i < currentIndex + numberOfElementsInSubArray; i++) {
                    subArray.push(array[i]);
                }
                
                result.push(subArray);
                currentIndex += numberOfElementsInSubArray;
            }
            return result;
        }
        
        return {
            createAndFillArray: createAndFillArray,
            getFromKeyValueArray: getFromKeyValueArray,
            shuffleArray: shuffleArray,
            cloneArray: cloneArray,
            cloneArrayRemovingElementAtIndex: cloneArrayRemovingElementAtIndex,
            arrayEquals: arrayEquals,
            randomBoolean: randomBoolean,
            randomNumberBetween: randomNumberBetween,
            randomArrayElement: randomArrayElement,
            generateNumberArray: generateNumberArray,
            splitIntoSmallerArrays: splitIntoSmallerArrays
        };
    }
]);
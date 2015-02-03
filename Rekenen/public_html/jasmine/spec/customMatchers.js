var customMatchers = {
    toMatch: function(util, customEqualityTesters) {
        
        function matches(value, matchingFunction, result) {
            return matchingFunction(value, result);
        }
        
        return {
            compare: function(actual, matchingFunction) {
                var result = {
                    pass: true,
                    message: ""
                };
                
                result.pass = matches(actual, matchingFunction, result);
                
                return result;
            }
        };
    },
    toAllMatch: function(util, customEqualityTesters) {
        
        function matches(value, matchingFunction, result) {
            return matchingFunction(value, result);
        }
        
        return {
            compare: function(array, matchingFunction) {
                var result = {
                    pass: true,
                    message: ""
                };
                
                for (i = 0; i < array.length; i++) {
                    if (!matches(array[i], matchingFunction, result)) {
                        break;
                    }
                }
                
                return result;
            }
        };
    },
    toContainElementsNoLargerThan: function(util, customEqualityTesters) {
        
        function maxElementInArray(array) {
            var maxValue = 0;
            for (i = 0; i < array.length; i++) { 
                if (array[i] > maxValue) {
                    maxValue = array[i];
                }
            }
            return maxValue;
        }
        
        return {
            compare: function(array, maxValue) {
                var result = {};
                
                var maxValueInArray = maxElementInArray(array);
                
                result.pass = maxValueInArray <= maxValue;
                
                if (result.pass) {
                    result.message = "No values in array larger than " + maxValue;
                } else {
                    result.message = "Element '" + maxValueInArray 
                            + "' in array is larger than the maximum value '" 
                            + maxValue + "'";
                }
                
                return result;
            }
        };
    }
};

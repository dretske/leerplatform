var mainDirectives = angular.module('mainDirectives');

mainDirectives.directive("imageGrid", ['$window', '$document', function ($window, $document) {
        
        var coordinatesMap = [
        /* 1 */    [{x: 3, y: 3}],
        /* 2 */    [{x: 2, y: 2},{x: 4, y: 4}],
        /* 3 */    [{x: 1, y: 1},{x: 3, y: 3},{x: 5, y: 5}],
        /* 4 */    [{x: 2, y: 2},{x: 2, y: 4},{x: 4, y: 2},{x: 4, y: 4}],
        /* 5 */    [{x: 1, y: 1},{x: 1, y: 5},{x: 3, y: 3},{x: 5, y: 1},{x: 5, y: 5}],
        /* 6 */    [{x: 1, y: 2},{x: 3, y: 2},{x: 5, y: 2},{x: 1, y: 4},{x: 3, y: 4},{x: 5, y: 4}],
        /* 7 */    [{x: 1, y: 1},{x: 3, y: 1},{x: 5, y: 1},{x: 3, y: 3},{x: 1, y: 5},{x: 3, y: 5},{x: 5,y: 5}],
        /* 8 */    [{x: 1, y: 1},{x: 3, y: 1},{x: 5, y: 1},{x: 2, y: 3},{x: 4, y: 3},{x: 1, y: 5},{x: 3, y: 5},{x: 5,y: 5}],
        /* 9 */    [{x: 1, y: 1},{x: 3, y: 1},{x: 5, y: 1},{x: 1, y: 3},{x: 3, y: 3},{x: 5, y: 3},{x: 1, y: 5},{x: 3, y: 5},{x: 5,y: 5}]
        ];

        var linkFunction = function (scope, element, attributes) {
            
            function drawGrid() {
                element.empty();
                var gridWidth = element.width();
                var gridHeight = element.height();
                var cellWidth = gridWidth / 6;
                var cellHeight = gridHeight / 6;

                var imageWidth = 2 * cellWidth;
                var imageHeight = 2 * cellHeight;

                imageWidth = Math.min(imageWidth, imageHeight);
                imageHeight = imageWidth;

                var imageCoordinates = coordinatesMap[scope.value-1];

                for (var i=0; i < scope.value; i++) {
                    var coords = imageCoordinates[i];
                    var left = (coords.y * cellWidth) - (imageWidth/2);
                    var top = (coords.x * cellHeight) - (imageHeight/2);
                    var style = "position: absolute;top: " + top + "px;left: " + left + "px";
                    element.append('<img src="' + scope.image 
                            + '" width="' + imageWidth 
                            + '" height="' + imageHeight 
                            + '" style="' + style + '"/>');
                }
            }
            
            scope.$watch('value', function (oldVal, newVal) {
                drawGrid();
            });

        };

        return {
            restrict: "E",
            scope: {
                image: '=',
                value: '='
            },
            link: linkFunction,
            template: '<div class="imagegrid"></div>',
            replace: true
        };
    }]);

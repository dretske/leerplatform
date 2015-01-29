var rekenenDirectives = angular.module('rekenenDirectives', []);

rekenenDirectives.directive("divConnector", ['$window', '$document', function ($window, $document) {

        var linkFunction = function (scope, element, attributes) {

            function getCorners(element) {
                return {
                    topLeft: {
                        x: element.offset().left,
                        y: element.offset().top
                    },
                    topRight: {
                        x: element.offset().left + element.outerWidth(),
                        y: element.offset().top
                    },
                    bottomLeft: {
                        x: element.offset().left,
                        y: element.offset().top + element.outerHeight()
                    },
                    bottomRight: {
                        x: element.offset().left + element.outerWidth(),
                        y: element.offset().top + element.outerHeight()
                    }
                };
            }

            function fillShape(context, points, lineColor, fillColor) {
                context.beginPath();
                context.moveTo(points[0].x, points[0].y);
                points.forEach(function (point) {
                    context.lineTo(point.x, point.y);
                });
                context.lineTo(points[0].x, points[0].y);
                context.closePath();

                context.lineWidth = 1;
                context.fillStyle = fillColor;
                context.fill();
                context.strokStyle = lineColor;
                context.stroke();
            }

            var drawLink = function () {
                if (scope.connectWhen) {
                    console.log('drawing');

                    angular.element($document).ready(function () {
                        var fromElement = $('#' + element[0].id);
                        var toElement = $('#' + scope.toDivId);

                        var context = getCanvasContext();
                        var fromCorners = getCorners(fromElement);
                        var toCorners = getCorners(toElement);

                        fillShape(context, [fromCorners.topLeft, fromCorners.topRight, toCorners.topRight, toCorners.topLeft]
                                , '#000000', 'rgba(180, 180, 180, 0.5)');
                        fillShape(context, [fromCorners.topLeft, toCorners.topLeft, toCorners.bottomLeft, fromCorners.bottomLeft]
                                , '#000000', 'rgba(180, 180, 180, 0.5)');
                        fillShape(context, [fromCorners.topRight, toCorners.topRight, toCorners.bottomRight, fromCorners.bottomRight]
                                , '#000000', 'rgba(180, 180, 180, 0.5)');
                        fillShape(context, [fromCorners.bottomLeft, fromCorners.bottomRight, toCorners.bottomRight, toCorners.bottomLeft]
                                , '#000000', 'rgba(180, 180, 180, 0.5)');
                        fillShape(context, [toCorners.topLeft, toCorners.topRight, toCorners.bottomRight, toCorners.bottomLeft]
                                , '#000000', 'rgba(220, 220, 220, 1)');
                    });
                }
                ;
            };

            function getCanvasContext() {
                var canvas = $document[0].getElementById('canvas');
                return canvas.getContext('2d');
            }

            function clearCanvas() {
                console.log('clearing canvas in directive');
                var context = getCanvasContext();
                context.clearRect(0, 0, canvas.width, canvas.height);
            }

            angular.element($window).bind('resize', function () {
                drawLink();
            });

            scope.$watch('connectWhen', function (oldVal, newVal) {
                drawLink();
            });
        };

        return {
            restrict: "A",
            scope: {
                toDivId: '=',
                connectWhen: '='
            },
            link: linkFunction
        };
    }]);
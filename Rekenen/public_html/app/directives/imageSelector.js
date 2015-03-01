var rekenenDirectives = angular.module('rekenenDirectives');

rekenenDirectives.directive("imageSelector", ['$window', '$document', function ($window, $document) {

        var linkFunction = function (scope, element, attributes) {
            var overDragInPixels = 100;
            var minX = 0, previousOffsetX = 0, offsetX = 0, 
                    currentDragDistanceX = 0, dragStartX = 0;
            var spacing = scope.spacing ? scope.spacing : 0;
            var imageWithSpacingWidth = scope.imageWidth + spacing;
            var maxX = (scope.images.length -1) * imageWithSpacingWidth;
            var snapPercentage = 0.2;
            
            function totalWidth() {
                return element.find('.imageSelectorWrapper').first().width();
            }
            
            var baseX = Math.floor((totalWidth() - scope.imageWidth)/2);
            
            var imagesDiv = element.find('.imageSelector').first();
            imagesDiv.css({
                position: 'relative',
                left: baseX + 'px'
            });
            
            imagesDiv.on('mousedown', function(event) {
               event.preventDefault();
               dragStartX = event.pageX;
               imagesDiv.css({
                    transition: 'none'
               });
               $document.on('mousemove', mousemove);
               $document.on('mouseup', mouseup);
            });
            
            function mousemove(event) {
                currentDragDistanceX = event.pageX - dragStartX;
                
                moveOffsetXBy(currentDragDistanceX, true);
                
                imagesDiv.css({
                    transform: 'translateX(' + offsetX + 'px)'
                });
            }
            
            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
                setOffsetToImageStart();
                previousOffsetX = offsetX;
                scope.onSelected()(getSelectedImage());
                imagesDiv.css({
                    transition: '1s',
                    transform: 'translateX(' + offsetX + 'px)'
                });
                $document.off('mouseup', mouseup);
            }
            
            function setOffsetToImageStart() {
                if (distanceToNextImageStartLessThan((1-snapPercentage) * imageWithSpacingWidth)) {
                    if (draggingLeft()) {
                        moveOffsetXBy(currentDragDistanceX - remainingDragToNextImageStart(), false);
                    } else {
                        moveOffsetXBy(currentDragDistanceX + remainingDragToNextImageStart(), false);
                    }
                } else {
                    moveOffsetXBy(currentDragDistanceX - currentDragDistanceX % imageWithSpacingWidth, false);
                }
            }
            
            function remainingDragToNextImageStart() {
                return imageWithSpacingWidth - Math.abs(currentDragDistanceX % imageWithSpacingWidth);
            }
            
            function distanceToNextImageStartLessThan(maxDistance) {
                if (remainingDragToNextImageStart() < maxDistance) {
                    return true;
                }
                return false;
            }
            
            function nextOffsetToLeft() {
                return offsetX - (imageWithSpacingWidth - (Math.abs(offsetX % imageWithSpacingWidth)));
            }
            
            function nextOffsetToRight() {
                return offsetX + (imageWithSpacingWidth - (Math.abs(offsetX % imageWithSpacingWidth)));
            }
            
            function draggingLeft() {
                return currentDragDistanceX < 0;
            }
                        
            function moveOffsetXBy(offset, allowOverDrag) {
                var dragMinX = minX, dragMaxX = maxX;
                if (allowOverDrag) {
                    dragMinX += overDragInPixels;
                    dragMaxX += overDragInPixels;
                }
                offsetX = Math.max(
                            -1 * dragMaxX,
                            Math.min(dragMinX, previousOffsetX + offset)
                        );
            }

            function getSelectedImage() {
                var selectedIndex = Math.abs(offsetX / imageWithSpacingWidth);
                return scope.images[selectedIndex];
            }
            
        };

        return {
            restrict: "E",
            scope: {
                images: '=',
                imageWidth: '=',
                spacing: '=',
                onSelected: '&'
            },
            link: linkFunction,
            template: '<div class="imageSelectorWrapper"> \
                            <div class="imageSelector"> \
                                <div ng-repeat="image in images" class="imageSelectorItem"> \
                                    <img src="{{image.path}}" width="{{imageWidth}}" style="margin-right: {{spacing}}px"/> \
                                </div> \
                            </div> \
                        </div>'
        };
    }]);

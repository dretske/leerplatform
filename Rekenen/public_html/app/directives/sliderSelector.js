var rekenenDirectives = angular.module('rekenenDirectives');

rekenenDirectives.config(function($provide){
    $provide.decorator('ngTranscludeDirective', ['$delegate', function($delegate) {
        // Remove the original directive
        $delegate.shift();
        return $delegate;
    }]);
});
rekenenDirectives.directive( 'ngTransclude', function() {
  return {
    restrict: 'EAC',
    link: function( $scope, $element, $attrs, controller, $transclude ) {
      if (!$transclude) {
        throw minErr('ngTransclude')('orphan',
         'Illegal use of ngTransclude directive in the template! ' +
         'No parent directive that requires a transclusion found. ' +
         'Element: {0}',
         startingTag($element));
      }
      
      var iScopeType = $attrs['ngTransclude'] || 'sibling';
  
      switch ( iScopeType ) {
        case 'sibling':
          $transclude( function( clone ) {
            $element.empty();
            $element.append( clone );
          });
          break;
        case 'parent':
          $transclude( $scope, function( clone ) {
            $element.empty();
            $element.append( clone );
          });
          break;
        case 'child':
          var iChildScope = $scope.$new();
          $transclude( iChildScope, function( clone ) {
            $element.empty();
            $element.append( clone );
            $element.on( '$destroy', function() {
              iChildScope.$destroy();
            });            
          });
          break;
      }
    }
  };
});

rekenenDirectives.directive("sliderSelector", ['$window', '$document', function ($window, $document) {

        var linkFunction = function (scope, element, attributes) {
            var overDragInPixels = 100;
            var minX = 0, previousOffsetX = 0, offsetX = 0, 
                    currentDragDistanceX = 0, dragStartX = 0;
            var spacing = scope.spacing ? scope.spacing : 0;
            var itemWithSpacingWidth = scope.imageWidth + spacing;
            var maxX = (scope.items.length -1) * itemWithSpacingWidth;
            var snapPercentage = 0.2;
            var selectedItemIndex = 0;
            
            if (scope.selectedItemIndex) {
                selectedItemIndex = scope.selectedItemIndex;
                previousOffsetX = offsetX = -1 * selectedItemIndex * itemWithSpacingWidth;
            }
            
            function totalWidth() {
                return element.find('.sliderSelectorWrapper').first().width();
            }
            
            var baseX = Math.floor((totalWidth() - scope.imageWidth)/2);
            
            var itemsDiv = element.find('.sliderSelector').first();
            itemsDiv.css({
                position: 'relative',
                left: baseX + 'px',
                transform: 'translateX(' + offsetX + 'px)'
            });
            
            itemsDiv.on('mousedown', function(event) {
               event.preventDefault();
               if (typeof scope.onDragStart() !== 'undefined') {
                  scope.onDragStart()();
               }
               dragStartX = event.pageX;
               itemsDiv.css({
                    transition: 'none'
               });
               $document.on('mousemove', mousemove);
               $document.on('mouseup', mouseup);
            });
            
            function mousemove(event) {
                currentDragDistanceX = event.pageX - dragStartX;
                
                moveOffsetXBy(currentDragDistanceX, true);
                
                itemsDiv.css({
                    transform: 'translateX(' + offsetX + 'px)'
                });
            }
            
            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
                setOffsetToImageStart();
                previousOffsetX = offsetX;
                scope.onSelected()(getSelectedImage());
                itemsDiv.css({
                    transition: '1s',
                    transform: 'translateX(' + offsetX + 'px)'
                });
                $document.off('mouseup', mouseup);
            }
            
            function setOffsetToImageStart() {
                if (distanceToNextImageStartLessThan((1-snapPercentage) * itemWithSpacingWidth)) {
                    if (draggingLeft()) {
                        moveOffsetXBy(currentDragDistanceX - remainingDragToNextImageStart(), false);
                    } else {
                        moveOffsetXBy(currentDragDistanceX + remainingDragToNextImageStart(), false);
                    }
                } else {
                    moveOffsetXBy(currentDragDistanceX - currentDragDistanceX % itemWithSpacingWidth, false);
                }
            }
            
            function remainingDragToNextImageStart() {
                return itemWithSpacingWidth - Math.abs(currentDragDistanceX % itemWithSpacingWidth);
            }
            
            function distanceToNextImageStartLessThan(maxDistance) {
                if (remainingDragToNextImageStart() < maxDistance) {
                    return true;
                }
                return false;
            }
            
            function nextOffsetToLeft() {
                return offsetX - (itemWithSpacingWidth - (Math.abs(offsetX % itemWithSpacingWidth)));
            }
            
            function nextOffsetToRight() {
                return offsetX + (itemWithSpacingWidth - (Math.abs(offsetX % itemWithSpacingWidth)));
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
                var selectedIndex = Math.abs(offsetX / itemWithSpacingWidth);
                return scope.items[selectedIndex];
            }
            
        };

        return {
            restrict: "E",
            transclude: true,
            scope: {
                items: '=',
                imageWidth: '=',
                spacing: '=',
                selectedItemIndex: '=',
                onDragStart: '&',
                onSelected: '&'
            },
            link: linkFunction,
            template: '<div class="sliderSelectorWrapper"> \
                            <div class="sliderSelector"> \
                                <div ng-repeat="item in items" class="sliderSelectorItem" ng-transclude="child"> \
                                </div> \
                            </div> \
                        </div>'
        };
    }]);

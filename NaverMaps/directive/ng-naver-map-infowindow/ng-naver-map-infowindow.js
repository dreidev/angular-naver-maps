(function() {
    angular.module('NaverMaps').directive('ngNaverMapInfowindow', [
        'NgNaverMap',
        function(NgNaverMap) {
            return {
                scope: {
                    index: '=',
                    model: '=?',
                    position: '@?',
                    onClick: '&?'
                },
                requires: '^?ngNaverMap',
                restrict: 'E',
                transclude: true,
                link: function(scope, element, attrs, ngNaverMap, transclude) {
                    NgNaverMap.getMap().then(function(oMap) {
                        // Getting Naver Instance
                        var Naver = NgNaverMap.Naver;
                        // Creating Info Window instance
                        var oInfoWnd = new Naver.InfoWindow();
                        // Configuring Info Window instance
                        oInfoWnd.setPoint(NgNaverMap.getLatLng(eval(scope.position)));
                        oInfoWnd.setPosition({top: 40});
                        // oInfoWnd.autoPosition();
                        oInfoWnd.setVisible(false);
                        // Adding Info Window instance to the map
                        oMap.addOverlay(oInfoWnd);
                        // Tracking Info Window instance visibility
                        scope.visible = false;
                        // Registered Event to toggle the Info Window instance's visibility
                        scope.$on('toggleInfoWindow', function(event, index) {
                            if (index === scope.index) {
                                scope.visible = !scope.visible;
                                oInfoWnd.setVisible(scope.visible);
                            }
                        });
                        // Registered Event to close the Info Window instance's
                        scope.$on('closeInfoWindow', function(event, index) {
                            if (index === scope.index) {
                                scope.visible = false;
                                oInfoWnd.setVisible(false);
                            }
                        });
                        // Registered Event to close all Info Window instances
                        // scope.$on('hideAllInfoWindows', function(event) {
                        //     oInfoWnd.setVisible(false);
                        // });
                        // Registered Event click calls the scope's on-click()
                        oInfoWnd.attach('click', function() {
                            scope.onClick({model: scope.model});
                        });
                        // Setting the inner content of the Info window instance using transcluded HTML
                        transclude(scope.$parent, function(clone, scope) {
                            var htmlWrapper = document.createElement('div');
                            for (var i = 0; i < clone.length; i++) {
                                if (clone[i].nodeType === 1) {
                                    htmlWrapper.appendChild(clone[i]);
                                }
                            }
                            htmlWrapper.style.overflow = 'auto';
                            htmlWrapper.className = "ng-map-infowindow";
                            oInfoWnd.setContent(htmlWrapper);
                        });
                    });
                }
            };
        }
    ]);
})();

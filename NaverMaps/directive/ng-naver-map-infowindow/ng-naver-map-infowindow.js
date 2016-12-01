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
                        var Naver = NgNaverMap.Naver;

                        var oInfoWnd = new Naver.InfoWindow({content: scope.snippet});

                        oInfoWnd.setPoint(NgNaverMap.getLatLng(eval(scope.position)));
                        oInfoWnd.setPosition({top: 40});

                        oMap.addOverlay(oInfoWnd);
                        oInfoWnd.setVisible(false);

                        // oInfoWnd.attach('mouseleave', function(oCustomEvent) {});
                        scope.visible = false;

                        scope.$on('toggleInfoWindow', function(event, index) {
                            if (index === scope.index) {
                                scope.visible = !scope.visible;
                                oInfoWnd.setVisible(scope.visible);
                            }
                        });

                        scope.$on('closeInfoWindow', function(event, index) {
                            if (index === scope.index) {
                                scope.visible = false;
                                oInfoWnd.setVisible(false);
                            }
                        });

                        // scope.$on('hideAllInfoWindows', function(event) {
                        //     oInfoWnd.setVisible(false);
                        // });

                        oInfoWnd.attach('click', function() {
                            scope.onClick({model: scope.model});
                        });

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

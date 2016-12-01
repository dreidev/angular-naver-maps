(function() {
    angular.module('NaverMaps').directive('ngNaverMapMarker', ['NgNaverMap', function(NgNaverMap) {
        return {
            scope: {
                title: '=?',
                data: '=?',
                model: '=?',
                position: '@?',
                onClick: '&?'
            },
            requires: '^?ngNaverMap',
            restrict: 'E',
            link: function(scope, element, attrs, ngNaverMap) {
                NgNaverMap.getMap().then(function(oMap) {
                    var Naver = NgNaverMap.Naver;

                    var oSize = new Naver.Size(28, 37);
                    var oOffset = new Naver.Size(14, 37);
                    var oIcon = new Naver.Icon('http://static.naver.com/maps2/icons/pin_spot2.png', oSize, oOffset);

                    var oLabel = new Naver.MarkerLabel();
                    oLabel.setPosition({
                        top: 100
                    });
                    oMap.addOverlay(oLabel);

                    var oMarker = new Naver.Marker(oIcon, { title: scope.title });
                    oMarker.setPoint(NgNaverMap.getLatLng(eval(scope.position)));
                    oMap.addOverlay(oMarker);

                    oMarker.attach('mouseenter', function(oCustomEvent) {
                        oLabel.setVisible(true, oMarker);
                    });

                    oMarker.attach('mouseleave', function(oCustomEvent) {
                        oLabel.setVisible(false);
                    });

                    oMarker.attach('click', function() {
                      scope.onClick({ model: scope.model });
                    });

                });
            }
        };
    }]);
})();

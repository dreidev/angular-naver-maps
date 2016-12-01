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

                    // var oInfoWnd = new Naver.InfoWindow();
                    // oInfoWnd.setVisible(false);
                    // oMap.addOverlay(oInfoWnd);

                    // oInfoWnd.setPosition({
                    //     top: 20,
                    //     left: 20
                    // });

                    var oLabel = new Naver.MarkerLabel();
                    oLabel.setPosition({
                        top: 100
                    });
                    oMap.addOverlay(oLabel);
                    // oInfoWnd.attach('changeVisible', function(oCustomEvent) {
                    //     if (oCustomEvent.visible) {
                    //         oLabel.setVisible(false);
                    //     }
                    // });

                    // oInfoWnd.setVisible(false);
                    // // 마커 클릭하면
                    // oInfoWnd.setContent('<div style="border-top:1px solid; border-bottom:2px groove black; border-left:1px solid; border-right:2px groove black;margin-bottom:1px;color:black;background-color:white; width:auto; height:auto;">' +
                    //         '<span style="color: #000000 !important;display: inline-block;font-size: 12px !important;font-weight: bold !important;letter-spacing: -1px !important;white-space: nowrap !important; padding: 2px 5px 2px 2px !important">' +
                    //         scope.data + '<span></div>');
                    // oInfoWnd.setPoint(ngNaverMap.getLngLat(scope.position));
                    // oInfoWnd.setPosition({ right: 15, top: 30 });

                    // oInfoWnd.autoPosition();

                    var oMarker = new Naver.Marker(oIcon, { title: scope.title });
                    oMarker.setPoint(NgNaverMap.getLatLng(eval(scope.position)));
                    oMap.addOverlay(oMarker);

                    oMarker.attach('mouseenter', function(oCustomEvent) {
                        oLabel.setVisible(true, oMarker);
                        // oInfoWnd.setVisible(true);
                    });

                    oMarker.attach('mouseleave', function(oCustomEvent) {
                        oLabel.setVisible(false);
                        // oInfoWnd.setVisible(false);
                    });

                    oMarker.attach('click', function() {
                      scope.onClick({ model: scope.model });
                    });

                });
            }
        };
    }]);
})();

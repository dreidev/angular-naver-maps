(function() {
    angular.module('NaverMaps').directive('ngNaverMapInfowindow', ['NgNaverMap', function(NgNaverMap) {
        return {
            scope: {
              snippet: '=',
              index : '=',
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

                  var oInfoWnd = new Naver.InfoWindow({
                    content: scope.snippet
                  });

                  oInfoWnd.setPoint(NgNaverMap.getLatLng(eval(scope.position)));
                  oInfoWnd.setPosition({
                      top: 40
                  });

                  oMap.addOverlay(oInfoWnd);
                  oInfoWnd.setVisible(false);

                  // oInfoWnd.attach('mouseleave', function(oCustomEvent) {});
                  scope.visible = false;

                  scope.$on('toggleInfoWindow', function (event, index) {
                    if(index === scope.index){
                      scope.visible = ! scope.visible;
                      oInfoWnd.setVisible(scope.visible);
                    }
                    console.log('on toggleInfoWindow');
                  });

                  scope.$on('hideAllInfoWindows', function (event) {
                      oInfoWnd.setVisible(false);
                  });

                 oInfoWnd.attach('click', function() { scope.onClick({ model: scope.model }); });

                 transclude(scope.$parent, function(clone, scope) {
                   oInfoWnd.setContent(clone.text());
                  });

              });
            }
        };
    }]);
})();

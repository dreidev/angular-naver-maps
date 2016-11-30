(function() {
    angular.module('NaverMaps').directive('ngNaverMapInfowindow', ['NgNaverMap', function(NgNaverMap) {
        return {
            scope: {
              title: '=?',
              data: '=?',
              model: '=?',
              position: '@?',
              onClick: '&?',
              index : "="
            },
            requires: '^?ngNaverMap',
            restrict: 'E',
            link: function(scope, element, attrs, ngNaverMap) {
              NgNaverMap.getMap().then(function(oMap) {
                  var Naver = NgNaverMap.Naver;
                  var contentString = [
                    '<div class="clearfix">',
                    '<div class="iw_inner" style="color:black;background-color:white;">',
                      '   <h3>서울특별시청</h3>',
                      '   <p style="margin:0"> Lorem ipsum silor sit amet Lorem ipsum silor sit amet',
                      // '       <img src="'+ HOME_PATH +'/img/example/hi-seoul.jpg" width="55" height="55" alt="서울시청" class="thumb" /><br />',
                      '       Lorem ipsum silor sit amet Lorem ipsum silor sit amet<br />',
                      '       <a href="http://www.seoul.go.kr" target="_blank">www.seoul.go.kr/</a>',
                      '   </p>',
                      '</div>',
                      '<div class="clearfix">',
                      '<div style="margin: 0px; padding: 0px; width: 0px; height: 0px; position: absolute; border-width: 24px 10px 0px; border-style: solid; border-color: rgb(51, 51, 51) transparent transparent; border-image: initial; pointer-events: none; box-sizing: content-box !important; transform-origin: right bottom 0px; transform: skewX(0deg); bottom: -22px;"></div>',
                      '<div style="margin: 0px; padding: 0px; width: 0px; height: 0px; position: absolute; border-width: 24px 10px 0px; border-style: solid; border-color: rgb(255, 255, 255) transparent transparent; border-image: initial; pointer-events: none; box-sizing: content-box !important; transform-origin: right bottom 0px; transform: skewX(0deg); bottom: -22px;"></div>',
                      '</div>',
                      '</div>'
                    ].join('');

                  var oInfoWnd = new Naver.InfoWindow({
                    content: contentString
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

              });
            }
        };
    }]);
})();

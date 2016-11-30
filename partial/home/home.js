angular.module('ngNaverMaps').controller('HomeCtrl', ['$scope', '$sce','NgNaverMap', function($scope, $sce, NgNaverMap) {

    $scope.items = [
        { name: 'Happy Time', 'venue': { name: 'place 1', lat: 37.5676451, lng: 126.9773356 } },
        { name: 'Happy Place', 'venue': { name: 'place 2', lat: 37.5676451, lng: 126.9783356 } },
    ];

    $scope.snippet = '<ng-naver-map  zoom="11" center="[37.5675451, 126.9773356]" zoom-control="true" zoom-control-options=\'{style:"small", position:{right: 10,left: 10}}\' size="[\'width\', 400]" enable-wheel-zoom="false" on-center-changed="centerChanged(coord)">\n' +
        '    <ng-naver-map-marker ng-repeat="item in items" model="item" position="{{getPos(item.venue)}}" on-click="log(model)" title="item.venue.name"></ng-naver-map-marker>\n' +
        '    <ng-naver-map-infowindow ng-repeat="item in items" index="$index" model="item" position="{{getPos(item.venue)}}" on-click="log(model)"></ng-naver-map-infowindow>\n' +
        '</ng-naver-map>\n';

    $scope.deliberatelyTrustDangerousSnippet = function() {
        return $sce.trustAsHtml($scope.snippet);
    };

    $scope.centerChanged = function(coord) {};

    $scope.getPos = function(venue) {
        return [venue.lat, venue.lng];
    };

    $scope.infoWindoSnippet = [
      '<div class="map-info-window">',
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

    $scope.toggleInfoWindow = function(index) {
        $scope.$broadcast('toggleInfoWindow', index);
    };

}]);

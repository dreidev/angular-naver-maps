angular.module('ngNaverMaps').controller('HomeCtrl', ['$scope', '$sce','NgNaverMap', function($scope, $sce, NgNaverMap) {

    $scope.items = [
        { name: 'Happy Time', 'venue': { name: 'place 1', lat: 37.5676451, lng: 126.9773356 } },
        { name: 'Happy Time', 'venue': { name: 'place 1', lat: 37.5676451, lng: 126.9783356 } },
    ];

    $scope.snippet = '<ng-naver-map  zoom="11" center="\'current-location\'" zoom-control="true" zoom-control-options=\'{style:"small", position:{right: 10,left: 10}}\' size="[\'width\', 400]" enable-wheel-zoom="false" on-center-changed="centerChanged(coord)">\n' +
        '    <ng-naver-map-marker ng-repeat="item in items" model="item" position="{{getPos(item.venue)}}" on-click="log(model)" title="item.venue.name"></ng-naver-map-marker>\n' +
        '</ng-naver-map>\n';

    $scope.deliberatelyTrustDangerousSnippet = function() {
        return $sce.trustAsHtml($scope.snippet);
    };

    $scope.log = function(item) {
        console.log(item);
    };

    $scope.centerChanged = function(coord) {};

    $scope.getPos = function(venue) {
        return [venue.lat, venue.lng];
    };

}]);

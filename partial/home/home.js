angular.module('ngNaverMaps').controller('HomeCtrl', ['$scope', 'NgNaverMap', function($scope, NgNaverMap) {

    $scope.items = [
        {name: 'Happy Time', 'venue':{name:'place 1', lat:37.5676451, lng:126.9773356}},
        {name: 'Happy Time', 'venue':{name:'place 1', lat:37.5676451, lng:126.9783356}},
    ];

    $scope.log = function (item) {
        console.log(item);
    };

    $scope.centerChanged = function(coord) {
    };

    $scope.getPos = function(venue) {
        return [venue.lat, venue.lng];
    };

}]);

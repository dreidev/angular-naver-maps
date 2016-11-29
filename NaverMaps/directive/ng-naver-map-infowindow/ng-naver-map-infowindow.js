(function() {
    angular.module('NaverMaps').directive('ngNaverMapInfowindow', ['NgNaverMap', function(NgNaverMap) {
        return {
            scope: {},
            requires: '^?ngNaverMap',
            restrict: 'E',
            link: function(scope, element, attrs, ngNaverMap) {
            }
        };
    }]);
})();

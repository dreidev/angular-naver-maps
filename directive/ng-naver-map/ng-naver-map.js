(function() {
    var Naver = window.nhn.api.map;

    angular.module('NaverMaps').directive('ngNaverMap', function() {
        return {
            restrict: 'E',
            replace: true,
            // transclude: true,
            scope: {
                'center': '=?',
                'zoom': '=?',
                'enableWheelZoom': '=?',
                'enableDragPan': '=?',
                'enableDblClickZoom': '=?',
                'activateTrafficMap': '=?',
                'activateBicycleMap': '=?',
                'minMaxLevel': '=?',
                'mapMode': '=?',
                'size': '=?', // [width, height]
                'zoomControl': '=?',
                'zoomControlOptions': '=?',
                'onCenterChanged': '&?'
            },
            controller: ['$scope', '$element', '$attrs', '$window', 'NgNaverMap', 'geolocator', function(scope, element, attrs, window, NgNaverMap, geolocator) {
                var Naver = NgNaverMap.Naver;
                var vm = this;
                NgNaverMap.addMap(vm);
                var defaultLocation = [37.5675451, 126.9773356]; // Soul
                scope['center'] = scope['center'] || defaultLocation;
                if (scope['center'] === 'current-location') {
                    vm.waitGeo = geolocator.locate().then(function(position) {
                        scope['center'] = [position.coords.latitude, position.coords.longitude];
                        return NgNaverMap.initMap(scope, element, vm);
                    }).catch(function() {
                        scope['center'] = defaultLocation;
                        return NgNaverMap.initMap(scope, element, vm);
                    });
                } else {
                    NgNaverMap.initMap(scope, element, vm);
                }
            }]
        };
    });


})();

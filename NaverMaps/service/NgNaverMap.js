angular.module('NaverMaps').factory('NgNaverMap', ['$q', function($q) {
    var Naver;
    try {
        Naver = window.nhn.api.map;
    } catch (e){
        console.error("Naver Map API could not load, this may be due to bad Internet connection or API key being restricted to another domain");
        console.error(e);
        Naver = {};
    }
    var mapControllers = {};
    var NgNaverMap = {
        Naver: Naver,
        initMap: function(scope, element, vm) {
            var oSeoulCityPoint = NgNaverMap.getLatLng(scope['center']);
            var defaultLevel = scope['zoom'];

            var oMap = new Naver.Map(element[0], {
                point: oSeoulCityPoint,
                zoom: defaultLevel,
                enableWheelZoom: scope['enableWheelZoom'],
                enableDragPan: scope['enableDragPan'],
                enableDblClickZoom: scope['enableDblClickZoom'],
                mapMode: scope['mapMode'] || 0,
                activateTrafficMap: scope['activateTrafficMap'],
                activateBicycleMap: scope['activateBicycleMap'],
                minMaxLevel: scope['minMaxLevel'] || [1, 14],
                size: NgNaverMap.getSize(scope['size'], element)
            });
            $(window).on('resize', function(size) {
                oMap.setSize(NgNaverMap.getSize(scope['size'], element));
            });

            oMap.attach('move', function(coord) {
                scope.onCenterChanged(coord);
            });

            if (scope['zoomControl']) {
                var oSlider = new Naver.ZoomControl(scope['zoomControlOptions']);
                oMap.addControl(oSlider);
            }
            vm.map = oMap;
            return oMap;
        },
        addMap: function(mapCtrl) {
            var len = Object.keys(mapControllers).length;
            var id = (mapCtrl.map) ? mapCtrl.map._getNum() : len;
            mapControllers[id] = mapCtrl;
            mapCtrl.getMap = function() {
                return NgNaverMap.getMap(id);
            };
        },
        getMap: function(id) {
            id = typeof id === 'object' ? id._getNum() : id;
            id = id || 0;
            var deferred = $q.defer();
            var vm = mapControllers[id];
            if (!vm.map && vm.waitGeo) {
                vm.waitGeo.then(function() {
                    deferred.resolve(vm.map);
                }).catch(deferred.reject);
            } else {
                deferred.resolve(vm.map);
            }
            return deferred.promise;
        },
        getLatLng: function(input) {
            var output = input;
            if (input[0].constructor === Array) { // [[1,2],[3,4]]
                output = input.map(function(el) {
                    return new Naver.LatLng(el[0], el[1]);
                });
            } else if (!isNaN(parseFloat(input[0])) && isFinite(input[0])) {
                output = new Naver.LatLng(output[0], output[1]);
            }
            return output;
        },
        getSize: function getSize(size, element) {
            var w = (size[0]==='width')?element.parent().width():size[0];
            var h = (size[1]==='height')?element.parent().height():size[1];
            return new Naver.Size(w, h);
        }
    };

    return NgNaverMap;
}]);

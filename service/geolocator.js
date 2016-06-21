angular.module('NaverMaps').service('geolocator', ['$q', 'NavigatorGeolocation',function Geolocator($q, NavigatorGeolocation) {
    var FREE_GEO_IP = 0;
    var GEO_PLUGIN = 1;
    var WIKIMEDIA = 2;
    return {
        fallbackToIp: true,
        defaultOptions: { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 },
        location: null,
        locate: function locate(opt) {
            var that = this;
            var options = window.angular.extend(that.defaultOptions, opt);
            var fallbackToIp = that.fallbackToIp;
            if (window.geolocator) {
            return $q(function(resolve, reject) {
                window.geolocator.locate(resolve, reject, fallbackToIp, options);
            }).then(function (location) {
                that.location = location;
                return location;
            });
        } else {
            return NavigatorGeolocation.getCurrentPosition();
        }
        }
    };
}]);
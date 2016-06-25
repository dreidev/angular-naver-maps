# angular-naver-maps

A simple angular directive for integrating Naver Maps

Use `<ng-naver-map>` for embedding a Naver map into your html

You can see a [live demo here](https://dreidev.github.io/angular-naver-maps)

The full Naver Map API is still unsupported, currently only the following features are supported (which should cover most use cases).

##How to use

Create a Naver map API key https://developers.naver.com/register

include 

```html
<script src="https://openapi.map.naver.com/openapi/v2/maps.js?clientId=YOURKEY"></script>
```

get module 

```
bower install angular-naver-maps
```

then add it before you app.js

```
<script src="bower_components/angular-naver-maps/angular-naver-maps.js"></script>
```

Add the module to your angular app

```js
angular.module('App', ['NaverMaps']);
```

Use available directives (this is taken from the demo)

```html
<ng-naver-map
  zoom="11"
  center="'current-location'"
  zoom-control="true"
  zoom-control-options='{position:{right: 10,left: 10}}'
  size="['width', 400]"
  enable-wheel-zoom="false"
  on-center-changed="centerChanged(coord)">
  
    <ng-naver-map-marker
        ng-repeat="item in items"
        model="item"
        position='[37.5675451, 126.9773356]'
        on-click="log(model)"
        title="item.name">
    </ng-naver-map-marker>
    
</ng-naver-map>
```

##Documentation

For the `<ng-naver-map>` directive

- **zoom** Number refers to the zoom level the map should start with
- **min-max-level** Array define zoom range (default:`[1,14]`)
- **center** can take 2 type of values to center the map
  + String `'current-location'` use the geolocation api to get current location
  + Array `[37.5675451, 126.9773356]` latitudinal and longitudinal values
  + If omitted the map defaults to Soul
- **zoom-control-true** Boolean to show the zoom controls (default:false)
- **zoom-control-options** Object zoom controls options such as position
- **size** indicating the size of the map in the form of an array
  + `['width', 400]` set map with `100%` of its container width and `400px` height
  + `['width', 'height']` create a responsive map that scales to the width and height of its container
  + `[800, 400]` create a static map with width `800px` and height `400px`
- **enable-wheel-zoom** Boolean (default:true)
- **enable-drag-pan** Boolean (default:true)
- **enable-dbl-click-zoom** Boolean (default:false)
- **map-mode** Number takes one of three values 0, 1, 2 (default:0)
- **activate-traffic-map** Boolean (default:false)
- **activate-bicycle-map** Boolean (default:false)
- **on-center-changed** is fired whenever center is changed
  + an object coord is passed to the function with the new center position


It is possible to place a marker on the map using `<ng-naver-map-marker>` directive

- **title** String to display on hover
- **position** Array with latitudinal and longitudinal values
- **model** Object to pass on click
- **on-click** function to call on click, passes model as an argument

---

# For additional feature requests submit an issue




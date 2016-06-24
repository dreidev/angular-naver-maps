# angular-naver-maps

A simple angular directive for inegrating Naver Maps

Use `<ng-naver-map>` for embeding a Naver map into your page


The full Naver Map API is still unsuported, currently only the following features are supported (which shoudl cover most usecases).

```
<ng-naver-map
  zoom="11"
  center="'current-location'"
  zoom-control="true"
  zoom-control-options='{style:"small", position:{right: 10,left: 10}}'
  size="['width', 400]"
  enable-wheel-zoom="false"
  on-center-changed="centerChanged(coord)">
  
    <ng-naver-map-marker
        ng-repeat="item in items"
        model="item" position='{{getPos(item.venue)}}'
        on-click="log(model)"
        title="item.venue.name">
    </ng-naver-map-marker>
    
</ng-naver-map>
```


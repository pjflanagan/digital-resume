---
slug: react-google-maps
date: "2022-10-07"
title: Google Maps API and React
image: /blog/2022/google-maps.png
blurb: A quick tutorial for using React with Google Maps API
github: 
website: 
---

The Google Maps API is incredibly useful and React is incredibly versatile. Combining the two is a bit confusing. This is a quick tutorial for a way to extend the Google Maps API with a custom Popup (called `OverlayView` on the [Google Maps API](https://developers.google.com/maps/documentation/javascript/customoverlays)) that we will build in React.

## Extend Overlay View

```ts

type PopupConfig = {
  map: google.maps.Map;
  content: React.Component;
  position: google.maps.LatLng;
}

class Popup extends google.maps.OverlayView {
    private readonly container: HTMLDivElement;
    private content: ComponentChild;
    private position: google.maps.LatLng;

    constructor({ map, content, position }: PopupConfig) {
        super();
        // The container is a div that we can feed to Google Maps and attach our React content to
        this.container = document.createElement('div');
        this.container.style.position = 'absolute';
        this.setMap(map);
        this.content = content;
    }

    public onAdd(): void {
        this.getPanes().floatPane.appendChild(this.container);
    }

    public draw(): void {
        // The draw function is called every time the Popup needs to render 
        // so here we will use React to render our content (React.Component) 
        React.render(this.content, this.container);
    }

    public onRemove(): void {
        if (this.container.parentElement) {
            this.container.parentElement.removeChild(this.container);
        }
    }
}
```
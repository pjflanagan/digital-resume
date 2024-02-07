---
slug: react-google-maps
date: "2022-10-07"
title: Google Maps API and React
image: /blog/2022/google-maps.png
blurb: A quick tutorial for using React with Google Maps API
github: https://gist.github.com/pjflanagan/ca1339f4be5432b97f4ddee5f4371642
website: 
---

The Google Maps API is incredibly useful and React is incredibly versatile. Combining the two is a bit confusing. This is a quick tutorial for a way to extend the Google Maps API with a custom Popup (called `OverlayView` on the [Google Maps API](https://developers.google.com/maps/documentation/javascript/customoverlays)) that we will build in React.

## Extend Overlay View

In the constructor, create a `container` that will be:
- passed to Google Maps in the `onAdd` function
- and will render our React `content` in the `draw` function

```ts
class Popup extends google.maps.OverlayView {
    constructor({ content }) {
        super();
        // The container is a div that we can feed to Google Maps and attach our React content to
        this.container = document.createElement('div');
        this.container.style.position = 'absolute';
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
}
```

This is all it takes, now when we go to render a Popup on our map, we can pass React JSX as our content. A more complete version of the code can be found on [Github](https://gist.github.com/pjflanagan/ca1339f4be5432b97f4ddee5f4371642).


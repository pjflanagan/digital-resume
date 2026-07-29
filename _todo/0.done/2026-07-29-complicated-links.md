

# Personal Slide Links

The links are complicated. There are a lot of side effects. Here's what I think we should do to simplify.

A link should look like this:
```ts
type Link = {
  key: string;
  text: string;
  href?: string; // url
  hover: HoverEffect[];
  click: ClickEffect[];
}

type PhotoHoverEffect = {
  type: 'photo',
  image: string,
  location?: PhotoLocation;
  description?: string;
  focusArea?: FocusArea;
}

type GreetingHoverEffect = {
  type: 'greeting';
  text: string; 
}

type HoverEffect = PhotoHoverEffect | GreetingHoverEffect;

type ModalClickEffect = {
  type: 'modal',
  modalKey: string; // egg
}

type MicroGraphicClickEffect = {
  type: 'micrographic',
  micrographicKey: string; // sci-fi
}

type ClickEffect = ModalClickEffect | MicroGraphicClickEffect;

```

I will allow us to remove hardcoded things like "linkClick" in PersonalBody. 

This should be settable in Decap.

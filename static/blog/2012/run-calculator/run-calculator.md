---
slug: run-calculator
date: "2012-03-05"
title: Run Calculator
image: https://runcalculator.flanny.app/img/social/share-card.png
blurb: "A running pace calculator"
github: https://github.com/pjflanagan/runcalculator
website: https://runcalculator.flanny.app
---

This was the first personal project I ever hosted on the internet. I never liked run tracking software, I didn't like wearing GPS watches, and to this day I don't enjoy running with a phone. I still found calculating pace useful, but was disappointed with the appearance of most online pace calculators. So I built my own.

## v1: Index.html

In the first version, I wrote all the code in Dreamweaver in one single `Index.html` file. I had a completely novice understanding of tables and javascript, it was a miracle it worked at all. With great effort, I managed to make a good looking pace calculator that I was proud enough about to find hosting for.

![Version 1](/blog/2012/run-calculator/v1.jpg)

## v2: Bootstrap

After learning more web development skills, I broke the code out into `css` and `js` files with different functions. I also used Bootstrap, which was all the rage at the time, although I didn't use it well, and jQuery, which I did use pretty well. The code was cleaner and readable, but the app was more or less the same.

![Version 2](/blog/2012/run-calculator/v2.jpg)

## v3: Svelte PWA

In the most up to date version, I got the app to be where I always wanted it to be: as an installable app (thanks PWA's). The changes in this version include:

- Installable as a PWA
- Animations where I always felt they should have gone
- Sizing for various screens
- Making the website keyboard friendly, so users don't have to use the mouse 
- The ability to share what you've entered into the calculator just by copying the URL

![Version 3](/blog/2012/run-calculator/v3.png)

### Thoughts on Svelte

I experimented with a very lightweight framework called Svelte and realized that I don't prefer it, but found it interesting. 

#### Pros

Svelte feels like a return back to early web development, before Webpack and React. I like how Svelte allows you to bind variables, a feature I miss from when I used Angular. I also like the syntax for component props.

```svelte
<Component {prop1} bind:value={prop2} />
```

#### Cons

But the rest of `.svelte` file syntax I can't say the same for:

- I don't miss adding `<style>` and `<script>` tags, and greatly prefer importing modules
- I don't like being required to name my files as the their component name
- I kinda like `{#if}{:else}` and `{#each}` blocks, but not as much as conditional rendering and `.map()`
- I couldn't stand state updates with `$: variableName`, many times it didn't seem to fire and I couldn't tell why

I understand what they were going for by having these files feel like simple little html pages, but the result feels very loose, like the variables are just floating around. It's very different from the sense of security that using Immutable variables in React affords.

Because Svelte is new, there are not a whole lot of packages available for it, so when developing you are kinda on your own. But it's also exciting that Svelte is new. It'll be exciting to see what happens to Svelte in later versions. I did enjoy using it for this project, and might use it again for other simple projects in the future.
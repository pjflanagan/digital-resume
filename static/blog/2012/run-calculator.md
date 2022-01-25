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

![Version 1](/blog/2012/runcalculator.jpg)

## v2: Bootstrap

After learning more web development skills, I broke the code out into `css` and `js` files with different functions. I also used Bootstrap, which was all the rage at the time, although I didn't use it well, and jQuery, which I did use pretty well. The code was cleaner and readable, but the app was more or less the same.

## v3: Svelte PWA

In the most up to date version, I got the app to be where I always wanted it to be: as an installable app (thanks PWA's). I experimented with a very lightweight framework called Svelte and realized that I don't like it that much, but found it interesting. I added animations where I always felt they should have gone, and made it fit various screen sizes even better. I also added the ability to share what you've entered into the calculator just by copying the URL.

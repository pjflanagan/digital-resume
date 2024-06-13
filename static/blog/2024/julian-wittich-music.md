---
slug: julian-wittich-music
date: "2024-06-07"
title: Julian Wittich Musician Website
image: /blog/2024/julian-wittich-music.jpg
blurb: A based site
github: https://github.com/pjflanagan/julianwittichmusic
website: https://julianwittich.com
---

My brother-in-law needed a musician website to be more findable. Rather than him paying for Squarespace I built him a website myself. 

Since the website is relatively simple, I wanted there to be a fun interactive feature. I decided the divider between the main photo and the sidebar would be a set of 4 pluckable bass strings.

Try moving your mouse across the strings to see them vibrate. The algorithm is simple but effective. We create a `pullPoint` at where the mouse is and calculate a `to` point on the opposite end of the guitar string and slightly towards the center. When we release the `pullPoint` moves towards the `to` point until it reaches it, then a new `to` point is created on the opposite end and slightly down. The process repeats until we are at equilibrium. 

<iframe src="https://giphy.com/embed/MDjTQ9jRJbocyl3pew" width="480" height="438" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/programming-canvas-html5-MDjTQ9jRJbocyl3pew">via GIPHY</a></p>

This was my first time using a clear background canvas on top of a website. I love how this is a small interactive feature and is not too distracting. I especially love how when you pull the furthest right string the sidebar comes with it (notice how you can pull it to reveal or cover the background, like curtains).
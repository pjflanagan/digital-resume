---
slug: nyt-crossword-plus
date: "2022-01-06"
title: NYT Crossword Plus
image: https://nytcrosswordplus.flanny.app/img/social.png
blurb: A Socket.io game
github: https://github.com/pjflanagan/nyt-crossword-plus
website: https://nytcrosswordplus.flanny.app/
---

The Daily Mini has been a race my friends and I have been doing for years. 
Being the competitive group that we are, not to mention runners who love data, we always wanted a more advanced leaderboard.

In comes NYT Crossword Plus.

## Method

In order to scrape the scores, I simply created a Chrome extension that updates a Fauna database whenever I load the leaderboard page. In the past, I had tried to write a crawler for it, but couldn't get past the log in screen. This way is not the worst, as I have a computer nearby most days. I also can distribute the Chrome extension so other people can upload scores too.

## NextJS

[Example Group](https://nytcrosswordplus.flanny.app/group/test)
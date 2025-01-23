---
slug: nyt-crossword-plus
date: "2022-01-06"
title: NYT Crossword Plus
image: https://nytcrosswordplus.flanny.app/img/social.png
blurb: A stat sheet
github: https://github.com/pjflanagan/nyt-crossword-plus
website: https://nytcrosswordplus.flanny.app/group/test
---

The Daily Mini has been a race my friends and I have been playing against each other in for years. Being runners, we love both competition and data, so we have always wanted a more advanced leaderboard than the one on the NYT. So I created NYT Crossword Plus.

## Method

This project is made up of several parts:
- A website for viewing data
- An API for updating and reading data
- A webscraper that runs daily
- A Discord messaging bot

### Scraper

When I first started, I created a simple Chrome extension that updates a database whenever I load the leaderboard page. This depended on me to update the times manually, so it was not an ideal solution for a webscraper. Luckily a friend of mine managed to get the webscraper to work automatically, so our times can always be recorded. It now runs on Google Cloud once daily before the crossword closes.

### Webhost

I decided I wanted to experiment with NextJS for this project. NextJS has a few features I was excited to use:

- Generated pages from folder structure, which I found helpful for making `/group/<name>` routes
- Serverless functions built in, which was important for making a robust API
- Server Side Props, I ended up not using these because it increased the page load time, however I hope to use this feature at another point in the future

The home page contains some info and links, the more interesting page is the group view. You can see a [test group online here](https://nytcrosswordplus.flanny.app/group/test).

### Discord Bot

To make the Discord bot, I decided to use Autocode, because it is free and easy to setup. All I had to make was an endpoint for it to read daily stats from, and the rest was just formatting.
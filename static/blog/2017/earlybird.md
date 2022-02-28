---
slug: earlybird
date: "2017-05-23"
title: Earlybird
image: https://github.com/pjflanagan/earlybird/blob/main/public/img/social/social.png?raw=true
blurb: A tweet scheduler
github: ""
website: https://earlybird.flanny.app
---

Earlybird was my next attempt at using the Twitter API. I was still trying to be funny online and was posting about once a day. Anything that wouldn't work as an article for the paper, would be reformatted for a tweet.

I was disapointed with the existing tweet schedulers. Most had a limit, many didn't support drafting a tweets, and some were just not good looking. So I decided to build my own.

I was familiar with Flask and Angular, so I decided to use those to make Earlybird.

## Some Technical Details

- I had a great amount of difficulty setting up the authentication code. If I ever need to do this again, I will use Auth0.
- I used a Heroku web dyno for the website and backend.
- I also used a Heroku dyno for a function to check for tweets to send every minute.
- I considered a UI framework, but decided against it.

## Project Conclusions

I didn't get a lot of other people to sign up, and I found that I was paying $14 a month to maintain a site. I could instead just pay $10 a month for an existing service.

I think there could be a way to do this for cheaper. I now would set this website up on Netlify and use serverless functions for all of the backend. The run function might still cost some money.
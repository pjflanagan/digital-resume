---
slug: haiku-bot
date: "2015-08-05"
title: Haiku Bot
image: https://raw.githubusercontent.com/pjflanagan/HaikuBot/master/Poems.png
blurb: ""
github: https://github.com/pjflanagan/HaikuBot
website: ""
---

Junior year I began experimenting with the Twitter API. I created a program to follow people and unfollow them once they follow back. I created a Twitter account that's sole purpose was to automatically reply to my friend's tweets. But what I really wanted to do was create something that could be "useful" or at least fun.

Haiku's are about 140 character's in length, and are pretty simple to write. The idea was that a user would Tweet at the program and add a hashtag for the thing they want a poem written about. The tweet would be read by my computer, a definition of the word looked up online, and then the definition played with until the correct syllable pattern was found.

When given a word, the program would go on to Dictionary.com and find a definition for the word. It would then count syllables on each word of the definition and arrange them into a 5-7-5 pattern. If any of the lines were too long or short, it would look up a synonym and see if the word can be replaced to fit the pattern.

The program barely worked. It would often output nonsense, which was okay, but sometimes it would output HTML code, and sometimes it wouldn't stop the poem and make a 5-7-200 syllable pattern. The program was not ready for tweets. It was was simply too dysfunctional to guarantee a response. But it did write some poems that I was particularly impressed with.

Dictionary.com has since changed its website's format, so the code does not run. However I do hope to update it in the future because I think this project is worth pursuing. Feel free to check out the code on GitHub.

![Poems](https://raw.githubusercontent.com/pjflanagan/HaikuBot/master/Poems.png)
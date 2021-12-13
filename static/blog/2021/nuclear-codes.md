---
slug: nuclear-codes
date: "2021-02-15"
title: Nuclear Codes
image: https://raw.githubusercontent.com/pjflanagan/nuclear-codes/master/media/social.png
blurb: A Socket.io game
github: https://github.com/pjflanagan/nuclearcodes
website: https://nuclearcodes.flanny.app/
---

My friends and I play a lot of games when we get together. A favorite of ours is Spies, a simple game about trying to figure out who the spies are. Innocent villagers try and get the group to play black cards and the spies try and trick the group into playing red cards. 

During the lockdown my family and friends played moved our games to be over Zoom. We invented a few (call out an object and everyone has to run and find that object in their house was always exciting). And we played a few, for instance, an online version of Codewords which we really enjoyed. Codewords was a socket game, and unlike the dynamic birds-eye-view canvas games like Slither.io and Paper.io, codewords was more like an HTML based chat app.

So I felt like I could make one too. I had previous experience with creating [socket games](/blog/simple-socket-game) so I was sure I could apply it in a React app. I came up with Nuclear Codes, a game where federal agents try to recover a code while spies try and stop them.

## Game Rules

### 1. Starting a Match

At the beginning of a match, a subset of players are randomly assigned to be spies. They are made aware of who the other spies are.

### 2. Entering Rooms

Each round, players enter numbered rooms to reveal letters. Players should send at least one person into each room.

- When a spy enters a room, they see both letters
- When an agent enters a room, they see only true letter

### 3. Entering codes

After the letters are revealed, players then share to the other players which letter they saw. Spies can now choose to lie about which letter they saw, and accuse any roommate they might have of lying about the letter they shared. The group of players then decides which letters they believe and enters the code made by putting each room's letter in order.

### 4. Reveal

After all players have entered codes, the most voted on code will be tried in the system. 

- If it is correct, the agents win. 
- If it is incorrect
  - The amount of incorrect letters in the code is shared with the group. 
  - The code then changes for the next round and the agents are given another chance to figure out who the spies are. 
  
If the agents fail to enter a correct code after 5 rounds the spies win. 

## Development

I decided to hosted this project on Netlify for free frontend hosting and the backend on a Heroku dyno that starts up when the app opens.
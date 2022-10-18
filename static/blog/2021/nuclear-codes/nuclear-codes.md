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

<!-- I sat on this idea for a long time and didn't act on it, but when TODO: QUARANTINE -->

## Gameplay

### 1. Starting a Match

At the beginning of a match, a subset of players are randomly assigned to be spies. They are made aware of who the other spies are.

![Mission Brief](/blog/2021/nuclear-codes/mission-brief.png)

### 2. Entering Rooms

Each round, players enter numbered rooms to reveal letters. Players should send at least one person into each room.

- When a spy enters a room, they see both letters
- When an agent enters a room, they see only true letter

![Room Selection](/blog/2021/nuclear-codes/room-selection.png)

### 3. Entering codes

After the letters are revealed, players then share to the other players which letter they saw. Spies can now choose to lie about which letter they saw, and accuse any roommate they might have of lying about the letter they shared. The group of players then decides which letters they believe and enters the code made by putting each room's letter in order.

![Code Entry](/blog/2021/nuclear-codes/code-entry.png)

### 4. Reveal

After all players have entered codes, the most voted on code will be tried in the system. 

- If it is correct, the agents win
- If it is incorrect
  - The amount of incorrect letters in the code is shared with the group 
  - The code then changes for the next round and the agents are given another chance to figure out who the spies are
  
If the agents fail to enter a correct code after 5 rounds the spies win.

## Development

### Design

I toyed around with the ideas of a one page UI with actual rooms and an HUD, but I decided this game would work best as a story that you play. I came up with an auto-scrolling text-based noir-themed UI with widgets that pop up asking for input and prompts for guidance.

### Deploy

I decided to hosted this project on Netlify for free frontend hosting and the backend on a Heroku dyno that starts up when the app opens. There are issues with this approach, for instance free dynos can only run for an hour at most, so if players are online for longer than that the game will close out on them. I decided to overlook this and would move to an AWS server or pay the $7 a month if the game became popular enough.

### Testing

This was a very interesting project to test. Because it requires at least five players for a game, I have to create an interface to control several players at once.

![Test Interface](/blog/2021/nuclear-codes/test-interface.png)

From the test page, I can create rooms, add players, choose the players actions like room selection and code entry, or even disconnect them mid game. This way, after creating a test game with test players, I can join the room myself and play using the UI. I also created modes where the players would automatically respond to the socket, so I wouldn't need to go back to the test interface at all once the game was started.

![Test Game Start Screen](/blog/2021/nuclear-codes/test-game.png)
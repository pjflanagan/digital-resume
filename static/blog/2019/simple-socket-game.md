---
slug: simple-socket-game
date: "2019-08-05"
title: Simple Socket Games
image: https://raw.githubusercontent.com/pjflanagan/simple-socket-game/master/assets/logo.jpg
blurb: ""
github: https://github.com/pjflanagan/simple-socket-game
website: http://simple-socket-game.herokuapp.com
---

## Introduction

Sockets are connections kept open between a server and client so they can communicate more quickly. Traditional AJAX requests look like this: "client makes a call and server responds." Sockets are different, because they allow the client and the server to call each other at any time, so unlike AJAX, the server can send messages to the client without the client making a request first. This open connection allows us to create live events, which are great for things like chat rooms, notifications, collaborative web pages, and games.

## An Event

So how do we set up a socket event? Let's say we have a game where users fly around in ships and fire lasers at each other. Our server needs to listen for when our users say that they fired a laser and our clients need to listen for when our server says another client fired a laser. So we add a listener for "fire" on the server and on the client. Then when the fire actually happens, our user calls "emit" to tell the server we fired. The server might do something with that data, and then call "broadcast" to tell all the other clients about it so they can handle it. Now all the users with a socket connection know that a user has fired a laser.

### Who Kicks Off An Event?

So there's many clients, which client should actually "emit" an event. An easy use case is when a user fires a laser: a user clicks fire, and tells the server about it. That's easy enough, but what about when a user gets hit by a laser. Who should report to the server that a user was hit?

- Origin: The user who fired the original shot could do it. But what if a user fires a laser and then dies before it reaches a target. That user would not be around to keep track of the lasers, and they would just float through people.
- Target: The target could report it. But what if this user switches to a different window (the game would keep playing but the socket doesn't emit in this case) it would make them immune and they wouldn't get hit. They'd be like a ghost on screen.
- Host(s): A good way to solve this is to have an independent user determine when other users got hit, and perhaps let a couple of users do the reporting in case one gets hit themselves or closes the window. User's don't have to know when they are the host, but their computer would just be taking on a tiny bit more work than others.
- Server: It's generally not good practice to be playing the game on the server too. The server has enough work to do forwarding data and handling connections. So having it play the game too is asking a lot. In this case our graphics package, Phaser, cannot be run without a window to attach to, so we'd have to set up a virtual window and it would all be really hacky. So for physics related events the server might not be best.

And what about mutually exclusive events, for instance picking up a health pack when there is only one on the board. Well that's the same deal.

- Users: both the users would report picking up the packet but the server would have to decide who gets to keep it, probably the user whose packet got in first.
- Host: whoever the host thinks is first is first
- Server: whoever the server thinks is first is first, but again the server really shouldn't be running any physics and keeping track of users locations in real time

So some examples of each kind of sharing. In a chat client like Messenger, the origin reports data to say when a user is typing. If you're ever playing a multiplayer game and it freezes, you might see a message that says "Migrating Host." That's because the user the was the host left and it needs to find a new user to be the host for the rest of that game. And Google's new platform Stadia, which is more like a streaming service, the server actually plays the game. It would kinda be like playing Blackmirror's Bandersnatch episode but with a lot more input options.

### An Event's Data Flow

So once a user or host fires off an event, where does that data go?

1. The client emits some data to the server. 
2. Then the server broadcasts that data, in this case the server broadcasts it to the original user too. That means a user might witness or cause an event, but won't act on it until the server says so, in case it's invalid. This means that gameplay is more like you're just observing one ship, the server tells your screen to animate all the ships and your window is focused on the one that you get control over, but you never really control it directly and it isn't treated any differently than the other ships.
3. In a more advanced use case a client might display the event or an animation at the same time as the emit so the user doesn't feel like the button they are pushing has a delay. When we finally do receive the data, we have to correct it, because it might be coming in at different times for every client and we want it to display the same on all screens.

## Interpolation and Extrapolation

So if our data is coming in at different times, and we can't just put it on screen as soon as we get it, what can we do?

- Interpolation: the whole game is played on a predetermined delay. When clients send data, they include a timestamp. And when clients receive data, they queue it and wait until that timestamp plus n milliseconds to actually execute it. This way all clients render data on the screen at the same time, even though it's "in the past."
- Extrapolation: similarly, extrapolation requires users to attach timestamps to the data they send. When a user receives the data, they do some math and calculate where the object is now rather than placing it where it was. This also solved the correct position, but runs the risk of being jumpy.

Note: You won't see a whole lot of socket games that have acceleration for these timing reasons. Most games are constant velocity, or if there are multiple velocities, the change is immediate. It's difficult to correct a user's position when momentum is involved.

## Design and Animation

So we're going to be playing a game with a delay, or one that's a little jumpy, that probably isn't the best user experience, right? Well, we can "fix" socket limitations through designing different gameplay or adding animation. For example:

Users might be annoyed that they don't move immediately when they tap buttons. We can mitigate that by having a thruster animation happen when they push the button, even if the movement happens a little later. 

Or if a user doesn't like that they're not firing immediately. We could have the ship animate a little charge up effect before the fire happens. We can control how long an animation runs for even when we cannot control how long it takes our data to send through the socket.

An issue in this game is that, when a user spawns, lasers that have already been fired don't show up right away. We could add an event that shares all the lasers to the user when they first show up but that's tricky. We would be sharing a large array through the socket. Or we could spawn them in a safezone so the lasers on screen don't matter anyway, so just don't show them. Or we could make the login screen be an overlay to the game so the user is already on the game page and is already receiving socket updates while they're logging in. 

> Design can solve problems that programming cannot

## Data Use and Message Compressing

Okay, so maybe you aren't an animator, what else can we do to make gameplay faster?

We can try and use the socket as little as possible. This means if an animation doesn't have to be the same on every screen, like an explosion, then don't make an event for it. Or if players don't need to know when others are reloading for the game to be played, then there's no need to make an event for it, perhaps it can be inferred from a different event too.

For example, and this is more advanced than this game, but maybe you only need to share information to people in your part of the screen, if you're gonna have a high score board for the whole room, then players on the opposite side don't need to know your location, they just need the score.

We can try and send as little data as possible through the socket when we do use it. If you already know a player's name, then the name doesn't need to be included in every message. Rather than defining strings for event names we can use numbers instead. We can also shorten the names and flatten the objects that we send through the socket.

And once we have the data we want to send, we can send it as a buffer instead.

## Keys to Socket

Some key takeaways to socket games. Think about: 

- Which player knows what (are they a host or a new player or did they cause the event?)
- When do they know it (are they getting this information late?)
- And should they share it (should this just be a local animation or a shared event?) 

## Thank You!

[Let's Play](http://simple-socket-game.herokuapp.com)


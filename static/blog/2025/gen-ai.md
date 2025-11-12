---
slug: gen-ai
date: "2025-09-02"
title: Gen AI
image: /blog/2025/gen-ai.png
blurb: Some thoughts on generative AI
github:
website:
---

* Through the lense of multi-linear story telling

I recently developed a game and game engine for writing playable stories. It's a relatively simple app and gameplay experience. The story teller writes dialog, gives the player options to respond, and then defines the outcome for each response. The gameplay experience involves reading the dialog, choosing an option, and seeing where the story goes from there. There are other aspects to the game, like recording story events, points, inventory items, random dialog, rolling dice, background images, and text styling, but the core of the game is just a playable story. 

Now, since this is 2025 and AI is all the rage, many suggestions from play-testers and friends involve using AI. I also have plenty of ideas for how to integrate AI into this app. Some of those ideas include:
1. Use an LLM to read user inputted responses and respond accordingly
2. Use an AI image generator to create background images based on scene and character descriptions
3. Use an AI audio generator to speak dialog for the game
4. Use an LLM to understand and make suggestions in the story (for things like continuity corrections or character consistency)
5. Use an LLM to assist with the mundane aspects of the editing process

I want to go over each of these ideas and discuss which ones I consider to be good uses of AI and which I consider to be bad (hint, they are in order of the ones I find most to least offensive).

## 1. LLM for generated dialog and responses

One of the first suggestions I get when showing this game to people is that I could use AI to allow the user to type anything they want, and then the AI would come up with a response. I understand the desire, they have ideas about how to explore the world that wasn't presented as a choice by the story's author.

Gaming, while often viewed as a solo experience, is actually all about interacting with a person. When Mario runs into a wall, it's because a person put that wall there. A good game should make you feel a connection to the game's designer. In the case of these playable stories, are the options funny, tempting, repulsive, or difficult to choose? Those options were presented to you by a writer that wanted you to feel those emotions. Adding an LLM for responses makes the game no longer story telling in a human way, that would simply be getting a computer to make stuff up at you.

Not to mention AIs tend to be really agreeable and inoffensive, they are not good at writing conflict or humor.

## 2. AI image and audio generation

The game I'm making is pretty graphic light. There's no sprites moving, but there are backgrounds. And it would be time consuming, but I'd love for some games to have backgrounds reminiscent of old SNES games, where the character says their dialog and has a little graphic for it. It's very tempting to use AI to generate all these images. A user could enter a description for their character, accept a base model, and then regenerate the same character for each emotion they'd have to express and each setting they'd have to visit. AI character continuity has gotten better and better.

I personally don't think user's should be doing this, as these AI generated graphics are stealing art and money from artists. And, much like the notes on LLMs from before, the AI is soul-less. An artist makes art with you (or themselves) in mind. It should be heartwarming to think a character was modeled off of a friend, parent, or old teacher. An artist can draw a scene that's a 1 for 1 recreation of a place they've been, and that is beautiful. For these reasons, I want to encourage game devs to work with an artist, and I won't be building an AI image feature into the website. If a user wants to use AI, they are able to do so externally and I will not stop them.

For accessability reasons, audio for dialog and narration would be wonderful. Using AI to create that dialog would be easy, especially for how much dialog a text based adventure could have. AI has come a long way in generating consistent voices for each character.

But, like with images, AI doesn't know how to capture tone in the right way. It doesn't yet have a human cadence and mostly only sounds like an agreeable coworker. Most of the audio it is trained on comes from celebrities and politicians, who do not consent to their likeness being used this way. I also don't like that audio can be used for deepfakes and other nefarious reasons, so I think it's best to stay away from it.

## 3. Game logic assistant

Now this is a type of AI I am excited about. As a programmer, I often use AI while coding. It auto suggests line completion in a way that speeds up writing code. While it is still often wrong, having it output sections of code that I just then have to correct can be very helpful.

What would this look like in a multi-linear story editor? 

Formatting suggestions (like highlighting items and character names) can be very helpful. In this game, items and character names can be highlighted to help the reader visualize, maybe a witch's name is always highlighted in green. To do this we use markdown, but it can often be forgotten, if AI can suggest changing your text to include markdown, writers would be able to write faster and focus on story.

Next node suggestions can take a lot of the more mundane tasks away from a writer. If a writer writes dialog like "The man hands you a sword," the AI could suggest an Apply node to add the item to your inventory. If a writer writes a choice like "Exit the room," the AI can could suggest a Scene Change node to go to another scene.

This type of AI assistant does not replace any creative functionality in the game, and instead would allow a game writer to focus on the story, rather than
gameplay logic.

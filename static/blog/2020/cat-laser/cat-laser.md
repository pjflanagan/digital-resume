---
slug: cat-laser
date: "2020-05-13"
title: Cat Laser
image: /blog/2020/cat-laser/charlotte.jpg
blurb: An Arduino laser pointer cat toy
github: https://github.com/pjflanagan/cat-laser
website: ''
---

In spring of 2019 I moved in to a new apartment with a woman who owned a cat. Charlotte was a pudgy, sociable, and feisty grey cat who would hit you if she wanted your attention. During the pandemic, I made time to make her a toy. Using a tutorial I saw online and a small Arduino, I made her a laser pointer turret.

Within a week, she pushed it off the edge of the table when I wasn't paying attention and destroyed it.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZuspzdgygdA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Development

### Circuitry

For a project of this simplicity, I didn't want to have to break out a soldering iron. I felt like I might eventually expand the project with a nice housing or additional buzzers or sensors, so I wanted it to be de-constructable. Instead I used a mini breadboard and an `Atmega Nano`. 

![Cat Laser General Schema](/blog/2020/cat-laser/schema.png)

### Program

This is a simplified version of the expanded program. The goal was to add different types of motion like quick zig-zags, circles, extended pauses, and blinking. This basic function simple sets a new random point and then goes to it.

```ino
// v2_laser_cat.ino

// Laser(xPin, yPin, laserPin)
Laser laser = new Laser(9, 6, 13);

void toRandom() {
  float moveTime = random(MIN_MOVE_TIME, MAX_MOVE_TIME);
  Point * point = new Point(); // initializes to random point
  laser.moveTo(point, moveTime);
}
```

### Construction

I purchased a kit for building turrets like this one that houses two servo motors. The final build was screwed and stickered into a scrap piece of wood and plugged into an outlet or portable charger. 

![Final Build](/blog/2020/cat-laser/laser.jpg)

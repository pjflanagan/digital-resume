---
slug: nightpro-for-gopro
date: "2020-12-23"
title: NightPro For GoPro
image: /blog/2020/nightpro-for-gopro.jpg
blurb: A Python package for merging nightlapse photos into video
github: https://github.com/pjflanagan/nightpro-for-gopro
website: https://pypi.org/project/nightpro-for-gopro/
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/jZyszParsmc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I purchased a GoPro to film myself rollerblading, but found that I also really enjoyed the nightlapse features. 

## Project Reasons

GoPro nightlapses are wonderful. But they save oddly. Rather than saving as a single video, the way other GoPro timelapses do, they save as a series of individual photos. Merging them all into one required a tedious ffmpeg command:

```bash
$ ffmpeg -r 32 -start_number <number> -i ./<folder>/G00%d.JPG -vcodec libx264 -pix_fmt yuv420p <name>.mp4
```

I decided to make NightPro as a Python package to automatically find all the sets of files that can be turned into nightlapes videos and run this command on them. After installation, it can be run using:

```bash
$ nightpro
```
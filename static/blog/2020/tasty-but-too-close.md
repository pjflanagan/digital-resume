---
slug: tasty-but-too-close
date: "2020-06-22"
title: Tasty But Too Close
image: https://raw.githubusercontent.com/pjflanagan/tasty-but-too-close/77540a90c38ca231556a54ef8943d8a798459d07/img/promo.jpg
blurb: Another cooking video Instagram
github: https://github.com/pjflanagan/tasty-but-too-close
website: https://www.instagram.com/tasty_but_too_close/
---

I've always enjoyed Tasty videos. They're quick and make the recipe look easy. I also always wanted to create a funny bot account. The idea of taking the familiar style of Tasty and Nifty videos, but zooming them in a little too close to see what's going on seemed funny to me.

The results are silly but also sometimes pretty artsy.

## Development

Unfortunately, Instagram is difficult to work with programmatically, and I didn't want to run a server just for this project. Plus with all the free time during lockdown, I might as well just post them myself and revisit making a bot if it felt worthwhile.

Using Python and `instaloader` downloading software, I created a system to create cropped videos.

1. Batch download
2. Auto crop and write caption
3. Manually post using automatically copied caption

```python
# crop.py
  for f in all_in_files:
    split = f.split(".", 1)

    # isCroppable: if the end is mp4 and has not been processed yet
    if isCroppable(split, f):

      # create a randomly cropped video
      crop_video(f)

      # get the caption with appended hashtags and copy it
      caption = get_caption(split[0])
      copy(caption)
      print('COPIED:\n' + caption + '\n')

      # log the video as cropped and posted
      log(f)

      break
```

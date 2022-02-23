---
slug: drunk-weather-channel
date: "2021-09-28"
title: The Drunk Weather Channel
image: https://drunkweatherchannel.flanny.app/img/social/social.png
blurb: "A weather channel for your night out"
github: https://github.com/pjflanagan/drunkweatherchannel
website: https://drunkweatherchannel.flanny.app/
---

This is a website that I've had an idea for since college in Michigan. I finally decided it was worth doing because serverless functions have become popular and I wouldn't need to pay for a server to make this work. So I created a standard looking weather app, with silly gifs for the background and funny phrases and quips.

### The Formula

The app finds the weather at your location and reads the "feels like" data. It then takes the number of drinks you've had, and calculates what it feels like to you. I wanted the temp to kick in as you start to feel drunk and then plateau once you are drunk. To do that we needed an `atan` graph with constants that change based on the weather outside. This is the function that does that calculation:

```ts
function calculateDrunkFeelsLikeF(actualFeelsLikeF: Fahrenheit, drinkCount: number): Fahrenheit {
  const [minDrinksToStartFeelingWarm, allowableTempDelta] = getDrunkFeelsLikeFormulaConstants(actualFeelsLikeF); 
  const multiplier = allowableTempDelta / Math.PI;
  const constant = allowableTempDelta / 2 + actualFeelsLikeF; 
  return Math.floor(multiplier * Math.atan(drinkCount - minDrinksToStartFeelingWarm) + constant); 
}
```

It results in a chart that looks like this:

![Drunk Feels Like Chart](/blog/2021/drunk-weather-channel/feels-like-chart.png)

In this example `minDrinksToStartFeelingWarm` is 4. This would be for a mildly cold day, if it was 0F out we would need more drinks to start feeling warm, and if it was 68F out we would probably only need 2. The `allowableTempDelta` is charted on the x-axis. If it was 0F out, we would be able to drink a lot, and would probably only feel 4 degrees warmer, same for if it was already hot out. But if it was 43F out and we had 12 drinks, then we would probably feel as warm as we could, and drinking more wouldn't change that.

> Please drink responsibly

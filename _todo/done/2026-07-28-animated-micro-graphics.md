
# Animated Micro Graphics

We will be adding more micrographics to the photo.

1. Rename the existing Micrographics to be `EggMicrographic` or something
2. Move all that to a `micrographics` folder
3. Make a parent wrapper the positions the micrographics within the `Photo`
4. Make folders for the new components (outlines below)

## New Micro-Graphics

### World Map

In the bottom right corner below the location text we should have a fixed world map (Equal Earth Projection `world-map-equal-earth-projection.png` in inspo).
On photo change, we will use the coordinates to move a crosshair to where it is on the map.
Right now the photo `description`s are all locations. We need a new object for this instead:

```
photoLocation: {
  name: string; // New York, NY
  coordinates: { lat, lng }, // numbers
  altitude?: string; // -45 ft
}
```

### Music Box

In the top right corner we will have a left scrolling set of dots. It should play Clair de Lune.
The dots sometimes randomly appear/disappear.

### Description

Now that `description` is being replaced by `photoLocation`, I can use `description` in a new location and add my own details.

In the bottom left we should have photo description text. It should be underneath the `EggMicrographic`

### Bars

This is a visual / not informative effect.
In the top left we should have three animating bars. They will slowly expand and contract.
They all have labels on the left (they can just be random characters).

## Examples

For human use only:

- https://www.erginturk.com
- https://www.scificn.dev/components/progress
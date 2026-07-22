
# Experience Slide Decoration

## Timeline

Left of the content area, we can be a timeline that scrolls with the user.
It would likely be a bar that runs the full length of the slide. There would be an occasional marker, probably set as a `:before` on an experience card.

That timeline can be based on something and can be an easter egg.

### Ideas

- The ship landing (looks like my ship and lands upright).
  - Avatar 2 reference but it might be too SpaceX-y.
- My ship flying, each marker can be a planet


## Cards

The cards themselves can be punch cards. This can just be a reference to the ENIAC and the fact that my mom programed on punch cards in school.


### Punch card appearance

Punch cards have 10 rows of monospace numbers that stretch the whole width of the card. They look like this:

0000000000000000000
1111111111111111111
...
9999999999999999999

The numbers are sometimes replaced with square `▮` of the same size (not sure what character works best and is universal.)

This should be done by adding a decorative component positioned absolute and z-index-ed below the content. There should be padding so the numbers are close but don't overflow the edge.
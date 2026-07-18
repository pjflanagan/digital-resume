type EggReference = {
  id: string;
  name: string;
  answer: string;
};

const intro = `Can you find all my favorite sci-fi references?\nCall Egg.list() to see the checklist, and Egg.check('name') to check one off.`;

const references: EggReference[] = [
  {
    id: 'futurama',
    name: 'Futurama',
    answer: `The space ship is loosely modeled off the Planet Express ship, the contact form placeholder text also has the Professor's tagline.`,
  },
  {
    id: 'rick-and-morty',
    name: 'Rick and Morty',
    answer: `There's a green portal floating on the splash slide, the contact form placeholder text also has a Rick tagline.`,
  },
  {
    id: 'dune',
    name: 'Dune',
    answer: `The splash slide planet is the color of Arrakis on the Dune book cover and the contact form placeholder text has Paul's mantra.`,
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk 2077',
    answer:
      'Hovering my personal slide photos shows the Cyberpunk 2077 menu cursor, Johnny Silverhand can also be found in the contact form placeholder text. Be sure to checkout my Cyberpunk 2077 Garmin watch face project.',
  },
  {
    id: 'fifth-element',
    name: 'The Fifth Element',
    answer: 'The contact form is on a Multipass, the contact form placeholder text also has a Leeloo Dallas line.',
  },
  {
    id: '2001-a-space-odyssey',
    name: '2001: A Space Odyssey',
    answer: `The 404 page's drifting particle field is a nod to the Star Gate sequence in 2001: A Space Odyssey.`,
  },
  {
    id: 'neon-genesis-evangelion',
    name: 'Neon Genesis Evangelion',
    answer: `The blueprint background in the Programs section has a diagram of the angels.`,
  },
  {
    id: 'horizon',
    name: 'Horizon',
    answer: 'The send button in the contact form was selected because it resembles the focus in Horizon Zero Dawn and Forbidden West.',
  },
  {
    id: 'matrix',
    name: 'The Matrix',
    answer: 'The splash slide has two buttons, one red pill and one blue pill. The contact form placeholder text also has a line from The Matrix.',
  },
  {
    id: 'blade-runner',
    name: 'Blade Runner',
    answer: 'The contact form placeholder text has a line from Blade Runner.',
  },
  {
    id: 'andor',
    name: 'Andor',
    answer: 'The contact form placeholder text has an rebel secret code.',
  },
  {
    id: 'iron-man',
    name: 'Iron Man',
    answer: 'The contact form placeholder text has a line at the end of the Iron Man movie.',
  },
  {
    id: 'contact',
    name: `Contact`,
    answer: `This is a stretch but the contact form is a reference to contact in name.`
  },
  {
    id: 'et',
    name: 'E.T.',
    answer: `In the contact form prompt I promise to "phone" back.`
  }
];

const Egg = { intro, references };

export default Egg;
export type { EggReference };

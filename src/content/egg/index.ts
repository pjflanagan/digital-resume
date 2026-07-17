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
    answer: `The contact form placeholder text is the Professor's tagline.`,
  },
  {
    id: 'rick-and-morty',
    name: 'Rick and Morty',
    answer: 'The contact form placeholder text has a Rick tagline.',
  },
  {
    id: 'andor',
    name: 'Andor',
    answer: 'The contact form placeholder text has an rebel secret code.',
  },
  {
    id: 'dune',
    name: 'Dune',
    answer: `The contact form placeholder text has Paul's mantra.`,
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk 2077',
    answer:
      'The Cyberpunk 2077 Garmin watchface is a featured project of mine, Johnny Silverhand can also be found in the contact form placeholder text.',
  },
  {
    id: 'fifth-element',
    name: 'The Fifth Element',
    answer: 'The contact form placeholder text has a Leeloo Dallas line.',
  },
  {
    id: 'iron-man',
    name: 'Iron Man',
    answer: 'The contact form placeholder text has a line at the end of the Iron Man movie.',
  },
  {
    id: 'blade-runner',
    name: 'Blade Runner',
    answer: 'The contact form placeholder text has a line from Blade Runner.',
  },
  {
    id: '2001-a-space-odyssey',
    name: '2001: A Space Odyssey',
    answer: `The 404 page's drifting particle field is a nod to the Star Gate sequence in 2001: A Space Odyssey.`,
  },
];

const Egg = { intro, references };

export default Egg;
export type { EggReference };

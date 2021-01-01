
import Jobs from "./jobs.json";
import Schools from "./schools.json";
import Skills from "./skills.json";
import Projects from "./projects.json";

export default {
  splash: {
    title: "Peter James Flanagan",
    subtitle: "Circuit-navigating Cyberspace",
    prompts: [
      "Scroll for liftoff!",
      "Scroll to beam me up!",
      "Scroll for hyperspace jump!",
      "Scroll for controlled burn!",
    ],
  },
  personal: {
    accent: "Hi, my name is",
    title: "Peter James Flanagan",
    bio: [
      "I'm a full-stack software engineer living in New York. I fell in love with web development at a young age and have been playing with it ever since. I enjoy making useful, deliberatley designed, and fun web tools.",
    ],
    link_text: {
      links: [
        {
          key: "rollerblader",
          href: "//instagram.com/roller.babe",
          callbackParam: "personal-roller-blade.jpg",
          text: "rollerblader",
        },
        {
          key: "rockclimber",
          callbackParam: "personal-rock-climbing.jpg",
          text: "rock climber",
        },
      ],
      text: [
        "I'm a full-stack software engineer living in New York. I fell in love with web development at a young age and have been playing with it ever since. I enjoy making useful, deliberatley designed, and fun web tools.",
        "Outside of coding, I'm an avid <rollerblader>, a novice <rockclimber>, and an eager Mandarin student.",
      ],
    },
  },
  experience: {
    accent: "Lightyears of",
    title: "Experience",
    sections: ["Career", "Education", "Skills"],
    jobs: Jobs,
    schools: Schools,
    skills: Skills
  },
  projects: {
    accent: "Experiments, explorations, and",
    title: "Programs",
    sections: ["Featured Projects", "Other Projects"],
    projects: Projects
  },
  contact: {
    accent: "Let's make",
    title: "Contact!",
    text:
      "While I'm not currently seeking new opportunities, feel free to reach out. I'll try my best to phone back!",
    links: [
      {
        icon: "email",
        href: "mailto:pj@pjflanagan.me",
        text: "Email",
      },
      {
        icon: "github",
        href: "//github.com/pjflanagan",
        text: "Github",
      },
      {
        icon: "linkedin",
        href: "//www.linkedin.com/in/peterjflan",
        text: "LinkedIn",
      },
    ],
  },
};

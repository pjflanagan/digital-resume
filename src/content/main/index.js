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
    accent: {
      english: "Hi, my name is",
      mandarin: "你好，我名字叫",
    },
    title_text: {
      links: [
        {
          key: "peter_james_flanagan",
          callbackParam: [
            { action: "image", param: "personal-photo.jpg" },
            { action: "text", param: "english" },
          ],
          text: "Peter James Flanagan",
        },
      ],
      text: "<peter_james_flanagan>",
    },
    link_text: {
      links: [
        {
          key: "rollerblader",
          href: "//instagram.com/roller.babe",
          callbackParam: [
            { action: "image", param: "personal-roller-blade.jpg" },
          ],
          text: "rollerblader",
        },
        {
          key: "rockclimber",
          callbackParam: [
            { action: "image", param: "personal-rock-climbing.jpg" },
          ],
          text: "rock climber",
        },
        {
          key: "mandarin_student",
          callbackParam: [{ action: "text", param: "mandarin" }],
          text: "Mandarin student",
        },
      ],
      text: [
        "I'm a full-stack software engineer living in New York. I fell in love with web development at a young age and have been playing with it ever since. I enjoy making useful, deliberately designed, and fun web tools.",
        "Outside of coding, I'm an avid <rollerblader>, a novice <rockclimber>, and an eager <mandarin_student>.",
      ],
    },
  },
  experience: {
    accent: "Lightyears of",
    title: "Experience",
    sections: ["Career", "Education", "Skills"],
    jobs: Jobs,
    schools: Schools,
    skills: Skills,
  },
  projects: {
    accent: "Experiments, explorations, and",
    title: "Programs",
    sections: ["Featured Projects", "Other Projects"],
    projects: Projects,
  },
  contact: {
    accent: "Let's make",
    title: "Contact!",
    text:
      "I'm seeking new opportunities. Feel free to reach out and I'll be sure to phone back!",
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
    formPlaceholders: [
      {
        name: "Tony Stark",
        email: "tony@starkindustries.com",
        message: "I am Ironman."
      },
      {
        name: "Professor Farnsworth",
        email: "farnsworth@planetexpress.com",
        message: "Good news everyone!"
      },
      // {
      //   name: "Stanford Pines",
      //   email: "stan@gravityfalls.com",
      //   message: "Good news everyone!"
      // },
      // {
      //   name: "Doctor Emmett Brown",
      //   email: "doc@delorean.past",
      //   message: "Great Scott!"
      // }
    ]
  },
};

import Jobs from "./jobs.json";
import Schools from "./schools.json";
import Skills from "./skills.json";
import Projects from "./projects.json";

const PageBio = {
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
          key: "scuba",
          callbackParam: [
            { action: "image", param: "personal-scuba.jpg" }
          ],
          text: "SCUBA diver"
        },
        {
          key: "mandarin_student",
          callbackParam: [
            { action: "text", param: "mandarin" },
            { action: "image", param: "personal-mandarin.jpg" }
          ],
          text: "Mandarin student",
        },
      ],
      text: [
        "I'm a full-stack software engineer living in New York. I fell in love with web development at a young age and have been playing with it ever since. I enjoy making useful, deliberately designed, and fun web tools.",
        "Outside of coding, I'm an avid <rollerblader>, a novice <rockclimber>, certified <scuba>, board sport enthusiast, and an eager <mandarin_student>.",
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
    link_text: {
      links: [
        {
          key: "pdf",
          href: "/pdf/PeterFlanaganResume2021.pdf",
          text: "PDF form",
        }
      ],
      text: [
        "This resume is also available in <pdf>.",
      ],
    },
  },
  projects: {
    accent: "Experiments, explorations, and",
    title: "Programs",
    sections: ["Featured Projects", "Other Projects"],
    projects: Projects,
    link_text: {
      links: [
        {
          key: "blog",
          href: "/blog",
          text: "project blog",
        },
        {
          key: "github",
          href: "//github.com/pjflanagan",
          text: "Github",
        }
      ],
      text: [
        "A list of all my coding adventures can be found on my <blog> as well as my <github>.",
      ],
    },
  },
  contact: {
    accent: "Let's make",
    title: "Contact!",
    text:
      "While I'm not seeking new opportunities right now, feel free to reach out and I'll be sure to phone back!",
    links: [
      {
        icon: "email",
        href: "mailto:pjflanagan1@gmail.com",
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
      //   message: "..."
      // },
      // {
      //   name: "Doctor Emmett Brown",
      //   email: "doc@delorean.future",
      //   message: "Great Scott!"
      // }
    ]
  },
};


export default PageBio;
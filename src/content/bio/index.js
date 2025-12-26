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
          href: "//flanny.app/study-mandarin",
          callbackParam: [
            { action: "text", param: "mandarin" },
            { action: "image", param: "personal-mandarin.jpg" }
          ],
          text: "Mandarin student",
        },
        {
          key: "board_sport",
          callbackParam: [
            { action: "image", param: "personal-snowboarding.jpg"}
          ],
          text: "board sport"
        }
      ],
      text: [
        "I'm a full-stack software engineer living in New York. I fell in love with web development at a young age and have been playing with it ever since. I enjoy making useful, deliberately designed, and fun web tools.",
        "Outside of coding, I'm an avid <rollerblader>, <board_sport> enthusiast, novice <rockclimber>, certified <scuba>, and <mandarin_student>.",
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
        "I have a Bachelor's in Computer Science from The University of Michigan and I've worked several positions at top tech companies. This resume is also available in <pdf>.",
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
          href: "https://www.flanny.app/blog",
          text: "project blog",
        },
        {
          key: "github",
          href: "//github.com/pjflanagan",
          text: "Github",
        }
      ],
      text: [
        "Tinkering has always been a favorite hobby of mine. I'm always toying with the latest technologies and writing code. A list of all my development adventures can be found on my <blog> as well as my <github>.",
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
  footer: [
    {
      "links": [
        {
          "key": "github",
          "href": "//github.com/pjflanagan/digital-resume",
          "text": "Github"
        }
      ],
      "text": "Website by Peter James Flanagan, available on <github>"
    },
    {
      "links": [
        {
          "key": "pixel_perfect",
          "href": "//www.flaticon.com/authors/pixel-perfect",
          "text": "Pixel Perfect"
        },
        {
          "key": "freepik",
          "href": "//www.flaticon.com/authors/freepik",
          "text": "Freepik"
        },
        {
          "key": "prettycons",
          "href": "//www.flaticon.com/authors/prettycons",
          "text": "prettycons"
        },
        {
          "key": "smashicons",
          "href": "//www.flaticon.com/authors/smashicons",
          "text": "Smashicons"
        },
        {
          "key": "iconixar",
          "href": "//www.flaticon.com/authors/iconixar",
          "text": "iconixar"
        },
        {
          "key": "kiranshastry",
          "href": "//www.flaticon.com/authors/kiranshastry",
          "text": "Kiranshastry"
        }
      ],
      "text": "Icons by <pixel_perfect>, <freepik>, <prettycons>, <kiranshastry>, <iconixar> and <smashicons>"
    }
  ],
};


export default PageBio;
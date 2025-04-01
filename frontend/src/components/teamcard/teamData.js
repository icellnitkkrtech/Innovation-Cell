const data = [
  {
    id: 1,
    name: "Deepanshu Chauhan",
    role: "President",
    image: "/Deepanshu Chauhan _ President.jpg",
    bio: "Leading the E-Cell team with vision and dedication to foster entrepreneurship and innovation among students.",
    social: {
      linkedin: "https://www.linkedin.com/in/deepanshu-chauhan/",
      twitter: "https://twitter.com/deepanshu",
      instagram: "https://instagram.com/deepanshu"
    }
  },
  {
    id: 2, 
    name: "Ankit Matwa",
    role: "Vice-president",
    image: "/WhatsApp Image 2024-12-26 at 20.30.08_6ca1b054.jpg",
    bio: "Supporting the president in executing E-Cell's mission and overseeing various team operations.",
    social: {
      linkedin: "https://www.linkedin.com/in/ankit-matwa/",
      twitter: "https://twitter.com/ankit",
      instagram: "https://instagram.com/ankit"
    }
  },
  {
    id: 3,
    name: "Suryansh Singh",
    role: "Treasurer", 
    image: "/Suryansh Singh _ Treasurer.jpg",
    bio: "Managing E-Cell's financial operations and ensuring efficient resource allocation for all activities.",
    social: {
      linkedin: "https://www.linkedin.com/in/suryansh-singh/",
      twitter: "https://twitter.com/suryansh",
      instagram: "https://instagram.com/suryansh"
    }
  },
  {
    id: 4,
    name: "Prashant Gautam",
    role: "Ideation Team Head",
    image: "/Prashant Gautam _ Ideation Team Head.jpg", 
    bio: "Leading the brainstorming and innovation initiatives to develop creative solutions and events.",
    social: {
      linkedin: "https://www.linkedin.com/in/prashant-gautam/",
      twitter: "https://twitter.com/prashant",
      instagram: "https://instagram.com/prashant"
    }
  },
  // {
  //   id: 5,
  //   name: "Anubhav Goel",
  //   role: "Ideation Team Co-Head",
  //   image: "/Anubhav Goel _ Ideation Team Co-Head.jpg",
  //   bio: "Supporting ideation processes and helping transform creative concepts into actionable plans.",
  //   social: {
  //     linkedin: "https://www.linkedin.com/in/anubhav-goel/",
  //     twitter: "https://twitter.com/anubhav",
  //     instagram: "https://instagram.com/anubhav"
  //   }
  // },
  {
    id: 6,
    name: "Divyanshu Yadav",
    role: "Finance Team Head",
    image: "/Divyanshu Yadav _ Finance Team Head.jpg",
    bio: "Overseeing budget planning, financial strategies, and maintaining financial transparency.",
    social: {
      linkedin: "https://www.linkedin.com/in/divyanshu-yadav/",
      twitter: "https://twitter.com/divyanshu",
      instagram: "https://instagram.com/divyanshu"
    }
  },
  // {
  //   id: 7,
  //   name: "Dhruv Dhankhar",
  //   role: "Finance Team Co-Head",
  //   image: "/Dhruv Dhankhar _ Finance Team Co-Head.jpg",
  //   bio: "Assisting in financial management and ensuring smooth execution of financial operations.",
  //   social: {
  //     linkedin: "https://www.linkedin.com/in/dhruv-dhankhar/",
  //     twitter: "https://twitter.com/dhruv",
  //     instagram: "https://instagram.com/dhruv"
  //   }
  // },
  {
    id: 8,
    name: "Dhriti",
    role: "Outreach Team Head",
    image: "/Dhriti _ Outreach Team Head.jpg",
    bio: "Leading external communications and building partnerships with stakeholders and industry experts.",
    social: {
      linkedin: "https://www.linkedin.com/in/dhriti/",
      twitter: "https://twitter.com/dhriti",
      instagram: "https://instagram.com/dhriti"
    }
  },
  // {
  //   id: 9,
  //   name: "Shobhit Sharma",
  //   role: "Outreach Team Co-Head",
  //   image: "/Shobhit Sharma _ Outreach Team Co-Head.jpg",
  //   bio: "Supporting outreach initiatives and helping expand E-Cell's network and impact.",
  //   social: {
  //     linkedin: "https://www.linkedin.com/in/shobhit-sharma/",
  //     twitter: "https://twitter.com/shobhit",
  //     instagram: "https://instagram.com/shobhit"
  //   }
  // },
  {
    id: 10,
    name: "Akarshit",
    role: "Tech Team Head",
    image: "/Akarshit _ Tech Team Head.jpg",
    bio: "Leading technological initiatives and ensuring digital innovation in E-Cell's operations.",
    social: {
      linkedin: "https://www.linkedin.com/in/akarshit/",
      twitter: "https://twitter.com/akarshit",
      instagram: "https://instagram.com/akarshit"
    }
  },
  // {
  //   id: 11,
  //   name: "Dev Varshaney",
  //   role: "Tech Team Co-Head",
  //   image: "/Dev varshaney _ Tech Team Co-Head.jpg",
  //   bio: "Supporting technical implementations and maintaining E-Cell's digital infrastructure.",
  //   social: {
  //     linkedin: "https://www.linkedin.com/in/dev-varshaney/",
  //     twitter: "https://twitter.com/dev",
  //     instagram: "https://instagram.com/dev"
  //   }
  // },
  {
    id: 12,
    name: "Sarthak",
    role: "Management Head",
    image: "/Sarthak _ Management Head.jpg",
    bio: "Coordinating events and ensuring smooth execution of E-Cell's various programs and initiatives.",
    social: {
      linkedin: "https://www.linkedin.com/in/sarthak/",
      twitter: "https://twitter.com/sarthak",
      instagram: "https://instagram.com/sarthak"
    }
  },
  // {
  //   id: 13,
  //   name: "Deepanshu Bhardwaj",
  //   role: "Management Co-Head",
  //   image: "Deepanshu Bhardwaj _ Management Co-Head.jpg",
  //   bio: "Assisting in event management and helping maintain operational efficiency.",
  //   social: {
  //     linkedin: "https://www.linkedin.com/in/deepanshu-bhardwaj/",
  //     twitter: "https://twitter.com/deepanshu-b",
  //     instagram: "https://instagram.com/deepanshu.b"
  //   }
  // },
  {
    id: 14,
    name: "Vivek",
    role: "Design & Creative Team Head",
    image: "Vivek _ D&C Team Head.jpg",
    bio: "Leading the creative direction and ensuring high-quality design outputs for all E-Cell materials.",
    social: {
      linkedin: "https://www.linkedin.com/in/vivek/",
      twitter: "https://twitter.com/vivek",
      instagram: "https://instagram.com/vivek"
    }
  },
  // {
  //   id: 15,
  //   name: "Vishesh",
  //   role: "Design & Creative Team Co-Head",
  //   image: "Vishesh _ D&C Team Co-Head.jpg",
  //   bio: "Supporting design initiatives and helping maintain E-Cell's visual brand identity.",
  //   social: {
  //     linkedin: "https://www.linkedin.com/in/vishesh/",
  //     twitter: "https://twitter.com/vishesh",
  //     instagram: "https://instagram.com/vishesh"
  //   }
  // }
];

export default data;


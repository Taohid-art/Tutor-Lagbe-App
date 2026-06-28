import type {
  Author,
  Post,
  Profile,
  Job,
  Conversation,
  AppNotification,
  ConnectionSuggestion,
} from "./types"

const now = Date.now()
const hoursAgo = (h: number) => new Date(now - h * 3600 * 1000).toISOString()
const daysAgo = (d: number) => new Date(now - d * 86400 * 1000).toISOString()

export const currentUser: Author = {
  id: "me",
  name: "Alex Morgan",
  headline: "CSE In University of Dhaka",
  avatar: "/avatars/me.jpg",
}

const sara: Author = {
  id: "u1",
  name: "Sara Chen",
  headline: "Product Designer at Figmatic",
  avatar: "/avatars/sara.jpg",
}
const david: Author = {
  id: "u2",
  name: "David Okafor",
  headline: "Engineering Manager at Nimbus",
  avatar: "/avatars/david.jpg",
}
const maria: Author = {
  id: "u3",
  name: "Maria Lopez",
  headline: "Data Scientist at Quanta",
  avatar: "/avatars/maria.jpg",
}
const james: Author = {
  id: "u4",
  name: "James Park",
  headline: "Recruiter at TalentBridge",
  avatar: "/avatars/james.jpg",
}

export const mockPosts: Post[] = [
  {
    id: "p1",
    author: sara,
    content:
      "Just shipped a new design system at Figmatic. Consistency across 40+ products in a single source of truth. Proud of the team for pushing through. What does your design-to-dev handoff look like?",
    image: "/posts/design-system.png",
    timestamp: hoursAgo(3),
    likes: 248,
    liked: false,
    reposts: 12,
    comments: [
      {
        id: "c1",
        author: david,
        content: "Congrats Sara! Tokens-first approach is the way.",
        timestamp: hoursAgo(2),
      },
    ],
  },
  {
    id: "p2",
    author: david,
    content:
      "Hiring is hard, but hiring well is harder. After 50+ interviews this quarter, my biggest takeaway: optimize for curiosity over credentials. Skills can be taught, curiosity can't.",
    timestamp: hoursAgo(8),
    likes: 531,
    liked: true,
    reposts: 47,
    comments: [],
  },
  {
    id: "p3",
    author: maria,
    content:
      "A quick thread on feature engineering: 80% of model performance comes from the data, not the algorithm. Spend your time understanding the domain before reaching for the fanciest architecture.",
    image: "/posts/data-chart.png",
    timestamp: daysAgo(1),
    likes: 892,
    liked: false,
    reposts: 103,
    comments: [
      {
        id: "c2",
        author: sara,
        content: "So true. Garbage in, garbage out.",
        timestamp: hoursAgo(20),
      },
    ],
  },
]

export const mockProfile: Profile = {
  id: "me",
  name: "Alex Morgan",
  headline: "CSE In University of Dhaka",
  location: "Dhaka, Bangladesh",
  about:
    "Frontend engineer with 8+ years building accessible, performant web applications. I care deeply about design systems, developer experience, and shipping products people love. Currently focused on React, TypeScript and Next.js.",
  avatar: "/avatars/me.jpg",
  banner: "/banners/profile-banner.png",
  connections: 842,
  experience: [
    {
      id: "e1",
      title: "Senior Frontend Engineer",
      company: "Cyan Labs",
      logo: "/companies/cyan.png",
      startDate: "Jan 2022",
      endDate: "Present",
      location: "San Francisco, CA",
      description:
        "Lead the frontend platform team. Built a component library used across 12 product teams and cut page load times by 40%.",
    },
    {
      id: "e2",
      title: "Frontend Engineer",
      company: "Nimbus",
      logo: "/companies/nimbus.png",
      startDate: "Jun 2018",
      endDate: "Dec 2021",
      location: "Remote",
      description: "Built customer-facing dashboards in React and TypeScript.",
    },
  ],
  education: [
    {
      id: "ed1",
      school: "UC Berkeley",
      logo: "/companies/berkeley.png",
      degree: "B.S. Computer Science",
      startYear: "2010",
      endYear: "2014",
    },
  ],
  skills: ["React", "TypeScript", "Next.js", "Redux", "Tailwind CSS", "Accessibility", "Design Systems", "Node.js"],
}

export const mockJobs: Job[] = [
  {
    id: "j1",
    title: "Senior Frontend Engineer",
    company: "Quanta",
    logo: "/companies/quanta.png",
    location: "San Francisco, CA",
    type: "Full-time",
    workplace: "Hybrid",
    salary: "$160k - $210k",
    posted: daysAgo(1),
    applicants: 47,
    description:
      "We're looking for a senior frontend engineer to lead our design system efforts. You'll work with React, TypeScript and Next.js to build delightful user experiences at scale.",
    saved: false,
    applied: false,
  },
  {
    id: "j2",
    title: "Full Stack Developer",
    company: "Nimbus",
    logo: "/companies/nimbus.png",
    location: "Remote",
    type: "Full-time",
    workplace: "Remote",
    salary: "$130k - $170k",
    posted: daysAgo(2),
    applicants: 132,
    description:
      "Join a fast-growing team building cloud infrastructure tools. Strong experience with Node.js and React required.",
    saved: true,
    applied: false,
  },
  {
    id: "j3",
    title: "Product Designer",
    company: "Figmatic",
    logo: "/companies/figmatic.png",
    location: "New York, NY",
    type: "Full-time",
    workplace: "On-site",
    salary: "$120k - $150k",
    posted: daysAgo(4),
    applicants: 88,
    description:
      "Design intuitive experiences for our flagship product. Collaborate closely with engineering and research teams.",
    saved: false,
    applied: true,
  },
  {
    id: "j4",
    title: "Frontend Engineer (Contract)",
    company: "TalentBridge",
    logo: "/companies/talentbridge.png",
    location: "Austin, TX",
    type: "Contract",
    workplace: "Remote",
    salary: "$70 - $95 / hr",
    posted: daysAgo(6),
    applicants: 24,
    description: "6-month contract to build a customer portal in Next.js. Possibility to convert to full-time.",
    saved: false,
    applied: false,
  },
]

export const mockConversations: Conversation[] = [
  {
    id: "conv1",
    participant: sara,
    unread: true,
    messages: [
      { id: "m1", fromMe: false, content: "Hey Alex! Loved your talk on design systems.", timestamp: hoursAgo(5) },
      { id: "m2", fromMe: true, content: "Thanks Sara! Means a lot coming from you.", timestamp: hoursAgo(4) },
      { id: "m3", fromMe: false, content: "Would you be open to collaborating on a workshop?", timestamp: hoursAgo(1) },
    ],
  },
  {
    id: "conv2",
    participant: james,
    unread: false,
    messages: [
      {
        id: "m4",
        fromMe: false,
        content: "Hi Alex, I have a senior role that might interest you. Open to a chat?",
        timestamp: daysAgo(1),
      },
      { id: "m5", fromMe: true, content: "Hi James, sure — send the details over.", timestamp: hoursAgo(20) },
    ],
  },
  {
    id: "conv3",
    participant: david,
    unread: false,
    messages: [{ id: "m6", fromMe: false, content: "Coffee next week?", timestamp: daysAgo(3) }],
  },
]

export const mockNotifications: AppNotification[] = [
  { id: "n1", type: "like", actor: sara, text: "liked your post about React performance", timestamp: hoursAgo(2), read: false },
  { id: "n2", type: "comment", actor: david, text: "commented on your post", timestamp: hoursAgo(6), read: false },
  { id: "n3", type: "connection", actor: maria, text: "accepted your connection request", timestamp: daysAgo(1), read: true },
  { id: "n4", type: "job", actor: james, text: "posted a job that matches your profile", timestamp: daysAgo(2), read: true },
  { id: "n5", type: "mention", actor: sara, text: "mentioned you in a comment", timestamp: daysAgo(3), read: true },
]

export const mockSuggestions: ConnectionSuggestion[] = [
  { id: "s1", name: "Priya Nair", headline: "iOS Engineer at Orbit", avatar: "/avatars/priya.jpg", mutual: 12, invited: false },
  { id: "s2", name: "Tom Becker", headline: "VP Engineering at Stacked", avatar: "/avatars/tom.jpg", mutual: 8, invited: false },
  { id: "s3", name: "Lena Fischer", headline: "UX Researcher at Figmatic", avatar: "/avatars/lena.jpg", mutual: 5, invited: false },
]

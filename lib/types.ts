export interface Author {
  id: string
  name: string
  headline: string
  avatar: string
}

export interface Comment {
  id: string
  author: Author
  content: string
  timestamp: string
}

export interface Post {
  id: string
  author: Author
  content: string
  image?: string
  timestamp: string
  likes: number
  liked: boolean
  comments: Comment[]
  reposts: number
}

export interface Experience {
  id: string
  title: string
  company: string
  logo: string
  startDate: string
  endDate: string
  location: string
  description: string
}

export interface Education {
  id: string
  school: string
  logo: string
  degree: string
  startYear: string
  endYear: string
}

export interface Profile {
  id: string
  name: string
  headline: string
  location: string
  about: string
  avatar: string
  banner: string
  connections: number
  experience: Experience[]
  education: Education[]
  skills: string[]
}

export interface Job {
  id: string
  title: string
  company: string
  logo: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Internship"
  workplace: "Remote" | "Hybrid" | "On-site"
  salary: string
  posted: string
  applicants: number
  description: string
  saved: boolean
  applied: boolean
}

export interface Message {
  id: string
  fromMe: boolean
  content: string
  timestamp: string
}

export interface Conversation {
  id: string
  participant: Author
  messages: Message[]
  unread: boolean
}

export type NotificationType = "like" | "comment" | "connection" | "job" | "mention"

export interface AppNotification {
  id: string
  type: NotificationType
  actor: Author
  text: string
  timestamp: string
  read: boolean
}

export interface ConnectionSuggestion {
  id: string
  name: string
  headline: string
  avatar: string
  mutual: number
  invited: boolean
}

"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Clock3,
  Eye,
  FileText,
  House,
  MapPin,
  Navigation,
  Share2,
  UserRound,
  UsersRound,
  Wallet,
} from "lucide-react"

type TuitionType = "home" | "online"
type TutorPreference = "Male" | "Female" | "Select Gender"
type SubjectCategory =
  | "arabic"
  | "bangla"
  | "math"
  | "english"
  | "physics"
  | "chemistry"
  | "biology"
  | "ict"
  | "general"

type TutorJob = {
  id: number
  location: string
  district: string
  title: string
  tuitionType: TuitionType
  medium: string
  className: string
  preference: TutorPreference
  tutoringDays: string
  subject: string
  subjectCategory: SubjectCategory
  salary: number
  postedAt: string
}

const now = Date.now()
const minutesAgo = (minutes: number) => new Date(now - minutes * 60 * 1000).toISOString()
const hoursAgo = (hours: number) => new Date(now - hours * 60 * 60 * 1000).toISOString()
const daysAgo = (days: number) => new Date(now - days * 24 * 60 * 60 * 1000).toISOString()

const ALL_JOBS: TutorJob[] = [
  { id: 55221, location: "Khilgaon, Dhaka", district: "Dhaka", title: "Tutor Needed For Bangla Medium", tuitionType: "home", medium: "Bangla Medium", className: "Class 5", preference: "Female", tutoringDays: "5 Days/Week", subject: "All Subjects", subjectCategory: "general", salary: 4000, postedAt: daysAgo(0) },
  { id: 53780, location: "Matikata, Dhaka", district: "Dhaka", title: "Tutor Needed For Arabic", tuitionType: "home", medium: "Religious Studies", className: "Islamic studies", preference: "Select Gender", tutoringDays: "5 Days/Week", subject: "Quran for Adult", subjectCategory: "arabic", salary: 3000, postedAt: minutesAgo(9) },
  { id: 53779, location: "Mirpur 2 (60 feet), Dhaka", district: "Dhaka", title: "Tutor Needed For Bangla Medium", tuitionType: "home", medium: "Bangla Medium", className: "KG", preference: "Female", tutoringDays: "5 Days/Week", subject: "All Subjects", subjectCategory: "general", salary: 3000, postedAt: minutesAgo(17) },
  { id: 53778, location: "Bashundhara R/A, Dhaka", district: "Dhaka", title: "Home Tutor Needed For A-Level Biology", tuitionType: "home", medium: "English Medium", className: "A-Level", preference: "Female", tutoringDays: "3 Days/Week", subject: "Biology", subjectCategory: "biology", salary: 8000, postedAt: hoursAgo(1) },
  { id: 53777, location: "Uttara Sector 10, Dhaka", district: "Dhaka", title: "Tutor Needed For Spoken English", tuitionType: "online", medium: "English Version", className: "University Admission", preference: "Male", tutoringDays: "4 Days/Week", subject: "English", subjectCategory: "english", salary: 4500, postedAt: hoursAgo(2) },
  { id: 53776, location: "Shantinagar, Dhaka", district: "Dhaka", title: "Math Tutor Needed For Class 8", tuitionType: "home", medium: "Bangla Medium", className: "Class 8", preference: "Male", tutoringDays: "3 Days/Week", subject: "Mathematics", subjectCategory: "math", salary: 3500, postedAt: hoursAgo(3) },
  { id: 53775, location: "Dhanmondi 27, Dhaka", district: "Dhaka", title: "Tutor Needed For Class 10 Science", tuitionType: "home", medium: "Bangla Medium", className: "Class 10", preference: "Female", tutoringDays: "4 Days/Week", subject: "Physics", subjectCategory: "physics", salary: 6000, postedAt: hoursAgo(4) },
  { id: 53774, location: "Mohammadpur, Dhaka", district: "Dhaka", title: "Online Chemistry Tutor Needed", tuitionType: "online", medium: "English Medium", className: "O-Level", preference: "Select Gender", tutoringDays: "3 Days/Week", subject: "Chemistry", subjectCategory: "chemistry", salary: 7000, postedAt: hoursAgo(5) },
]

const SUBJECT_STYLES: Record<SubjectCategory, string> = {
  arabic: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  bangla: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  math: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-300",
  english: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  physics: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
  chemistry: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  biology: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300",
  ict: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  general: "bg-slate-100 text-slate-700 dark:bg-slate-700/70 dark:text-slate-200",
}

function formatLongDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(isoDate))
}

function formatSalary(amount: number) {
  return amount.toLocaleString("en-US")
}

type JobDetailProps = {
  id: number
  title: string
  postedAt: string
  views: number
  applications: number
  location: string
  medium: string
  className: string
  studentGender: string
  tutorGender: string
  tutoringDays: string
  time: string
  duration: string
  students: number
  subject: string
  subjectCategory: SubjectCategory
  salary: number
  otherRequirements: string
  tuitionType: TuitionType
}

function buildDetailFromJob(job: TutorJob): JobDetailProps {
  return {
    id: job.id,
    title: job.title,
    postedAt: job.postedAt,
    views: 25,
    applications: 2,
    location: job.location,
    medium: job.medium,
    className: job.className,
    studentGender: job.preference === "Select Gender" ? "Any" : "Male",
    tutorGender: job.preference,
    tutoringDays: job.tutoringDays,
    time: "Negotiable",
    duration: "-",
    students: 1,
    subject: job.subject,
    subjectCategory: job.subjectCategory,
    salary: job.salary,
    otherRequirements:
      "Highly experienced tutors are requested to apply , Time: 4.30pm Loc: opposite khilgaon city Corporation office",
    tuitionType: job.tuitionType,
  }
}

const FALLBACK_JOB: JobDetailProps = {
  id: 55221,
  title: "Tutor Needed For Bangla Medium",
  postedAt: new Date("2026-07-26T00:00:00.000Z").toISOString(),
  views: 25,
  applications: 2,
  location: "Dhaka, Khilgaon",
  medium: "Bangla Medium",
  className: "Class 5",
  studentGender: "Male",
  tutorGender: "Female",
  tutoringDays: "5 Days/Week",
  time: "Negotiable",
  duration: "-",
  students: 1,
  subject: "All Subjects",
  subjectCategory: "general",
  salary: 4000,
  otherRequirements:
    "Highly experienced tutors are requested to apply , Time: 4.30pm Loc: opposite khilgaon city Corporation office",
  tuitionType: "home",
}

type IconBoxProps = {
  icon: React.ReactNode
  label: string
  value: string | number
  accent?: "pink" | "default"
}

function IconBox({ icon, label, value, accent = "default" }: IconBoxProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
        <span
          className={
            accent === "pink"
              ? "text-pink-600 dark:text-pink-400"
              : "text-slate-700 dark:text-slate-300"
          }
        >
          {icon}
        </span>
        <span>{label}</span>
      </div>
      <p
        className={
          "mt-1.5 text-base font-bold " +
          (accent === "pink"
            ? "text-pink-600 dark:text-pink-400"
            : "text-slate-800 dark:text-slate-100")
        }
      >
        {value}
      </p>
    </div>
  )
}

function ShareButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string
  onClick?: () => void
  className: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Share on ${label}`}
      className={
        "inline-flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm transition hover:opacity-90 " +
        className
      }
    >
      {children}
    </button>
  )
}

export default function JobDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [applied, setApplied] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)

  const job = useMemo<JobDetailProps>(() => {
    const rawId = params?.id
    const numericId = Number(rawId)
    if (!Number.isNaN(numericId)) {
      const match = ALL_JOBS.find((j) => j.id === numericId)
      if (match) return buildDetailFromJob(match)
    }
    return FALLBACK_JOB
  }, [params])

  const handleApply = () => {
    setApplied(true)
  }

  const handleDirections = () => {
    const q = encodeURIComponent(job.location)
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${q}`, "_blank", "noopener")
  }

  const handleViewLocation = () => {
    const q = encodeURIComponent(job.location)
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, "_blank", "noopener")
  }

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `${job.title} at ${job.location} - Salary: ${formatSalary(job.salary)} Tk`
    )
    const url = encodeURIComponent(
      typeof window === "undefined" ? "" : `${window.location.origin}/jobs/${job.id}`
    )
    window.open(`https://wa.me/?text=${text}%20${url}`, "_blank", "noopener")
  }

  const handleShareFacebook = () => {
    const url = encodeURIComponent(
      typeof window === "undefined" ? "" : `${window.location.origin}/jobs/${job.id}`
    )
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "noopener")
  }

  const handleShareTwitter = () => {
    const text = encodeURIComponent(job.title)
    const url = encodeURIComponent(
      typeof window === "undefined" ? "" : `${window.location.origin}/jobs/${job.id}`
    )
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
      "noopener"
    )
  }

  const handleCopyLink = async () => {
    const shareUrl =
      typeof window === "undefined" ? "" : `${window.location.origin}/jobs/${job.id}`
    try {
      if (navigator.share) {
        await navigator.share({
          title: job.title,
          text: `${job.location} · ${formatSalary(job.salary)} Tk`,
          url: shareUrl,
        })
        setShareCopied(true)
      } else {
        await navigator.clipboard.writeText(shareUrl)
        setShareCopied(true)
      }
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl)
        setShareCopied(true)
      } catch {
        // clipboard unavailable; ignore
      }
    } finally {
      window.setTimeout(() => setShareCopied(false), 1800)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-6 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-[1280px] px-3 md:px-5">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main content */}
          <main className="min-w-0 space-y-5">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
              <header className="text-center">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-800 md:text-3xl dark:text-slate-50">
                  {job.title}
                </h1>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                  <span>
                    Job ID: <span className="font-semibold text-slate-700 dark:text-slate-300">{job.id}</span>
                  </span>
                  <span>·</span>
                  <span>
                    Posted:{" "}
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {formatLongDate(job.postedAt)}
                    </span>
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <Eye className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    {job.views} Views
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    {job.applications} Applications
                  </span>
                </div>

                <div className="mt-5 flex flex-col items-center gap-1">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500 shadow-sm dark:bg-red-500/10 dark:text-red-400">
                    <MapPin className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <p className="text-lg font-bold text-slate-700 md:text-xl dark:text-slate-200">
                    {job.location}
                  </p>
                </div>
              </header>

              {/* 3 column info grid */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <IconBox
                  icon={<House className="h-4 w-4" strokeWidth={2.2} />}
                  label="Medium"
                  value={job.medium}
                />
                <IconBox
                  icon={<BadgeCheck className="h-4 w-4" strokeWidth={2.2} />}
                  label="Class"
                  value={job.className}
                />
                <IconBox
                  icon={<UserRound className="h-4 w-4" strokeWidth={2.2} />}
                  label="Student Gender"
                  value={job.studentGender}
                />
                <IconBox
                  icon={<UserRound className="h-4 w-4" strokeWidth={2.2} />}
                  label="Tutor Gender"
                  value={job.tutorGender}
                  accent="pink"
                />
                <IconBox
                  icon={<CalendarDays className="h-4 w-4" strokeWidth={2.2} />}
                  label="Tutoring Days"
                  value={job.tutoringDays}
                />
                <IconBox
                  icon={<Clock3 className="h-4 w-4" strokeWidth={2.2} />}
                  label="Time"
                  value={job.time}
                />
                <IconBox
                  icon={<Clock3 className="h-4 w-4" strokeWidth={2.2} />}
                  label="Duration"
                  value={job.duration}
                />
                <IconBox
                  icon={<UsersRound className="h-4 w-4" strokeWidth={2.2} />}
                  label="Students"
                  value={job.students}
                />
              </div>

              {/* Subjects */}
              <div className="mt-8">
                <p className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                  Subjects:
                  <span
                    className={
                      "inline-flex rounded-md px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide " +
                      SUBJECT_STYLES[job.subjectCategory]
                    }
                  >
                    {job.subject === "All Subjects" ? "ALL" : job.subject}
                  </span>
                </p>
              </div>

              {/* Salary */}
              <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/80 px-6 py-6 dark:border-emerald-500/20 dark:bg-emerald-500/5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-blue-600 dark:text-blue-400">
                    <Wallet className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      Salary
                    </p>
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-extrabold leading-none text-blue-600 md:text-4xl dark:text-blue-400">
                        {formatSalary(job.salary)}
                      </span>
                      <span className="pb-0.5 text-lg font-bold text-blue-600 dark:text-blue-400">
                        Tk
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Per Month
                    </p>
                  </div>
                </div>
              </div>

              {/* Other Requirements */}
              <div className="mt-8">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-100">
                  <FileText className="h-5 w-5 text-slate-700 dark:text-slate-200" strokeWidth={2.2} />
                  Other Requirements
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {job.otherRequirements}
                </p>
              </div>
            </article>

            {/* Back button */}
            <Link
              href="/jobs"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-slate-50"
              onClick={() => router.push("/jobs")}
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                strokeWidth={2.2}
              />
              Back to All Jobs
            </Link>
          </main>

          {/* Sidebar */}
          <aside className="min-w-0 lg:sticky lg:top-20 lg:self-start">
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
              <div className="text-center">
                <p className="text-sm font-extrabold text-red-500 dark:text-red-400">
                  Account Progress 80% Required!
                </p>
              </div>

              <button
                type="button"
                onClick={handleApply}
                disabled={applied}
                className={
                  "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-extrabold text-white shadow-md transition " +
                  (applied
                    ? "bg-emerald-600"
                    : "bg-emerald-600 hover:bg-emerald-700 active:translate-y-px")
                }
              >
                {applied ? (
                  <>
                    <BadgeCheck className="h-5 w-5" strokeWidth={2.4} />
                    Applied
                  </>
                ) : (
                  "Apply Now"
                )}
              </button>

              <button
                type="button"
                onClick={handleDirections}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-base font-extrabold text-white shadow-md transition hover:bg-blue-700 active:translate-y-px"
              >
                <Navigation className="h-5 w-5" strokeWidth={2.4} />
                Directions
              </button>

              <button
                type="button"
                onClick={handleViewLocation}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8b1d6b] via-[#9333ea] to-[#701a75] px-4 py-3 text-base font-extrabold text-white shadow-md transition hover:opacity-95 active:translate-y-px"
              >
                <MapPin className="h-5 w-5" strokeWidth={2.4} />
                Location
              </button>

              <div className="pt-1">
                <p className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-200">
                  Share
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  <ShareButton label="WhatsApp" onClick={handleShareWhatsApp} className="bg-green-500 hover:bg-green-600">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.92 0-2.65-1.03-5.13-2.9-6.99A9.81 9.81 0 0 0 12.04 2Zm5.46 14.21c-.24.67-1.38 1.27-1.93 1.35-.49.07-1.12.09-1.82-.12-.42-.13-.96-.31-1.66-.61a10.2 10.2 0 0 1-2.44-1.61 11.77 11.77 0 0 1-1.8-2.47c-.46-.77-.81-1.33-.93-1.75-.17-.61-.04-.95.12-1.25.15-.27.4-.35.54-.35h.39c.15 0 .35-.06.54.44.19.53.65 1.83.71 1.97.06.14.1.3.02.48-.09.22-.13.35-.27.53-.13.18-.28.4-.4.54-.14.16-.28.34-.12.66.15.32.69 1.14 1.49 1.84 1.01.88 1.87 1.15 2.14 1.28.27.13.43.11.59-.07.16-.18.68-.79.87-1.06.18-.27.37-.22.62-.14.25.09 1.62.77 1.9.92.28.14.46.21.52.33.07.11.07.64-.17 1.31Z" />
                    </svg>
                  </ShareButton>

                  <ShareButton label="Facebook" onClick={handleShareFacebook} className="bg-blue-600 hover:bg-blue-700">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
                      <path d="M13.5 22v-8h2.7l.4-3.2H13.5V8.75c0-.93.26-1.56 1.58-1.56h1.68V4.26a22.2 22.2 0 0 0-2.45-.13c-2.42 0-4.08 1.48-4.08 4.2V10.8H7.5V14h2.73v8H13.5Z" />
                    </svg>
                  </ShareButton>

                  <ShareButton label="Twitter" onClick={handleShareTwitter} className="bg-sky-500 hover:bg-sky-600">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
                      <path d="M18.244 2H21.5l-7.55 8.63L22.5 22h-6.88l-5.4-6.92L3.99 22H.73l8.07-9.22L1.5 2h7.05l4.89 6.34L18.24 2Zm-1.2 18h1.9L7.07 3.91H5.05L17.04 20Z" />
                    </svg>
                  </ShareButton>

                  <ShareButton
                    label="Save / Copy link"
                    onClick={handleCopyLink}
                    className={
                      shareCopied
                        ? "bg-slate-700 hover:bg-slate-800"
                        : "bg-red-500 hover:bg-red-600"
                    }
                  >
                    {shareCopied ? (
                      <BadgeCheck className="h-4.5 w-4.5" strokeWidth={2.4} />
                    ) : (
                      <Share2 className="h-4.5 w-4.5" strokeWidth={2.4} />
                    )}
                  </ShareButton>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

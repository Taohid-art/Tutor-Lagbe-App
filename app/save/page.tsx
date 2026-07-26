"use client"

import { useMemo, useState, type ReactNode } from "react"
import {
  BadgeCheck,
  BookmarkCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Copy,
  GraduationCap,
  House,
  LaptopMinimal,
  MapPin,
  MonitorPlay,
  Search,
  Share2,
  UserRound,
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

type SavedTutorJob = {
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
  savedAt: string
}

const now = Date.now()
const minutesAgo = (minutes: number) => new Date(now - minutes * 60 * 1000).toISOString()
const hoursAgo = (hours: number) => new Date(now - hours * 60 * 60 * 1000).toISOString()
const daysAgo = (days: number) => new Date(now - days * 24 * 60 * 60 * 1000).toISOString()

const SAVED_JOBS: SavedTutorJob[] = [
  {
    id: 53780,
    location: "Matikata, Dhaka",
    district: "Dhaka",
    title: "Tutor Needed For Arabic",
    tuitionType: "home",
    medium: "Religious Studies",
    className: "Islamic studies",
    preference: "Select Gender",
    tutoringDays: "5 Days/Week",
    subject: "Quran for Adult",
    subjectCategory: "arabic",
    salary: 3000,
    postedAt: minutesAgo(9),
    savedAt: hoursAgo(1),
  },
  {
    id: 53779,
    location: "Mirpur 2 (60 feet), Dhaka",
    district: "Dhaka",
    title: "Tutor Needed For Bangla Medium",
    tuitionType: "home",
    medium: "Bangla Medium",
    className: "KG",
    preference: "Female",
    tutoringDays: "5 Days/Week",
    subject: "All Subjects",
    subjectCategory: "general",
    salary: 3000,
    postedAt: minutesAgo(17),
    savedAt: hoursAgo(2),
  },
  {
    id: 53774,
    location: "Mohammadpur, Dhaka",
    district: "Dhaka",
    title: "Online Chemistry Tutor Needed",
    tuitionType: "online",
    medium: "English Medium",
    className: "O-Level",
    preference: "Select Gender",
    tutoringDays: "3 Days/Week",
    subject: "Chemistry",
    subjectCategory: "chemistry",
    salary: 7000,
    postedAt: hoursAgo(5),
    savedAt: hoursAgo(3),
  },
  {
    id: 53770,
    location: "Banani, Dhaka",
    district: "Dhaka",
    title: "Tutor Needed For IELTS Preparation",
    tuitionType: "online",
    medium: "English Medium",
    className: "University Graduate",
    preference: "Select Gender",
    tutoringDays: "4 Days/Week",
    subject: "English",
    subjectCategory: "english",
    salary: 5500,
    postedAt: daysAgo(1),
    savedAt: hoursAgo(8),
  },
  {
    id: 53769,
    location: "Pallabi, Dhaka",
    district: "Dhaka",
    title: "Tutor Needed For Class 6 Bangla Medium",
    tuitionType: "home",
    medium: "Bangla Medium",
    className: "Class 6",
    preference: "Female",
    tutoringDays: "4 Days/Week",
    subject: "Bangla",
    subjectCategory: "bangla",
    salary: 3200,
    postedAt: daysAgo(1),
    savedAt: daysAgo(1),
  },
  {
    id: 53765,
    location: "Chawkbazar, Chattogram",
    district: "Chattogram",
    title: "Tutor Needed For HSC Physics",
    tuitionType: "home",
    medium: "Bangla Medium",
    className: "HSC 1st Year",
    preference: "Male",
    tutoringDays: "4 Days/Week",
    subject: "Physics",
    subjectCategory: "physics",
    salary: 6200,
    postedAt: daysAgo(2),
    savedAt: daysAgo(1),
  },
  {
    id: 53763,
    location: "Sonadanga, Khulna",
    district: "Khulna",
    title: "Tutor Needed For Spoken Arabic",
    tuitionType: "online",
    medium: "Religious Studies",
    className: "Adult Learner",
    preference: "Select Gender",
    tutoringDays: "3 Days/Week",
    subject: "Arabic",
    subjectCategory: "arabic",
    salary: 3500,
    postedAt: daysAgo(3),
    savedAt: daysAgo(2),
  },
  {
    id: 53761,
    location: "Rajshahi City, Rajshahi",
    district: "Rajshahi",
    title: "Tutor Needed For SSC Chemistry",
    tuitionType: "home",
    medium: "Bangla Medium",
    className: "SSC",
    preference: "Male",
    tutoringDays: "3 Days/Week",
    subject: "Chemistry",
    subjectCategory: "chemistry",
    salary: 4500,
    postedAt: daysAgo(4),
    savedAt: daysAgo(2),
  },
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

const tuitionOptions = [
  { value: "all", label: "All Tuition", icon: <BadgeCheck className="h-3.5 w-3.5" /> },
  { value: "home", label: "Home Tuition", icon: <House className="h-3.5 w-3.5" /> },
  { value: "online", label: "Online Tuition", icon: <LaptopMinimal className="h-3.5 w-3.5" /> },
] as const

const preferenceOptions = [
  { value: "all", label: "All", icon: <UserRound className="h-3.5 w-3.5" /> },
  { value: "male", label: "Male", icon: <UserRound className="h-3.5 w-3.5" /> },
  { value: "female", label: "Female", icon: <UserRound className="h-3.5 w-3.5" /> },
] as const

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

function formatRelativeTime(isoDate: string) {
  const diff = Date.now() - new Date(isoDate).getTime()
  const minutes = Math.max(1, Math.floor(diff / (1000 * 60)))
  if (minutes < 60) return `${minutes} minutes ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`

  const days = Math.floor(hours / 24)
  return `${days} ${days === 1 ? "day" : "days"} ago`
}

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate))
}

function formatSalary(amount: number) {
  return amount.toLocaleString("en-US")
}

function FilterSection({
  title,
  tag,
  children,
}: {
  title: string
  tag: string
  children: ReactNode
}) {
  return (
    <section className="rounded-[26px] border border-fuchsia-100 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-fuchsia-700 dark:text-fuchsia-300">{title}</h2>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{tag}</span>
      </div>
      {children}
    </section>
  )
}

function FilterOption({
  label,
  selected,
  icon,
  onClick,
}: {
  label: string
  selected: boolean
  icon: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-fuchsia-50 dark:hover:bg-slate-800"
    >
      <span className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
        <span
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-md border transition",
            selected
              ? "border-fuchsia-700 bg-fuchsia-700 text-white dark:border-fuchsia-500 dark:bg-fuchsia-500"
              : "border-slate-300 bg-white text-transparent dark:border-slate-600 dark:bg-slate-900"
          )}
        >
          <svg viewBox="0 0 10 8" className="h-2.5 w-2.5 fill-none stroke-current stroke-[2.2]">
            <path d="M1 4 4 7 9 1" />
          </svg>
        </span>
        <span>{label}</span>
      </span>
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-300">
        {icon}
      </span>
    </button>
  )
}

function InfoBlock({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <span className="text-slate-800 dark:text-slate-300">{icon}</span>
        <span>{label}</span>
      </p>
      <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">{value}</div>
    </div>
  )
}

function SavedJobCard({
  job,
  copied,
  onRemove,
  onShare,
}: {
  job: SavedTutorJob
  copied: boolean
  onRemove: () => void
  onShare: () => void
}) {
  return (
    <article className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition hover:border-fuchsia-300 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none dark:hover:border-fuchsia-500/60">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <MapPin className="h-4 w-4 text-fuchsia-700 dark:text-fuchsia-300" />
              <span>{job.location}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{job.title}</h3>
          </div>
          <div className="flex items-center gap-2 self-start">
            <button
              type="button"
              onClick={onRemove}
              className="inline-flex items-center gap-2 rounded-xl border border-fuchsia-200 bg-fuchsia-50 px-3 py-2 text-sm font-semibold text-fuchsia-700 transition hover:bg-fuchsia-100 dark:border-fuchsia-500/30 dark:bg-fuchsia-500/10 dark:text-fuchsia-300 dark:hover:bg-fuchsia-500/20"
            >
              <BookmarkCheck className="h-4 w-4" />
              <span>Saved</span>
            </button>
            <button
              type="button"
              onClick={onShare}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition",
                copied
                  ? "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300"
                  : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-500/40 dark:hover:text-sky-300"
              )}
            >
              {copied ? <Copy className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              <span>{copied ? "Copied" : "Share"}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white",
              job.tuitionType === "home" ? "bg-fuchsia-700" : "bg-cyan-600"
            )}
          >
            {job.tuitionType === "home" ? <House className="h-4 w-4" /> : <MonitorPlay className="h-4 w-4" />}
            {job.tuitionType === "home" ? "Home Tutoring" : "Online Tutoring"}
          </span>
          <span className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white">
            <Clock3 className="h-4 w-4" />
            {formatRelativeTime(job.postedAt)}
          </span>
          <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white">
            <BookmarkCheck className="h-4 w-4" />
            Saved {formatRelativeTime(job.savedAt)}
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <InfoBlock icon={<House className="h-4 w-4" />} label="Medium:" value={job.medium} />
          <InfoBlock icon={<BadgeCheck className="h-4 w-4" />} label="Class:" value={job.className} />
          <InfoBlock icon={<UserRound className="h-4 w-4" />} label="Preferred Tutor:" value={job.preference} />
          <InfoBlock icon={<CalendarDays className="h-4 w-4" />} label="Tutoring Days:" value={job.tutoringDays} />
          <InfoBlock
            icon={<GraduationCap className="h-4 w-4" />}
            label="Subject:"
            value={
              <span className={cn("inline-flex rounded-md px-2.5 py-1 text-xs font-bold uppercase", SUBJECT_STYLES[job.subjectCategory])}>
                {job.subject}
              </span>
            }
          />
          <InfoBlock
            icon={<Wallet className="h-4 w-4" />}
            label="Salary:"
            value={
              <div className="flex items-end gap-1">
                <span className="text-4xl font-extrabold leading-none text-blue-600">{formatSalary(job.salary)}</span>
                <span className="pb-0.5 text-lg font-bold text-blue-600">Tk</span>
                <span className="pb-0.5 text-base text-slate-400">/Month</span>
              </div>
            }
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base font-semibold text-slate-500 dark:text-slate-400">Posted at: {formatDate(job.postedAt)}</p>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-700 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-200 transition hover:translate-y-[-1px] dark:shadow-none"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  )
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  const pages = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    const items: Array<number | "..."> = [1]
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    if (start > 2) items.push("...")
    for (let page = start; page <= end; page += 1) items.push(page)
    if (end < totalPages - 1) items.push("...")

    items.push(totalPages)
    return items
  }, [currentPage, totalPages])

  return (
    <div className="flex max-md:mb-10 flex-wrap items-center justify-center gap-2 rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-fuchsia-300 hover:text-fuchsia-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:border-fuchsia-500 dark:hover:text-fuchsia-300"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-1 text-slate-400 dark:text-slate-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              "flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition",
              page === currentPage
                ? "border-fuchsia-700 bg-fuchsia-700 text-white dark:border-fuchsia-500 dark:bg-fuchsia-500"
                : "border-slate-200 bg-white text-slate-600 hover:border-fuchsia-300 hover:text-fuchsia-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-fuchsia-500 dark:hover:text-fuchsia-300"
            )}
          >
            {page}
          </button>
        )
      )}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-fuchsia-300 hover:text-fuchsia-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:border-fuchsia-500 dark:hover:text-fuchsia-300"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

export default function SavePage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [jobIdQuery, setJobIdQuery] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [tuitionType, setTuitionType] = useState<"all" | TuitionType>("all")
  const [preference, setPreference] = useState<"all" | "male" | "female">("all")
  const [district, setDistrict] = useState("all")
  const [savedJobIds, setSavedJobIds] = useState<number[]>(SAVED_JOBS.map((job) => job.id))
  const [copiedJobId, setCopiedJobId] = useState<number | null>(null)

  const districts = useMemo(
    () => ["all", ...Array.from(new Set(SAVED_JOBS.map((job) => job.district))).sort()],
    []
  )

  const savedJobs = useMemo(
    () => SAVED_JOBS.filter((job) => savedJobIds.includes(job.id)),
    [savedJobIds]
  )

  const filteredJobs = useMemo(() => {
    return savedJobs.filter((job) => {
      if (jobIdQuery.trim() && !String(job.id).includes(jobIdQuery.trim())) return false
      if (tuitionType !== "all" && job.tuitionType !== tuitionType) return false
      if (preference !== "all" && job.preference.toLowerCase() !== preference) return false
      if (district !== "all" && job.district !== district) return false

      const savedDate = job.savedAt.slice(0, 10)
      if (startDate && savedDate < startDate) return false
      if (endDate && savedDate > endDate) return false

      return true
    })
  }, [district, endDate, jobIdQuery, preference, savedJobs, startDate, tuitionType])

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * perPage
  const pagedJobs = filteredJobs.slice(startIndex, startIndex + perPage)
  const displayFrom = filteredJobs.length === 0 ? 0 : startIndex + 1
  const displayTo = filteredJobs.length === 0 ? 0 : startIndex + pagedJobs.length

  const resetFilters = () => {
    setJobIdQuery("")
    setStartDate("")
    setEndDate("")
    setTuitionType("all")
    setPreference("all")
    setDistrict("all")
    setPage(1)
  }

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleRemoveSave = (jobId: number) => {
    setSavedJobIds((current) => current.filter((id) => id !== jobId))
  }

  const handleShare = async (jobId: number) => {
    const shareUrl =
      typeof window === "undefined"
        ? `/jobs?job=${jobId}`
        : `${window.location.origin}/jobs?job=${jobId}`

    try {
      if (navigator.share) {
        await navigator.share({
          title: "TutorLagbe Saved Job",
          text: `Check this saved tutor job: ${jobId}`,
          url: shareUrl,
        })
      } else {
        await navigator.clipboard.writeText(shareUrl)
        setCopiedJobId(jobId)
        window.setTimeout(() => {
          setCopiedJobId((current) => (current === jobId ? null : current))
        }, 1500)
      }
    } catch {
      await navigator.clipboard.writeText(shareUrl)
      setCopiedJobId(jobId)
      window.setTimeout(() => {
        setCopiedJobId((current) => (current === jobId ? null : current))
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto flex w-full max-w-[1560px] flex-col gap-5 px-4 py-5 lg:flex-row">
        <aside className="w-full lg:sticky lg:top-20 lg:w-[280px] lg:self-start">
          <div className="space-y-2">
            <FilterSection title="Saved Job Id" tag="Quick Lookup">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input
                  value={jobIdQuery}
                  onChange={(event) => {
                    setJobIdQuery(event.target.value)
                    setPage(1)
                  }}
                  placeholder="Enter saved job id..."
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-300 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-fuchsia-500 dark:focus:bg-slate-900"
                />
              </div>
            </FilterSection>

            <FilterSection title="Saved By Date" tag="Optional">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(event) => {
                      setStartDate(event.target.value)
                      setPage(1)
                    }}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-fuchsia-300 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-fuchsia-500 dark:focus:bg-slate-900"
                  />
                </div>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(event) => {
                      setEndDate(event.target.value)
                      setPage(1)
                    }}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-fuchsia-300 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-fuchsia-500 dark:focus:bg-slate-900"
                  />
                </div>
              </div>
            </FilterSection>

            <FilterSection title="Tuition Type" tag="Choose One">
              <div className="space-y-1">
                {tuitionOptions.map((option) => (
                  <FilterOption
                    key={option.value}
                    label={option.label}
                    icon={option.icon}
                    selected={tuitionType === option.value}
                    onClick={() => {
                      setTuitionType(option.value)
                      setPage(1)
                    }}
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Tutor Preference" tag="Gender">
              <div className="space-y-1">
                {preferenceOptions.map((option) => (
                  <FilterOption
                    key={option.value}
                    label={option.label}
                    icon={option.icon}
                    selected={preference === option.value}
                    onClick={() => {
                      setPreference(option.value)
                      setPage(1)
                    }}
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Select District" tag="Start Local">
              <select
                value={district}
                onChange={(event) => {
                  setDistrict(event.target.value)
                  setPage(1)
                }}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base font-semibold text-slate-700 outline-none transition focus:border-fuchsia-300 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-fuchsia-500 dark:focus:bg-slate-900"
              >
                {districts.map((item) => (
                  <option key={item} value={item}>
                    {item === "all" ? "All" : item}
                  </option>
                ))}
              </select>
            </FilterSection>
          </div>
        </aside>

        <main className="min-w-0 flex-1 space-y-1">
          <section className="rounded-[22px] border border-slate-200 bg-white px-5 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Your saved tutor jobs with filtering, share, and pagination.</p>
                <p className="text-base text-slate-600 dark:text-slate-300">
                  Showing <span className="font-bold text-slate-900 dark:text-slate-100">{displayFrom}-{displayTo}</span> of{" "}
                  <span className="font-bold text-slate-900 dark:text-slate-100">{filteredJobs.length}</span> saved jobs
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center justify-center rounded-xl border border-fuchsia-200 px-4 py-2.5 text-sm font-semibold text-fuchsia-700 transition hover:bg-fuchsia-50 dark:border-fuchsia-500/30 dark:text-fuchsia-300 dark:hover:bg-fuchsia-500/10"
                >
                  Reset Filters
                </button>
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  <span>Show:</span>
                  <select
                    value={perPage}
                    onChange={(event) => {
                      setPerPage(Number(event.target.value))
                      setPage(1)
                    }}
                    className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-fuchsia-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-fuchsia-500"
                  >
                    <option value={10}>10</option>
                    <option value={12}>12</option>
                    <option value={15}>15</option>
                  </select>
                </label>
              </div>
            </div>
          </section>

          {pagedJobs.length === 0 ? (
            <section className="rounded-[26px] border border-dashed border-slate-300 bg-white px-6 py-20 text-center shadow-[0_10px_24px_rgba(15,23,42,0.05)] dark:border-slate-700 dark:bg-slate-950 dark:shadow-none">
              <p className="text-xl font-semibold text-slate-700 dark:text-slate-100">No saved jobs found.</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Try resetting the filters or save more jobs from the jobs page.</p>
            </section>
          ) : (
            <div className="space-y-4">
              {pagedJobs.map((job) => (
                <SavedJobCard
                  key={job.id}
                  job={job}
                  copied={copiedJobId === job.id}
                  onRemove={() => handleRemoveSave(job.id)}
                  onShare={() => void handleShare(job.id)}
                />
              ))}
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </main>
      </div>
    </div>
  )
}

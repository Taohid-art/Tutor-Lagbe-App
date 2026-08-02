"use client"


import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

type Step = 1 | 2 | 3

type RoleKey = "Male" | "Female" | "Any"

const GENDER_OPTIONS: RoleKey[] = ["Male", "Female", "Any"]

const MEDIUMS = [
  "Bangla Medium",
  "English Medium",
  "English Version",
  "Religious Studies",
  "Bangla Version",
  "Admission Test",
  "University",
] as const

const CLASSES = [
  "Play",
  "Nursery",
  "KG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "SSC",
  "HSC 1st Year",
  "HSC 2nd Year",
  "HSC",
  "O-Level",
  "A-Level",
  "University Admission",
  "University Graduate",
  "Adult Learner",
] as const

const SUBJECTS = [
  "General Maths",
  "Higher Maths",
  "Physics",
  "Chemistry",
  "Biology",
  "Bangla",
  "English",
  "English Grammar",
  "ICT",
  "Bangladesh Studies",
  "World Studies",
  "Quran",
  "Arabic",
  "Hadith",
  "Fiqh",
  "Accounting",
  "Finance",
  "Statistics",
  "Economics",
  "All Subjects",
] as const

const TUTORING_TYPES = ["Home", "Online", "Hybrid"] as const
const DAYS_OPTIONS = [
  "1 Day/Week",
  "2 Days/Week",
  "3 Days/Week",
  "4 Days/Week",
  "5 Days/Week",
  "6 Days/Week",
  "7 Days/Week",
] as const

const TIME_OPTIONS = [
  "Morning (6:00 AM - 12:00 PM)",
  "Afternoon (12:00 PM - 4:00 PM)",
  "Evening (4:00 PM - 8:00 PM)",
  "Night (8:00 PM - 11:00 PM)",
  "Negotiable",
] as const

const SALARY_RANGES = [
  "1,500 - 2,500 Tk",
  "2,500 - 4,000 Tk",
  "4,000 - 6,000 Tk",
  "6,000 - 8,000 Tk",
  "8,000 - 10,000 Tk",
  "10,000 - 15,000 Tk",
  "15,000+ Tk",
  "Negotiable",
] as const

const DISTRICTS = [
  "Dhaka",
  "Narsingdi",
  "Gazipur",
  "Narayanganj",
  "Brahmanbaria",
  "Comilla",
  "Mymensingh",
  "Tangail",
  "Chattogram",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Rangpur",
  "Barishal",
  "Cumilla",
  "Bogura",
  "Jamalpur",
] as const

const AREAS_BY_DISTRICT: Record<(typeof DISTRICTS)[number], readonly string[]> = {
  Dhaka: [
    "Dhanmondi",
    "Gulshan",
    "Banani",
    "Uttara",
    "Mirpur",
    "Bashundhara",
    "Motijheel",
    "Khilgaon",
    "Shyamoli",
    "Mohammadpur",
    "Wari",
    "Nikunja",
    "Pallabi",
    "Khilkhet",
    "Baridhara",
    "Matikata",
    "Shantinagar",
  ],
  Narsingdi: ["Madhabdi", "Palash", "Monohardi", "Raipura", "Belabo"],
  Gazipur: ["Gazipur Sadar", "Tongi", "Kaliganj", "Sreepur"],
  Narayanganj: ["Narayanganj Sadar", "Fatullah", "Rupganj", "Araihazar"],
  Brahmanbaria: [
    "Brahmanbaria Sadar",
    "Akhaura",
    "Ashuganj",
    "Sarail",
    "Nasirnagar",
  ],
  Comilla: ["Comilla Sadar", "Cantonment", "Burichong", "Lalmai"],
  Cumilla: ["Cumilla Sadar", "Cantonment", "Burichong"],
  Mymensingh: ["Mymensingh Sadar", "Fulbaria", "Trishal", "Bhaluka"],
  Tangail: ["Tangail Sadar", "Kalihati", "Sakhipur", "Basail"],
  Chattogram: [
    "Pahartali",
    "Khulshi",
    "Agrabad",
    "Nasirabad",
    "Panchlaish",
    "Chawkbazar",
  ],
  Sylhet: ["Sylhet Sadar", "Ambarkhana", "Dargah Gate", "Zindabazar"],
  Rajshahi: ["Rajshahi City", "Shaheb Bazar", "Motihar"],
  Khulna: ["Sonadanga", "Khalishpur", "Khulna City"],
  Rangpur: ["Rangpur City", "Saidpur", "Dinajpur Road"],
  Barishal: ["Barishal City", "Bangabandhu Udyan"],
  Bogura: ["Bogura Sadar", "Satmatha", "Nawabbari"],
  Jamalpur: ["Jamalpur Sadar", "Melandaha", "Islampur"],
} as const

const STUDENT_COUNT_OPTIONS = ["1", "2", "3", "4", "5+"] as const

const STEPS: { key: Step; label: string }[] = [
  { key: 1, label: "Student Details" },
  { key: 2, label: "Tuition Info" },
  { key: 3, label: "Tutor Details" },
]



const SCHEMA = z
  .object({
    // Step 1 - Student Details
    studentName: z.string().min(2, "Student name must be at least 2 characters"),
    numberOfStudents: z
      .enum(STUDENT_COUNT_OPTIONS, { message: "Please select number of students" }),
    studentGender: z
      .enum(["Male", "Female", "Other"], { message: "Please select gender" }),
    institute: z.string().min(2, "Institute must be at least 2 characters"),
    district: z.enum(DISTRICTS, { message: "Please select district" }),
    area: z.string().min(1, "Please select area"),
    locationDetails: z
      .string()
      .min(10, "Location details should be at least 10 characters"),
    // Step 2 - Tuition Info
    medium: z.enum(MEDIUMS, { message: "Please select a medium" }),
    className: z.enum(CLASSES, { message: "Please select student class" }),
    subjects: z
      .array(z.enum(SUBJECTS), { message: "Please select at least one subject" })
      .min(1, "Please select at least one subject"),
    tutoringType: z.enum(TUTORING_TYPES, { message: "Please select tutoring type" }),
    // Step 3 - Tutor Details
    preferredTutorGender: z.enum(GENDER_OPTIONS, {
      message: "Please select preferred teacher gender",
    }),
    daysPerWeek: z.enum(DAYS_OPTIONS, { message: "Please select days per week" }),
    tutoringTime: z.enum(TIME_OPTIONS, { message: "Please select tutoring time" }),
    salaryRange: z.enum(SALARY_RANGES, { message: "Please select salary range" }),
    extraInformation: z.string().max(1000, "Extra info too long (max 1000 chars)"),
  })
  .superRefine((v, ctx) => {
    if (!(DISTRICTS as unknown as readonly string[]).includes(v.district)) return
    const allowedAreas = AREAS_BY_DISTRICT[v.district] ?? []
    if (!allowedAreas.includes(v.area)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Area does not belong to selected district",
        path: ["area"],
      })
    }
  })

type FormValues = z.infer<typeof SCHEMA>

const DEFAULT_VALUES: FormValues = {
  studentName: "",
  numberOfStudents: "1",
  studentGender: "Male",
  institute: "",
  district: "Narsingdi",
  area: "Madhabdi",
  locationDetails: "",
  medium: "Bangla Medium",
  className: "Class 9",
  subjects: [],
  tutoringType: "Home",
  preferredTutorGender: "Any",
  daysPerWeek: "5 Days/Week",
  tutoringTime: "Afternoon (12:00 PM - 4:00 PM)",
  salaryRange: "4,000 - 6,000 Tk",
  extraInformation: "",
}

export default function CreateTutorRequestPage() {
  const [step, setStep] = useState<Step>(1)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedDistrict, setSelectedDistrict] =
    useState<(typeof DISTRICTS)[number]>("Narsingdi")
  const [tutorRequestPosted, setTutorRequestPosted] = useState(false)

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(SCHEMA) as never,
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  })

  const availableAreas = useMemo(
    () =>
      (AREAS_BY_DISTRICT[selectedDistrict] as readonly string[] | undefined) ?? [],
    [selectedDistrict]
  )

  function toggleSubject(name: string, fromDropdown: boolean) {
    setSelectedSubjects((prev) => {
      const exists = prev.includes(name)
      const next = exists ? prev.filter((s) => s !== name) : [...prev, name]
      setValue("subjects" as const, next as FormValues["subjects"], {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: step === 2,
      })
      if (fromDropdown && !exists) {
        // Clear dropdown visual selection
        const el = document.getElementById(
          "subjects-dropdown"
        ) as HTMLSelectElement | null
        if (el) el.value = ""
      }
      return next
    })
  }

  function onDistrictChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value as (typeof DISTRICTS)[number]
    setSelectedDistrict(val)
    const fallbacks = AREAS_BY_DISTRICT[val] ?? []
    const fallbackArea = fallbacks[0] ?? ""
    ;(register("district" as const)
      .onChange as unknown as (e: React.ChangeEvent<HTMLSelectElement>) => void)(e)
    setValue("area", fallbackArea, {
      shouldDirty: true,
      shouldValidate: step === 1,
    })
  }

  async function goNext() {
    const fieldsToValidate: (keyof FormValues)[] =
      step === 1
        ? [
            "studentName",
            "numberOfStudents",
            "studentGender",
            "institute",
            "district",
            "area",
            "locationDetails",
          ]
        : step === 2
          ? ["medium", "className", "subjects", "tutoringType"]
          : [
              "preferredTutorGender",
              "daysPerWeek",
              "tutoringTime",
              "salaryRange",
            ]
    const ok = await trigger(fieldsToValidate, { shouldFocus: true })
    if (!ok) return
    if (step === 2 && selectedSubjects.length < 1) {
      setError("subjects" as never, {
        message: "Please select at least one subject",
      })
      return
    }
    setStep((s) => (Math.min(3, s + 1) as Step))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function goPrev() {
    if (step === 1) return
    setStep((s) => (Math.max(1, s - 1) as Step))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function onSubmit(values: FormValues) {
    console.log("Tutor request payload:", values)
    setTutorRequestPosted(true)
    window.setTimeout(() => {
      setTutorRequestPosted(false)
      reset(DEFAULT_VALUES)
      setSelectedSubjects([])
      setSelectedDistrict("Narsingdi")
      setStep(1)
      window.location.href = "/jobs"
    }, 1200)
  }

  const stepTitle =
    step === 1
      ? { heading: "STUDENT DETAILS", subheading: "Tell about student and location" }
      : step === 2
        ? { heading: "TUITION INFO", subheading: "Your preferred tuition related info" }
        : { heading: "TUTOR DETAILS", subheading: "Preferred Tutors Type and Time" }

  return (
    <main className="min-h-screen w-full  text-slate-900  dark:text-slate-100">
      {/* ====== Sidebar ====== */}
      
        {/* ====== Content ====== */}
        <section className="space-y-2 min-w-0">
          {/* Stepper */}
          <div className="rounded-2xl bg-white mt-1 p-2 sm:p-3 shadow-[0_6px_20px_-12px_rgba(15,23,42,0.25)] ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
            <ol className="grid grid-cols-3 items-start gap-3 sm:gap-6">
              {STEPS.map((s) => {
                const isActive = step === s.key
                const isDone = step > s.key
                return (
                  <li key={s.key} className="relative">
                    
                    <div className="flex flex-col items-center text-center gap-2">
                      <button
                        type="button"
                        onClick={() => s.key < step && setStep(s.key)}
                        className={cn(
                          "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ring-[6px] transition-all",
                          isDone
                            ? "bg-emerald-500 text-white ring-emerald-100 shadow-[0_10px_20px_-10px_rgba(16,185,129,0.7)] dark:ring-emerald-950"
                            : isActive
                              ? "bg-sky-600 text-white ring-sky-100 shadow-[0_10px_20px_-10px_rgba(2,132,199,0.75)] dark:ring-sky-950"
                              : "bg-white text-slate-600 ring-sky-100 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-800"
                        )}
                      >
                        {isDone ? (
                          <Check className="h-5 w-5" strokeWidth={3.2} />
                        ) : (
                          s.key
                        )}
                      </button>
                      <span
                        className={cn(
                          "text-xs sm:text-sm font-bold",
                          isActive
                            ? "text-sky-700 dark:text-sky-400"
                            : isDone
                              ? "text-emerald-700 dark:text-emerald-400"
                              : "text-slate-500 dark:text-slate-400"
                        )}
                      >
                        {s.label}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          {/* Form card */}
          <div className="rounded-2xl bg-white shadow-[0_10px_30px_-14px_rgba(15,23,42,0.3)] ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10 overflow-hidden">
            <div className="border-b border-slate-100 px-6 py-6 sm:px-10 sm:py-7 text-center dark:border-slate-800">
              <h2 className="text-xl sm:text-2xl font-black tracking-[0.12em] text-slate-800 dark:text-slate-100">
                {stepTitle.heading}
              </h2>
              <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                {stepTitle.subheading}
              </p>
            </div>

            {tutorRequestPosted ? (
              <div className="px-6 py-12 sm:px-10 text-center space-y-4">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 ring-4 ring-emerald-500/10 dark:text-emerald-400">
                  <Check className="h-9 w-9" strokeWidth={3} />
                </div>
                <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
                  Tutor request submitted!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Redirecting you to posted jobs…
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-7 px-6 py-7 sm:px-10 sm:py-9"
                noValidate
              >
                {step === 1 && (
                  <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
                    {/* Student Name */}
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        Student Name
                      </label>
                      <Input
                        {...register("studentName")}
                        defaultValue="Taohid"
                        className="h-11 rounded-md border-slate-200 px-3 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:text-slate-100"
                      />
                      {errors.studentName?.message && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {errors.studentName.message}
                        </p>
                      )}
                    </div>

                    {/* Number of Student */}
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        Number of Student
                      </label>
                      <Select
                        {...register("numberOfStudents")}
                        defaultValue="1"
                        className="h-11 rounded-md border-slate-200 text-slate-800 focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:text-slate-100"
                      >
                        {STUDENT_COUNT_OPTIONS.map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </Select>
                      {errors.numberOfStudents?.message && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {errors.numberOfStudents.message}
                        </p>
                      )}
                    </div>

                    {/* Student Gender */}
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        Select Student Gender
                      </label>
                      <Select
                        {...register("studentGender")}
                        defaultValue="Male"
                        className="h-11 rounded-md border-slate-200 text-slate-800 focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:text-slate-100"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Select>
                      {errors.studentGender?.message && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {errors.studentGender.message}
                        </p>
                      )}
                    </div>

                    {/* Institute */}
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        Institute
                      </label>
                      <Input
                        {...register("institute")}
                        defaultValue="Sun Rise kg school"
                        placeholder="ex: Ideal School & College"
                        className="h-11 rounded-md border-slate-200 px-3 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:text-slate-100"
                      />
                      {errors.institute?.message && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {errors.institute.message}
                        </p>
                      )}
                    </div>

                    {/* District */}
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        Select District
                      </label>
                      <Select
                        {...(register("district" as const) as unknown as Record<string, unknown>)}
                        defaultValue={selectedDistrict}
                        onChange={onDistrictChange}
                        className="h-11 rounded-md border-slate-200 text-slate-800 focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:text-slate-100"
                      >
                        <option value="" disabled>
                          Select District
                        </option>
                        {DISTRICTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </Select>
                      {errors.district?.message && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {errors.district.message}
                        </p>
                      )}
                    </div>

                    {/* Area */}
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        Select Area
                      </label>
                      <Select
                        {...register("area")}
                        defaultValue={availableAreas[0] ?? ""}
                        className="h-11 rounded-md border-slate-200 text-slate-800 focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:text-slate-100"
                      >
                        <option value="" disabled>
                          Select Area
                        </option>
                        {availableAreas.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </Select>
                      {errors.area?.message && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {errors.area.message}
                        </p>
                      )}
                    </div>

                    {/* Location Details */}
                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        Location Details
                      </label>
                      <Textarea
                        {...register("locationDetails")}
                        rows={3}
                        placeholder="Ex: Road-08, House-07, Block-D, Mirpur-06"
                        className="rounded-md border-slate-200 px-3 py-3 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:text-slate-100"
                      />
                      {errors.locationDetails?.message && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {errors.locationDetails.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
                    {/* Medium */}
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        Select Your Medium
                      </label>
                      <Select
                        {...register("medium")}
                        defaultValue="Bangla Medium"
                        className="h-11 rounded-md border-slate-200 text-slate-800 focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:text-slate-100"
                      >
                        {MEDIUMS.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </Select>
                      {errors.medium?.message && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {errors.medium.message}
                        </p>
                      )}
                    </div>

                    {/* Class */}
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        Select Student Class
                      </label>
                      <Select
                        {...register("className")}
                        defaultValue="Class 9"
                        className="h-11 rounded-md border-slate-200 text-slate-800 focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:text-slate-100"
                      >
                        {CLASSES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </Select>
                      {errors.className?.message && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {errors.className.message}
                        </p>
                      )}
                    </div>

                    {/* Subjects - chips */}
                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        Select Subject
                      </label>

                      <div className="relative rounded-md border border-slate-200 dark:border-slate-700 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/30 transition">
                        <div className="flex flex-wrap items-center gap-2 p-2.5 min-h-[48px]">
                          {selectedSubjects.length === 0 && (
                            <span className="pointer-events-none px-1.5 text-sm text-slate-400">
                              Choose subjects using the dropdown (right)
                            </span>
                          )}
                          {selectedSubjects.map((s) => (
                            <span
                              key={s}
                              className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
                            >
                              {s}
                              <button
                                type="button"
                                onClick={() => toggleSubject(s, false)}
                                aria-label={`Remove ${s}`}
                                className="inline-flex h-4.5 w-4.5 items-center justify-center rounded-sm text-slate-500 hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-white transition"
                              >
                                <X className="h-3.5 w-3.5" strokeWidth={2.8} />
                              </button>
                            </span>
                          ))}

                          <Select
                            id="subjects-dropdown"
                            defaultValue=""
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                              if (e.target.value) {
                                toggleSubject(e.target.value, true)
                              }
                            }}
                            className="ml-auto h-9 min-w-[160px] rounded-md border-0 shadow-none focus:ring-0 sm:min-w-[200px]"
                          >
                            <option value="" disabled>
                              Add subject…
                            </option>
                            {SUBJECTS.map((s) => {
                              const chosen = selectedSubjects.includes(s)
                              return (
                                <option key={s} value={s} disabled={chosen}>
                                  {s}
                                  {chosen ? " (added)" : ""}
                                </option>
                              )
                            })}
                          </Select>
                        </div>
                      </div>
                      {errors.subjects?.message && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {errors.subjects.message as string}
                        </p>
                      )}
                      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                        Added: <span className="font-semibold">{selectedSubjects.length}</span>{" "}
                        subject{selectedSubjects.length === 1 ? "" : "s"}
                      </p>
                    </div>

                    {/* Tutoring Type */}
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        Select Tutoring Type
                      </label>
                      <Select
                        {...register("tutoringType")}
                        defaultValue="Home"
                        className="h-11 rounded-md border-slate-200 text-slate-800 focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:text-slate-100 ring-2 ring-sky-500/10 dark:ring-sky-500/10"
                      >
                        {TUTORING_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </Select>
                      {errors.tutoringType?.message && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {errors.tutoringType.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
                    {/* Preferred Tutor Gender */}
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        Preferred Teacher Gender
                      </label>
                      <Select
                        {...register("preferredTutorGender")}
                        defaultValue="Any"
                        className="h-11 rounded-md border-slate-200 text-slate-800 focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:text-slate-100"
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        {GENDER_OPTIONS.map((g) => (
                          <option key={g} value={g}>
                            {g === "Any" ? "Any gender (no preference)" : g}
                          </option>
                        ))}
                      </Select>
                      {errors.preferredTutorGender?.message && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {errors.preferredTutorGender.message}
                        </p>
                      )}
                    </div>

                    {/* Days Per Week */}
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        Days Per Week
                      </label>
                      <Select
                        {...register("daysPerWeek")}
                        defaultValue=""
                        className="h-11 rounded-md border-slate-200 text-slate-800 focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:text-slate-100"
                      >
                        <option value="" disabled>
                          Please select your Day
                        </option>
                        {DAYS_OPTIONS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </Select>
                      {errors.daysPerWeek?.message && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {errors.daysPerWeek.message}
                        </p>
                      )}
                    </div>

                    {/* Tutoring Time */}
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        Tutoring Time
                      </label>
                      <Select
                        {...register("tutoringTime")}
                        defaultValue=""
                        className="h-11 rounded-md border-slate-200 text-slate-800 focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:text-slate-100"
                      >
                        <option value="" disabled>
                          Select Tutoring Time
                        </option>
                        {TIME_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </Select>
                      {errors.tutoringTime?.message && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {errors.tutoringTime.message}
                        </p>
                      )}
                    </div>

                    {/* Salary */}
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        Salary range
                      </label>
                      <Select
                        {...register("salaryRange")}
                        defaultValue=""
                        className="h-11 rounded-md border-slate-200 text-slate-800 focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:text-slate-100"
                      >
                        <option value="" disabled>
                          Please select Salary Range
                        </option>
                        {SALARY_RANGES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </Select>
                      {errors.salaryRange?.message && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {errors.salaryRange.message}
                        </p>
                      )}
                    </div>

                    {/* Extra Information */}
                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200 text-right">
                        Extra Information
                      </label>
                      <Textarea
                        {...register("extraInformation")}
                        rows={4}
                        placeholder="Any extra requirements, special preferences, availability, etc. (optional)"
                        className="rounded-md border-slate-200 px-3 py-3 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:text-slate-100"
                      />
                      {errors.extraInformation?.message && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {errors.extraInformation.message}
                        </p>
                      )}
                      <p className="mt-1.5 text-right text-xs text-slate-400">
                        {getValues("extraInformation")?.length ?? 0} / 1000
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer actions */}
                <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-3">
                    {step !== 1 && (
                      <Button
                        type="button"
                        onClick={goPrev}
                        className="h-11 px-6 rounded-xl bg-slate-300 text-slate-800 hover:bg-slate-400 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 shadow-md font-extrabold tracking-wide"
                      >
                        <ArrowLeft className="mr-1.5 h-4.5 w-4.5" strokeWidth={2.4} />
                        Previous
                      </Button>
                    )}

                    {step !== 3 && (
                      <Button
                        type="button"
                        onClick={goNext}
                        className="h-11 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-[0_12px_30px_-12px_rgba(14,165,233,0.9)] hover:brightness-110 active:translate-y-px font-extrabold tracking-wide"
                      >
                        Next
                        <ArrowRight className="ml-1.5 h-4.5 w-4.5" strokeWidth={2.4} />
                      </Button>
                    )}
                  </div>

                  {step === 3 && (
                    <div className="flex flex-wrap gap-3 sm:justify-end w-full sm:w-auto">
                      <Button
                        type="button"
                        onClick={goPrev}
                        className="h-11 px-6 rounded-xl bg-slate-300 text-slate-800 hover:bg-slate-400 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 shadow-md font-extrabold tracking-wide"
                      >
                        <ArrowLeft className="mr-1.5 h-4.5 w-4.5" strokeWidth={2.4} />
                        Previous
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting || tutorRequestPosted}
                        className="h-11 px-8 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-[0_14px_32px_-12px_rgba(14,165,233,0.95)] hover:brightness-110 active:translate-y-px disabled:opacity-70 font-extrabold tracking-wide"
                      >
                        {isSubmitting ? "Submitting…" : "Submit"}
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>
        </section>
      
    </main>
  )
}

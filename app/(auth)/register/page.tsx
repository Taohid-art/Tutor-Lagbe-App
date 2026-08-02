"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  GraduationCap,
  MapPin,
  Shield,
  UserCog2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { useAppDispatch } from "@/store/hooks"
import { login as setLoggedIn } from "@/store/slices/authSlice"

type Role = "tutor" | "guardian"
type Gender = "Male" | "Female" | "Other"

type TutorFields = {
  tuitionDistrict: string
  currentArea: string
  preferredTuitionArea: string
}

type BaseFields = {
  role: Role
  name: string
  gender: Gender | ""
  email: string
  phone: string
  password: string
  confirmPassword: string
}

type RegisterValues = BaseFields & Partial<TutorFields>

const genderSchema = z.enum(["Male", "Female", "Other"], {
  message: "Please select a gender",
})

const baseSchema = z.object({
  role: z.enum(["tutor", "guardian"]),
  name: z.string().min(2, "Name must be at least 2 characters"),
  gender: z
    .union([z.literal(""), genderSchema], {
      message: "Please select a gender",
    })
    .refine((v) => v !== "", "Please select a gender"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .regex(/^[\d+\-\s()]+$/, "Phone number can only contain digits and + - ( )"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(64, "Password is too long"),
  confirmPassword: z.string(),
  tuitionDistrict: z.string().optional(),
  currentArea: z.string().optional(),
  preferredTuitionArea: z.string().optional(),
})

const registerSchema = baseSchema
  .superRefine((v, ctx) => {
    if (v.role === "tutor") {
      if (!v.tuitionDistrict) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select a district",
          path: ["tuitionDistrict"],
        })
      }
      if (!v.currentArea) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select your location",
          path: ["currentArea"],
        })
      }
      if (!v.preferredTuitionArea) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select a preferred tuition area",
          path: ["preferredTuitionArea"],
        })
      }
    }
    if (v.password !== v.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      })
    }
  }) satisfies z.ZodSchema<RegisterValues>

const roles: {
  key: Role
  label: string
  icon: typeof GraduationCap
}[] = [
  { key: "tutor", label: "Tutor", icon: UserCog2 },
  { key: "guardian", label: "Guardian", icon: GraduationCap },
]

const districts = [
  "Dhaka",
  "Narsingdi",
  "Gazipur",
  "Narayanganj",
  "Brahmanbaria",
  "Comilla",
  "Mymensingh",
  "Tangail",
  "Chittagong",
  "Sylhet",
]

const areasByDistrict: Record<string, string[]> = {
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
  Mymensingh: ["Mymensingh Sadar", "Fulbaria", "Trishal", "Bhaluka"],
  Tangail: ["Tangail Sadar", "Kalihati", "Sakhipur", "Basail"],
  Chittagong: ["Pahartali", "Khulshi", "Agrabad", "Nasirabad", "Panchlaish"],
  Sylhet: ["Sylhet Sadar", "Ambarkhana", "Dargah Gate", "Zindabazar"],
}

const preferredTuitionAreas = [
  "Anywhere in district",
  "Madhabdi",
  "Palash",
  "Velmager",
  "Brahmanbaria",
  "Narsingdi Town",
  "Monohardi",
  "Raipura",
  "Mirpur",
  "Uttara",
  "Banani",
  "Gulshan",
  "Dhanmondi",
]

const genders = ["Male", "Female", "Other"]

export default function RegisterPage() {
  const [role, setRole] = useState<Role>("tutor")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")
  const dispatch = useAppDispatch()

  function buildValues(nextRole: Role): RegisterValues {
    const base: BaseFields = {
      role: nextRole,
      name: "",
      gender: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    }
    if (nextRole === "tutor") {
      return {
        ...base,
        tuitionDistrict: "",
        currentArea: "",
        preferredTuitionArea: "",
      } as RegisterValues
    }
    return base as RegisterValues
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema) as unknown as never,
    defaultValues: buildValues(role),
    mode: "onSubmit",
  })

  function onRoleChange(nextRole: Role) {
    setRole(nextRole)
    reset(buildValues(nextRole))
    setSelectedDistrict("")
  }

  const currentAreas = selectedDistrict
    ? areasByDistrict[selectedDistrict] ?? []
    : []

  function onSubmit(values: RegisterValues) {
    dispatch(
      setLoggedIn({
        email: values.email,
        name: values.name,
      })
    )
    window.setTimeout(() => {
      window.location.href = "/"
    }, 0)
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-r from-[#f6effd] via-white to-[#f7f1fa] px-4 py-10 dark:from-[#0f0618] dark:via-slate-950 dark:to-[#12081c]">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#8b1d6b] via-[#9333ea] to-[#701a75]" />

      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-[0_30px_80px_-20px_rgba(99,102,241,0.35)] backdrop-blur-sm ring-1 ring-slate-900/5 dark:border-white/10 dark:bg-slate-900/60 dark:ring-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.9fr]">
          {/* Promo panel */}
          <section className="relative flex flex-col justify-between overflow-hidden p-8 md:p-12 text-white bg-[radial-gradient(circle_at_top_left,rgba(147,51,234,0.25),transparent_55%),linear-gradient(135deg,#0a2560_0%,#0e4b7d_50%,#0f6b68_100%)]">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-purple-500/20 blur-3xl" />

            <div className="inline-flex w-full items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/85 backdrop-blur-md">
              <Shield className="h-3.5 w-3.5" />
              Create your account
            </div>

            <div className="mt-10 space-y-4">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                Join Tutor Sheba
              </h1>
              <p className="max-w-md text-sm leading-6 text-white/80 md:text-base">
                Create a tutor or student account in a few steps and start using your dashboard right away.
              </p>
            </div>

            <div className="mt-10 flex-1 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="relative mx-auto flex aspect-square w-full max-w-sm items-end justify-center">
                <div className="absolute inset-0 mx-auto my-auto h-[85%] w-[85%] rounded-full bg-gradient-to-br from-purple-500/25 to-purple-700/15" />

                {/* Mobile phone mockup */}
                <div className="relative z-10 mx-auto mb-6 h-[78%] w-[34%] rounded-[2.6rem] bg-slate-950 p-2 shadow-[0_40px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
                  <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-gradient-to-b from-slate-50 via-white to-slate-200">
                    {/* Status bar */}
                    <div className="mx-auto mt-1 h-1.5 w-24 rounded-full bg-slate-950" />
                    {/* Phone header purple bar */}
                    <div className="mt-2 h-2.5 w-full bg-[#5b21b6]" />
                    {/* Avatar circle */}
                    <div className="mx-auto mt-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#8b1d6b] to-[#701a75] shadow-lg ring-4 ring-white">
                      <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-white">
                        <circle cx="12" cy="8.5" r="4" fill="currentColor" opacity="0.95" />
                        <path
                          d="M4.5 21c.9-4.2 4-6.5 7.5-6.5s6.6 2.3 7.5 6.5"
                          fill="currentColor"
                          opacity="0.95"
                        />
                      </svg>
                    </div>
                    {/* Inputs */}
                    <div className="mt-6 space-y-3 px-5">
                      <div className="h-4 w-24 rounded bg-slate-400/55" />
                      <div className="h-6 w-full rounded-md bg-slate-200/90 ring-1 ring-slate-300/70" />
                      <div className="h-4 w-28 rounded bg-slate-400/55" />
                      <div className="h-6 w-full rounded-md bg-slate-200/90 ring-1 ring-slate-300/70" />
                    </div>
                    {/* Divider */}
                    <div className="mx-5 mt-6 h-1 w-16 rounded-full bg-[#8b1d6b]" />
                  </div>
                  {/* Home button */}
                  <div className="absolute bottom-1.5 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-[#a855f7]" />
                </div>

                {/* Person standing */}
                <div className="absolute bottom-0 left-4 z-20 h-[68%] w-[32%]">
                  {/* Head */}
                  <div className="absolute left-6 top-0 h-12 w-12 rounded-full bg-[#f4d4c3] shadow-md ring-2 ring-white" />
                  {/* Hair */}
                  <div className="absolute left-5 -top-1 h-7 w-[62%] rounded-t-full bg-slate-900 rotate-[-3deg]" />
                  {/* Body (shirt) */}
                  <div className="absolute top-11 left-0 h-20 w-full rounded-t-[1.7rem] rounded-b-[1.4rem] bg-[#8b1d6b]/90 shadow-lg" />
                  {/* Stripes overlay */}
                  <div className="absolute top-[52px] left-2 h-14 w-[calc(100%-1.1rem)] space-y-2">
                    <div className="h-1.5 w-full rounded-full bg-white/75" />
                    <div className="h-1.5 w-full rounded-full bg-white/75" />
                    <div className="h-1.5 w-full rounded-full bg-white/75" />
                    <div className="h-1.5 w-[70%] rounded-full bg-white/75" />
                  </div>
                  {/* Arms */}
                  <div className="absolute top-14 left-[-22%] h-5 w-[52%] rounded-full bg-[#8b1d6b]/90 rotate-[-22deg]" />
                  <div className="absolute top-16 right-[-18%] h-5 w-[55%] rounded-full bg-[#8b1d6b]/90 rotate-[26deg]" />
                  {/* Hands */}
                  <div className="absolute top-16 left-[-20%] h-4.5 w-5 rounded-full bg-[#f4d4c3]" />
                  <div className="absolute top-16 right-[-12%] h-4.5 w-5 rounded-full bg-[#f4d4c3]" />
                  {/* Pants */}
                  <div className="absolute bottom-0 left-4 h-20 w-3 rounded-t bg-[#581c87]" />
                  <div className="absolute bottom-0 left-10 h-20 w-3 rounded-t bg-[#581c87]" />
                  {/* Shoes */}
                  <div className="absolute -bottom-1 left-0 h-3 w-10 rounded-full bg-white ring-1 ring-slate-300 shadow" />
                  <div className="absolute -bottom-1 right-7 h-3 w-10 rounded-full bg-white ring-1 ring-slate-300 shadow" />
                </div>

                {/* Leaves */}
                <div className="absolute right-0 bottom-16 z-10 flex flex-col items-end gap-1.5 rotate-[-18deg]">
                  {[30, 38, 44, 38, 30].map((w, i) => (
                    <div
                      key={i}
                      className="h-3 rounded-r-full rounded-l-sm bg-gradient-to-l from-purple-500 to-purple-700 shadow"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                  <div className="h-16 w-1.5 rounded-full bg-purple-900/90" />
                </div>

                {/* Pot */}
                <div className="absolute bottom-0 right-2 z-10 h-7 w-10 rounded-b-xl rounded-t-md bg-gradient-to-b from-purple-500 to-purple-800 shadow ring-1 ring-purple-900/40" />
              </div>
            </div>
          </section>

          {/* Form panel */}
          <section className="flex flex-col justify-center bg-white p-8 md:p-12 dark:bg-slate-900">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[#701a75] dark:bg-slate-800 dark:text-purple-300">
                <Shield className="h-3.5 w-3.5" />
                Register
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M9.5 12.5 11 14 14.5 10.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Quick setup
              </span>
            </div>

            <div className="mt-6 space-y-1.5">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 md:text-[2.15rem]">
                Create your account
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Select your role and fill in a few details to continue.
              </p>
            </div>

            {/* Role switcher */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {roles.map(({ key, label, icon: Icon }) => {
                const active = role === key
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => onRoleChange(key)}
                    className={cn(
                      "group relative flex items-center justify-center gap-2 rounded-2xl border px-4 py-3.5 text-sm font-bold transition-all",
                      active
                        ? "border-[#8b1d6b]/70 bg-gradient-to-br from-white via-purple-50 to-white shadow-[0_8px_30px_rgba(139,29,107,0.18)] ring-2 ring-[#8b1d6b]/30 text-slate-900 dark:bg-slate-800 dark:text-slate-50"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition",
                        active
                          ? "bg-gradient-to-br from-[#8b1d6b] to-[#701a75] text-white"
                          : "bg-gradient-to-br from-slate-900 to-slate-700 text-white dark:from-slate-700 dark:to-slate-800"
                      )}
                    >
                      <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
                    </span>
                    <span>{label}</span>
                    {active && (
                      <span className="absolute right-3 top-3 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white ring-4 ring-white dark:ring-slate-900">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-5"
            >
              {/* Row 1 */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                    Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <Input
                    {...register("name")}
                    placeholder="Name..."
                    className="h-12 rounded-xl border-slate-200 px-4 text-slate-800 placeholder:text-slate-400 dark:border-slate-700 dark:text-slate-100"
                  />
                  {errors.name?.message && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                    Gender
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <Select
                    {...register("gender")}
                    className="h-12 rounded-xl border-slate-200 text-slate-800 dark:border-slate-700 dark:text-slate-100"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Choose One
                    </option>
                    {genders.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </Select>
                  {errors.gender?.message && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.gender.message as string}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                    Email
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <Input
                    {...register("email")}
                    type="email"
                    inputMode="email"
                    placeholder="ex: user@gmail.com"
                    className="h-12 rounded-xl border-slate-200 px-4 text-slate-800 placeholder:text-slate-400 dark:border-slate-700 dark:text-slate-100"
                  />
                  {errors.email?.message && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                    Phone
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <Input
                    {...register("phone")}
                    type="tel"
                    inputMode="tel"
                    placeholder="01XXXXXXXXXX"
                    className="h-12 rounded-xl border-slate-200 px-4 text-slate-800 placeholder:text-slate-400 dark:border-slate-700 dark:text-slate-100"
                  />
                  {errors.phone?.message && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Tutor-only fields */}
              {role === "tutor" && (
                <div className="space-y-5 rounded-2xl border border-dashed border-purple-200 bg-gradient-to-br from-purple-50/50 to-white p-5 dark:border-purple-800/50 dark:from-purple-950/30 dark:to-slate-900">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        Tuition District
                        <span className="ml-1 text-red-500">*</span>
                      </label>
                      <Select
                        {...(register("tuitionDistrict" as const) as unknown as Record<string, unknown>)}
                        className="h-12 rounded-xl border-slate-200 text-slate-800 dark:border-slate-700 dark:text-slate-100"
                        defaultValue=""
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          ;(register("tuitionDistrict" as const).onChange as unknown as (e: React.ChangeEvent<HTMLSelectElement>) => void)(e)
                          setValue("currentArea" as const, "", { shouldDirty: true })
                          setSelectedDistrict(e.target.value)
                        }}
                      >
                        <option value="" disabled>
                          Select District
                        </option>
                        {districts.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </Select>
                      {errors.tuitionDistrict?.message && (
                        <p className="mt-1 text-xs font-medium text-red-500">
                          {errors.tuitionDistrict.message as string}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                        Your Location
                        <span className="ml-1 text-red-500">*</span>
                      </label>
                      <Select
                        {...(register("currentArea" as const) as unknown as Record<string, unknown>)}
                        className="h-12 rounded-xl border-slate-200 text-slate-800 dark:border-slate-700 dark:text-slate-100"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Area
                        </option>
                        {currentAreas.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </Select>
                      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        Set your current location.
                      </p>
                      {errors.currentArea?.message && (
                        <p className="mt-1 text-xs font-medium text-red-500">
                          {errors.currentArea.message as string}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                      Preferred Tuition Area
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                    <Select
                      {...(register("preferredTuitionArea" as const) as unknown as Record<string, unknown>)}
                      className="h-12 rounded-xl border-slate-200 text-slate-800 dark:border-slate-700 dark:text-slate-100"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select...
                      </option>
                      {preferredTuitionAreas.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </Select>
                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      Set your preferred tuition area.
                    </p>
                    {errors.preferredTuitionArea?.message && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {errors.preferredTuitionArea.message as string}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Passwords row */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                    Password
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="h-12 rounded-xl border-slate-200 px-4 pr-11 text-slate-800 placeholder:text-slate-400 dark:border-slate-700 dark:text-slate-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4.5 w-4.5" />
                      ) : (
                        <Eye className="h-4.5 w-4.5" />
                      )}
                    </button>
                  </div>
                  {errors.password?.message && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                    Re-Password
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      {...register("confirmPassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter Password..."
                      className="h-12 rounded-xl border-slate-200 px-4 pr-11 text-slate-800 placeholder:text-slate-400 dark:border-slate-700 dark:text-slate-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((s) => !s)}
                      aria-label={showConfirmPassword ? "Hide re-password" : "Show re-password"}
                      className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4.5 w-4.5" />
                      ) : (
                        <Eye className="h-4.5 w-4.5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword?.message && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.confirmPassword.message as string}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-xl bg-gradient-to-r from-[#8b1d6b] via-[#a21caf] to-[#701a75] text-base font-extrabold tracking-wide text-white shadow-[0_14px_35px_-12px_rgba(139,29,107,0.8)] transition active:translate-y-px hover:brightness-110 disabled:opacity-70"
              >
                Create account
                <ArrowRight className="ml-1.5 h-4.5 w-4.5" strokeWidth={2.4} />
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              <p className="mb-1">Already have an account?</p>
              <Link
                href="/login"
                className="text-base font-extrabold text-[#701a75] hover:text-[#8b1d6b] dark:text-purple-300 dark:hover:text-purple-200"
              >
                Sign in
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

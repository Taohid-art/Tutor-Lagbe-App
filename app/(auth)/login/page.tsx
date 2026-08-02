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
  Mail,
  Shield,
  UserCog2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/store/hooks"
import { login as setLoggedIn } from "@/store/slices/authSlice"

type Role = "tutor" | "guardian"

const loginSchema = z.object({
  identifier: z
    .string()
    .min(5, "Please enter a valid email or phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
})

type LoginValues = z.infer<typeof loginSchema>

const roles: {
  key: Role
  label: string
  icon: typeof GraduationCap
}[] = [
  { key: "tutor", label: "Tutor", icon: UserCog2 },
  { key: "guardian", label: "Guardian", icon: GraduationCap },
]

export default function LoginPage() {
  const [role, setRole] = useState<Role>("tutor")
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "", remember: false },
    mode: "onSubmit",
  })

  function onSubmit(values: LoginValues) {
    const looksLikeEmail = /\S+@\S+\.\S+/.test(values.identifier)
    if (looksLikeEmail && !z.string().email().safeParse(values.identifier).success) {
      setError("identifier", { message: "Invalid email address" })
      return
    }

    const defaultName = role === "tutor" ? "Tutor" : "Guardian"
    dispatch(
      setLoggedIn({
        email: looksLikeEmail ? values.identifier : `${values.identifier}@sms.local`,
        name: `${defaultName} User`,
      })
    )

    window.setTimeout(() => {
      // Simulate redirect: navigate to home after login
      window.location.href = "/"
    }, 0)
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden  px-4 py-10 ">

      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-[0_30px_80px_-20px_rgba(99,102,241,0.35)] backdrop-blur-sm ring-1 ring-slate-900/5 dark:border-white/10 dark:bg-slate-900/60 dark:ring-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.9fr]">
          {/* Promo card */}
          <section className="relative flex flex-col justify-between overflow-hidden p-8 md:p-12 text-white bg-[radial-gradient(circle_at_top_left,rgba(147,51,234,0.25),transparent_55%),linear-gradient(135deg,#0a2560_0%,#0e4b7d_50%,#0f6b68_100%)]">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-purple-500/20 blur-3xl" />

            <div className="inline-flex w-full items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/85 backdrop-blur-md">
              <Shield className="h-3.5 w-3.5" />
              Secure access
            </div>

            <div className="mt-10 space-y-4">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                Welcome back
              </h1>
              <p className="max-w-md text-sm leading-6 text-white/80 md:text-base">
                Sign in as a tutor or student to continue with your dashboard.
              </p>
            </div>

            <div className="mt-10 flex-1 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="relative mx-auto flex aspect-square w-full max-w-sm items-end justify-center">
                <div className="absolute inset-0 mx-auto my-auto h-[85%] w-[85%] rounded-full bg-gradient-to-br from-white/20 to-white/5" />

                {/* Laptop */}
                <div className="relative z-10 h-[85%] w-[90%]">
                  <div className="absolute bottom-4 left-1/2 h-[72%] w-[78%] -translate-x-1/2 rounded-[1.4rem] rounded-t-[1.6rem] rounded-b-[2.2rem] bg-slate-900 shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
                    <div className="absolute left-1/2 top-1.5 h-1 w-16 -translate-x-1/2 rounded-full bg-slate-700/80" />
                    {/* Screen */}
                    <div className="absolute inset-3 rounded-2xl rounded-t-xl bg-gradient-to-b from-slate-50 via-white to-slate-200 p-5 overflow-hidden">
                      {/* Top bar */}
                      <div className="flex items-end justify-between gap-2">
                        <div className="h-16 w-16 rounded-md bg-gradient-to-tr from-[#8b1d6b] to-[#9333ea] p-1.5 rotate-[-18deg] translate-y-2 shadow-md">
                          <div className="flex h-full flex-col gap-1">
                            <div className="h-1.5 w-full rounded bg-white/90" />
                            <div className="h-1 w-4/5 rounded bg-white/70" />
                            <div className="h-1 w-3/5 rounded bg-white/50" />
                            <div className="flex-1 rounded bg-white/20" />
                          </div>
                        </div>
                        <div className="h-6 w-6 rounded-md bg-[#701a75] rotate-12 translate-y-1">
                          <Check className="h-5 w-5 text-white" strokeWidth={3} />
                        </div>
                      </div>

                      {/* Login window */}
                      <div className="mt-6 mx-auto rounded-2xl rounded-br-3xl rounded-tl-3xl bg-white shadow-xl ring-1 ring-slate-900/5 overflow-hidden border border-purple-100 transform rotate-[3deg]">
                        <div className="bg-gradient-to-r from-[#8b1d6b] to-[#9333ea] px-5 py-2.5 text-[13px] font-bold text-white/95">
                          Sign In
                        </div>
                        <div className="space-y-3 p-5">
                          <div className="h-3 w-14 rounded bg-slate-400/50" />
                          <div className="h-7 w-full rounded-md bg-slate-200/80 ring-1 ring-slate-300/60" />
                          <div className="h-3 w-20 rounded bg-slate-400/50" />
                          <div className="h-7 w-full rounded-md bg-slate-200/80 ring-1 ring-slate-300/60" />
                          <button
                            type="button"
                            className="h-8 w-full rounded-md bg-gradient-to-r from-[#8b1d6b] to-[#701a75] text-[11px] font-bold text-white shadow"
                          >
                            Login
                          </button>
                          <div className="h-2.5 w-20 mx-auto rounded bg-[#8b1d6b]/60" />
                        </div>
                      </div>

                      {/* Lock icon below laptop screen */}
                      <div className="absolute bottom-8 left-6 h-16 w-14 rounded-lg rounded-b-none bg-gradient-to-b from-[#a855f7] to-[#7e22ce] flex items-start justify-center shadow-lg rotate-[-8deg]">
                        <div className="mt-3.5 h-4 w-4 rounded-full border-2 border-white" />
                        <div className="absolute top-2 h-5 w-4 rounded-t-full border-[3px] border-white border-b-transparent" />
                        <div className="absolute bottom-3 h-2 w-2 rounded-full bg-white" />
                      </div>
                    </div>
                    {/* Keyboard */}
                    <div className="absolute -bottom-7 left-1/2 h-7 w-[120%] -translate-x-1/2 rounded-b-[1.2rem] rounded-t-md bg-slate-800 shadow-2xl ring-1 ring-white/10" />
                  </div>
                </div>

                {/* Person */}
                <div className="absolute right-0 top-16 z-20 h-[58%] w-[38%]">
                  {/* Head */}
                  <div className="absolute left-4 top-0 h-14 w-14 rounded-full bg-[#f4d4c3] ring-2 ring-white shadow-lg" />
                  {/* Hair */}
                  <div className="absolute left-2 -top-0.5 h-8 w-[60%] rounded-t-full bg-slate-900 rotate-[4deg]" />
                  {/* Glasses */}
                  <div className="absolute left-6 top-5 h-3 w-10 flex gap-1">
                    <span className="block h-full w-4 rounded-full border-2 border-slate-900" />
                    <span className="block h-full w-4 rounded-full border-2 border-slate-900" />
                  </div>
                  {/* Body */}
                  <div className="absolute bottom-0 left-0 h-[72%] w-full rounded-t-[1.6rem] rounded-tr-[2rem] bg-slate-800 shadow-xl" />
                  {/* Arms holding laptop */}
                  <div className="absolute bottom-16 left-[-28%] h-6 w-[60%] rounded-full bg-slate-800 rotate-[22deg]" />
                  <div className="absolute bottom-12 right-[-14%] h-6 w-[55%] rounded-full bg-slate-800 rotate-[-18deg]" />
                  {/* Hands */}
                  <div className="absolute bottom-20 left-[-26%] h-5 w-6 rounded-full bg-[#f4d4c3]" />
                  <div className="absolute bottom-14 right-[-12%] h-5 w-6 rounded-full bg-[#f4d4c3]" />
                  {/* Pants */}
                  <div className="absolute bottom-0 left-3 h-20 w-3 rounded-t bg-slate-700" />
                  <div className="absolute bottom-0 left-9 h-20 w-3 rounded-t bg-slate-700" />
                  {/* Shoes */}
                  <div className="absolute -bottom-1 left-0 h-3 w-10 rounded-full bg-white ring-1 ring-slate-300 shadow" />
                  <div className="absolute -bottom-1 right-8 h-3 w-10 rounded-full bg-white ring-1 ring-slate-300 shadow" />
                </div>

                {/* Key */}
                <div className="absolute bottom-10 left-2 z-10 h-14 w-14 -rotate-[18deg]">
                  <div className="absolute right-0 top-0 h-9 w-9 rounded-full border-[6px] border-[#7e22ce]" />
                  <div className="absolute right-8 top-4 h-2 w-8 rounded-full bg-[#7e22ce]" />
                  <div className="absolute right-11 top-6 h-3 w-1.5 rounded-full bg-[#7e22ce]" />
                  <div className="absolute right-13 top-7 h-2.5 w-1 rounded-full bg-[#7e22ce]" />
                </div>

                {/* Pen */}
                <div className="absolute bottom-3 right-14 z-10 h-14 w-2 rotate-[-30deg] rounded-full bg-slate-900 shadow" />
                <div className="absolute bottom-1 right-12 z-10 h-4 w-2 rotate-[-30deg] rounded-b-full bg-purple-600" />

                {/* Leaves */}
                <div className="absolute right-[-16px] bottom-28 z-10 flex flex-col items-end gap-1.5 rotate-[18deg]">
                  {[26, 34, 40, 34, 28].map((w, i) => (
                    <div
                      key={i}
                      className="h-3 rounded-l-full rounded-r-sm bg-gradient-to-r from-purple-500 to-purple-700 shadow"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                  <div className="h-14 w-1.5 rounded-full bg-purple-900/90" />
                </div>

                {/* Check mark card */}
                <div className="absolute top-6 right-0 z-30 flex h-12 w-12 items-center justify-center rounded-xl rotate-12 bg-white shadow-xl ring-1 ring-slate-900/5">
                  <div className="h-7 w-7 rounded-full bg-[#701a75] flex items-center justify-center">
                    <Check className="h-4.5 w-4.5 text-white" strokeWidth={3.2} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Form card */}
          <section className="flex flex-col justify-center bg-white p-8 md:p-12 dark:bg-slate-900">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[#701a75] dark:bg-slate-800 dark:text-purple-300">
                <Shield className="h-3.5 w-3.5" />
                Sign in
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <Shield className="h-3.5 w-3.5" />
                Secure access
              </span>
            </div>

            <div className="mt-6 space-y-1.5">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 md:text-[2.15rem]">
                Welcome back
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Choose your role and sign in to continue.
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
                    onClick={() => setRole(key)}
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

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                  Email or Phone
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                  <Input
                    {...register("identifier")}
                    type="text"
                    inputMode="text"
                    placeholder="Enter email or phone"
                    className="h-12 rounded-xl border-slate-200 pl-11 pr-4 text-slate-800 placeholder:text-slate-400 dark:border-slate-700 dark:text-slate-100"
                  />
                </div>
                {errors.identifier?.message && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors.identifier.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200">
                  Password
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400">
                    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
                      <rect
                        x="4"
                        y="11"
                        width="16"
                        height="10"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M8 11V7a4 4 0 0 1 8 0v4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="h-12 rounded-xl border-slate-200 pl-11 pr-11 text-slate-800 placeholder:text-slate-400 dark:border-slate-700 dark:text-slate-100"
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

              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 select-none">
                  <input
                    {...register("remember")}
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-purple-700 focus:ring-purple-500 dark:border-slate-600"
                  />
                  Remember me
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-[#701a75] hover:text-[#8b1d6b] dark:text-purple-300 dark:hover:text-purple-200"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-xl bg-gradient-to-r from-[#8b1d6b] via-[#a21caf] to-[#701a75] text-base font-extrabold tracking-wide text-white shadow-[0_14px_35px_-12px_rgba(139,29,107,0.8)] transition active:translate-y-px hover:brightness-110 disabled:opacity-70"
              >
                {role === "tutor" ? "Sign in as tutor" : "Sign in as guardian"}
                <ArrowRight className="ml-1.5 h-4.5 w-4.5" strokeWidth={2.4} />
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              <p className="mb-1">New here?</p>
              <Link
                href="/register"
                className="text-base font-extrabold text-[#701a75] hover:text-[#8b1d6b] dark:text-purple-300 dark:hover:text-purple-200"
              >
                Create an account
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

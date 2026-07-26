'use client'

import { useState, useRef } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  LayoutDashboard,
  Briefcase,
  Bell,
  UserPen,
  CreditCard,
  Wallet,
  FileCheck,
  ShieldCheck,
  Settings,
  Lock,
  LogOut,
  GraduationCap,
  UserCog,
  IdCard,
  FolderUp,
  Camera,
  ChevronRight,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'

const educationalInfoSchema = z.object({
  secondary: z.object({
    institute: z.string().min(2, 'Institute name is required'),
    curriculum: z.string().min(1, 'Curriculum is required'),
    group: z.string().min(1, 'Group is required'),
    passingYear: z.string().min(1, 'Passing year is required'),
    result: z.string().min(1, 'Result is required'),
  }),
  higherSecondary: z.object({
    institute: z.string().min(2, 'Institute name is required'),
    curriculum: z.string().min(1, 'Curriculum is required'),
    group: z.string().min(1, 'Group is required'),
    passingYear: z.string().min(1, 'Passing year is required'),
    result: z.string().min(1, 'Result is required'),
  }),
})

const tuitionInfoSchema = z.object({
  tuitionDistrict: z.string().min(1, 'Tuition district is required'),
  preferredAreas: z.array(z.string()).min(1, 'At least one preferred area is required'),
  preferredMedium: z.string().min(1, 'Preferred medium is required'),
  preferredClasses: z.string().min(1, 'Preferred classes are required'),
  preferredSubjects: z.string().min(1, 'Preferred subjects are required'),
  daysPerWeek: z.string().min(1, 'Days per week is required'),
  timingShift: z.string().min(1, 'Timing shift is required'),
  expectedSalary: z.string().min(1, 'Expected salary is required'),
  preferredTutoringStyle: z.string().min(1, 'Preferred tutoring style is required'),
  tuitionExperience: z.string().min(1, 'Tuition experience is required'),
})

const personalInfoSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phoneNumber: z.string().min(11, 'Phone number must be at least 11 digits').min(1, 'Phone number is required'),
  additionalPhoneNumber: z.string().optional(),
  fullName: z.string().min(2, 'Full name is required'),
  gender: z.string().min(1, 'Gender is required'),
  currentCity: z.string().min(1, 'Current city is required'),
  currentArea: z.string().min(1, 'Current area is required'),
  permanentLocation: z.string().optional(),
  fatherName: z.string().optional(),
  fatherPhoneNumber: z.string().optional(),
})

type EducationalInfoValues = z.infer<typeof educationalInfoSchema>
type TuitionInfoValues = z.infer<typeof tuitionInfoSchema>
type PersonalInfoValues = z.infer<typeof personalInfoSchema>

type TabKey = 'educational' | 'tuition' | 'personal' | 'documents'

const sidebarMenuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '#dashboard' },
  { label: 'Job Board', icon: Briefcase, href: '#job-board' },
  { label: 'Notification', icon: Bell, href: '#notification' },
  { label: 'Update Profile', icon: UserPen, href: '#update-profile', active: true },
  { label: 'Payment Section', icon: CreditCard, href: '#payment' },
  { label: 'My Balance', icon: Wallet, href: '#balance' },
  { label: 'My Apply Status', icon: FileCheck, href: '#apply-status' },
  { label: 'Profile Verification Request', icon: ShieldCheck, href: '#verification' },
  { label: 'Settings', icon: Settings, href: '#settings' },
  { label: 'Security', icon: Lock, href: '#security' },
  { label: 'Logout', icon: LogOut, href: '#logout', danger: true },
]

const tabConfig: { key: TabKey; label: string; icon: typeof GraduationCap }[] = [
  { key: 'educational', label: 'Educational-info', icon: GraduationCap },
  { key: 'tuition', label: 'Tuition-info', icon: UserCog },
  { key: 'personal', label: 'Personal-info', icon: IdCard },
  { key: 'documents', label: 'Documents-info', icon: FolderUp },
]

const curriculumOptions = [
  'Bangla Medium (Bangladesh National Curriculum)',
  'English Version (Bangladesh National Curriculum)',
  'English Medium (Cambridge / Edexcel / IGCSE / O-Level / A-Level)',
  'Madrasah (Qawmi / Alia)',
  'Technical / Vocational',
  'International Baccalaureate (IB)',
]

const groupOptions = ['Science', 'Humanities', 'Business Studies', 'Commerce', 'Arts', 'Vocational']

const yearOptions = Array.from({ length: 30 }, (_, i) => String(2026 - i))

const districtOptions = [
  'Dhaka', 'Narsingdi', 'Gazipur', 'Narayanganj', 'Brahmanbaria', 'Comilla',
  'Chittagong', 'Sylhet', 'Mymensingh', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur',
]

const areaOptions = ['Madhabdi', 'Palash', 'Velmager', 'Brahmanbaria', 'Sadar', 'Raipura']

const mediumOptions = ['Bangla Medium', 'English Version', 'English Medium', 'Madrasah', 'Mixed']

const classOptions = [
  'Play / Nursery', 'KG-1 / KG-2', 'Class 1-2', 'Class 3-5', 'Class 6-8',
  'Class 9-10 (SSC)', 'Class 11-12 (HSC)', 'O-Level / A-Level', 'University Admission',
  'University Undergraduate',
]

const subjectOptions = [
  'Bangla', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology',
  'Higher Math', 'Accounting', 'Finance', 'Business Studies', 'Economics',
  'Statistics', 'Social Science', 'Religious Studies', 'General Science',
  'ICT / Computer Science',
]

const daysOptions = ['1 day', '2 days', '3 days', '4 days', '5 days', '6 days', '7 days']

const shiftOptions = ['Morning (6am - 12pm)', 'Afternoon (12pm - 5pm)', 'Evening (5pm - 9pm)', 'Night (9pm - 12am)', 'Flexible']

const salaryOptions = [
  '3,000 - 5,000 BDT', '5,000 - 8,000 BDT', '8,000 - 12,000 BDT',
  '12,000 - 18,000 BDT', '18,000 - 25,000 BDT', '25,000+ BDT', 'Negotiable',
]

const styleOptions = ['Home Tutoring (Visit Student Home)', 'Online Tutoring (Virtual)', 'My Own Place / Coaching Center', 'Hybrid (Both Home & Online)']

const experienceOptions = Array.from({ length: 21 }, (_, i) => `${i} year(s)`)

const genderOptions = ['Male', 'Female', 'Other']

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-500">{message}</p>
}

function FormLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 shadow-sm mb-5">
      {title && (
        <h4 className="text-center text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-6">
          {title}
        </h4>
      )}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-5 items-start">
        {children}
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabKey>('educational')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const eduForm = useForm<EducationalInfoValues>({
    resolver: zodResolver(educationalInfoSchema),
    defaultValues: {
      secondary: {
        institute: '',
        curriculum: '',
        group: '',
        passingYear: '2026',
        result: '',
      },
      higherSecondary: {
        institute: '',
        curriculum: '',
        group: '',
        passingYear: '2026',
        result: '',
      },
    },
    mode: 'onSubmit',
  })

  const tuitionForm = useForm<TuitionInfoValues>({
    resolver: zodResolver(tuitionInfoSchema),
    defaultValues: {
      tuitionDistrict: 'Narsingdi',
      preferredAreas: ['Madhabdi', 'Palash', 'Velmager', 'Brahmanbaria'],
      preferredMedium: '',
      preferredClasses: '',
      preferredSubjects: '',
      daysPerWeek: '',
      timingShift: '',
      expectedSalary: '',
      preferredTutoringStyle: '',
      tuitionExperience: '0 year(s)',
    },
    mode: 'onSubmit',
  })

  const personalForm = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      email: 'itaohid97@gmail.com',
      phoneNumber: '01898151360',
      additionalPhoneNumber: '',
      fullName: 'Taohid Islam Prince',
      gender: 'Male',
      currentCity: 'Narsingdi',
      currentArea: 'Madhabdi',
      permanentLocation: '',
      fatherName: '',
      fatherPhoneNumber: '',
    },
    mode: 'onSubmit',
  })

  function handleTabClick(tab: TabKey) {
    setActiveTab(tab)
  }

  function handleAvatarClick() {
    fileInputRef.current?.click()
  }

  function addArea(value: string) {
    const current = tuitionForm.getValues('preferredAreas' as const)
    if (!current.includes(value)) {
      tuitionForm.setValue('preferredAreas' as const, [...current, value], {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })
    }
  }

  function removeArea(index: number) {
    const current = tuitionForm.getValues('preferredAreas' as const)
    tuitionForm.setValue(
      'preferredAreas' as const,
      current.filter((_, i) => i !== index),
      { shouldDirty: true, shouldTouch: true, shouldValidate: true }
    )
  }

  function onEduSubmit(values: EducationalInfoValues) {
    console.log('Educational Info submitted:', values)
  }

  function onTuitionSubmit(values: TuitionInfoValues) {
    console.log('Tuition Info submitted:', values)
    setActiveTab('personal')
  }

  function onPersonalSubmit(values: PersonalInfoValues) {
    console.log('Personal Info submitted:', values)
  }

  const preferredAreasValue = useWatch({
    control: tuitionForm.control,
    name: 'preferredAreas' as const,
    defaultValue: ['Madhabdi', 'Palash', 'Velmager', 'Brahmanbaria'],
  })

  return (
    <div className="w-full min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-[1400px] mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          {/* Profile Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-5 shadow-sm">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-4">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full p-[3px] bg-gradient-to-br from-[#8b1d6b] via-[#9333ea] to-[#701a75]">
                    <div className="w-full h-full rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-16 h-16 text-[#8b1d6b]"
                      >
                        <path
                          d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    aria-label="Upload profile picture"
                    className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-gradient-to-r from-[#8b1d6b] to-[#701a75] text-white flex items-center justify-center shadow-md border-2 border-white dark:border-neutral-900 cursor-pointer hover:opacity-90 transition"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" hidden />
                </div>

                <h3 className="mt-4 text-lg font-bold text-center text-neutral-800 dark:text-neutral-200">
                  Taohid Islam Prince
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
                  (TS-169063)
                </p>
              </div>

              {/* Sidebar Nav */}
              <nav className="mt-2 space-y-1">
                {sidebarMenuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => e.preventDefault()}
                    className={cn(
                      'flex items-center gap-3 px-3.5 py-2.5 rounded-md text-sm font-medium transition-colors',
                      item.active
                        ? 'bg-gradient-to-r from-[#8b1d6b] to-[#701a75] text-white shadow-sm'
                        : item.danger
                        ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    )}
                  >
                    <item.icon className="w-4.5 h-4.5 shrink-0" />
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="space-y-5 min-w-0">
            {/* Tabs */}
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
                {tabConfig.map((tab) => {
                  const isActive = activeTab === tab.key
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => handleTabClick(tab.key)}
                      className={cn(
                        'flex flex-col items-center justify-center gap-2 py-5 px-3 transition-all text-sm font-medium relative',
                        isActive
                          ? 'bg-purple-50/40 dark:bg-purple-900/10 text-[#8b1d6b] border-2 border-[#8b1d6b]/70 rounded-sm shadow-inner'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                      )}
                    >
                      <tab.icon
                        className={cn(
                          'w-9 h-9',
                          isActive
                            ? 'text-[#8b1d6b]'
                            : tab.key === 'documents'
                            ? 'text-blue-500'
                            : 'text-neutral-500'
                        )}
                        strokeWidth={tab.key === 'educational' ? 1.5 : 2}
                      />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'educational' && (
              <form onSubmit={eduForm.handleSubmit(onEduSubmit)}>
                <div className="mb-5">
                  <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    Educational Info
                  </h2>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-[#8b1d6b] to-[#701a75]" />
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Update your profile
                    </p>
                  </div>
                </div>

                <SectionCard title="Secondary / SSC / O-level / Dakhil">
                  <div className="md:col-span-4">
                    <FormLabel>Institute</FormLabel>
                    <Input
                      placeholder="ex: Saint Joseph Higher Secondary School"
                      {...eduForm.register('secondary.institute')}
                    />
                    <FieldError message={eduForm.formState.errors.secondary?.institute?.message} />
                  </div>
                  <div className="md:col-span-8" />
                  <div className="md:col-span-4">
                    <FormLabel>Curriculum</FormLabel>
                    <Select {...eduForm.register('secondary.curriculum')}>
                      <option value="">Select One</option>
                      {curriculumOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </Select>
                    <FieldError message={eduForm.formState.errors.secondary?.curriculum?.message} />
                  </div>
                  <div className="md:col-span-4">
                    <FormLabel>Group</FormLabel>
                    <Select {...eduForm.register('secondary.group')}>
                      <option value="">Select One</option>
                      {groupOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </Select>
                    <FieldError message={eduForm.formState.errors.secondary?.group?.message} />
                  </div>
                  <div className="md:col-span-4">
                    <FormLabel>Passing Year</FormLabel>
                    <Select {...eduForm.register('secondary.passingYear')}>
                      <option value="">Select One</option>
                      {yearOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </Select>
                    <FieldError message={eduForm.formState.errors.secondary?.passingYear?.message} />
                  </div>
                  <div className="md:col-span-4">
                    <FormLabel>Result</FormLabel>
                    <Input placeholder="ex: 5.00" {...eduForm.register('secondary.result')} />
                    <FieldError message={eduForm.formState.errors.secondary?.result?.message} />
                  </div>
                </SectionCard>

                <SectionCard title="Higher Secondary / HSC / A level / Alim">
                  <div className="md:col-span-4">
                    <FormLabel>Institute</FormLabel>
                    <Input
                      placeholder="ex: Notre Dame College, Dhaka"
                      {...eduForm.register('higherSecondary.institute')}
                    />
                    <FieldError
                      message={eduForm.formState.errors.higherSecondary?.institute?.message}
                    />
                  </div>
                  <div className="md:col-span-8" />
                  <div className="md:col-span-4">
                    <FormLabel>Curriculum</FormLabel>
                    <Select {...eduForm.register('higherSecondary.curriculum')}>
                      <option value="">Select One</option>
                      {curriculumOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </Select>
                    <FieldError
                      message={eduForm.formState.errors.higherSecondary?.curriculum?.message}
                    />
                  </div>
                  <div className="md:col-span-4">
                    <FormLabel>Group</FormLabel>
                    <Select {...eduForm.register('higherSecondary.group')}>
                      <option value="">Select One</option>
                      {groupOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </Select>
                    <FieldError message={eduForm.formState.errors.higherSecondary?.group?.message} />
                  </div>
                  <div className="md:col-span-4">
                    <FormLabel>Passing Year</FormLabel>
                    <Select {...eduForm.register('higherSecondary.passingYear')}>
                      <option value="">Select One</option>
                      {yearOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </Select>
                    <FieldError
                      message={eduForm.formState.errors.higherSecondary?.passingYear?.message}
                    />
                  </div>
                  <div className="md:col-span-4">
                    <FormLabel>Result</FormLabel>
                    <Input placeholder="ex: 5.00" {...eduForm.register('higherSecondary.result')} />
                    <FieldError
                      message={eduForm.formState.errors.higherSecondary?.result?.message}
                    />
                  </div>
                </SectionCard>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-[#8b1d6b] to-[#701a75] hover:from-[#7a195d] hover:to-[#5f1663] text-white px-8 h-11 shadow-md"
                  >
                    Save Educational Info
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </form>
            )}

            {activeTab === 'tuition' && (
              <form onSubmit={tuitionForm.handleSubmit(onTuitionSubmit)}>
                <div className="mb-5">
                  <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    Tuition Info
                  </h2>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-[#8b1d6b] to-[#701a75]" />
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Update your profile
                    </p>
                  </div>
                </div>

                <SectionCard title="">
                  <div className="md:col-span-4">
                    <FormLabel required>Select provide tuition districts:</FormLabel>
                    <Select {...tuitionForm.register('tuitionDistrict')}>
                      <option value="">Select One</option>
                      {districtOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </Select>
                    <FieldError message={tuitionForm.formState.errors.tuitionDistrict?.message} />
                  </div>
                  <div className="md:col-span-8" />

                  <div className="md:col-span-4">
                    <FormLabel>Preferred Area for tuition:</FormLabel>
                    <Controller
                      name="preferredAreas"
                      control={tuitionForm.control}
                      render={() => (
                        <div className="relative">
                          <div className="flex flex-wrap gap-2 min-h-[2.25rem] rounded-md border border-input bg-transparent px-2 py-1.5 shadow-xs focus-within:ring-2 focus-within:ring-ring/50 focus-within:border-ring">
                            {preferredAreasValue.length === 0 && (
                              <span className="text-sm text-muted-foreground px-1 py-0.5">
                                Select areas...
                              </span>
                            )}
                            {preferredAreasValue.map((area, i) => (
                              <span
                                key={`${area}-${i}`}
                                className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300"
                              >
                                {area}
                                <button
                                  type="button"
                                  onClick={() => removeArea(i)}
                                  aria-label={`Remove ${area}`}
                                  className="rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 p-0.5 transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="mt-2">
                            <Select
                              value=""
                              onChange={(e) => {
                                const val = e.target.value
                                if (!val) return
                                addArea(val)
                                e.target.value = ''
                              }}
                            >
                              <option value="">+ Add area</option>
                              {areaOptions
                                .filter((o) => !preferredAreasValue.includes(o))
                                .map((o) => (
                                  <option key={o} value={o}>{o}</option>
                                ))}
                            </Select>
                          </div>
                        </div>
                      )}
                    />
                    <FieldError message={tuitionForm.formState.errors.preferredAreas?.message} />
                  </div>
                  <div className="md:col-span-8" />

                  <div className="md:col-span-4">
                    <FormLabel>Preferred Medium:</FormLabel>
                    <Select {...tuitionForm.register('preferredMedium')}>
                      <option value="">Select...</option>
                      {mediumOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </Select>
                    <FieldError message={tuitionForm.formState.errors.preferredMedium?.message} />
                  </div>
                  <div className="md:col-span-4">
                    <FormLabel>Preferred Classes:</FormLabel>
                    <Select {...tuitionForm.register('preferredClasses')}>
                      <option value="">Select...</option>
                      {classOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </Select>
                    <FieldError message={tuitionForm.formState.errors.preferredClasses?.message} />
                  </div>
                  <div className="md:col-span-4">
                    <FormLabel>Preferred Subjects (First one will be Major Subject):</FormLabel>
                    <Select {...tuitionForm.register('preferredSubjects')}>
                      <option value="">Select...</option>
                      {subjectOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </Select>
                    <FieldError message={tuitionForm.formState.errors.preferredSubjects?.message} />
                  </div>

                  <div className="md:col-span-4">
                    <FormLabel>Days Per Week:</FormLabel>
                    <Select {...tuitionForm.register('daysPerWeek')}>
                      <option value="">Select...</option>
                      {daysOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </Select>
                    <FieldError message={tuitionForm.formState.errors.daysPerWeek?.message} />
                  </div>
                  <div className="md:col-span-4">
                    <FormLabel>Timing Shift:</FormLabel>
                    <Select {...tuitionForm.register('timingShift')}>
                      <option value="">Select...</option>
                      {shiftOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </Select>
                    <FieldError message={tuitionForm.formState.errors.timingShift?.message} />
                  </div>
                  <div className="md:col-span-4">
                    <FormLabel>Expected Salary:</FormLabel>
                    <Select {...tuitionForm.register('expectedSalary')}>
                      <option value="">Select One</option>
                      {salaryOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </Select>
                    <FieldError message={tuitionForm.formState.errors.expectedSalary?.message} />
                  </div>

                  <div className="md:col-span-4">
                    <FormLabel required>Preferred Tutoring Style:</FormLabel>
                    <Select {...tuitionForm.register('preferredTutoringStyle')}>
                      <option value="">Select...</option>
                      {styleOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </Select>
                    <FieldError
                      message={tuitionForm.formState.errors.preferredTutoringStyle?.message}
                    />
                  </div>
                  <div className="md:col-span-4">
                    <FormLabel required>Tuition experience (in Year):</FormLabel>
                    <Select {...tuitionForm.register('tuitionExperience')}>
                      {experienceOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </Select>
                    <FieldError message={tuitionForm.formState.errors.tuitionExperience?.message} />
                  </div>
                </SectionCard>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-[#8b1d6b] to-[#701a75] hover:from-[#7a195d] hover:to-[#5f1663] text-white px-10 h-11 shadow-md"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </form>
            )}

            {activeTab === 'personal' && (
              <form onSubmit={personalForm.handleSubmit(onPersonalSubmit)}>
                <div className="mb-5">
                  <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    Personal Info
                  </h2>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-[#8b1d6b] to-[#701a75]" />
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Update your profile
                    </p>
                  </div>
                </div>

                {/* Contact info */}
                <SectionCard title="">
                  <div className="md:col-span-4">
                    <FormLabel required>E-Mail</FormLabel>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="bg-neutral-100 dark:bg-neutral-800"
                      readOnly
                      {...personalForm.register('email')}
                    />
                    <FieldError message={personalForm.formState.errors.email?.message} />
                  </div>
                  <div className="md:col-span-4">
                    <FormLabel required>Phone Number</FormLabel>
                    <Input
                      placeholder="01XXXXXXXXX"
                      className="bg-neutral-100 dark:bg-neutral-800"
                      readOnly
                      {...personalForm.register('phoneNumber')}
                    />
                    <FieldError message={personalForm.formState.errors.phoneNumber?.message} />
                  </div>
                  <div className="md:col-span-4">
                    <FormLabel>Additional Phone Number</FormLabel>
                    <Input
                      placeholder="ex: 01..."
                      {...personalForm.register('additionalPhoneNumber')}
                    />
                  </div>

                  <div className="md:col-span-7">
                    <FormLabel>Full Name</FormLabel>
                    <Input {...personalForm.register('fullName')} />
                    <FieldError message={personalForm.formState.errors.fullName?.message} />
                  </div>
                  <div className="md:col-span-5">
                    <FormLabel>Gender :</FormLabel>
                    <Select {...personalForm.register('gender')}>
                      {genderOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </Select>
                    <FieldError message={personalForm.formState.errors.gender?.message} />
                  </div>
                </SectionCard>

                {/* Current Location */}
                <SectionCard title="">
                  <div className="md:col-span-12 mb-2">
                    <h5 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-5 h-5 text-[#8b1d6b]"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                      Your Current Location
                    </h5>
                  </div>
                  <div className="md:col-span-6">
                    <FormLabel>Current City :</FormLabel>
                    <Select {...personalForm.register('currentCity')}>
                      {districtOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </Select>
                    <FieldError message={personalForm.formState.errors.currentCity?.message} />
                  </div>
                  <div className="md:col-span-6">
                    <FormLabel>Current Area :</FormLabel>
                    <Select {...personalForm.register('currentArea')}>
                      {areaOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </Select>
                    <FieldError message={personalForm.formState.errors.currentArea?.message} />
                  </div>
                </SectionCard>

                {/* Permanent Location */}
                <SectionCard title="">
                  <div className="md:col-span-12 mb-2">
                    <h5 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-5 h-5 text-[#8b1d6b]"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                      Your Permanent Location
                    </h5>
                  </div>
                  <div className="md:col-span-12">
                    <FormLabel>Permanent Location :</FormLabel>
                    <Textarea
                      rows={4}
                      placeholder="Enter your full permanent address..."
                      {...personalForm.register('permanentLocation')}
                    />
                  </div>
                </SectionCard>

                {/* Parental Info */}
                <SectionCard title="">
                  <div className="md:col-span-12 mb-2">
                    <h5 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                      Parental Info
                    </h5>
                  </div>
                  <div className="md:col-span-6">
                    <FormLabel>Father&apos;s Name :</FormLabel>
                    <Input
                      placeholder="ex: Kamal Hossain"
                      {...personalForm.register('fatherName')}
                    />
                  </div>
                  <div className="md:col-span-6">
                    <FormLabel>Father&apos;s Phone Number :</FormLabel>
                    <Input placeholder="ex: 01..." {...personalForm.register('fatherPhoneNumber')} />
                  </div>
                </SectionCard>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-[#8b1d6b] to-[#701a75] hover:from-[#7a195d] hover:to-[#5f1663] text-white px-10 h-11 shadow-md"
                  >
                    Save Personal Info
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </form>
            )}

            {activeTab === 'documents' && (
              <div>
                <div className="mb-5">
                  <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    Documents Info
                  </h2>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-[#8b1d6b] to-[#701a75]" />
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Upload your documents
                    </p>
                  </div>
                </div>

                <SectionCard title="">
                  <div className="md:col-span-12 text-center py-16 text-neutral-500 dark:text-neutral-400">
                    <FolderUp className="w-20 h-20 mx-auto mb-4 text-blue-500 opacity-80" />
                    <p className="text-lg font-medium mb-2">Document Upload Section</p>
                    <p className="text-sm">
                      You can upload your National ID, Educational Certificates, and other verification documents here.
                    </p>
                  </div>
                </SectionCard>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

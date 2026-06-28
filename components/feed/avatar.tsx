import { cn } from "@/lib/utils"

const COLORS = [
  "bg-cyan-600",
  "bg-teal-600",
  "bg-sky-700",
  "bg-emerald-600",
  "bg-slate-600",
  "bg-rose-500",
  "bg-amber-600",
]

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function colorFor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return COLORS[Math.abs(hash) % COLORS.length]
}

interface AvatarProps {
  name: string
  size?: number
  className?: string
}

export function Avatar({ name, size = 48, className }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold text-white select-none",
        colorFor(name),
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  )
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCount(n: number) {
  if (n < 1000) return String(n)
  if (n < 1_000_000) {
    const v = n / 1000
    const s = Number.isInteger(v) ? v.toFixed(0) : v.toFixed(1)
    return `${s}k`
  }
  const v = n / 1_000_000
  const s = Number.isInteger(v) ? v.toFixed(0) : v.toFixed(1)
  return `${s}M`
}



export function formatTimeAgo(timestamp: string): string {
  const now = Date.now()
  const then = new Date(timestamp).getTime()
  const diff = Math.floor((now - then) / 1000)

  if (diff < 60) return `${diff}s`
  if (diff < 3600) return `${Math.floor(diff / 60)}m`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`
  return `${Math.floor(diff / 604800)}w`
}
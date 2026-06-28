"use client"

import Link from "next/link"
import Image from "next/image"
import { Bookmark } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { useAppSelector } from "@/store/hooks"

export function ProfileSidebar() {
  const profile = useAppSelector((s) => s.profile)

  return (
    <div className="flex flex-col gap-2">
      <Card className="overflow-hidden">
        <div className="relative h-14 w-full bg-muted">
          <Image src={profile.banner || "/placeholder.svg"} alt="" fill className="object-cover" />
        </div>
        <div className="flex flex-col items-center px-4 pb-4">
          <div className="-mt-8">
            <Avatar name={profile.name} size={64} className="ring-2 ring-card" />
          </div>
          <Link href="/profile" className="mt-2 font-semibold hover:underline">
            {profile.name}
          </Link>
          <p className="text-center text-xs text-muted-foreground text-pretty">{profile.headline}</p>
        </div>
        <div className="border-t border-border px-4 py-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Followers</span>
            <span className="font-semibold text-primary">{profile.connections}</span>
          </div>
        </div>
        <Link
          href="/profile"
          className="flex items-center gap-2 border-t border-border px-4 py-2 text-xs font-semibold hover:bg-muted"
        >
          <Bookmark className="h-4 w-4" /> My items
        </Link>
      </Card>
    </div>
  )
}

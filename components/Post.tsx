"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import profile from "@/public/Images/profile-pic.png"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { formatCount } from "@/lib/utils"
import CommentPanel from "./CommentPanel"
import LikePanel from "./LikePanel"

const Post = () => {
  const like = 245898758
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile() // run once on mount
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="min-w-[350px] max-w-[500px] w-full flex flex-col justify-center">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-2">
          <Image
            src={profile}
            alt="Profile Image"
            height={36}
            width={36}
            className="rounded-full"
          />
          <div className="flex flex-col gap-0.5">
            <h2 className="text-md font-medium">Prince Mahmud</h2>
            <p className="text-sm font-light text-gray-400">25 min ago</p>
          </div>
        </div>
        <button className="text-blue-500 font-medium">Follow</button>
      </div>

      <h1 className="text-md pb-2 px-2">Caption is No caption</h1>

      <Image
        src={profile}
        alt="post-pic"
        className="rounded object-cover w-full"
      />

      <div className="flex items-center justify-around gap-2 mx-3 py-2">
        <div className="flex justify-between gap-6 w-full">
          {/* Likes */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex gap-1 items-center">
                <Heart />
                <span>{formatCount(like)}</span>
              </button>
            </SheetTrigger>
            <SheetContent
              side={isMobile ? "bottom" : "right"}
              className="max-md:w-full max-md:h-[90vh]  "
            >
              <SheetHeader>
                <SheetTitle>Like</SheetTitle>
              </SheetHeader>
              <LikePanel />
            </SheetContent>
          </Sheet>

          {/* Comments */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex gap-1 items-center">
                <MessageCircle />
                <span>{formatCount(like)}</span>
              </button>
            </SheetTrigger>
            <SheetContent
              side={isMobile ? "bottom" : "right"}
              className="max-md:w-full max-md:h-[90vh]"
            >
              <SheetHeader>
                <SheetTitle>Comments</SheetTitle>
              </SheetHeader>
              <CommentPanel />
            </SheetContent>
          </Sheet>

          <button className="flex gap-1 items-center">
            <Share2 />
            <span>{formatCount(like)}</span>
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default Post

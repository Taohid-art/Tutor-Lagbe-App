"use client"

import { useState } from "react"
import Image from "next/image"
import { ThumbsUp, MessageSquare, Repeat2, Send, Globe } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { cn, formatTimeAgo } from "@/lib/utils"
import type { Post } from "@/lib/types"
import { useAppDispatch } from "@/store/hooks"
import { toggleLike, addComment, repost } from "@/store/slices/postsSlice"

export function PostCard({ post }: { post: Post }) {
  const dispatch = useAppDispatch()
  const [showComments, setShowComments] = useState(false)
  const [comment, setComment] = useState("")

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return
    dispatch(addComment({ postId: post.id, content: comment.trim() }))
    setComment("")
    setShowComments(true)
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex items-start gap-3 p-4 pb-2">
        <Avatar name={post.author.name} size={48} />
        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-tight">{post.author.name}</p>
          <p className="truncate text-xs text-muted-foreground">{post.author.headline}</p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            {formatTimeAgo(post.timestamp)} ago <span aria-hidden>·</span> <Globe className="h-3 w-3" />
          </p>
        </div>
      </div>

      <p className="whitespace-pre-wrap px-4 pb-3 text-sm leading-relaxed">{post.content}</p>

      {post.image && (
        <div className="relative aspect-video w-full bg-muted">
          <Image src={post.image || "/placeholder.svg"} alt="" fill className="object-cover" />
        </div>
      )}

      <div className="flex items-center justify-between px-4 py-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ThumbsUp className="h-2.5 w-2.5" fill="currentColor" />
          </span>
          {post.likes}
        </span>
        <span>
          {post.comments.length} comments · {post.reposts} reposts
        </span>
      </div>

      <div className="mx-2 flex items-center justify-around border-t border-border py-1">
        <ActionButton
          active={post.liked}
          onClick={() => dispatch(toggleLike(post.id))}
          icon={<ThumbsUp className="h-5 w-5" fill={post.liked ? "currentColor" : "none"} />}
          label="Like"
        />
        <ActionButton
          onClick={() => setShowComments((v) => !v)}
          icon={<MessageSquare className="h-5 w-5" />}
          label="Comment"
        />
        <ActionButton
          onClick={() => dispatch(repost(post.id))}
          icon={<Repeat2 className="h-5 w-5" />}
          label="Repost"
        />
        <ActionButton icon={<Send className="h-5 w-5" />} label="Send" />
      </div>

      {showComments && (
        <div className="border-t border-border px-4 py-3">
          <form onSubmit={submitComment} className="mb-3 flex items-center gap-2">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="h-10 flex-1 rounded-full border border-input px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </form>
          <div className="flex flex-col gap-3">
            {post.comments.map((c) => (
              <div key={c.id} className="flex items-start gap-2">
                <Avatar name={c.author.name} size={32} />
                <div className="rounded-lg bg-muted px-3 py-2">
                  <p className="text-sm font-semibold">{c.author.name}</p>
                  <p className="text-sm">{c.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

function ActionButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-1 items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold transition-colors hover:bg-muted",
        active ? "text-primary" : "text-muted-foreground",
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}

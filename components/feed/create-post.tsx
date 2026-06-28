"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Image as ImageIcon, Calendar, FileText, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { addPost } from "@/store/slices/postsSlice"
import { postSchema, type PostValues } from "@/lib/schemas"

export function CreatePost() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((s) => s.auth.user)
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<PostValues>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: { content: "" },
  })

  const onSubmit = (values: PostValues) => {
    dispatch(addPost({ content: values.content }))
    reset()
    setOpen(false)
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <Avatar name={user?.name ?? "Me"} size={48} />
        <button
          onClick={() => setOpen(true)}
          className="h-12 flex-1 rounded-full border border-input px-4 text-left text-sm font-medium text-muted-foreground hover:bg-muted"
        >
          Start a post
        </button>
      </div>

      <div className="mt-2 flex items-center justify-around">
        <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
          <ImageIcon className="h-5 w-5 text-cyan-600" /> Photo
        </button>
        <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
          <Calendar className="h-5 w-5 text-amber-600" /> Event
        </button>
        <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
          <FileText className="h-5 w-5 text-rose-500" /> Article
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 sm:items-center">
          <Card className="w-full max-w-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar name={user?.name ?? "Me"} size={48} />
                <div>
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">Post to anyone</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full p-1 text-muted-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <textarea
                {...register("content")}
                rows={6}
                autoFocus
                placeholder="What do you want to talk about?"
                className="w-full resize-none bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
              <div className="mt-4 flex justify-end">
                <Button type="submit" disabled={!isValid}>
                  Post
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </Card>
  )
}

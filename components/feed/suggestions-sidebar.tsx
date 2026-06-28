"use client"

import { UserPlus, Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { toggleInvite } from "@/store/slices/connectionsSlice"

export function SuggestionsSidebar() {
  const dispatch = useAppDispatch()
  const suggestions = useAppSelector((s) => s.connections.suggestions)

  return (
    <Card className="p-4">
      <h2 className="mb-3 text-sm font-semibold">Add to your network</h2>
      <div className="flex flex-col gap-4">
        {suggestions.map((s) => (
          <div key={s.id} className="flex items-start gap-3">
            <Avatar name={s.name} size={48} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{s.name}</p>
              <p className="truncate text-xs text-muted-foreground">{s.headline}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.mutual} mutual connections</p>
              <button
                onClick={() => dispatch(toggleInvite(s.id))}
                className={
                  s.invited
                    ? "mt-2 inline-flex items-center gap-1 rounded-full border border-muted-foreground px-4 py-1 text-xs font-semibold text-muted-foreground"
                    : "mt-2 inline-flex items-center gap-1 rounded-full border border-primary px-4 py-1 text-xs font-semibold text-primary hover:bg-accent"
                }
              >
                {s.invited ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Pending
                  </>
                ) : (
                  <>
                    <UserPlus className="h-3.5 w-3.5" /> Connect
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

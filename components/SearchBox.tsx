'use client'
import { SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"

interface SearchBoxProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ButtonGroupInput({ isOpen, onToggle }: SearchBoxProps) {

  return (
    <ButtonGroup>
      {isOpen &&<Input placeholder="Search..." /> }
      <Button variant="outline" aria-label="Search" onClick={onToggle}>
        <SearchIcon  />
      </Button>
    </ButtonGroup>
  )
}

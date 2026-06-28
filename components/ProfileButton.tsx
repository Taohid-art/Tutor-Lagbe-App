
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import profileImage from "@/public/Images/profile-pic.png"
import Link from "next/link"
import { LogOut, Settings, User } from "lucide-react"
import DarkModeButton from "./DarkModeButton"

const ProfileButton = () => {
  return (
    
  <DropdownMenu>
  <DropdownMenuTrigger>
    <Image src={profileImage} alt="Profile Image" width={32} height={32} className="rounded-full cursor-pointer" />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="max-md:block hidden">
        
        <DarkModeButton />
        
    </DropdownMenuItem>
    <DropdownMenuItem>
        <User className="mr-1 h-4 w-4" />
        <Link href='/profile'>Profile</Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
        <Settings className="mr-1 h-4 w-4" />
        <Link href='/settings'>Settings</Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
        <LogOut className="mr-1 h-4 w-4" />
        <Link href='/' className="text-red-500">Logout</Link>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    
  )
}

export default ProfileButton
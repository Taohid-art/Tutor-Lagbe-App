'use client'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/Images/Logo-No-Text.png'
import SearchBox from './SearchBox'
import ProfileButton from './ProfileButton'
import { useState } from 'react'
import { MessageCircle } from 'lucide-react'

const Nav = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className='sticky top-0 left-0 z-90 hidden h-12 w-full items-center justify-between gap-4 backdrop-blur-md px-4 py-2 max-md:flex'>
        <div className='flex items-center gap-2'>
            <Link href="/" className='flex items-center gap-2'>
              <Image src={logo} alt="logo" width={40} height={40} />
              {!isSearchOpen && <span className='text-md font-bold'>TutorLagbe</span>}
            </Link>
        </div>
        <div className='flex items-center justify-around gap-2 ' >
            <SearchBox isOpen={isSearchOpen} onToggle={() => setIsSearchOpen(!isSearchOpen)} /> 
            <Link href="/message" className='h-9 w-10 flex items-center justify-center py-1 px-2 rounded-md border'>
                <MessageCircle className="h-5 w-5" />
            </Link>
           <ProfileButton /> 
          
        </div>
    </div>
  )
}

export default Nav

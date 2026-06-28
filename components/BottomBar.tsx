'use client'
import { Bell, Bookmark, BriefcaseBusiness, Home, SquarePlus } from 'lucide-react'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const BottomBar = () => {
    const pathname = usePathname()
    
    
   const navLinks = [
  {
    label: 'Home',
    href: '/',
    icon: Home,
  },
  {
    label: 'Jobs',
    href: '/jobs',
    icon: BriefcaseBusiness,
  }, {
    label: 'Create',
    href: '/create',
    icon: SquarePlus,
  },
  {
    label: 'Notification',
    href: '/notification',
    icon: Bell,
  },
  {
    label: 'Save',
    href: '/save',
    icon: Bookmark,
  },
 
]

  return (
    <div className=' gap-0.5 justify-around items-center w-full h-15 bg-blue-600 fixed bottom-0 left-0 hidden max-md:flex'>
      
       {navLinks.map(({label,href,icon:Icon}) => {
        const isActive =
            href === "/"
              ? pathname === "/" // exact match for home
              : pathname.startsWith(href);
        return (
         <Link key={label} href={href} className={`flex flex-col-reverse gap-1 flex-5 justify-center items-center  px-3 py-2  ${isActive ? "font-bold bg-blue-500" : "text-white"} `}>
         <h3 className=' text-xs flex-1'>{label}</h3>
          < Icon className={`${isActive ? "font-bold text-black bg-white rounded-md p-0.5" : "text-white"}`}/>
       </Link >
        );
       })}

    </div>
  )
}

export default BottomBar

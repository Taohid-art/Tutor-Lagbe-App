'use client';

import { Bell, Bookmark, BriefcaseBusiness, ChevronUp, Home, MessageCircleMore, SquarePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DarkButton from '@/components/DarkModeButton'

import logo from "@/public/Images/Logo-No-Text.png";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import ProfileButton from "./ProfileButton";

 const items = [
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
 {
  label:'Message',
  href: '/message',
  icon: MessageCircleMore
 }
]

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="hidden md:block">
      {/* HEADER */}
      <SidebarHeader>
        <div className="flex justify-between items-center gap-4">

         <div className="flex items-center gap-2 my-3 px-4">
          <Image src={logo} alt="logo" width={60} height={60} />
          <Link href="/" className="text-xl font-bold">
            TutorLagbe
          </Link>
          </div>
          <DarkButton />
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        {items.map((item) => {
          // ✅ startsWith logic for active route
          const isActive =
            item.href === "/"
              ? pathname === "/" // exact match for home
              : pathname.startsWith(item.href);

          return (
            <SidebarMenu key={item.label}>
              <SidebarMenuButton
                asChild
                className={`flex items-center gap-4 px-4 py-3 text-lg transition
                  ${isActive ? "bg-blue-600 text-white" : "hover:bg-muted"}
                `}
              >
                <Link href={item.href}>
                  <item.icon className="w-7 h-7" />
                  <span>{item.label}</span>
                </Link>
                
              </SidebarMenuButton>
            </SidebarMenu>
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex gap-3 items-center justify-center cursor-pointer" >

        
        <ProfileButton />
        <h1>Prince</h1>
        <ChevronUp />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

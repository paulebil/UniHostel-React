"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Building, LayoutDashboard, LogOut, Menu, MessageSquare, Settings, User, Users } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface OwnerLayoutProps {
  children: ReactNode
}

export default function OwnerLayout({ children }: OwnerLayoutProps) {
  const isMobile = useMobile()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">UniHostel</span>
            </Link>
            <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Owner Portal</span>
          </div>

          {isMobile ? (
            <MobileNav />
          ) : (
            <div className="flex items-center gap-4">
              <nav className="flex items-center gap-6">
                <Link
                  href="/owner/dashboard"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Dashboard
                </Link>
                <Link href="/owner/hostels" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Hostels
                </Link>
                <Link
                  href="/owner/bookings"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Bookings
                </Link>
                <Link
                  href="/owner/messages"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Messages
                </Link>
              </nav>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <User className="h-4 w-4" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </header>

      <div className="container flex-1 px-4 py-8">{children}</div>
    </div>
  )
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="grid gap-6 py-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">UniHostel</span>
            <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Owner</span>
          </div>
          <div className="grid gap-4">
            <Link href="/owner/dashboard" className="flex items-center gap-2 font-medium">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link href="/owner/hostels" className="flex items-center gap-2 font-medium">
              <Building className="h-4 w-4" />
              Hostels
            </Link>
            <Link href="/owner/bookings" className="flex items-center gap-2 font-medium">
              <Users className="h-4 w-4" />
              Bookings
            </Link>
            <Link href="/owner/messages" className="flex items-center gap-2 font-medium">
              <MessageSquare className="h-4 w-4" />
              Messages
            </Link>
            <Link href="/owner/settings" className="flex items-center gap-2 font-medium">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>
          <div className="grid gap-2">
            <Button variant="outline" className="justify-start gap-2">
              <User className="h-4 w-4" />
              Profile
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

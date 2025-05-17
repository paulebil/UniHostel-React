"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export default function Header() {
  const isMobile = useMobile()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-background",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold ml-12">UniHostel</span>
        </Link>

        {isMobile ? (
          <MobileNav />
        ) : (
          <>
            <DesktopNav />
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/owner/login">Owner Login</Link>
              </Button>
              <Button asChild>
                <Link href="/hostels">Find Hostels</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

function DesktopNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/hostels" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Hostels</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>For Students</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">UniHostel</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Find your perfect student accommodation with ease.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <Link href="/hostels" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Browse Hostels</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Explore our wide range of student accommodations.
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">How It Works</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Learn about our booking process and guarantees.
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/faq" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">FAQ</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Find answers to common questions about student housing.
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>For Owners</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li>
                <Link href="/owner/signup" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">List Your Property</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Create an account and start listing your hostel.
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/owner/login" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Owner Login</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Access your dashboard to manage your properties.
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/owner-benefits" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Benefits</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Learn about the advantages of listing with UniHostel.
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link href="/owner-guide" legacyBehavior passHref>
                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">Owner Guide</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Tips and best practices for hostel owners.
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
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
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">UniHostel</span>
          </Link>
          <div className="grid gap-4">
            <Link href="/hostels" className="font-medium">
              Browse Hostels
            </Link>
            <Link href="/how-it-works" className="font-medium">
              How It Works
            </Link>
            <Link href="/faq" className="font-medium">
              FAQ
            </Link>
            <Link href="/contact" className="font-medium">
              Contact
            </Link>
          </div>
          <div className="grid gap-2">
            <Button variant="outline" asChild>
              <Link href="/owner/login">Owner Login</Link>
            </Button>
            <Button asChild>
              <Link href="/hostels">Find Hostels</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

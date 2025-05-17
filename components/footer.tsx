import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">UniHostel</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Find, view, and book the perfect accommodation with ease.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">For Students</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/hostels" className="text-muted-foreground hover:text-foreground">
                  Browse Hostels
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/student-resources" className="text-muted-foreground hover:text-foreground">
                  Student Resources
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-muted-foreground hover:text-foreground">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">For Owners</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/owner/signup" className="text-muted-foreground hover:text-foreground">
                  List Your Property
                </Link>
              </li>
              <li>
                <Link href="/owner/login" className="text-muted-foreground hover:text-foreground">
                  Owner Login
                </Link>
              </li>
              <li>
                <Link href="/owner-benefits" className="text-muted-foreground hover:text-foreground">
                  Benefits
                </Link>
              </li>
              <li>
                <Link href="/owner-guide" className="text-muted-foreground hover:text-foreground">
                  Owner Guide
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">UniHostel</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} UniHostel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

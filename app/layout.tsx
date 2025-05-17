"use client" // Make sure this is at the top of your file

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { usePathname } from "next/navigation"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Add more paths here if you want to hide header/footer elsewhere too
  const hideLayout =
    pathname.startsWith("/owner/dashboard") ||
    pathname.startsWith("/owner/bookings") ||
    pathname.startsWith("/owner/hostels") ||
    pathname.startsWith("/owner/hostels/create") ||
    pathname.startsWith("/owner/hostels/[id]") ||
    pathname.startsWith("/admin/")

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>UniHostel - Find and Book Student Hostels</title>
        <meta name="description" content="Find, view, and book student hostels with UniHostel" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex min-h-screen flex-col">
            {!hideLayout && <Header />}
            <main className="flex-1">{children}</main>
            {!hideLayout && <Footer />}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import HostelCard from "@/components/hostel-card"
import api from "@/lib/axios"

export interface ImageUrl {
  url: string
}

export interface Hostel {
  id: string
  name: string
  location: string
  description?: string
  average_price: number
  owner_id: string
  available_rooms: number
  rule_and_regulations?: string
  amenities?: string[]
  image_url?: ImageUrl[]
  created_at?: string
  updated_at?: string
}

export default function Home() {
  const [hostels, setHostels] = useState<Hostel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchHostels() {
      try {
        const response = await api.get("/hostels/all-hostels")
        console.log("API response:", response.data)

        const hostelsArray = Array.isArray(response.data?.hostels)
          ? response.data.hostels
          : []

        setHostels(hostelsArray)
      } catch (error) {
        console.error("Failed to fetch hostels:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHostels()
  }, [])



  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Find Your Perfect Hostel
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Browse through hundreds of hostels, compare prices, and book your stay with ease.
        </p>
        <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search by location, university, or hostel name" className="pl-10" />
          </div>
          <Button>Search</Button>
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Hostels</h2>
          <Link href="/hostels" className="text-sm font-medium text-primary hover:underline">
            View all hostels
          </Link>
        </div>

        {loading ? (
          <div className="text-muted-foreground">Loading hostels...</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {hostels.slice(0, 8).map((hostel) => (
              <HostelCard key={hostel.id} hostel={hostel} />
            ))}
          </div>
        )}
      </section>

      <section className="mb-12 rounded-lg bg-muted p-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold">Are you a hostel owner?</h2>
            <p className="mb-6 text-muted-foreground">
              List your property on UniHostel and reach thousands of students looking for accommodation.
            </p>
            <Button asChild>
              <Link href="/owner/signup">Get Started</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/main.jpg?height=200&width=400"
              alt="Hostel owner dashboard preview"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">How It Works</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              step: 1,
              title: "Search",
              text: "Browse through our extensive collection of student hostels and use filters to find your perfect match.",
            },
            {
              step: 2,
              title: "Book",
              text: "Select your room, choose your dates, and complete the booking process in just a few clicks.",
            },
            {
              step: 3,
              title: "Stay",
              text: "Receive your booking confirmation and get ready to enjoy your stay at your chosen hostel.",
            },
          ].map(({ step, title, text }) => (
            <div key={step} className="rounded-lg border p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                {step}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{title}</h3>
              <p className="text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import HostelCard from "@/components/hostel-card"
import { hostels } from "@/lib/data"

export default function Home() {
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {hostels.slice(0, 8).map((hostel) => (
            <HostelCard key={hostel.id} hostel={hostel} />
          ))}
        </div>
      </section>

      <section className="mb-12 rounded-lg bg-muted p-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold">Are you a hostel owner?</h2>
            <p className="mb-6 text-muted-foreground">
              List your property on UniHostel and reach thousands of students looking for accommodation. Our platform
              makes it easy to manage bookings and showcase your hostel.
            </p>
            <Button asChild>
              <Link href="/owner/signup">Get Started</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Hostel owner dashboard preview"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">How It Works</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              1
            </div>
            <h3 className="mb-2 text-xl font-semibold">Search</h3>
            <p className="text-muted-foreground">
              Browse through our extensive collection of student hostels and use filters to find your perfect match.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              2
            </div>
            <h3 className="mb-2 text-xl font-semibold">Book</h3>
            <p className="text-muted-foreground">
              Select your room, choose your dates, and complete the booking process in just a few clicks.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              3
            </div>
            <h3 className="mb-2 text-xl font-semibold">Stay</h3>
            <p className="text-muted-foreground">
              Receive your booking confirmation and get ready to enjoy your stay at your chosen hostel.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

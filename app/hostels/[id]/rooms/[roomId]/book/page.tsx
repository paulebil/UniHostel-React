import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { getHostels } from "@/lib/data"
import { Info } from "lucide-react"
import Link from "next/link"
import BookingFormClient from "./booking-form-client"

export default async function BookingPage(props: { params: { id: string; roomId: string } }) {
  // Get params
  const { id } = await props.params
  const { roomId } = await props.params

  // Find the hostel by ID
  const hostels = await getHostels()
  const hostel = hostels.find((h) => h.id === id) || hostels[0]

  // Find the room by ID
  const room = hostel.rooms?.find((r) => r.id === roomId) || hostel.rooms?.[0]

  if (!room) {
    return <div>Room not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/hostels/${hostel.id}/rooms/${room.id}`} className="text-sm text-primary hover:underline">
          &larr; Back to room details
        </Link>
        <h1 className="mt-2 text-3xl font-bold">Book Your Stay</h1>
        <p className="text-muted-foreground">
          {room.name} at {hostel.name}
        </p>
      </div>

      <BookingFormClient hostel={hostel} room={room} />
    </div>
  )
}
"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, Users } from "lucide-react"
import Link from "next/link"
import ImageGallery from "@/components/image-gallery"

export interface Room {
  id: number
  hostel_id: number
  room_number: string
  price_per_semester: number
  room_type: string
  availability: boolean
  image_url: Array<{ url: string }>
  created_at: string
  updated_at: string
}

export default function RoomDetailsPage() {
  const params = useParams()
  const hostelId = params?.id
  const roomId = params?.roomId

  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  console.log("Hostel _id", hostelId)
  console.log("Room ID", roomId)

  useEffect(() => {
    if (!hostelId || !roomId) return // wait for params to be available

    async function fetchRoom() {
      try {
        setLoading(true)
        const { data } = await axios.get<Room>(
          `http://127.0.0.1:8050/rooms/get-single-room-detail?hostel_id=${Number(hostelId)}&room_id=${Number(roomId)}`

        )

        console.log("RoomData", data);

        setRoom(data)
      } catch (err) {
        setError("Failed to load room data")
      } finally {
        setLoading(false)
      }
    }

    fetchRoom()
  }, [hostelId, roomId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!room) return <div>No room found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={`/hostels/${room.hostel_id}/rooms`} className="text-sm text-primary hover:underline">
        &larr; Back to rooms
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Room {room.room_number}</h1>

      <ImageGallery
        images={
          room.image_url.length > 0
            ? room.image_url.map(img => img.url)
            : ["/placeholder.svg?height=600&width=800"]
        }
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="details">Room Details</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4 text-2xl font-semibold">About this Room</h2>
                  <p className="text-muted-foreground">
                    {`This ${room.room_type} room (No. ${room.room_number}) is ${
                      room.availability ? "available" : "not available"
                    } for booking.`}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Room Features</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span>{room.room_type} Room</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>Availability: {room.availability ? "Available" : "Unavailable"}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Pricing</h3>
                  <p className="text-muted-foreground">${room.price_per_semester} per semester</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-8">
            <CardContent className="p-6">
              <div className="mb-4 text-2xl font-bold">
                ${room.price_per_semester}
                <span className="text-sm font-normal text-muted-foreground"> / semester</span>
              </div>

              <div className="mb-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room number</span>
                  <span>{room.room_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room type</span>
                  <span>{room.room_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability</span>
                  <Badge
                    variant={room.availability ? "outline" : "destructive"}
                    className={room.availability ? "text-green-600" : "text-red-600"}
                  >
                    {room.availability ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>

              <Separator className="mb-6" />

              <Button asChild className="w-full" disabled={!room.availability}>
                <Link href={`/hostels/${room.hostel_id}/rooms/${room.room_number}/book`}>Book Now</Link>
              </Button>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                No payment required to book a viewing
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

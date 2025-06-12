"use client"

import { useEffect, useState } from "react"
import api from "@/lib/axios"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, MoreHorizontal, Plus, Search, Trash, Users } from "lucide-react"
import OwnerLayout from "@/components/owner-layout"

interface Room {
  id: number
  room_number: string
  price_per_semester: number
  room_type: string
  occupancy?: number
  description?: string
  image_url: Array<{ url: string }>
  availability: boolean
  created_at: string
  updated_at: string
  hostel_id: number
}

interface Hostel {
  id: string
  name: string
  location: string
  image_url?: Array<{ url: string }>
}

export default function HostelRoomsPage(props: { params: Promise<{ id: string }> }) {
  const [hostel, setHostel] = useState<Hostel | null>(null)
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [hostelId, setHostelId] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = await props.params
        setHostelId(params.id)

        // Fetch hostel details
        const hostelResponse = await api.get(`/hostels/hostel-detail?hostel_id=${params.id}`)

        console.log("HostelResponse:", hostelResponse.data);
        setHostel(hostelResponse.data)

        // Fetch rooms for this hostel
        const roomsResponse = await api.get(`/rooms/get-all-my-rooms?hostel_id=${params.id}`)
        console.log("RoomsResponse:", roomsResponse.data);
        
        if (roomsResponse.data && roomsResponse.data.rooms) {
          setRooms(roomsResponse.data.rooms)
        } else {
          setRooms([])
        }

      } catch (error) {
        console.error("Error fetching data:", error)
        setRooms([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [props.params])

  const handleDeleteRoom = async (roomId: number) => {
    if (!confirm("Are you sure you want to delete this room?")) return

    try {
      await api.delete(`/rooms/delete?room_id=${roomId}`)
      setRooms(rooms.filter(room => room.id !== roomId))
    } catch (error) {
      console.error("Error deleting room:", error)
    }
  }

  if (loading) {
    return (
      <OwnerLayout>
        <div className="pl-8 pr-4 md:pl-16 md:pr-4 py-12">
          <div>Loading...</div>
        </div>
      </OwnerLayout>
    )
  }

  return (
    <OwnerLayout>
      <div className="pl-8 pr-4 md:pl-16 md:pr-4 py-12">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/owner/hostels">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Hostels
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Manage Rooms</h1>
            <p className="text-muted-foreground">
              {hostel?.name} - {hostel?.location}
            </p>
          </div>
          <Button asChild>
            <Link href={`/owner/hostels/${hostelId}/rooms/create`}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Room
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row mb-4">
          <div className="relative flex-1 mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search rooms..." className="pl-9" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rooms</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rooms ({rooms.length})</CardTitle>
            <CardDescription>View and manage all rooms in this hostel</CardDescription>
          </CardHeader>
          <CardContent>
            {rooms.length > 0 ? (
              <div className="space-y-4">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-20 w-20 overflow-hidden rounded-md bg-muted">
                        <img
                          src={room.image_url?.[0]?.url || "/placeholder.svg?height=80&width=80"}
                          alt={`Room ${room.room_number}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Room {room.room_number}</h3>
                          <Badge variant={room.availability ? "default" : "secondary"}>
                            {room.availability ? "Available" : "Occupied"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground capitalize">{room.room_type}</p>
                        <div className="mt-1 flex items-center gap-4">
                          <span className="text-sm font-medium">
                            UGX {room.price_per_semester?.toLocaleString()}/semester
                          </span>
                          {room.occupancy && (
                            <div className="flex items-center gap-1 text-sm">
                              <Users className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{room.occupancy} {room.occupancy === 1 ? 'person' : 'people'}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/owner/hostels/${hostelId}/rooms/${room.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteRoom(room.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No rooms found for this hostel.</p>
                <Button asChild>
                  <Link href={`/owner/hostels/${hostelId}/rooms/create`}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Room
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </OwnerLayout>
  )
}
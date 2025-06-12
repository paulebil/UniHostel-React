"use client"

import { use } from "react"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import RoomCard from "@/components/room-card"
import api from "@/lib/axios"

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

export default function RoomsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params) // ✅ unwrap the promise

  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [roomTypeFilter, setRoomTypeFilter] = useState("all")
  const [sortOption, setSortOption] = useState("price-low")

  useEffect(() => {
    async function fetchRoomsByHostelId() {
      try {
        const response = await api.get(`/rooms/get-all-rooms?hostel_id=${id}`)
        setRooms(response.data.rooms)
      } catch (error) {
        console.error("Error fetching rooms:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRoomsByHostelId()
  }, [id])

  const filteredAndSortedRooms = () => {
    let filtered = [...rooms]

    if (roomTypeFilter !== "all") {
      filtered = filtered.filter(room => room.room_type.toLowerCase() === roomTypeFilter)
    }

    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => a.price_per_semester - b.price_per_semester)
        break
      case "price-high":
        filtered.sort((a, b) => b.price_per_semester - a.price_per_semester)
        break
      case "availability":
        filtered.sort((a, b) => Number(b.availability) - Number(a.availability))
        break
    }

    return filtered
  }

  if (loading) return <div className="p-8 text-muted-foreground">Loading rooms...</div>
  if (!rooms.length) return <div className="p-8 text-red-500">No rooms found.</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/hostels/${id}`} className="text-sm text-primary hover:underline">
          &larr; Back to hostel details
        </Link>
        <h1 className="mt-2 text-3xl font-bold">Available Rooms</h1>
        <p className="text-muted-foreground">Choose from our selection of comfortable rooms</p>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Select value={roomTypeFilter} onValueChange={setRoomTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Room type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All room types</SelectItem>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="double">Double</SelectItem>
              <SelectItem value="triple">Triple</SelectItem>
              <SelectItem value="quad">Quad</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="availability">Availability</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {filteredAndSortedRooms().length} room(s)
        </div>
      </div>

      <div className="space-y-6">
        {filteredAndSortedRooms().map(room => (
          <RoomCard
            key={room.id}
            room={room}
            hostelId={Number(id)}
            detailed
          />
        ))}
      </div>
    </div>
  )
}

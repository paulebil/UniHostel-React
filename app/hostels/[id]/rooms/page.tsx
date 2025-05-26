import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getHostels } from "@/lib/data"
import Link from "next/link"
import RoomCard from "@/components/room-card"

export default async function RoomsPage(props: { params: { id: string } }) {
  // Get params
  const { id } = await props.params

  // Find the hostel by ID
  const hostels = await getHostels()
  const hostel = hostels.find((h) => h.id === id) || hostels[0]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/hostels/{hostel.id}`} className="text-sm text-primary hover:underline">
          &larr; Back to hostel details
        </Link>
        <h1 className="mt-2 text-3xl font-bold">Rooms at {hostel.name}</h1>
        <p className="text-muted-foreground">Choose from our selection of comfortable rooms</p>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Select defaultValue="all">
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

          <Select defaultValue="price-low">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="availability">Availability</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground">Showing {hostel.rooms?.length || 0} rooms</div>
      </div>

      <div className="space-y-6">
        {hostel.rooms?.map((room, index) => (
          <RoomCard key={index} room={room} hostelId={hostel.id} detailed />
        ))}
      </div>
    </div>
  )
}

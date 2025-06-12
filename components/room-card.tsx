import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import Link from "next/link"

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

interface RoomCardProps {
  room: Room
  hostelId: number
  detailed?: boolean
}

export default function RoomCard({ room, hostelId, detailed = false }: RoomCardProps) {
  const imageUrl = room.image_url?.[0]?.url || "/placeholder.svg"

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="h-48 w-full md:h-auto md:w-1/3">
          <img src={imageUrl} alt={`Room ${room.room_number}`} className="h-full w-full object-cover" />
        </div>
        <CardContent className="flex flex-1 flex-col p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold">Room {room.room_number}</h3>
            <Badge variant="outline" className={room.availability ? "text-green-600" : "text-red-600"}>
              {room.availability ? "Available" : "Fully Booked"}
            </Badge>
          </div>

          <div className="mb-2 flex flex-wrap gap-2">
            <Badge variant="secondary">{room.room_type}</Badge>
            <Badge variant="secondary">{room.availability ? "Vacant" : "Occupied"}</Badge>
          </div>

          {detailed && (
            <p className="mb-4 text-sm text-muted-foreground">
              This is a {room.room_type.toLowerCase()} room (Room No. {room.room_number}) priced at UGX {room.price_per_semester.toLocaleString()} per semester.
            </p>
          )}

          <div className="mt-auto flex items-center justify-between">
            <div>
              <span className="text-lg font-semibold">UGX {room.price_per_semester.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground"> / semester</span>
            </div>
            <Button asChild>
              <Link href={`/hostels/${hostelId}/rooms/${room.id}`}>
                {detailed ? "Book Now" : "View Details"}
              </Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

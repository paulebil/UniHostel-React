import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Room } from "@/lib/data"
import { Users } from "lucide-react"
import Link from "next/link"

interface RoomCardProps {
  room: Room
  hostelId: string
  detailed?: boolean
}

export default function RoomCard({ room, hostelId, detailed = false }: RoomCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="h-48 w-full md:h-auto md:w-1/3">
          <img src="/placeholder.svg?height=192&width=192" alt={room.name} className="h-full w-full object-cover" />
        </div>
        <CardContent className="flex flex-1 flex-col p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold">{room.name}</h3>
            <Badge variant="outline" className={room.availability ? "text-green-600" : "text-red-600"}>
              {room.availability ? "Available" : "Fully Booked"}
            </Badge>
          </div>

          <div className="mb-2 flex flex-wrap gap-2">
            <Badge variant="secondary">{room.type}</Badge>
            <Badge variant="secondary">{room.ensuite ? "En-suite" : "Shared Bathroom"}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span>
                {room.occupancy} {room.occupancy > 1 ? "persons" : "person"}
              </span>
            </div>
          </div>

          {detailed && (
            <p className="mb-4 text-sm text-muted-foreground">
              {room.description ||
                `This ${room.type} room offers a comfortable living space with all the essentials you need. 
                It comes with ${room.ensuite ? "a private en-suite bathroom" : "access to shared bathroom facilities"} 
                and is perfect for ${room.occupancy > 1 ? "shared accommodation" : "individual living"}.`}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between">
            <div>
              <span className="text-lg font-semibold">${room.price}</span>
              <span className="text-sm text-muted-foreground"> / month</span>
            </div>
            <Button asChild>
              <Link href={`/hostels/${hostelId}/rooms/${room.id}`}>{detailed ? "Book Now" : "View Details"}</Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

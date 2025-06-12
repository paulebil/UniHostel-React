import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star } from "lucide-react"
import Link from "next/link"
import type { Hostel } from "@/lib/data"



interface HostelCardProps {
  hostel: Hostel
}

export default function HostelCard({ hostel }: HostelCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/hostels/${hostel.id}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={hostel.image_url?.[0]?.url || "/placeholder.svg?height=192&width=384"}
            alt={hostel.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/hostels/${hostel.id}`}>
          <h3 className="mb-1 font-semibold hover:text-primary">{hostel.name}</h3>
        </Link>
        <div className="mb-2 flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-3.5 w-3.5" />
          <span>{hostel.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold">
              {hostel.average_price}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

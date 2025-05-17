import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { hostels } from "@/lib/data"
import { Edit, MoreHorizontal, Plus, Search, Trash } from "lucide-react"
import Link from "next/link"
import OwnerLayout from "@/components/owner-layout"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function OwnerRoomsPage({ params }: { params: { id: string } }) {
  // Find the hostel by ID
  const hostel = hostels.find((h) => h.id === params.id) || hostels[0]

  return (
    <OwnerLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Rooms at {hostel.name}</h1>
            <p className="text-muted-foreground">Manage and update your room listings</p>
          </div>
          <Button asChild>
            <Link href={`/owner/hostels/${hostel.id}/rooms/create`}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Room
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search rooms..." className="pl-9" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Room Types</SelectItem>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="double">Double</SelectItem>
              <SelectItem value="triple">Triple</SelectItem>
              <SelectItem value="ensuite">En-suite</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Rooms ({hostel.rooms?.length || 0})</CardTitle>
            <CardDescription>View and manage all rooms in this hostel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hostel.rooms?.map((room, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-md bg-muted">
                      <img
                        src="/placeholder.svg?height=80&width=80"
                        alt={room.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{room.name}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{room.type}</Badge>
                        <Badge variant="outline">{room.ensuite ? "En-suite" : "Shared Bathroom"}</Badge>
                        <span className="text-sm text-muted-foreground">${room.price}/month</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/owner/hostels/${hostel.id}/rooms/${room.id}/bookings`}>Bookings</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/owner/hostels/${hostel.id}/rooms/${room.id}`}>
                        <Edit className="mr-2 h-3.5 w-3.5" />
                        Edit
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Preview Room</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Unavailable</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate Room</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Room
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </OwnerLayout>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { hostels } from "@/lib/data"
import { Edit, MoreHorizontal, Plus, Search, Star, Trash, Users } from "lucide-react"
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

export default function OwnerHostelsPage() {
  // For demo purposes, we'll assume the owner owns the first 3 hostels
  const ownerHostels = hostels.slice(0, 3)

  return (
    <OwnerLayout>
      <div className="pl-8 pr-4 md:pl-16 md:pr-4 py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Your Hostels</h1>
            <p className="text-muted-foreground">Manage and update your hostel listings</p>
          </div>
          <Button asChild>
            <Link href="/owner/hostels/create">
              <Plus className="mr-2 h-4 w-4" />
              Add New Hostel
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row mb-4">
          <div className="relative flex-1 mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search hostels..." className="pl-9" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Hostels</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Hostels ({ownerHostels.length})</CardTitle>
            <CardDescription>View and manage all your hostel properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ownerHostels.map((hostel) => (
                <div
                  key={hostel.id}
                  className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-md bg-muted">
                      <img
                        src="/placeholder.svg?height=80&width=80"
                        alt={hostel.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{hostel.name}</h3>
                      <p className="text-sm text-muted-foreground">{hostel.location}</p>
                      <div className="mt-1 flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          <span>{hostel.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{hostel.rooms?.length || 0} rooms</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/owner/hostels/{hostel.id}/rooms`}>Manage Rooms</Link>
                    </Button>
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

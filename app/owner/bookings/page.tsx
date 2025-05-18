import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { hostels } from "@/lib/data"
import { Calendar, ChevronRight, Download, Eye, Search } from "lucide-react"
import Link from "next/link"
import OwnerLayout from "@/components/owner-layout"
import { Badge } from "@/components/ui/badge"

export default function OwnerBookingsPage() {
  // For demo purposes, we'll assume the owner owns the first 3 hostels
  const ownerHostels = hostels.slice(0, 3)

  return (
    <OwnerLayout>
      <div className="pl-8 pr-4 md:pl-16 md:pr-4 py-12">
        <div>
          <h1 className="text-3xl font-bold">Bookings</h1>
          <p className="text-muted-foreground">Manage all bookings across your properties</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1 mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by booking ID, student name..." className="pl-9" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bookings</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by hostel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Hostels</SelectItem>
              {ownerHostels.map((hostel) => (
                <SelectItem key={hostel.id} value={hostel.id}>
                  {hostel.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Bookings</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Bookings</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Bookings (24)</CardTitle>
                <CardDescription>Currently active bookings across all your properties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((booking) => (
                    <div
                      key={booking}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Booking #{booking + 1000}</span>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {
                            ["Single Room", "Double Room", "Triple Room", "En-suite Single", "Double En-suite"][
                            booking - 1
                            ]
                          }{" "}
                          at {ownerHostels[booking % 3].name}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Sep 1, 2023 - Jan 31, 2024</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="font-medium">John Doe</div>
                          <div className="text-sm text-muted-foreground">University of Example</div>
                        </div>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/owner/bookings/${booking + 1000}`}>
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bookings (12)</CardTitle>
                <CardDescription>Bookings that will start in the future</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((booking) => (
                    <div
                      key={booking}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Booking #{booking + 2000}</span>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Upcoming</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {["Single Room", "Double Room", "Triple Room"][booking - 1]} at{" "}
                          {ownerHostels[booking % 3].name}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Feb 1, 2024 - Jun 30, 2024</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="font-medium">Jane Smith</div>
                          <div className="text-sm text-muted-foreground">University of Example</div>
                        </div>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/owner/bookings/${booking + 2000}`}>
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Past Bookings (45)</CardTitle>
                  <CardDescription>Completed bookings from previous periods</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="mt-4 sm:mt-0">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((booking) => (
                    <div
                      key={booking}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Booking #{booking + 3000}</span>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {["Single Room", "Double Room", "Triple Room"][booking - 1]} at{" "}
                          {ownerHostels[booking % 3].name}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Sep 1, 2022 - Jun 30, 2023</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-3.5 w-3.5" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cancelled">
            <Card>
              <CardHeader>
                <CardTitle>Cancelled Bookings (5)</CardTitle>
                <CardDescription>Bookings that were cancelled by students or by you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((booking) => (
                    <div
                      key={booking}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Booking #{booking + 4000}</span>
                          <Badge variant="destructive">Cancelled</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {["Single Room", "Double Room"][booking - 1]} at {ownerHostels[booking % 3].name}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Cancelled on: May 15, 2023</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-3.5 w-3.5" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </OwnerLayout>
  )
}

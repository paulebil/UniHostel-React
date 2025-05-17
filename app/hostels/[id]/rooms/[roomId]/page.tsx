import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { hostels } from "@/lib/data"
import { Calendar, Check, Users, Wifi, Utensils, Tv } from "lucide-react"
import Link from "next/link"
import ImageGallery from "@/components/image-gallery"

export default function RoomDetailsPage({ params }: { params: { id: string; roomId: string } }) {
  // Find the hostel by ID
  const hostel = hostels.find((h) => h.id === params.id) || hostels[0]

  // Find the room by ID
  const room = hostel.rooms?.find((r) => r.id === params.roomId) || hostel.rooms?.[0]

  if (!room) {
    return <div>Room not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/hostels/${hostel.id}/rooms`} className="text-sm text-primary hover:underline">
          &larr; Back to rooms
        </Link>
        <h1 className="mt-2 text-3xl font-bold">{room.name}</h1>
        <p className="text-muted-foreground">
          at {hostel.name}, {hostel.location}
        </p>
      </div>

      <ImageGallery images={Array(5).fill("/placeholder.svg?height=600&width=800")} />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="details">Room Details</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4 text-2xl font-semibold">About this Room</h2>
                  <p className="text-muted-foreground">
                    {room.description ||
                      `This ${room.type} room offers a comfortable living space for students. 
                    It comes fully furnished with all the essentials you need for a productive academic year. 
                    The room is designed to maximize space and provide a conducive environment for both studying and relaxing.`}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Room Features</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span>
                        {room.type} Room ({room.occupancy} {room.occupancy > 1 ? "persons" : "person"})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{room.size} square meters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="h-5 w-5 text-primary" />
                      <span>High-speed WiFi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Utensils className="h-5 w-5 text-primary" />
                      <span>Access to shared kitchen</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tv className="h-5 w-5 text-primary" />
                      <span>Smart TV</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>Minimum stay: 1 semester</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">What's Included</h3>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>All utilities (water, electricity, heating)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>High-speed internet</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Bed with mattress and linens</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Desk and chair</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Wardrobe</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Weekly cleaning of common areas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Access to all hostel facilities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>24/7 security and support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="amenities">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Room Amenities</h2>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-lg font-medium">In-Room Amenities</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        Comfortable bed with linens
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        Study desk and chair
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        Wardrobe
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        Bookshelf
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        Bedside table
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        Reading lamp
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        Blackout curtains
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        Heating
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-medium">Bathroom</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      {room.ensuite ? (
                        <>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            Private en-suite bathroom
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            Shower
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            Toilet
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            Sink
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            Mirror
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            Towel rail
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            Shared bathroom facilities
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            Cleaned daily
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            Shower cubicles
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            Toilet facilities
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            Sinks with mirrors
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-medium">Technology</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        High-speed WiFi
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        Ethernet connection
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        Multiple power outlets
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        USB charging ports
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="policies">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Room Policies</h2>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Booking and Payment</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Minimum stay: 1 semester (4-5 months)</li>
                    <li>Security deposit: Equal to one month's rent</li>
                    <li>Payment options: Monthly, semester, or annual payments</li>
                    <li>Booking fee: $100 (non-refundable, applied to first month's rent)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Cancellation Policy</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>More than 30 days before move-in: Full refund (minus booking fee)</li>
                    <li>15-30 days before move-in: 50% refund (minus booking fee)</li>
                    <li>Less than 15 days before move-in: No refund</li>
                    <li>Early termination: 2 months' notice required, penalty may apply</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">House Rules</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Quiet hours: 10 PM - 8 AM</li>
                    <li>No smoking inside the building</li>
                    <li>Guests policy: Visitors allowed from 8 AM - 10 PM</li>
                    <li>Overnight guests: Limited to 2 nights per week with prior approval</li>
                    <li>Pets: Not allowed</li>
                    <li>Room inspections: Monthly with prior notice</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-8">
            <CardContent className="p-6">
              <div className="mb-4 text-2xl font-bold">
                ${room.price}
                <span className="text-sm font-normal text-muted-foreground"> / month</span>
              </div>

              <div className="mb-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room type</span>
                  <span>{room.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Occupancy</span>
                  <span>
                    {room.occupancy} {room.occupancy > 1 ? "persons" : "person"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bathroom</span>
                  <span>{room.ensuite ? "En-suite" : "Shared"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability</span>
                  <Badge variant="outline" className="text-green-600">
                    Available
                  </Badge>
                </div>
              </div>

              <Separator className="mb-6" />

              <div className="space-y-4">
                <Button asChild className="w-full">
                  <Link href={`/hostels/${hostel.id}/rooms/${room.id}/book`}>Book Now</Link>
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule Viewing
                </Button>
              </div>

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

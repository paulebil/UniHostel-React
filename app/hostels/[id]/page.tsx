import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getHostels } from "@/lib/data"
import { MapPin, Star, Wifi, Utensils, Dumbbell, BookOpen, Tv, Snowflake } from "lucide-react"
import Link from "next/link"
import RoomCard from "@/components/room-card"
import ImageGallery from "@/components/image-gallery"

export default async function HostelDetailsPage(props: { params: { id: string } }) {
  // Find the hostel by ID
  const { id } = await props.params
  const hostels = await getHostels()
  const hostel = hostels.find((h) => h.id === id) || hostels[0]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">{hostel.name}</h1>
        <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            {hostel.location}
          </div>
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>
              {hostel.rating} ({hostel.reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>

      <ImageGallery images={Array(5).fill("/placeholder.svg?height=600&width=800")} />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {/* <TabsTrigger value="rooms">Rooms</TabsTrigger> */}
              {/* <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4 text-2xl font-semibold">About {hostel.name}</h2>
                  <p className="text-muted-foreground">
                    {hostel.description ||
                      `{hostel.name} is a modern student accommodation located near {hostel.location}. 
                    It offers comfortable rooms with all the amenities students need for a productive and enjoyable stay. 
                    The hostel is within walking distance of major universities and has excellent transport links.`}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Highlights</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <Wifi className="h-5 w-5 text-primary" />
                      <span>Free high-speed WiFi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Utensils className="h-5 w-5 text-primary" />
                      <span>Fully equipped kitchen</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dumbbell className="h-5 w-5 text-primary" />
                      <span>Fitness center</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span>Study rooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tv className="h-5 w-5 text-primary" />
                      <span>Common room with TV</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Snowflake className="h-5 w-5 text-primary" />
                      <span>Air conditioning</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Location</h3>
                  <div className="h-[300px] rounded-lg bg-muted">
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      Map view would be displayed here
                    </div>
                  </div>
                  <div className="mt-4 text-muted-foreground">
                    <p>Distance to key locations:</p>
                    <ul className="mt-2 list-inside list-disc">
                      <li>University Campus: 0.5 km (6 min walk)</li>
                      <li>City Center: 2 km (10 min by bus)</li>
                      <li>Supermarket: 0.3 km (4 min walk)</li>
                      <li>Bus Stop: 0.2 km (3 min walk)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rooms">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Available Rooms</h2>
                <div className="space-y-4">
                  {hostel.rooms?.map((room, index) => (
                    <RoomCard key={index} room={room} hostelId={hostel.id} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="amenities">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Amenities</h2>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-lg font-medium">Room Amenities</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Wifi className="h-4 w-4" />
                        High-speed WiFi
                      </li>
                      <li className="flex items-center gap-2">
                        <Snowflake className="h-4 w-4" />
                        Air conditioning
                      </li>
                      <li className="flex items-center gap-2">
                        <Tv className="h-4 w-4" />
                        Smart TV
                      </li>
                      <li>Study desk and chair</li>
                      <li>Wardrobe</li>
                      <li>Comfortable bed with linens</li>
                      <li>Blackout curtains</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-medium">Common Areas</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Utensils className="h-4 w-4" />
                        Fully equipped kitchen
                      </li>
                      <li className="flex items-center gap-2">
                        <Dumbbell className="h-4 w-4" />
                        Fitness center
                      </li>
                      <li className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Study rooms
                      </li>
                      <li>Laundry facilities</li>
                      <li>Lounge area</li>
                      <li>Outdoor terrace</li>
                      <li>Bicycle storage</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-medium">Services</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>24/7 reception</li>
                      <li>Security personnel</li>
                      <li>CCTV surveillance</li>
                      <li>Cleaning service (weekly)</li>
                      <li>Parcel collection</li>
                      <li>Maintenance support</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-medium">Additional Features</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>Events and social activities</li>
                      <li>Quiet hours policy</li>
                      <li>Guest policy</li>
                      <li>Accessible facilities</li>
                      <li>Sustainable practices</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Guest Reviews</h2>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-medium">{hostel.rating}</span>
                    <span className="text-muted-foreground">({hostel.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((review) => (
                    <div key={review} className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-muted"></div>
                          <div>
                            <div className="font-medium">Student {review}</div>
                            <div className="text-sm text-muted-foreground">
                              Stayed in {["January", "February", "March", "April", "May"][review - 1]} 2023
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 {i < 5 - (review % 2) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                              />
                            ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        {
                          [
                            "Great location, clean rooms, and friendly staff. The common areas were always well-maintained.",
                            "Excellent value for money. The room was spacious and the facilities were top-notch.",
                            "I enjoyed my stay here. The study rooms were perfect for exam preparation.",
                            "The kitchen was well-equipped and the WiFi was fast. Perfect for student life.",
                            "Comfortable bed and quiet environment. Made my university experience much better.",
                          ][review - 1]
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 text-2xl font-bold">
                {hostel.priceRange.min} - {hostel.priceRange.max}
                <span className="text-sm font-normal text-muted-foreground"> / month</span>
              </div>

              <div className="mb-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability</span>
                  <Badge variant="outline" className="text-green-600">
                    Available
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room types</span>
                  <span>Single, Double, Triple</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minimum stay</span>
                  <span>1 semester</span>
                </div>
              </div>

              <Separator className="mb-6" />

              <div className="space-y-4">
                <Button asChild className="w-full">
                  <Link href={`/hostels/{hostel.id}/rooms`}>View Rooms</Link>
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

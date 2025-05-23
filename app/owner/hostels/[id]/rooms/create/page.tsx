import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload } from "lucide-react"
import { getHostels } from "@/lib/data"
import OwnerLayout from "@/components/owner-layout"


export default async function CreateRoomPage(props: { params: { id: string } }) {

  // Get params
  const { id } = await props.params

  // Find the hostel by ID
  const hostels = await getHostels()
  const hostel = hostels.find((h) => h.id === id) || hostels[0]

  return (
    <OwnerLayout>
      <div className="pl-8 pr-4 md:pl-16 md:pr-4 py-12">
        <div>
          <h1 className="text-3xl font-bold">Add New Room</h1>
          <p className="text-muted-foreground">Create a new room at {hostel.name}</p>
        </div>

        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">Room Information</TabsTrigger>
            {/* <TabsTrigger value="details">Details & Amenities</TabsTrigger> */}
            <TabsTrigger value="photos">Photos</TabsTrigger>
            {/* <TabsTrigger value="pricing">Pricing & Availability</TabsTrigger> */}
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Room Information</CardTitle>
                <CardDescription>Provide the essential details about this room</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="room-no">Room Number</Label>
                  <Input id="room-no" placeholder="e.g., A02" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="room-type">Room Type</Label>
                  <Select>
                    <SelectTrigger id="room-type">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Room</SelectItem>
                      <SelectItem value="double">Double Room</SelectItem>
                      <SelectItem value="triple">Triple Room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupancy">Occupancy</Label>
                  <Select>
                    <SelectTrigger id="occupancy">
                      <SelectValue placeholder="Select occupancy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Person</SelectItem>
                      <SelectItem value="2">2 People</SelectItem>
                      <SelectItem value="3">3 People</SelectItem>
                      <SelectItem value="4">4 People</SelectItem>
                      <SelectItem value="5+">5+ People</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of the room"
                    className="min-h-[150px]"
                  />
                </div>

                {/* <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="room-size">Room Size (sq m)</Label>
                    <Input id="room-size" type="number" min="1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floor">Floor</Label>
                    <Input id="floor" type="number" min="0" />
                  </div>
                </div> */}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Save as Draft</Button>
                <Button>Continue</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Details & Amenities</CardTitle>
                <CardDescription>Provide more information about the room's features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Bathroom Type</Label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ensuite" />
                      <Label htmlFor="ensuite" className="text-sm font-normal">
                        En-suite bathroom
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="shared" />
                      <Label htmlFor="shared" className="text-sm font-normal">
                        Shared bathroom
                      </Label>
                    </div>
                  </div>
                </div>
                {/* 
                <Separator />

                <div className="space-y-2">
                  <Label>Room Amenities</Label>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {[
                      "Bed Linens",
                      "Desk & Chair",
                      "Wardrobe",
                      "Bookshelf",
                      "Bedside Table",
                      "Reading Lamp",
                      "Blackout Curtains",
                      "Air Conditioning",
                      "Heating",
                      "TV",
                      "Mini-fridge",
                      "Microwave",
                      "Kettle",
                      "Wi-Fi",
                    ].map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox id={`amenity-${amenity}`} />
                        <Label htmlFor={`amenity-${amenity}`} className="text-sm font-normal">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Bed Type</Label>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {["Single Bed", "Double Bed", "Twin Beds", "Bunk Bed", "Queen Bed", "King Bed"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={`bed-${type}`} />
                        <Label htmlFor={`bed-${type}`} className="text-sm font-normal">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-info">Additional Information</Label>
                  <Textarea
                    id="additional-info"
                    placeholder="Any other details about the room that students should know"
                    className="min-h-[100px]"
                  />
                </div> */}
              </CardContent>
              {/* <CardFooter className="flex justify-between">
                <Button variant="outline">Previous</Button>
                <Button>Complete</Button>
              </CardFooter> */}
            </Card>
          </TabsContent>

          <TabsContent value="photos">
            <Card>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
                <CardDescription>Upload photos of the room to showcase its features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border border-dashed p-10 text-center">
                  <div className="mx-auto flex w-full max-w-[420px] flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <div className="mt-4 mb-6">
                      <h3 className="font-medium">Drag & drop your photos here</h3>
                      <p className="text-sm text-muted-foreground">or click to browse files (max 10MB per image)</p>
                    </div>
                    <Button>Upload Photos</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Photo Requirements</Label>
                  <ul className="list-inside list-disc text-sm text-muted-foreground">
                    <li>Upload at least 3 photos of the room</li>
                    <li>Include photos from different angles</li>
                    <li>Show the bathroom if it's en-suite</li>
                    <li>Ensure photos are well-lit and high quality</li>
                    <li>Avoid using stock photos or misleading images</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Previous</Button>
                <Button>Complete</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Availability</CardTitle>
                <CardDescription>Set the pricing and availability for this room</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Monthly Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                    <Input id="price" type="number" min="0" className="pl-7" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deposit">Security Deposit</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                    <Input id="deposit" type="number" min="0" className="pl-7" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Minimum Stay</Label>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {["1 Month", "3 Months", "1 Semester", "Academic Year"].map((period) => (
                      <div key={period} className="flex items-center space-x-2">
                        <Checkbox id={`period-${period}`} />
                        <Label htmlFor={`period-${period}`} className="text-sm font-normal">
                          {period}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="available-from">Available From</Label>
                    <Input id="available-from" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="available-until">Available Until (optional)</Label>
                    <Input id="available-until" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Room Status</Label>
                  <Select defaultValue="available">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="booked">Fully Booked</SelectItem>
                      <SelectItem value="maintenance">Under Maintenance</SelectItem>
                      <SelectItem value="hidden">Hidden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="instant-booking" />
                    <Label htmlFor="instant-booking" className="text-sm font-normal">
                      Allow instant booking
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    If enabled, students can book this room without requiring your approval
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Previous</Button>
                <Button>Add Room</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </OwnerLayout>
  )
}

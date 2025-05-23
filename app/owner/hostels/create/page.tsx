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
import OwnerLayout from "@/components/owner-layout"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

// Add this at the top of your file
const formSchema = z.object({
  basic: z.object({
    hostelName: z.string().min(3, "Enter Hostel Name"),
    description: z.string().min(50, "Description must be at least 50 characters"),
  }),
  details: z.object({
    amenities: z.array(z.string()).min(1, "Select at least one amenity"),
    roomTypes: z.array(z.string()).min(1, "Select at least one room type"),
    totalRooms: z.number().min(1, "Must have at least 1 room"),
    capacity: z.number().min(1, "Must have at least 1 capacity"),
    rules: z.string().optional(),
  }),
  photos: z.object({
    images: z.array(z.any()).min(1, "Upload at least 1 photo"),
  }),
  location: z.object({
    address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    postalCode: z.string().min(3, "Postal code must be at least 3 characters"),
    country: z.string().min(1, "Please select a country"),
    nearby: z.string().optional(),
  }),
  pricing: z.object({
    minPrice: z.number().min(0, "Price cannot be negative"),
    maxPrice: z.number().min(0, "Price cannot be negative"),
    deposit: z.number().min(0, "Deposit cannot be negative"),
    bookingFee: z.number().min(0, "Booking fee cannot be negative"),
    stayPeriods: z.array(z.string()).min(1, "Select at least one stay period"),
    paymentOptions: z.array(z.string()).min(1, "Select at least one payment option"),
    availability: z.string().min(1, "Select an availability date"),
  }),
});

export default function CreateHostelPage() {

  return (
    <OwnerLayout>
      <div className="pl-8 pr-4 md:pl-16 md:pr-4 py-12">
        <div>
          <h1 className="text-3xl font-bold">Add New Hostel</h1>
          <p className="text-muted-foreground">Create a new hostel listing on UniHostel</p>
        </div>

        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">Hostel Information</TabsTrigger>
            {/* <TabsTrigger value="details">Details & Amenities</TabsTrigger> */}
            <TabsTrigger value="photos">Photos</TabsTrigger>
            {/* <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger> */}
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Hostel Information</CardTitle>
                <CardDescription>Provide the details about your hostel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2 ">
                  <Label htmlFor="hostel-name" className="font-bold">Hostel Name</Label>
                  <Input name="hostelName" id="hostel-name" placeholder="Enter the name of your hostel" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="font-bold">Location</Label>
                  <Input name="location" id="location" placeholder="Enter hostel location" />
                </div>


                <div className="space-y-2">
                  <Label htmlFor="location" className="font-bold">Amenities</Label>
                  <Input name="amenities" id="amenities" placeholder="Enter hostel amenities" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="font-bold">Average Price</Label>
                  <Input name="price" id="price" placeholder="Enter hostel average price" />
                </div>

                {/*Hostel rules and regulations */}
                <div className="space-y-2">
                  <Label htmlFor="rules" className="font-bold">Rules and Regulations</Label>
                  <Textarea
                    id="rules"
                    name="rules"
                    placeholder="Provide hostel rules and regulations"
                    className="min-h-[150px]"
                  />
                </div>
                {/*Hostel description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="font-bold">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide a detailed description of your hostel"
                    className="min-h-[150px]"
                  />
                </div>

              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Save as Draft</Button>
                <Button>Continue</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Details & Amenities</CardTitle>
                <CardDescription>Provide more information about your hostel's features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Hostel Amenities</Label>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {[
                      "Wi-Fi",
                      "Laundry Facilities",
                      "Kitchen",
                      "Study Room",
                      "Gym",
                      "Common Room",
                      "Bike Storage",
                      "Garden/Outdoor Space",
                      "Security Personnel",
                      "CCTV",
                      "Air Conditioning",
                      "Heating",
                      "Elevator",
                      "Wheelchair Accessible",
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
                  <Label>Room Types Available</Label>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {[
                      "Single Room",
                      "Double Room",
                      "Triple Room",
                      "Quad Room",
                      "En-suite Single",
                      "En-suite Double",
                      "Studio",
                      "Dormitory",
                    ].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={`type-${type}`} />
                        <Label htmlFor={`type-${type}`} className="text-sm font-normal">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="total-rooms">Total Number of Rooms</Label>
                    <Input id="total-rooms" type="number" min="1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Total Capacity</Label>
                    <Input id="capacity" type="number" min="1" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rules">House Rules</Label>
                  <Textarea
                    id="rules"
                    placeholder="Describe any specific rules or policies for your hostel"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Previous</Button>
                <Button>Continue to Photos</Button>
              </CardFooter>
            </Card>
          </TabsContent> */}

          <TabsContent value="photos">
            <Card>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
                <CardDescription>Upload photos of your hostel to attract potential guests</CardDescription>
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
                    <li>Upload at least 5 photos of your hostel</li>
                    <li>Include photos of different room types</li>
                    <li>Show common areas and amenities</li>
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

          {/* <TabsContent value="location">
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>Provide the location details of your hostel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="Enter the street address" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Enter the city" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" placeholder="Enter the state or province" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="postal-code">Postal Code</Label>
                    <Input id="postal-code" placeholder="Enter the postal code" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Map Location</Label>
                  <div className="h-[300px] rounded-lg border bg-muted">
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      Map interface would be displayed here
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Drag the marker to pinpoint your hostel's exact location
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nearby">Nearby Landmarks</Label>
                  <Textarea
                    id="nearby"
                    placeholder="List nearby universities, transport links, and amenities"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Previous</Button>
                <Button>Continue to Pricing</Button>
              </CardFooter>
            </Card>
          </TabsContent> */}

          {/* <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Availability</CardTitle>
                <CardDescription>Set your pricing and availability options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="min-price">Minimum Price (per month)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                      <Input id="min-price" type="number" min="0" className="pl-7" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-price">Maximum Price (per month)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                      <Input id="max-price" type="number" min="0" className="pl-7" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deposit">Security Deposit</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                    <Input id="deposit" type="number" min="0" className="pl-7" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="booking-fee">Booking Fee</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                    <Input id="booking-fee" type="number" min="0" className="pl-7" />
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

                <div className="space-y-2">
                  <Label>Payment Options</Label>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {["Monthly", "Quarterly", "Semester", "Annual"].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox id={`payment-${option}`} />
                        <Label htmlFor={`payment-${option}`} className="text-sm font-normal">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability Date</Label>
                  <Input id="availability" type="date" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Previous</Button>
                <Button>Submit Hostel</Button>
              </CardFooter>
            </Card>
          </TabsContent> */}
        </Tabs>
      </div>
    </OwnerLayout>
  )
}

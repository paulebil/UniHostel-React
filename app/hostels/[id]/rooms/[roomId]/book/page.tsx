"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { getHostels } from "@/lib/data"
import { Calendar, CreditCard, Info } from "lucide-react"
import Link from "next/link"
import { useState } from "react"


export default async function BookingPage(props: { params: { id: string; roomId: string } }) {
  // Get params
  const { id } = await props.params
  const { roomId } = await props.params

  // Find the hostel by ID
  const hostels = await getHostels()
  const hostel = hostels.find((h) => h.id === id) || hostels[0]

  // Find the room by ID
  const room = hostel.rooms?.find((r) => r.id === roomId) || hostel.rooms?.[0]

  if (!room) {
    return <div>Room not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/hostels/{hostel.id}/rooms/{room.id}`} className="text-sm text-primary hover:underline">
          &larr; Back to room details
        </Link>
        <h1 className="mt-2 text-3xl font-bold">Book Your Stay</h1>
        <p className="text-muted-foreground">
          {room.name} at {hostel.name}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Please provide your details for the booking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Enter your last name" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="university">University/College</Label>
                <Input id="university" placeholder="Enter your university or college name" />
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="student-id">Student ID (optional)</Label>
                <Input id="student-id" placeholder="Enter your student ID if available" />
              </div> */}

              {/* <Separator /> */}

              {/* {/* <div>
                <h3 className="mb-4 text-lg font-medium">Booking Period</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="move-in">Move-in Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="move-in" type="date" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select defaultValue="semester">
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="semester">1 Semester (4-5 months)</SelectItem>
                        <SelectItem value="academic-year">Academic Year (9-10 months)</SelectItem>
                        <SelectItem value="year">Full Year (12 months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-lg font-medium">Additional Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="special-requests">Special Requests (optional)</Label>
                  <Textarea
                    id="special-requests"
                    placeholder="Any special requirements or requests?"
                    className="min-h-[100px]"
                  />
                </div> */}
              {/* </div> */}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex items-start space-x-2">
                <div className="flex h-5 items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
                <div className="text-sm leading-tight">
                  <label htmlFor="terms" className="font-medium">
                    I agree to the terms and conditions
                  </label>
                  <p className="text-muted-foreground">
                    By checking this box, you agree to our{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card className="mt-8">
            {/* <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Choose how you want to pay for your booking</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="card" className="space-y-4">
                <div className="flex items-center space-x-2 rounded-lg border p-4">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex flex-1 cursor-pointer items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Credit or Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-4">
                  <RadioGroupItem value="mobieMoney" id="mobieMoney" />
                  <Label htmlFor="mobieMoney" className="flex flex-1 cursor-pointer items-center gap-2">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 4h10v12H7V4zm5 14c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
                    </svg>
                    Mobile Money
                  </Label>
                </div>
              </RadioGroup>
            </CardContent> */}
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/hostels/{hostel.id}/rooms/{room.id}/book/payment`}>Proceed to Payment</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-md bg-muted">
                  <img
                    src="/placeholder.svg?height=64&width=64"
                    alt={room.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{room.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {hostel.name}, {hostel.location}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room type</span>
                  <span>{room.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span>1 Semester (4-5 months)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly rent</span>
                  <span>{room.price}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Security deposit</span>
                  <span>{room.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking fee</span>
                  <span>100</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-medium">
                <span>Total due now</span>
                <span>{room.price + 100}</span>
              </div>

              <div className="rounded-lg bg-muted p-3 text-sm">
                <div className="flex gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Payment Information</p>
                    <p className="text-muted-foreground">
                      You'll pay the security deposit and booking fee now. Monthly rent payments will begin on your
                      move-in date.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div >
  )
}

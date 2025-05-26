"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getHostels, hostels } from "@/lib/data"
import { CreditCard, Lock, ShieldCheck, Smartphone } from "lucide-react"
import Link from "next/link"
import { useState, use } from "react"

export default function PaymentPage(props: { params: Promise<{ id: string; roomId: string }> }) {
  const [selectedProvider, setSelectedProvider] = useState("")

  // Get params - Use React.use() to unwrap the Promise
  const { id, roomId } = use(props.params)

  // Find the hostel by ID
  // Assuming hostels is fetched from a data source
  const hostel = hostels.find((h) => h.id === id) || hostels[0]

  // Find the room by ID
  const room = hostel.rooms?.find((r) => r.id === roomId) || hostel.rooms?.[0]

  if (!room) {
    return <div>Room not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/hostels/{hostel.id}/rooms/{room.id}/book`} className="text-sm text-primary hover:underline">
          &larr; Back to booking details
        </Link>
        <h1 className="mt-2 text-3xl font-bold">Payment</h1>
        <p className="text-muted-foreground">Complete your payment to secure your booking</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="card" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Card Payment
              </TabsTrigger>
              <TabsTrigger value="mobile-money" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Mobile Money
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Credit or Debit Card
                  </CardTitle>
                  <CardDescription>Enter your card details to complete the payment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Name on Card</Label>
                    <Input id="name" placeholder="Enter the name on your card" />
                  </div>
                </CardContent>
                <CardFooter className="flex-col space-y-4">
                  <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-sm">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Your payment information is encrypted and secure. We never store your full card details.
                    </p>
                  </div>

                  <Button asChild className="w-full">
                    <Link href={`/hostels/{hostel.id}/rooms/{room.id}/book/confirmation`}>
                      Pay {room.price + 100}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="mobile-money">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Mobile Money Payment
                  </CardTitle>
                  <CardDescription>Pay securely using your mobile money account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="provider">Mobile Money Provider</Label>
                    <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                      <SelectTrigger id="provider">
                        <SelectValue placeholder="Select your mobile money provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                        <SelectItem value="airtel">Airtel Money</SelectItem>
                        {/* <SelectItem value="vodafone">Vodafone Cash</SelectItem>
                        <SelectItem value="tigo">Tigo Cash</SelectItem>
                        <SelectItem value="orange">Orange Money</SelectItem> */}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <Input
                      id="phone-number"
                      placeholder="Enter your mobile money number"
                      type="tel"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="account-name">Account Name</Label>
                    <Input
                      id="account-name"
                      placeholder="Enter the name on your mobile money account"
                    />
                  </div>

                  {selectedProvider && (
                    <div className="rounded-lg bg-gray-50 p-4 text-sm">
                      <h4 className="font-medium text-gray-900 mb-2">Payment Instructions:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-gray-800">
                        <li>You will receive a payment prompt on your phone</li>
                        <li>Enter your mobile money PIN to authorize the payment</li>
                        <li>You will receive a confirmation SMS once payment is successful</li>
                      </ol>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex-col space-y-4">
                  <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-sm">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Your mobile money transaction is secure and encrypted. No sensitive information is stored.
                    </p>
                  </div>

                  <Button
                    className="w-full"
                    disabled={!selectedProvider}
                    asChild={selectedProvider ? true : false}
                  >
                    {selectedProvider ? (
                      <Link href={`/hostels/{hostel.id}/rooms/{room.id}/book/confirmation`}>
                        Pay {room.price + 100} via {selectedProvider.toUpperCase()}
                      </Link>
                    ) : (
                      <span>Select a provider to continue</span>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
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

              <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-3 text-sm text-primary">
                <ShieldCheck className="h-4 w-4" />
                <p>Secure payment protected by SSL encryption</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
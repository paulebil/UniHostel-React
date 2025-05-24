import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { hostels } from "@/lib/data"
import { CreditCard, Lock, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default async function PaymentPage(props: { params: { id: string; roomId: string } }) {
  // Get params
  const { id } = await props.params
  const { roomId } = await props.params

  // Find the hostel by ID
  const hostel = hostels.find((h) => h.id === id) || hostels[0]

  // Find the room by ID
  const room = hostel.rooms?.find((r) => r.id === roomId) || hostel.rooms?.[0]

  if (!room) {
    return <div>Room not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/hostels/${hostel.id}/rooms/${room.id}/book`} className="text-sm text-primary hover:underline">
          &larr; Back to booking details
        </Link>
        <h1 className="mt-2 text-3xl font-bold">Payment</h1>
        <p className="text-muted-foreground">Complete your payment to secure your booking</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
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
              {/* 
              <Separator />

              <div className="space-y-2">
                <Label htmlFor="country">Billing Country</Label>
                <Select defaultValue="us">
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="eu">European Union</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Billing Address</Label>
                <Input id="address" placeholder="Enter your billing address" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Enter your city" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Postal Code</Label>
                  <Input id="postal-code" placeholder="Enter your postal code" />
                </div>
              </div> */}
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-sm">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Your payment information is encrypted and secure. We never store your full card details.
                </p>
              </div>

              <Button asChild className="w-full">
                <Link href={`/hostels/${hostel.id}/rooms/${room.id}/book/confirmation`}>Pay ${room.price + 100}</Link>
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
                  <span>${room.price}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Security deposit</span>
                  <span>${room.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking fee</span>
                  <span>$100</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-medium">
                <span>Total due now</span>
                <span>${room.price + 100}</span>
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

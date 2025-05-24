import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getHostels } from "@/lib/data"
import { User, Check, Download, Home, Mail, MapPin, Phone, Printer } from "lucide-react"
import Link from "next/link"

export default async function ConfirmationPage(props: { params: { id: string; roomId: string } }) {

  // Get params
  const { id } = await props.params
  const { roomId } = await props.params

  // Get all hostels
  const hostels = await getHostels()

  // Find the hostel by ID
  const hostel = hostels.find((h) => h.id === id) || hostels[0]

  // Find the room by ID
  const room = hostel.rooms?.find((r) => r.id === roomId) || hostel.rooms?.[0]

  if (!room) {
    return <div>Room not found</div>
  }

  // Generate a random booking reference
  const bookingRef = `UH${Math.floor(10000 + Math.random() * 90000)}`

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h1 className="mb-2 text-3xl font-bold">Booking Confirmed!</h1>
        <p className="text-muted-foreground">
          Your booking has been successfully confirmed. We've sent the details to your email.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Card className="mb-8">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle>Booking Receipt</CardTitle>
              <div className="text-sm text-muted-foreground">Reference: {bookingRef}</div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold">Booking Details</h3>
                <div className="space-y-1 text-sm">
                  {/* <div className="flex items-start gap-2">
                    <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <div>Move-in Date: September 1, 2023</div>
                      <div>Duration: 1 Semester (4-5 months)</div>
                    </div>
                  </div> */}
                  <div className="flex items-start gap-2">
                    <Home className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <div>{room.name}</div>
                      <div>{hostel.name}</div>
                      <div>{hostel.location}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Student Information</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>John Doe</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>john.doe@example.com</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>+1 (555) 123-4567</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>University of Example</div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="mb-6" />

            <div className="mb-6">
              <h3 className="mb-4 font-semibold">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Security deposit</span>
                  <span>${room.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking fee</span>
                  <span>$100</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total paid</span>
                  <span>${room.price + 100}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4 text-sm">
              <h4 className="mb-2 font-medium">Important Information</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Please bring your ID and student card on your move-in date.</li>
                <li>• Check-in time is between 10:00 AM and 6:00 PM.</li>
                <li>• Monthly rent payments will begin on your move-in date.</li>
                <li>• For any questions, please contact the hostel directly.</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              Print Receipt
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <Button variant="outline" asChild>
            <Link href={`/hostels/${hostel.id}`}>View Hostel Details</Link>
          </Button>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

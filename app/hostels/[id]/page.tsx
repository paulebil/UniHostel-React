// app/hostels/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/axios' // Axios instance
import { useParams } from 'next/navigation'
import { MapPin, Star, Wifi, Utensils, Dumbbell, BookOpen, Tv, Snowflake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import RoomCard from '@/components/room-card'
import ImageGallery from '@/components/image-gallery'

export default function HostelDetailsPage() {
  const { id } = useParams()
  const [hostel, setHostel] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const response = await api.get('/hostels/hostel-detail-student', {
          params: { hostel_id: id },
        })
        setHostel(response.data)
      } catch (error) {
        console.error('Error fetching hostel details:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchHostel()
  }, [id])

  if (loading) return <div className="p-8">Loading hostel details...</div>
  if (!hostel) return <div className="p-8 text-red-500">Hostel not found.</div>

  const images = hostel.image_url?.map((img: { url: string }) => img.url) || []

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
              {hostel.rating || 4.3} ({hostel.reviewCount || 10} reviews)
            </span>
          </div>
        </div>
      </div>

      <ImageGallery images={images.length ? images : Array(5).fill('/placeholder.svg')} />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4 text-2xl font-semibold">About {hostel.name}</h2>
                  <p className="text-muted-foreground">
                    {hostel.description ||
                      `${hostel.name} is a modern student accommodation located near ${hostel.location}.`}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Highlights</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {hostel.amenities?.split(',').map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-2">
                        <Wifi className="h-5 w-5 text-primary" />
                        <span>{item.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Rules & Regulations</h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {hostel.rules_and_regulations?.map((rule: string, i: number) => (
                      <li key={i}>{rule}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold">Location</h3>
                  <div className="h-[300px] rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                    Map view would be displayed here
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 text-2xl font-bold">
                UGX {hostel.average_price.toLocaleString()}
                <span className="text-sm font-normal text-muted-foreground"> / month</span>
              </div>

              <div className="mb-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability</span>
                  <Badge variant="outline" className="text-green-600">
                    {hostel.available_rooms > 0 ? 'Available' : 'Full'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rooms</span>
                  <span>{hostel.available_rooms}</span>
                </div>
              </div>

              <Separator className="mb-6" />

              <Button asChild className="w-full">
                <Link href={`/hostels/${id}/rooms`}>View Rooms</Link>
              </Button>

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

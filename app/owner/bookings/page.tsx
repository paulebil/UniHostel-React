'use client'; // ✅ Required to make this a Client Component

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import OwnerLayout from "@/components/owner-layout";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/axios";

export default function OwnerBookingsPage() {
  const [hostelsData, setHostelsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized");

        const response = await api.get("/booking/custodians/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        });

        console.log("Bookings", response.data);

        setHostelsData(response.data.hostels || []);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  // Flatten all bookings from all hostels
  const allBookings = hostelsData.flatMap(hostel => 
    hostel.bookings.map((booking: any) => ({
      ...booking,
      hostel_name: hostel.hostel_name
    }))
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <OwnerLayout>
      <div className="pl-8 pr-4 md:pl-16 md:pr-4 py-12">
        <h1 className="text-3xl font-bold">Bookings</h1>
        <p className="text-muted-foreground">Manage all bookings across your properties</p>

        <Tabs defaultValue="active" className="space-y-4 mt-6">
          <TabsList>
            <TabsTrigger value="active">Active Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Bookings ({allBookings.length})</CardTitle>
                <CardDescription>Currently active bookings across all your properties</CardDescription>
              </CardHeader>
              <CardContent>
                {allBookings.length === 0 ? (
                  <p className="text-center py-4 text-muted-foreground">No active bookings found.</p>
                ) : (
                  <div className="space-y-4">
                    {allBookings.map((booking) => {
                      return (
                        <div
                          key={booking.id}
                          className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="grid gap-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Booking #{booking.id}</span>
                              <Badge 
                                className={
                                  booking.status === 'pending' 
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    : "bg-green-100 text-green-800 hover:bg-green-100"
                                }
                              >
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Room {booking.room_id} at {booking.hostel_name}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{new Date(booking.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <div className="font-medium">{booking.first_name} {booking.last_name}</div>
                              <div className="text-sm text-muted-foreground">{booking.university}</div>
                            </div>
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/owner/bookings/${booking.id}`}>
                                <ChevronRight className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </OwnerLayout>
  );
}
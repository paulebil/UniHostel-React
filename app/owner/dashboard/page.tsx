"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Building,
  Calendar,
  ChevronRight,
  CreditCard,
  Home,
  Plus,
  Users
} from "lucide-react";
import Link from "next/link";
import OwnerLayout from "@/components/owner-layout";
import api from "@/lib/axios";

export default function OwnerDashboardPage() {
  const [ownerHostels, setOwnerHostels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOwnerData() {

      const token = localStorage.getItem('token');
      if (!token) throw new Error('Unauthorized');

      const headers = {
          Authorization: `Bearer ${token}`,
      };
      
      try {
        const response = await api.get("/hostels/my-hostels", {headers});
        // Assuming the response returns an object like:
        // { hostels: [...], bookings: [...], revenue: 12450 }

        setOwnerHostels(response.data.hostels || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOwnerData();
  }, []);

  const totalRooms = ownerHostels.reduce(
    (acc, hostel) => acc + (hostel.rooms?.length || 0),
    0
  );

  return (
    <OwnerLayout>
      <div className="pl-8 pr-4 md:pl-16 md:pr-4 py-12">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button asChild className="mb-4">
            <Link href="/owner/hostels/create">
              <Plus className="mr-2 h-4 w-4" />
              Add New Hostel
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Hostels</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ownerHostels.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRooms}</div>
              <p className="text-xs text-muted-foreground">+5 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+8 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,450</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings">
          <TabsList>
            <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
            <TabsTrigger value="hostels">Your Hostels</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4">
            {/* Replace this with actual bookings later */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>You have 24 active bookings across your properties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((booking) => (
                    <div key={booking} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="grid gap-1">
                        <div className="font-medium">Booking #{booking + 1000}</div>
                        <div className="text-sm text-muted-foreground">
                          Double Room at {ownerHostels[booking % ownerHostels.length]?.name}
                        </div>
                        <div className="text-sm">
                          <span className="text-green-600 font-medium">Confirmed</span> • Sep 1, 2023 - Jan 31, 2024
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="font-medium">{300 + booking * 50}</div>
                          <div className="text-sm text-muted-foreground">per month</div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/owner/bookings">View All Bookings</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="hostels" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Hostels</CardTitle>
                <CardDescription>Manage your {ownerHostels.length} hostels and their rooms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ownerHostels.map((hostel) => (
                    <div key={hostel.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 overflow-hidden rounded-md bg-muted">
                          <img
                            src={hostel.imageUrl || "/placeholder.svg?height=64&width=64"}
                            alt={hostel.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="grid gap-1">
                          <div className="font-medium">{hostel.name}</div>
                          <div className="text-sm text-muted-foreground">{hostel.location}</div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{hostel.rooms?.length || 0} rooms</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/owner/hostels/${hostel.id}`}>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 sm:flex-row">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/owner/hostels">Manage Hostels</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/owner/hostels/create">Add New Hostel</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </OwnerLayout>
  );
}

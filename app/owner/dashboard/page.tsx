"use client";

import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";

export default function OwnerDashboardPage() {
  const [dashboardData, setDashboardData] = useState<any>({
    hostels: [],
    bookings: [],
    total_revenue: 0,
    total_rooms: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOwnerData() {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Unauthorized');

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await api.get("/hostels/dashboard", { headers });

        console.log("Dashboard Data:", response.data);
        setDashboardData(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOwnerData();
  }, []);

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
              <div className="text-2xl font-bold">{dashboardData.hostels.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.total_rooms}</div>
              <p className="text-xs text-muted-foreground">+5 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.bookings.length}</div>
              <p className="text-xs text-muted-foreground">+8 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                UGX {parseFloat(dashboardData.total_revenue).toLocaleString()}
              </div>
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
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>You have {dashboardData.bookings.length} active bookings across your properties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.bookings.slice(0, 3).map((booking: any) => {
                    const hostel = dashboardData.hostels.find((h: any) => h.id === booking.hostel_id);
                    return (
                      <div key={booking.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="grid gap-1">
                          <div className="font-medium">Booking #{booking.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.first_name} {booking.last_name} • {hostel?.name || 'Unknown Hostel'}
                          </div>
                          <div className="text-sm">
                            <span className={`font-medium ${
                              booking.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
                            }`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
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
                <CardDescription>Manage your {dashboardData.hostels.length} hostels and their rooms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.hostels.map((hostel: any) => (
                    <div key={hostel.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 overflow-hidden rounded-md bg-muted">
                          <img
                            src={hostel.image_url[0]?.url || "/placeholder.svg?height=64&width=64"}
                            alt={hostel.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="grid gap-1">
                          <div className="font-medium">{hostel.name}</div>
                          <div className="text-sm text-muted-foreground">{hostel.location}</div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{hostel.available_rooms} available rooms</span>
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
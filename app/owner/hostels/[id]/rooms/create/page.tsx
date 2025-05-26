"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, X } from "lucide-react"
import { getHostels } from "@/lib/data"
import OwnerLayout from "@/components/owner-layout"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateRoomPage(props: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState("basic");
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [hostel, setHostel] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Move schema inside component to avoid SSR issues with File constructor
  const formSchema = z.object({
    roomNo: z.string().min(1, {
      message: "Room number is required",
    }),
    roomType: z.string().min(1, {
      message: "Please select a room type",
    }),
    occupancy: z.string().min(1, {
      message: "Please select occupancy",
    }),
    description: z.string().min(20, {
      message: "Description must be at least 20 characters.",
    }),
    photos: z.array(z.any()).min(3, {
      message: "You must upload at least 3 photos.",
    }).refine(
      (files) => files.every(file => file instanceof File),
      { message: "All items must be valid files." }
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomNo: "",
      roomType: "",
      occupancy: "",
      description: "",
      photos: [],
    },
  });

  // Load hostel data on component mount
  useEffect(() => {
    async function loadHostel() {
      try {
        const params = await props.params;
        const hostels = await getHostels();
        const foundHostel = hostels.find((h) => h.id === params.id) || hostels[0];
        setHostel(foundHostel);
      } catch (error) {
        console.error("Error loading hostel:", error);
      }
    }
    loadHostel();
  }, [props.params]);

  const handleNext = async () => {
    if (activeTab === "basic") {
      const isValid = await form.trigger([
        "roomNo",
        "roomType",
        "occupancy",
        "description",
      ]);
      if (isValid) {
        setActiveTab("photos");
      }
    }
  };

  const handlePrevious = () => {
    if (activeTab === "photos") {
      setActiveTab("basic");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // Validate file types and sizes
      const validFiles = files.filter(file =>
        file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024
      );

      if (validFiles.length !== files.length) {
        toast({
          title: "Some files were rejected",
          description: "Please ensure all files are images under 10MB",
          variant: "destructive",
        });
      }

      // Update form value
      const currentPhotos = form.getValues("photos");
      form.setValue("photos", [...currentPhotos, ...validFiles]);

      // Create preview URLs
      const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    const updatedPhotos = [...form.getValues("photos")];
    updatedPhotos.splice(index, 1);
    form.setValue("photos", updatedPhotos);

    const updatedPreviews = [...previewUrls];
    URL.revokeObjectURL(updatedPreviews[index]);
    updatedPreviews.splice(index, 1);
    setPreviewUrls(updatedPreviews);
  };

  // Upload photos to your storage service (e.g., AWS S3, Cloudinary, etc.)
  const uploadPhotos = async (photos: File[]): Promise<string[]> => {
    const uploadPromises = photos.map(async (photo) => {
      const formData = new FormData();
      formData.append('file', photo);
      formData.append('folder', 'rooms'); // organize uploads by folder

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed: {response.statusText}`);
        }

        const result = await response.json();
        return result.url; // assuming your API returns { url: "..." }
      } catch (error) {
        console.error('Error uploading photo:', error);
        throw error;
      }
    });

    return Promise.all(uploadPromises);
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      // 1. Upload photos first
      const photoUrls = await uploadPhotos(data.photos);

      // 2. Prepare room data
      const roomData = {
        roomNo: data.roomNo,
        roomType: data.roomType,
        occupancy: parseInt(data.occupancy),
        description: data.description,
        photos: photoUrls,
        hostelId: hostel.id,
        createdAt: new Date().toISOString(),
      };

      // 3. Submit room data to your backend
      const response = await fetch(`/api/hostels/{hostel.id}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create room: {response.statusText}`);
      }

      const result = await response.json();

      toast({
        title: "Room created successfully!",
        description: `Room {data.roomNo} has been added to {hostel.name}`,
      });

      // Reset form and redirect
      form.reset();
      setPreviewUrls([]);
      router.push(`/owner/hostels/{hostel.id}/rooms`);

    } catch (error) {
      console.error('Error creating room:', error);
      toast({
        title: "Error creating room",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!hostel) {
    return <div>Loading...</div>;
  }

  return (
    <OwnerLayout>
      <div className="pl-8 pr-4 md:pl-16 md:pr-4 py-12">
        <div>
          <h1 className="text-3xl font-bold">Add New Room</h1>
          <p className="text-muted-foreground">Create a new room at {hostel.name}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="basic">Room Information</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
              </TabsList>

              <TabsContent value="basic">
                <Card>
                  <CardHeader>
                    <CardTitle>Room Information</CardTitle>
                    <CardDescription>Provide the essential details about this room</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="roomNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., A02" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="roomType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select room type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="single">Single Room</SelectItem>
                              <SelectItem value="double">Double Room</SelectItem>
                              <SelectItem value="triple">Triple Room</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="occupancy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occupancy</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select occupancy" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1 Person</SelectItem>
                              <SelectItem value="2">2 People</SelectItem>
                              <SelectItem value="3">3 People</SelectItem>
                              <SelectItem value="4">4 People</SelectItem>
                              <SelectItem value="5+">5+ People</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide a detailed description of the room"
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline">Save as Draft</Button>
                    <Button type="button" onClick={handleNext} disabled={isSubmitting}>
                      Continue
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="photos">
                <Card>
                  <CardHeader>
                    <CardTitle>Photos</CardTitle>
                    <CardDescription>Upload photos of the room to showcase its features</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="photos"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Photos</FormLabel>
                          <FormControl>
                            <div className="space-y-4">
                              <div className="rounded-lg border border-dashed p-10 text-center">
                                <div className="mx-auto flex w-full max-w-[420px] flex-col items-center justify-center">
                                  <Upload className="h-10 w-10 text-muted-foreground" />
                                  <div className="mt-4 mb-6">
                                    <h3 className="font-medium">Drag & drop your photos here</h3>
                                    <p className="text-sm text-muted-foreground">or click to browse files (max 10MB per image)</p>
                                  </div>
                                  <Button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                  >
                                    Upload Photos
                                  </Button>
                                  <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                  />
                                </div>
                              </div>

                              {previewUrls.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                  {previewUrls.map((url, index) => (
                                    <div key={index} className="relative group">
                                      <img
                                        src={url}
                                        alt={`Preview {index + 1}`}
                                        className="w-full h-32 object-cover rounded-lg"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <X className="h-4 w-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                    <Button type="button" variant="outline" onClick={handlePrevious} disabled={isSubmitting}>
                      Previous
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Creating Room..." : "Complete"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </div>
    </OwnerLayout>
  )
}
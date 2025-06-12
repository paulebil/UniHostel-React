"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { ArrowLeft, Upload, X } from "lucide-react";
import OwnerLayout from "@/components/owner-layout";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/axios";

export default function CreateRoomPage(props: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState("basic");
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [hostel, setHostel] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hostelId, setHostelId] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Define form schema
  const formSchema = z.object({
    roomNo: z.string().min(1, {
      message: "Room number is required",
    }),
    price: z.string().min(1, {
      message: "Price per semester is required",
    }).refine(value => !isNaN(Number(value)), {
      message: "Price must be a valid number",
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
      price: "",
      roomType: "",
      occupancy: "",
      description: "",
      photos: [],
    },
  });

  // Load hostel ID from URL
  useEffect(() => {
    async function loadParams() {
      const params = await props.params;
      setHostelId(params.id);
    }
    loadParams();
  }, [props.params]);

  const handleNext = async () => {
    if (activeTab === "basic") {
      const isValid = await form.trigger([
        "roomNo",
        "price",
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

      const currentPhotos = form.getValues("photos");
      form.setValue("photos", [...currentPhotos, ...validFiles]);

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

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      formData.append("hostel_id", hostelId);
      formData.append("room_number", data.roomNo);
      formData.append("room_type", data.roomType.toUpperCase());
      formData.append("occupancy", data.occupancy);
      formData.append("description", data.description);
      formData.append("price_per_semester", data.price);

      data.photos.forEach((photo) => {
        formData.append("images", photo);
      });

      const response = await api.post("/rooms/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Room created successfully!",
        description: `Room ${data.roomNo} has been added to ${hostel?.name || 'your hostel'}`,
      });

      form.reset();
      setPreviewUrls([]);
      router.push(`/owner/hostels/${hostelId}/rooms`);
    } catch (error: any) {
      console.error("Error creating room:", error);
      toast({
        title: "Error creating room",
        description:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <OwnerLayout>
      <div className="pl-8 pr-4 md:pl-16 md:pr-4 py-12">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/owner/hostels/${hostelId}/rooms`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Rooms
            </Link>
          </Button>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Add New Room</h1>
          <p className="text-muted-foreground">Create a new room at {hostel?.name || 'your hostel'}</p>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price Per Semester</FormLabel>
                            <FormControl>
                              <Input placeholder="900,000" {...field} />
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
                                <SelectItem value="5">5+ People</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                                        alt={`Preview ${index + 1}`}
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
  );
}
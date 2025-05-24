"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, X } from "lucide-react"
import OwnerLayout from "@/components/owner-layout"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CreateHostelPage() {
  const [activeTab, setActiveTab] = useState("basic");
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Move schema inside component to avoid SSR issues with File constructor
  const formSchema = z.object({
    hostelName: z.string().min(2, {
      message: "Hostel name is required",
    }),
    location: z.string().min(2, {
      message: "Location is required",
    }),
    amenities: z.string().min(2, {
      message: "Please enter at least some amenities.",
    }),
    price: z.string().min(1, {
      message: "Price is required.",
    }).regex(/^\d+$/, {
      message: "Price must be a number.",
    }),
    rules: z.string().min(10, {
      message: "Rules must be at least 10 characters.",
    }),
    description: z.string().min(20, {
      message: "Description must be at least 20 characters.",
    }),
    photos: z.array(z.any()).min(5, {
      message: "You must upload at least 5 photos.",
    }).refine(
      (files) => files.every(file => file instanceof File),
      { message: "All items must be valid files." }
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hostelName: "",
      location: "",
      amenities: "",
      price: "",
      rules: "",
      description: "",
      photos: [],
    },
  });

  const handleNext = async () => {
    if (activeTab === "basic") {
      const isValid = await form.trigger([
        "hostelName",
        "location",
        "amenities",
        "price",
        "rules",
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
      formData.append('folder', 'hostels'); // organize uploads by folder
      
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
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
      
      // 2. Prepare hostel data
      const hostelData = {
        hostelName: data.hostelName,
        location: data.location,
        amenities: data.amenities.split(',').map(a => a.trim()), // Convert to array
        price: parseInt(data.price),
        rules: data.rules,
        description: data.description,
        photos: photoUrls,
        createdAt: new Date().toISOString(),
        status: 'pending', // or 'active' depending on your business logic
      };

      // 3. Submit hostel data to your backend
      const response = await fetch('/api/hostels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hostelData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create hostel: ${response.statusText}`);
      }

      const result = await response.json();
      
      toast({
        title: "Hostel created successfully!",
        description: `${data.hostelName} has been added to your listings`,
      });

      // Reset form and redirect
      form.reset();
      setPreviewUrls([]);
      router.push('/owner/hostels'); // or wherever you want to redirect
      
    } catch (error) {
      console.error('Error creating hostel:', error);
      toast({
        title: "Error creating hostel",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <OwnerLayout>
      <div className="pl-8 pr-4 md:pl-16 md:pr-4 py-12">
        <div>
          <h1 className="text-3xl font-bold">Add New Hostel</h1>
          <p className="text-muted-foreground">Create a new hostel listing on UniHostel</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="basic">Hostel Information</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
              </TabsList>

              <TabsContent value="basic">
                <Card>
                  <CardHeader>
                    <CardTitle>Hostel Information</CardTitle>
                    <CardDescription>Provide the details about your hostel</CardDescription>
                  </CardHeader>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <CardContent className="space-y-6">
                        <FormField
                          control={form.control}
                          name="hostelName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bold">Hostel Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter the name of your hostel" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bold">Location</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter hostel location" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </div>

                    <div className="space-y-2">
                      <CardContent className="space-y-6">
                        <FormField
                          control={form.control}
                          name="amenities"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bold">Amenities</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter hostel amenities (comma separated)" {...field} />
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
                              <FormLabel className="font-bold">Average Price</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter hostel average price"
                                  type="number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </div>
                  </div>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="rules"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Rules and Regulations</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide hostel rules and regulations"
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide a detailed description of your hostel"
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
                    <CardDescription>Upload photos of your hostel to attract potential guests</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="photos"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hostel Photos</FormLabel>
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
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                  {previewUrls.map((url, index) => (
                                    <div key={index} className="relative group">
                                      <img
                                        src={url}
                                        alt={`Hostel preview ${index + 1}`}
                                        className="h-40 w-full object-cover rounded-lg"
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
                        <li>Upload at least 5 photos of your hostel</li>
                        <li>Include photos of different room types</li>
                        <li>Show common areas and amenities</li>
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
                      {isSubmitting ? "Creating Hostel..." : "Complete"}
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
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
import { Upload } from "lucide-react"
import OwnerLayout from "@/components/owner-layout"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useState, useRef } from "react";


//Form validation schema
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
  photos: z.array(z.instanceof(File)).min(5, {
    message: "You must upload at least 5 photos.",
  }),
});

export default function CreateHostelPage() {
  const [activeTab, setActiveTab] = useState("basic");
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "Hostel created successfully",
      description: "Your hostel listing has been created.",
    });
    console.log(data);
    // Here you would typically send the data to your API
  }


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

  //previous button 
  const handlePrevious = () => {
    if (activeTab === "photos") {
      setActiveTab("basic");
    }
  };

  //image upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // Validate file types and sizes
      const validFiles = files.filter(file =>
        file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024
      );

      // Update form value
      form.setValue("photos", [...form.getValues("photos"), ...validFiles]);

      // Create preview URLs
      const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  //to remove image
  const removeImage = (index: number) => {
    const updatedPhotos = [...form.getValues("photos")];
    updatedPhotos.splice(index, 1);
    form.setValue("photos", updatedPhotos);

    const updatedPreviews = [...previewUrls];
    URL.revokeObjectURL(updatedPreviews[index]);
    updatedPreviews.splice(index, 1);
    setPreviewUrls(updatedPreviews);
  };



  return (
    <OwnerLayout>
      <div className="pl-8 pr-4 md:pl-16 md:pr-4 py-12">
        <div>
          <h1 className="text-3xl font-bold">Add New Hostel</h1>
          <p className="text-muted-foreground">Create a new hostel listing on UniHostel</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4"
            >
              <TabsList>
                <TabsTrigger value="basic">Hostel Information</TabsTrigger>
                <TabsTrigger
                  value="photos"
                  disabled={!form.formState.isValid}
                >
                  Photos
                </TabsTrigger>
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
                    <Button variant="outline" type="button">Save as Draft</Button>
                    <Button
                      type="button"
                      onClick={handleNext}
                    >
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
                    <div className="rounded-lg border border-dashed p-10 text-center">
                      <div className="mx-auto flex w-full max-w-[420px] flex-col items-center justify-center">
                        <Upload className="h-10 w-10 text-muted-foreground" />
                        <div className="mt-4 mb-6">
                          <h3 className="font-medium">Drag & drop your photos here</h3>
                          <p className="text-sm text-muted-foreground">or click to browse files (max 10MB per image)</p>
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          multiple
                          accept="image/*"
                          className="hidden"
                        />
                        <Button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Upload Photos
                        </Button>
                      </div>
                    </div>

                    {form.formState.errors.photos && (
                      <p className="text-sm font-medium text-destructive">
                        {form.formState.errors.photos.message}
                      </p>
                    )}

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
                              className="absolute top-2 right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

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
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handlePrevious}
                    >
                      Previous
                    </Button>
                    <Button
                      type="submit"
                      disabled={form.getValues("photos").length < 5}
                    >
                      Complete
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </div >
    </OwnerLayout >
  )
}

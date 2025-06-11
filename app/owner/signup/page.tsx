"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import api from "@/lib/axios";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Please enter your first name.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  mobile: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }).regex(/^[0-9]+/),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Comfirm password.",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function OwnerSignupPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword:"",
    },
  });

  // Handle form submission
 async function onSubmit(values: z.infer<typeof formSchema>) {
  const payload = {
    name: `${values.name}`,
    email: values.email,
    mobile: values.mobile, // Convert to number if needed
    password: values.password,
  };

  try {
    await api.post("/users/create", payload);
    alert("Account created successfully! Your Owner account has been created successfully.");
    form.reset();
  } catch (error: any) {
    toast({
      title: "Signup failed",
      description: error?.response?.data?.message || "Something went wrong. Please try again.",
      variant: "destructive",
    });
    console.error(error);
  }
}



  return (
    <div className="container mx-auto flex min-h-[calc(100vh-200px)] max-w-xl flex-col items-center justify-center px-4 py-12">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an Owner Account</CardTitle>
          <CardDescription>Sign up to list and manage your hostels on UniHostel</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage className="text-destructive text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage className="text-destructive text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage className="text-destructive text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage className="text-destructive text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-foreground">
                        I agree to the terms and conditions
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        By checking this box, you agree to our{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                      <FormMessage className="text-destructive text-sm" />
                    </div>
                  </FormItem>
                )}
              />

              <CardFooter className="flex flex-col space-y-4 p-0">
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/owner/login" className="text-primary hover:underline">
                    Log in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
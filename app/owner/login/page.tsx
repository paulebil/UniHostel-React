"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";


// Define validation schema
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a correct email address.",
  }),
  password: z.string().min(8, {
    message: "Please enter a correct password.",
  }),
});

export default function OwnerLoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   try {
  //     const response = await api.post("/auth/login", values); // or whatever your endpoint is

  //     console.log( "Response Data:", response.data);

  //     toast({
  //       title: "Login successful",
  //       description: "You are now being redirected to your dashboard.",
  //     });

  //     router.push("/owner/dashboard");
  //   } catch (error: any) {
  //     const errorMessage =
  //       error.response?.data?.message || "Invalid credentials or server error";

  //     toast({
  //       title: "Login failed",
  //       description: errorMessage,
  //       variant: "destructive",
  //     });
  //   }
  // }

    // Handle form submission
async function onSubmit(values: z.infer<typeof formSchema>) {
  const payload = {
    username: values.email,
    password: values.password,
  };

  const form = new FormData();
  form.append('username', values.email);
  form.append('password', values.password);

  try {
    const response = await api.post('/auth/login', form,
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        }
    }
    );

    const { access_token } = response.data;

    localStorage.setItem('token', access_token);


    console.log("Response", response.data);

    alert("You have successfully logged in.");
    //form.reset();
    router.push("/owner/dashboard");
  } catch (error: any) {
    console.log("Eror", error);
    const errorMessage =
      error.response?.data?.message || "Invalid credentials or server error";

    alert("Login failed: " + errorMessage);

  }
} 

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-200px)] max-w-md flex-col items-center justify-center px-4 py-12">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Hostel Owner Login</CardTitle>
          <CardDescription>Enter your credentials to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        {...field}
                      />
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="/owner/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive text-sm" />
                  </FormItem>
                )}
              />

              <CardFooter className="flex flex-col space-y-4 p-0">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link href="/owner/signup" className="text-primary hover:underline">
                    Sign up
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
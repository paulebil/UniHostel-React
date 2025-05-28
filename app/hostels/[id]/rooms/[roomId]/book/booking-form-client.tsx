"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Info } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface FormData {
    firstName: string
    lastName: string
    email: string
    phone: string
    university: string
    termsAccepted: boolean
}

interface FormErrors {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    university?: string
    termsAccepted?: string
}

interface BookingFormClientProps {
    hostel: any
    room: any
}

export default function BookingFormClient({ hostel, room }: BookingFormClientProps) {
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        university: '',
        termsAccepted: false
    })

    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Validation functions
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePhone = (phone: string): boolean => {
        // Basic phone validation - adjust regex based on your requirements
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/
        return phoneRegex.test(phone.replace(/\s/g, ''))
    }

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        // First name validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required'
        } else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = 'First name must be at least 2 characters'
        }

        // Last name validation
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required'
        } else if (formData.lastName.trim().length < 2) {
            newErrors.lastName = 'Last name must be at least 2 characters'
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required'
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required'
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number'
        }

        // University validation
        if (!formData.university.trim()) {
            newErrors.university = 'University/College is required'
        } else if (formData.university.trim().length < 3) {
            newErrors.university = 'University/College name must be at least 3 characters'
        }

        // Terms validation
        if (!formData.termsAccepted) {
            newErrors.termsAccepted = 'You must accept the terms and conditions'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))

        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            // Here you would typically save the form data to your backend
            // For now, we'll just simulate a delay
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Navigate to payment page using Next.js router
            router.push(`/hostels/${hostel.id}/rooms/${room.id}/book/payment`)
        } catch (error) {
            console.error('Error submitting form:', error)
            // Handle error appropriately - you might want to show an error message
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Please provide your details for the booking</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First Name *</Label>
                                    <Input
                                        id="first-name"
                                        placeholder="Enter your first name"
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        className={errors.firstName ? 'border-red-500' : ''}
                                    />
                                    {errors.firstName && (
                                        <p className="text-sm text-red-500">{errors.firstName}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last Name *</Label>
                                    <Input
                                        id="last-name"
                                        placeholder="Enter your last name"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        className={errors.lastName ? 'border-red-500' : ''}
                                    />
                                    {errors.lastName && (
                                        <p className="text-sm text-red-500">{errors.lastName}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number *</Label>
                                    <Input
                                        id="phone"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className={errors.phone ? 'border-red-500' : ''}
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-red-500">{errors.phone}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="university">University/College *</Label>
                                <Input
                                    id="university"
                                    placeholder="Enter your university or college name"
                                    value={formData.university}
                                    onChange={(e) => handleInputChange('university', e.target.value)}
                                    className={errors.university ? 'border-red-500' : ''}
                                />
                                {errors.university && (
                                    <p className="text-sm text-red-500">{errors.university}</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <div className="flex items-start space-x-2">
                                <div className="flex h-5 items-center">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        checked={formData.termsAccepted}
                                        onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                                        className={`h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary ${errors.termsAccepted ? 'border-red-500' : ''
                                            }`}
                                    />
                                </div>
                                <div className="text-sm leading-tight">
                                    <label htmlFor="terms" className="font-medium">
                                        I agree to the terms and conditions *
                                    </label>
                                    <p className="text-muted-foreground">
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
                                    {errors.termsAccepted && (
                                        <p className="text-sm text-red-500 mt-1">{errors.termsAccepted}</p>
                                    )}
                                </div>
                            </div>
                        </CardFooter>
                    </Card>

                    <Card className="mt-8">
                        <CardFooter>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <div>
                    <Card className="sticky top-8">
                        <CardHeader>
                            <CardTitle>Booking Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 overflow-hidden rounded-md bg-muted">
                                    <img
                                        src="/placeholder.svg?height=64&width=64"
                                        alt={room.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-medium">{room.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {hostel.name}, {hostel.location}
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Room type</span>
                                    <span>{room.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Duration</span>
                                    <span>1 Semester (4-5 months)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Monthly rent</span>
                                    <span>{room.price}</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Security deposit</span>
                                    <span>{room.price}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Booking fee</span>
                                    <span>100</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between font-medium">
                                <span>Total due now</span>
                                <span>{room.price + 100}</span>
                            </div>

                            <div className="rounded-lg bg-muted p-3 text-sm">
                                <div className="flex gap-2">
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Payment Information</p>
                                        <p className="text-muted-foreground">
                                            You'll pay the security deposit and booking fee now. Monthly rent payments will begin on your
                                            move-in date.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { hostels } from "@/lib/data"
import { CreditCard, Lock, ShieldCheck, Smartphone } from "lucide-react"
import Link from "next/link"
import { useState, use } from "react"
import { useRouter } from "next/navigation"

interface CardFormData {
  cardNumber: string
  expiryDate: string
  cvc: string
  nameOnCard: string
}

interface MobileMoneyFormData {
  provider: string
  phoneNumber: string
  accountName: string
}

interface CardFormErrors {
  cardNumber?: string
  expiryDate?: string
  cvc?: string
  nameOnCard?: string
}

interface MobileMoneyFormErrors {
  provider?: string
  phoneNumber?: string
  accountName?: string
}

export default function PaymentPage(props: { params: Promise<{ id: string; roomId: string }> }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("card")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Card form state
  const [cardFormData, setCardFormData] = useState<CardFormData>({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    nameOnCard: ''
  })
  const [cardErrors, setCardErrors] = useState<CardFormErrors>({})

  // Mobile money form state
  const [mobileMoneyFormData, setMobileMoneyFormData] = useState<MobileMoneyFormData>({
    provider: '',
    phoneNumber: '',
    accountName: ''
  })
  const [mobileMoneyErrors, setMobileMoneyErrors] = useState<MobileMoneyFormErrors>({})

  // Get params - Use React.use() to unwrap the Promise
  const { id, roomId } = use(props.params)

  // Find the hostel by ID
  const hostel = hostels.find((h) => h.id === id) || hostels[0]

  // Find the room by ID
  const room = hostel.rooms?.find((r) => r.id === roomId) || hostel.rooms?.[0]

  if (!room) {
    return <div>Room not found</div>
  }

  // Validation functions
  const validateCardNumber = (cardNumber: string): boolean => {
    // Remove spaces and check if it's 13-19 digits (common card lengths)
    const cleanNumber = cardNumber.replace(/\s/g, '')
    return /^\d{13,19}$/.test(cleanNumber)
  }

  const validateExpiryDate = (expiry: string): boolean => {
    // Check MM/YY format
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
    if (!expiryRegex.test(expiry)) return false

    // Check if date is in the future
    const [month, year] = expiry.split('/').map(Number)
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear() % 100
    const currentMonth = currentDate.getMonth() + 1

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false
    }

    return true
  }

  const validateCVC = (cvc: string): boolean => {
    return /^\d{3,4}$/.test(cvc)
  }

  const validatePhoneNumber = (phone: string): boolean => {
    // Uganda phone number format (adjust as needed)
    const phoneRegex = /^(\+256|0)?[37][0-9]{8}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  const validateCardForm = (): boolean => {
    const newErrors: CardFormErrors = {}

    // Card number validation
    if (!cardFormData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required'
    } else if (!validateCardNumber(cardFormData.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid card number'
    }

    // Expiry date validation
    if (!cardFormData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required'
    } else if (!validateExpiryDate(cardFormData.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)'
    }

    // CVC validation
    if (!cardFormData.cvc.trim()) {
      newErrors.cvc = 'CVC is required'
    } else if (!validateCVC(cardFormData.cvc)) {
      newErrors.cvc = 'Please enter a valid CVC (3-4 digits)'
    }

    // Name on card validation
    if (!cardFormData.nameOnCard.trim()) {
      newErrors.nameOnCard = 'Name on card is required'
    } else if (cardFormData.nameOnCard.trim().length < 2) {
      newErrors.nameOnCard = 'Name must be at least 2 characters'
    }

    setCardErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateMobileMoneyForm = (): boolean => {
    const newErrors: MobileMoneyFormErrors = {}

    // Provider validation
    if (!mobileMoneyFormData.provider) {
      newErrors.provider = 'Please select a mobile money provider'
    }

    // Phone number validation
    if (!mobileMoneyFormData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (!validatePhoneNumber(mobileMoneyFormData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number'
    }

    // Account name validation
    if (!mobileMoneyFormData.accountName.trim()) {
      newErrors.accountName = 'Account name is required'
    } else if (mobileMoneyFormData.accountName.trim().length < 2) {
      newErrors.accountName = 'Account name must be at least 2 characters'
    }

    setMobileMoneyErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCardInputChange = (field: keyof CardFormData, value: string) => {
    let formattedValue = value

    // Format card number with spaces
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
    }

    // Format expiry date
    if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substr(0, 5)
    }

    // Format CVC (numbers only)
    if (field === 'cvc') {
      formattedValue = value.replace(/\D/g, '').substr(0, 4)
    }

    setCardFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }))

    // Clear error for this field
    if (cardErrors[field]) {
      setCardErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const handleMobileMoneyInputChange = (field: keyof MobileMoneyFormData, value: string) => {
    setMobileMoneyFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Clear error for this field
    if (mobileMoneyErrors[field]) {
      setMobileMoneyErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()

    let isValid = false

    if (activeTab === 'card') {
      isValid = validateCardForm()
    } else {
      isValid = validateMobileMoneyForm()
    }

    if (!isValid) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Navigate to confirmation page
      router.push(`/hostels/${hostel.id}/rooms/${room.id}/book/confirmation`)
    } catch (error) {
      console.error('Payment error:', error)
      // Handle payment error
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/hostels/${hostel.id}/rooms/${room.id}/book`} className="text-sm text-primary hover:underline">
          &larr; Back to booking details
        </Link>
        <h1 className="mt-2 text-3xl font-bold">Payment</h1>
        <p className="text-muted-foreground">Complete your payment to secure your booking</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Card Payment
              </TabsTrigger>
              <TabsTrigger value="mobile-money" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Mobile Money
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card">
              <form onSubmit={handlePayment}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Credit or Debit Card
                    </CardTitle>
                    <CardDescription>Enter your card details to complete the payment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number *</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        value={cardFormData.cardNumber}
                        onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                        className={cardErrors.cardNumber ? 'border-red-500' : ''}
                        maxLength={19}
                      />
                      {cardErrors.cardNumber && (
                        <p className="text-sm text-red-500">{cardErrors.cardNumber}</p>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date *</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardFormData.expiryDate}
                          onChange={(e) => handleCardInputChange('expiryDate', e.target.value)}
                          className={cardErrors.expiryDate ? 'border-red-500' : ''}
                          maxLength={5}
                        />
                        {cardErrors.expiryDate && (
                          <p className="text-sm text-red-500">{cardErrors.expiryDate}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC *</Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          value={cardFormData.cvc}
                          onChange={(e) => handleCardInputChange('cvc', e.target.value)}
                          className={cardErrors.cvc ? 'border-red-500' : ''}
                          maxLength={4}
                        />
                        {cardErrors.cvc && (
                          <p className="text-sm text-red-500">{cardErrors.cvc}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Name on Card *</Label>
                      <Input
                        id="name"
                        placeholder="Enter the name on your card"
                        value={cardFormData.nameOnCard}
                        onChange={(e) => handleCardInputChange('nameOnCard', e.target.value)}
                        className={cardErrors.nameOnCard ? 'border-red-500' : ''}
                      />
                      {cardErrors.nameOnCard && (
                        <p className="text-sm text-red-500">{cardErrors.nameOnCard}</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col space-y-4">
                    <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-sm">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Your payment information is encrypted and secure. We never store your full card details.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Processing Payment...' : `Pay ${room.price + 100}`}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>

            <TabsContent value="mobile-money">
              <form onSubmit={handlePayment}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5" />
                      Mobile Money Payment
                    </CardTitle>
                    <CardDescription>Pay securely using your mobile money account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="provider">Mobile Money Provider *</Label>
                      <Select
                        value={mobileMoneyFormData.provider}
                        onValueChange={(value) => handleMobileMoneyInputChange('provider', value)}
                      >
                        <SelectTrigger
                          id="provider"
                          className={mobileMoneyErrors.provider ? 'border-red-500' : ''}
                        >
                          <SelectValue placeholder="Select your mobile money provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                          <SelectItem value="airtel">Airtel Money</SelectItem>
                        </SelectContent>
                      </Select>
                      {mobileMoneyErrors.provider && (
                        <p className="text-sm text-red-500">{mobileMoneyErrors.provider}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone-number">Phone Number *</Label>
                      <Input
                        id="phone-number"
                        placeholder="Enter your mobile money number (e.g., 0701234567)"
                        type="tel"
                        value={mobileMoneyFormData.phoneNumber}
                        onChange={(e) => handleMobileMoneyInputChange('phoneNumber', e.target.value)}
                        className={mobileMoneyErrors.phoneNumber ? 'border-red-500' : ''}
                      />
                      {mobileMoneyErrors.phoneNumber && (
                        <p className="text-sm text-red-500">{mobileMoneyErrors.phoneNumber}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="account-name">Account Name *</Label>
                      <Input
                        id="account-name"
                        placeholder="Enter the name on your mobile money account"
                        value={mobileMoneyFormData.accountName}
                        onChange={(e) => handleMobileMoneyInputChange('accountName', e.target.value)}
                        className={mobileMoneyErrors.accountName ? 'border-red-500' : ''}
                      />
                      {mobileMoneyErrors.accountName && (
                        <p className="text-sm text-red-500">{mobileMoneyErrors.accountName}</p>
                      )}
                    </div>

                    {mobileMoneyFormData.provider && (
                      <div className="rounded-lg bg-gray-50 p-4 text-sm">
                        <h4 className="font-medium text-gray-900 mb-2">Payment Instructions:</h4>
                        <ol className="list-decimal list-inside space-y-1 text-gray-800">
                          <li>You will receive a payment prompt on your phone</li>
                          <li>Enter your mobile money PIN to authorize the payment</li>
                          <li>You will receive a confirmation SMS once payment is successful</li>
                        </ol>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex-col space-y-4">
                    <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-sm">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Your mobile money transaction is secure and encrypted. No sensitive information is stored.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? 'Processing Payment...'
                        : `Pay ${room.price + 100}${mobileMoneyFormData.provider ? ` via ${mobileMoneyFormData.provider.toUpperCase()}` : ''}`
                      }
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>
          </Tabs>
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

              <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-3 text-sm text-primary">
                <ShieldCheck className="h-4 w-4" />
                <p>Secure payment protected by SSL encryption</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
export interface Room {
  id: string
  name: string
  type: string
  price: number
  size: number
  occupancy: number
  ensuite: boolean
  availability: boolean
  description?: string
}

export interface Hostel {
  id: string
  name: string
  location: string
  description?: string
  rating: number
  reviewCount: number
  priceRange: {
    min: number
    max: number
  }
  availability: boolean
  featured?: boolean
  rooms?: Room[]
}

// Sample data for hostels
export const hostels: Hostel[] = [
  {
    id: "h1",
    name: "Sunshine Student Hostel",
    location: "Near University of Example",
    rating: 4.7,
    reviewCount: 128,
    priceRange: {
      min: 350,
      max: 600,
    },
    availability: true,
    featured: true,
    rooms: [
      {
        id: "r1",
        name: "Standard Single Room",
        type: "Single",
        price: 350,
        size: 12,
        occupancy: 1,
        ensuite: false,
        availability: true,
      },
      {
        id: "r2",
        name: "En-suite Single Room",
        type: "Single",
        price: 450,
        size: 15,
        occupancy: 1,
        ensuite: true,
        availability: true,
      },
      {
        id: "r3",
        name: "Standard Double Room",
        type: "Double",
        price: 300,
        size: 18,
        occupancy: 2,
        ensuite: false,
        availability: true,
      },
      {
        id: "r4",
        name: "En-suite Double Room",
        type: "Double",
        price: 400,
        size: 20,
        occupancy: 2,
        ensuite: true,
        availability: false,
      },
    ],
  },
  {
    id: "h2",
    name: "City View Residence",
    location: "Downtown, 10 min from campus",
    rating: 4.5,
    reviewCount: 96,
    priceRange: {
      min: 400,
      max: 700,
    },
    availability: true,
    rooms: [
      {
        id: "r5",
        name: "Standard Single Room",
        type: "Single",
        price: 400,
        size: 14,
        occupancy: 1,
        ensuite: false,
        availability: true,
      },
      {
        id: "r6",
        name: "Premium Single Room",
        type: "Single",
        price: 500,
        size: 16,
        occupancy: 1,
        ensuite: true,
        availability: true,
      },
      {
        id: "r7",
        name: "Double Room with Balcony",
        type: "Double",
        price: 450,
        size: 22,
        occupancy: 2,
        ensuite: true,
        availability: true,
      },
    ],
  },
  {
    id: "h3",
    name: "University Heights",
    location: "On-campus accommodation",
    rating: 4.2,
    reviewCount: 215,
    priceRange: {
      min: 300,
      max: 550,
    },
    availability: true,
    featured: true,
    rooms: [
      {
        id: "r8",
        name: "Basic Single Room",
        type: "Single",
        price: 300,
        size: 10,
        occupancy: 1,
        ensuite: false,
        availability: true,
      },
      {
        id: "r9",
        name: "Standard Single Room",
        type: "Single",
        price: 350,
        size: 12,
        occupancy: 1,
        ensuite: false,
        availability: true,
      },
      {
        id: "r10",
        name: "Triple Room",
        type: "Triple",
        price: 250,
        size: 25,
        occupancy: 3,
        ensuite: false,
        availability: true,
      },
      {
        id: "r11",
        name: "Quad Room",
        type: "Quad",
        price: 220,
        size: 30,
        occupancy: 4,
        ensuite: false,
        availability: true,
      },
    ],
  },
  {
    id: "h4",
    name: "Riverside Student Living",
    location: "Riverside area, 15 min from campus",
    rating: 4.8,
    reviewCount: 78,
    priceRange: {
      min: 450,
      max: 800,
    },
    availability: true,
    rooms: [
      {
        id: "r12",
        name: "Deluxe Studio",
        type: "Studio",
        price: 650,
        size: 25,
        occupancy: 1,
        ensuite: true,
        availability: true,
      },
      {
        id: "r13",
        name: "Premium Studio",
        type: "Studio",
        price: 800,
        size: 30,
        occupancy: 1,
        ensuite: true,
        availability: true,
      },
      {
        id: "r14",
        name: "Shared Apartment - Single Room",
        type: "Single",
        price: 450,
        size: 15,
        occupancy: 1,
        ensuite: true,
        availability: true,
      },
    ],
  },
  {
    id: "h5",
    name: "The Student Hub",
    location: "Central location, 5 min from campus",
    rating: 4.3,
    reviewCount: 142,
    priceRange: {
      min: 320,
      max: 600,
    },
    availability: false,
    rooms: [
      {
        id: "r15",
        name: "Standard Single Room",
        type: "Single",
        price: 320,
        size: 12,
        occupancy: 1,
        ensuite: false,
        availability: false,
      },
      {
        id: "r16",
        name: "En-suite Single Room",
        type: "Single",
        price: 420,
        size: 14,
        occupancy: 1,
        ensuite: true,
        availability: false,
      },
      {
        id: "r17",
        name: "Twin Room",
        type: "Double",
        price: 280,
        size: 18,
        occupancy: 2,
        ensuite: false,
        availability: false,
      },
    ],
  },
  {
    id: "h6",
    name: "Campus Gardens",
    location: "Adjacent to university campus",
    rating: 4.4,
    reviewCount: 105,
    priceRange: {
      min: 330,
      max: 580,
    },
    availability: true,
    rooms: [
      {
        id: "r18",
        name: "Standard Single Room",
        type: "Single",
        price: 330,
        size: 12,
        occupancy: 1,
        ensuite: false,
        availability: true,
      },
      {
        id: "r19",
        name: "Premium Single Room",
        type: "Single",
        price: 430,
        size: 15,
        occupancy: 1,
        ensuite: true,
        availability: true,
      },
      {
        id: "r20",
        name: "Double Room",
        type: "Double",
        price: 290,
        size: 20,
        occupancy: 2,
        ensuite: false,
        availability: true,
      },
    ],
  },
  {
    id: "h7",
    name: "Urban Student Living",
    location: "City center, 20 min from campus",
    rating: 4.6,
    reviewCount: 89,
    priceRange: {
      min: 380,
      max: 650,
    },
    availability: true,
    featured: true,
    rooms: [
      {
        id: "r21",
        name: "Studio Apartment",
        type: "Studio",
        price: 580,
        size: 22,
        occupancy: 1,
        ensuite: true,
        availability: true,
      },
      {
        id: "r22",
        name: "One Bedroom Apartment",
        type: "Single",
        price: 650,
        size: 30,
        occupancy: 1,
        ensuite: true,
        availability: true,
      },
      {
        id: "r23",
        name: "Shared Two Bedroom Apartment",
        type: "Double",
        price: 380,
        size: 40,
        occupancy: 2,
        ensuite: true,
        availability: true,
      },
    ],
  },
  {
    id: "h8",
    name: "College Square Residences",
    location: "Near College Square, 8 min from campus",
    rating: 4.1,
    reviewCount: 124,
    priceRange: {
      min: 310,
      max: 520,
    },
    availability: true,
    rooms: [
      {
        id: "r24",
        name: "Basic Single Room",
        type: "Single",
        price: 310,
        size: 10,
        occupancy: 1,
        ensuite: false,
        availability: true,
      },
      {
        id: "r25",
        name: "Standard Single Room",
        type: "Single",
        price: 360,
        size: 12,
        occupancy: 1,
        ensuite: false,
        availability: true,
      },
      {
        id: "r26",
        name: "En-suite Single Room",
        type: "Single",
        price: 420,
        size: 14,
        occupancy: 1,
        ensuite: true,
        availability: true,
      },
      {
        id: "r27",
        name: "Double Room",
        type: "Double",
        price: 280,
        size: 18,
        occupancy: 2,
        ensuite: false,
        availability: true,
      },
      {
        id: "r28",
        name: "En-suite Double Room",
        type: "Double",
        price: 340,
        size: 20,
        occupancy: 2,
        ensuite: true,
        availability: true,
      },
    ],
  },
]


export async function getHostels() {
  
  // Simulating asyc delay or future backend call
  return hostels
}
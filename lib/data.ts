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

export interface ImageUrl {
  url: string
}

export interface Hostel {
  id: string
  name: string
  location: string
  description?: string
  average_price: number
  owner_id: string
  available_rooms: number
  rule_and_regulations?: string
  amenities?: string[]
  image_url?: ImageUrl[]  // <-- Corrected here: array of ImageUrl objects
  created_at?: string
  updated_at?: string
}

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, SlidersHorizontal } from "lucide-react"
import HostelCard from "@/components/hostel-card"
import { hostels } from "@/lib/data"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function HostelsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Find Hostels</h1>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search by location, university, or hostel name" className="pl-10" />
        </div>
        <div className="flex gap-4">
          <Select defaultValue="location">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="location">Location</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your search results with these filters.</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Price Range</h3>
                  <Slider defaultValue={[0, 1000]} min={0} max={1000} step={10} />
                  <div className="flex items-center justify-between text-sm">
                    <span>$0</span>
                    <span>$1000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Distance from University</h3>
                  <Select defaultValue="any">
                    <SelectTrigger>
                      <SelectValue placeholder="Select distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any distance</SelectItem>
                      <SelectItem value="1km">Less than 1 km</SelectItem>
                      <SelectItem value="3km">Less than 3 km</SelectItem>
                      <SelectItem value="5km">Less than 5 km</SelectItem>
                      <SelectItem value="10km">Less than 10 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Amenities</h3>
                  <div className="space-y-2">
                    {["Wi-Fi", "Laundry", "Kitchen", "Study Room", "Gym", "Air Conditioning"].map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox id={`amenity-${amenity}`} />
                        <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Room Type</h3>
                  <div className="space-y-2">
                    {["Single", "Double", "Triple", "Quad", "Dormitory"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={`type-${type}`} />
                        <Label htmlFor={`type-${type}`}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset</Button>
                  <Button>Apply Filters</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="mb-4 text-sm text-muted-foreground">Showing {hostels.length} hostels</div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hostels.map((hostel) => (
          <HostelCard key={hostel.id} hostel={hostel} />
        ))}
      </div>
    </div>
  )
}

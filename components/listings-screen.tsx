"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, MapPin, Bed, Bath, Phone, Home, HelpCircle, Settings, Filter, X, Eye } from "lucide-react"
import { PropertyDetail } from "./property-detail"

interface Property {
  id: string
  title: string
  price: number
  deposit: number
  bedrooms: number
  bathrooms: number
  address: string
  township: string
  province: string
  image: string
  landlordPhone: string
  landlordName: string
  description: string
  amenities: string[]
  images: string[]
}

interface FilterState {
  township: string
  minPrice: number
  maxPrice: number
  bedrooms: string
  bathrooms: string
}

const mockProperties: Property[] = [
  {
    id: "1",
    title: "Modern 2-Bedroom House",
    price: 3500,
    deposit: 7000,
    bedrooms: 2,
    bathrooms: 1,
    address: "123 Vilakazi Street",
    township: "Soweto",
    province: "Gauteng",
    image: "/modern-house-soweto.png",
    landlordPhone: "+27 82 123 4567",
    landlordName: "Thabo Mthembu",
    description:
      "This beautifully renovated 2-bedroom house offers modern living in the heart of Soweto. Features include an open-plan kitchen and living area, built-in wardrobes, and a private garden. Perfect for a small family or young professionals. The property is close to schools, shopping centers, and public transport.",
    amenities: ["Parking", "WiFi", "Electricity", "Water", "Garden", "Security"],
    images: ["/modern-house-soweto.png"],
  },
  {
    id: "2",
    title: "Cozy Bachelor Flat",
    price: 2200,
    deposit: 4400,
    bedrooms: 1,
    bathrooms: 1,
    address: "45 Mandela Avenue",
    township: "Alexandra",
    province: "Gauteng",
    image: "/bachelor-flat-alexandra.png",
    landlordPhone: "+27 83 987 6543",
    landlordName: "Nomsa Dlamini",
    description:
      "A comfortable bachelor flat ideal for a single person or couple. The unit features a kitchenette, bathroom, and living area. Located in a safe complex with 24-hour security. Walking distance to taxi ranks and local amenities.",
    amenities: ["Parking", "Electricity", "Water", "Security"],
    images: ["/bachelor-flat-alexandra.png"],
  },
  {
    id: "3",
    title: "Family Home with Garden",
    price: 4800,
    deposit: 9600,
    bedrooms: 3,
    bathrooms: 2,
    address: "78 Sisulu Road",
    township: "Tembisa",
    province: "Gauteng",
    image: "/tembisa-family-garden.png",
    landlordPhone: "+27 84 555 7890",
    landlordName: "Sipho Khumalo",
    description:
      "Spacious family home with a large garden perfect for children to play. The house features 3 bedrooms, 2 bathrooms, a lounge, dining room, and kitchen. Additional features include a double garage and outdoor entertainment area. Located in a quiet neighborhood with good schools nearby.",
    amenities: ["Parking", "WiFi", "Electricity", "Water", "Garden", "Garage"],
    images: ["/tembisa-family-garden.png"],
  },
  {
    id: "4",
    title: "Spacious 4-Bedroom House",
    price: 6200,
    deposit: 12400,
    bedrooms: 4,
    bathrooms: 2,
    address: "12 Biko Street",
    township: "Khayelitsha",
    province: "Western Cape",
    image: "/spacious-house-khayelitsha.png",
    landlordPhone: "+27 81 234 5678",
    landlordName: "Mandla Ngcobo",
    description:
      "Large family home with 4 bedrooms and 2 bathrooms. Perfect for a big family. The property includes a spacious lounge, kitchen with dining area, and a backyard. Close to schools, clinics, and shopping centers.",
    amenities: ["Parking", "Electricity", "Water", "Garden"],
    images: ["/spacious-house-khayelitsha.png"],
  },
  {
    id: "5",
    title: "Affordable 1-Bedroom Flat",
    price: 1800,
    deposit: 3600,
    bedrooms: 1,
    bathrooms: 1,
    address: "89 Tambo Road",
    township: "Mamelodi",
    province: "Gauteng",
    image: "/affordable-flat-mamelodi.png",
    landlordPhone: "+27 85 876 5432",
    landlordName: "Grace Motaung",
    description:
      "Affordable 1-bedroom flat perfect for first-time renters. The unit includes a bedroom, bathroom, kitchen, and small living area. Located in a secure building with controlled access. Close to public transport and local shops.",
    amenities: ["Electricity", "Water", "Security"],
    images: ["/affordable-flat-mamelodi.png"],
  },
]

const townships = ["All Townships", "Soweto", "Alexandra", "Tembisa", "Khayelitsha", "Mamelodi"]

export function ListingsScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("listings")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [filters, setFilters] = useState<FilterState>({
    township: "All Townships",
    minPrice: 1000,
    maxPrice: 10000,
    bedrooms: "Any",
    bathrooms: "Any",
  })
  const [priceRange, setPriceRange] = useState([1000, 10000])

  if (selectedProperty) {
    return <PropertyDetail property={selectedProperty} onBack={() => setSelectedProperty(null)} />
  }

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.township.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTownship = filters.township === "All Townships" || property.township === filters.township

    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1]

    const matchesBedrooms = filters.bedrooms === "Any" || property.bedrooms.toString() === filters.bedrooms

    const matchesBathrooms = filters.bathrooms === "Any" || property.bathrooms.toString() === filters.bathrooms

    return matchesSearch && matchesTownship && matchesPrice && matchesBedrooms && matchesBathrooms
  })

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self")
  }

  const handleWhatsApp = (phone: string, propertyTitle: string) => {
    const message = `Hi, I'm interested in the property: ${propertyTitle}`
    const whatsappUrl = `https://wa.me/${phone.replace(/\s+/g, "").replace("+", "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const clearFilters = () => {
    setFilters({
      township: "All Townships",
      minPrice: 1000,
      maxPrice: 10000,
      bedrooms: "Any",
      bathrooms: "Any",
    })
    setPriceRange([1000, 10000])
  }

  const activeFiltersCount = [
    filters.township !== "All Townships",
    priceRange[0] !== 1000 || priceRange[1] !== 10000,
    filters.bedrooms !== "Any",
    filters.bathrooms !== "Any",
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Header */}
      <div className="sticky top-0 bg-[#0d0d0d] border-b border-gray-800 p-4 z-10">
        <h1 className="text-2xl font-bold text-center mb-4">eKasiKwaMastende</h1>

        {/* Search Bar with Filter Button */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search by location, township, or property type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="border-gray-700 text-white hover:bg-[#2a2a2a] relative bg-transparent"
              >
                <Filter className="w-4 h-4" />
                {activeFiltersCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-[#fe5228] text-white text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-[#1a1a1a] border-gray-800 text-white">
              <SheetHeader>
                <SheetTitle className="text-white">Filter Properties</SheetTitle>
                <SheetDescription className="text-gray-400">
                  Narrow down your search with these filters
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                {/* Township Filter */}
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Township</label>
                  <Select
                    value={filters.township}
                    onValueChange={(value) => setFilters({ ...filters, township: value })}
                  >
                    <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2a2a2a] border-gray-700">
                      {townships.map((township) => (
                        <SelectItem key={township} value={township} className="text-white hover:bg-[#3a3a3a]">
                          {township}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Price Range: R{priceRange[0].toLocaleString()} - R{priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000}
                    min={1000}
                    step={100}
                    className="w-full"
                  />
                </div>

                {/* Bedrooms Filter */}
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Bedrooms</label>
                  <Select
                    value={filters.bedrooms}
                    onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}
                  >
                    <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2a2a2a] border-gray-700">
                      <SelectItem value="Any" className="text-white hover:bg-[#3a3a3a]">
                        Any
                      </SelectItem>
                      <SelectItem value="1" className="text-white hover:bg-[#3a3a3a]">
                        1 Bedroom
                      </SelectItem>
                      <SelectItem value="2" className="text-white hover:bg-[#3a3a3a]">
                        2 Bedrooms
                      </SelectItem>
                      <SelectItem value="3" className="text-white hover:bg-[#3a3a3a]">
                        3 Bedrooms
                      </SelectItem>
                      <SelectItem value="4" className="text-white hover:bg-[#3a3a3a]">
                        4+ Bedrooms
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bathrooms Filter */}
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Bathrooms</label>
                  <Select
                    value={filters.bathrooms}
                    onValueChange={(value) => setFilters({ ...filters, bathrooms: value })}
                  >
                    <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2a2a2a] border-gray-700">
                      <SelectItem value="Any" className="text-white hover:bg-[#3a3a3a]">
                        Any
                      </SelectItem>
                      <SelectItem value="1" className="text-white hover:bg-[#3a3a3a]">
                        1 Bathroom
                      </SelectItem>
                      <SelectItem value="2" className="text-white hover:bg-[#3a3a3a]">
                        2 Bathrooms
                      </SelectItem>
                      <SelectItem value="3" className="text-white hover:bg-[#3a3a3a]">
                        3+ Bathrooms
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filter Actions */}
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="flex-1 border-gray-700 text-white hover:bg-[#2a2a2a] bg-transparent"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear Filters
                  </Button>
                  <Button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 bg-[#fe5228] hover:bg-[#e04620] text-white"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {activeFiltersCount > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {filters.township !== "All Townships" && (
              <Badge variant="secondary" className="bg-[#2a2a2a] text-white">
                {filters.township}
              </Badge>
            )}
            {(priceRange[0] !== 1000 || priceRange[1] !== 10000) && (
              <Badge variant="secondary" className="bg-[#2a2a2a] text-white">
                R{priceRange[0].toLocaleString()} - R{priceRange[1].toLocaleString()}
              </Badge>
            )}
            {filters.bedrooms !== "Any" && (
              <Badge variant="secondary" className="bg-[#2a2a2a] text-white">
                {filters.bedrooms} bed{filters.bedrooms !== "1" ? "s" : ""}
              </Badge>
            )}
            {filters.bathrooms !== "Any" && (
              <Badge variant="secondary" className="bg-[#2a2a2a] text-white">
                {filters.bathrooms} bath{filters.bathrooms !== "1" ? "s" : ""}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Property Listings */}
      <div className="p-4 pb-20">
        <div className="mb-4">
          <p className="text-gray-400 text-sm">
            {filteredProperties.length} propert{filteredProperties.length !== 1 ? "ies" : "y"} found
          </p>
        </div>

        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="bg-[#1a1a1a] border-gray-800 overflow-hidden">
              <div className="relative">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-[#fe5228] text-white">R{property.price.toLocaleString()}/month</Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{property.title}</h3>

                <div className="flex items-center text-gray-400 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {property.address}, {property.township}, {property.province}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center text-gray-400">
                    <Bed className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Bath className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.bathrooms} bath</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-400">
                    Deposit: <span className="text-white font-semibold">R{property.deposit.toLocaleString()}</span>
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setSelectedProperty(property)}
                    variant="outline"
                    className="flex-1 border-gray-700 text-white hover:bg-[#2a2a2a] bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Property
                  </Button>
                  <Button
                    onClick={() => handleCall(property.landlordPhone)}
                    className="flex-1 bg-[#fe5228] hover:bg-[#e04620] text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No properties found matching your search criteria.</p>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="border-gray-700 text-white hover:bg-[#2a2a2a] bg-transparent"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 px-4 py-2">
        <div className="flex justify-around items-center">
          <button
            onClick={() => setActiveTab("help")}
            className={`flex flex-col items-center p-2 ${activeTab === "help" ? "text-[#fe5228]" : "text-gray-400"}`}
          >
            <HelpCircle className="w-6 h-6 mb-1" />
            <span className="text-xs">Help Center</span>
          </button>

          <button
            onClick={() => setActiveTab("listings")}
            className={`flex flex-col items-center p-2 ${activeTab === "listings" ? "text-[#fe5228]" : "text-gray-400"}`}
          >
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs">Listings</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex flex-col items-center p-2 ${activeTab === "settings" ? "text-[#fe5228]" : "text-gray-400"}`}
          >
            <Settings className="w-6 h-6 mb-1" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}

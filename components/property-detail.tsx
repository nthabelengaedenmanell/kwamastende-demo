"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Phone,
  MessageCircle,
  Heart,
  Share2,
  Car,
  Wifi,
  Zap,
  Droplets,
} from "lucide-react"

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

interface PropertyDetailProps {
  property: Property
  onBack: () => void
}

export function PropertyDetail({ property, onBack }: PropertyDetailProps) {
  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self")
  }

  const handleWhatsApp = (phone: string, propertyTitle: string) => {
    const message = `Hi ${property.landlordName}, I'm interested in the property: ${propertyTitle}. Can we schedule a viewing?`
    const whatsappUrl = `https://wa.me/${phone.replace(/\s+/g, "").replace("+", "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title} - R${property.price.toLocaleString()}/month`,
        url: window.location.href,
      })
    }
  }

  const amenityIcons: { [key: string]: any } = {
    Parking: Car,
    WiFi: Wifi,
    Electricity: Zap,
    Water: Droplets,
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Header */}
      <div className="sticky top-0 bg-[#0d0d0d] border-b border-gray-800 p-4 z-10">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-[#2a2a2a] p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Property Details</h1>
          <Button variant="ghost" size="sm" onClick={handleShare} className="text-white hover:bg-[#2a2a2a] p-2">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Property Images */}
      <div className="relative">
        <img src={property.image || "/placeholder.svg"} alt={property.title} className="w-full h-64 object-cover" />
        <div className="absolute top-4 right-4">
          <Badge className="bg-[#fe5228] text-white text-lg px-3 py-1">R{property.price.toLocaleString()}/month</Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 left-4 bg-black/50 text-white hover:bg-black/70 p-2"
        >
          <Heart className="w-5 h-5" />
        </Button>
      </div>

      {/* Property Details */}
      <div className="p-4 space-y-6">
        {/* Basic Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{property.title}</h2>
          <div className="flex items-center text-gray-400 mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            <span>
              {property.address}, {property.township}, {property.province}
            </span>
          </div>

          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center text-gray-400">
              <Bed className="w-5 h-5 mr-2" />
              <span>
                {property.bedrooms} Bedroom{property.bedrooms !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center text-gray-400">
              <Bath className="w-5 h-5 mr-2" />
              <span>
                {property.bathrooms} Bathroom{property.bathrooms !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Pricing</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Monthly Rent:</span>
                <span className="text-white font-semibold">R{property.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Security Deposit:</span>
                <span className="text-white font-semibold">R{property.deposit.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-700 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-white font-semibold">Total Move-in Cost:</span>
                  <span className="text-[#fe5228] font-bold">
                    R{(property.price + property.deposit).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
            <p className="text-gray-300 leading-relaxed">{property.description}</p>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {property.amenities.map((amenity, index) => {
                const IconComponent = amenityIcons[amenity] || Zap
                return (
                  <div key={index} className="flex items-center text-gray-300">
                    <IconComponent className="w-4 h-4 mr-2 text-[#fe5228]" />
                    <span className="text-sm">{amenity}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Landlord Info */}
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Landlord</h3>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#fe5228] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {property.landlordName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-white font-medium">{property.landlordName}</p>
                <p className="text-gray-400 text-sm">{property.landlordPhone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Contact Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 p-4">
        <div className="flex gap-3">
          <Button
            onClick={() => handleCall(property.landlordPhone)}
            className="flex-1 bg-[#fe5228] hover:bg-[#e04620] text-white py-3"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Now
          </Button>
          <Button
            onClick={() => handleWhatsApp(property.landlordPhone, property.title)}
            variant="outline"
            className="flex-1 border-gray-700 text-white hover:bg-[#2a2a2a] bg-transparent py-3"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}

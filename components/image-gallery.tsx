"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageGalleryProps {
  images: string[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1
    const newIndex = isLastImage ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative">
      <div className="relative h-[300px] overflow-hidden rounded-lg md:h-[400px] lg:h-[500px]">
        <img
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`Gallery image ${currentIndex + 1}`}
          className="h-full w-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous image</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
          onClick={goToNext}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next image</span>
        </Button>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-primary" : "bg-muted hover:bg-muted-foreground/50"
            }`}
            onClick={() => goToImage(index)}
          >
            <span className="sr-only">Go to image {index + 1}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`overflow-hidden rounded-md ${
              index === currentIndex ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
            onClick={() => goToImage(index)}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              className="h-16 w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

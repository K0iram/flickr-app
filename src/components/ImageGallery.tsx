import { useState } from "react"
import PhotoAlbum from "react-photo-album"

import { FlickrPhoto, GalleryProps } from "../types/images"
import ImageModal from "./ImageModal"

const Gallery = ({ images }: GalleryProps) => {
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<FlickrPhoto | null>(null)

  const handleImageClick = ({ index }: { index: number }) => {
    if (index !== undefined && index >= 0 && index < images.length) {
      const photo: FlickrPhoto = images[index] as unknown as FlickrPhoto
      setOpen(true)
      setSelectedImage(photo)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedImage(null)
  }

  return (
    <div className="p-6 mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
      <PhotoAlbum
        layout="masonry"
        photos={images}
        spacing={8}
        columns={4}
        onClick={handleImageClick} // Updated to use the new handler
      />
      <ImageModal open={open} onClose={handleClose} selectedImage={selectedImage} />
    </div>
  )
}

export default Gallery

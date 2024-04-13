import { useState } from "react"
import PhotoAlbum from "react-photo-album"

import { FlickrPhoto, GalleryProps } from "../types/images"
import ImageModal from "./ImageModal"

/**
 * Gallery Component
 *
 * This component is responsible for rendering the image gallery using the `react-photo-album` library.
 * It displays images in a masonry layout and allows users to click on an image to view it in a modal with more details.
 *
 * Props:
 * - images: An array of `FlickrPhoto` objects containing information about each image to be displayed in the gallery.
 *
 * State:
 * - open: A boolean state that controls the visibility of the modal.
 * - selectedImage: The `FlickrPhoto` object of the currently selected image to be displayed in the modal.
 *
 * Functions:
 * - handleImageClick: A function that is triggered when an image in the gallery is clicked. It sets the `selectedImage` state to the clicked image and opens the modal.
 * - handleClose: A function that closes the modal and resets the `selectedImage` state to null.
 *
 * The component renders a `PhotoAlbum` from `react-photo-album` to display the images in a masonry layout.
 * It also renders an `ImageModal` component, passing the `selectedImage`, `open`, and `handleClose` props to display the modal with the image details.
 */
const Gallery = ({ images }: GalleryProps) => {
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<FlickrPhoto | null>(null)

  const handleImageClick = ({ index }: { index: number }) => {
    if (index >= 0 && index < images.length) {
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
        onClick={handleImageClick}
      />
      <ImageModal open={open} onClose={handleClose} selectedImage={selectedImage} />
    </div>
  )
}

export default Gallery

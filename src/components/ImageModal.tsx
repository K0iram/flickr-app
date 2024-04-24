import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import {
  ArrowDownIcon,
  ChatBubbleLeftEllipsisIcon,
  HeartIcon,
  XMarkIcon
} from "@heroicons/react/20/solid"

import { FlickrPhoto } from "@/types/images"

interface ImageModalProps {
  selectedImage: FlickrPhoto | null
  open: boolean
  onClose: () => void
}

/**
 * ImageModal Component
 *
 * This component is responsible for displaying the modal that shows the selected image's details.
 * It uses the Headless UI Dialog component to create an accessible modal dialog.
 *
 * Props:
 * - selectedImage: The FlickrPhoto object containing details of the selected image.
 * - open: A boolean indicating if the modal is open or not.
 * - onClose: A function to be called when the modal needs to be closed.
 *
 * The modal displays the image, its title, and provides a close button to dismiss the modal.
 * It only renders if a selectedImage is provided.
 */
const ImageModal = ({ selectedImage, open, onClose }: ImageModalProps) => {
  const { REACT_APP_FLICKR_API_KEY } = process.env
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    if (open && selectedImage) {
      const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${REACT_APP_FLICKR_API_KEY}&photo_id=${selectedImage.id}&format=json&nojsoncallback=1`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.stat === "ok") {
            const sizes = data.sizes.size
            const original = sizes.find((size: { label: string }) => size.label === "Original")
            if (original) {
              setImageUrl(original.source)
              console.log(original)
            }
          }
        })
        .catch(error => console.error("Failed to load image data", error))
    }
  }, [open, selectedImage])

  if (!selectedImage) {
    return null
  }

  const downloadImage = (imageUrl: RequestInfo | URL, fileName: string) => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob)

        const a = document.createElement("a")
        a.style.display = "none"
        a.href = url
        a.download = fileName || "download.jpg"
        document.body.appendChild(a)
        a.click()

        // Clean up by revoking the object URL and removing the temporary link
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      })
      .catch(err => console.error("Could not download the image", err))
  }

  const onDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (!imageUrl) return
    downloadImage(imageUrl, `${selectedImage.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.jpg`)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative mx-auto my-8 w-[500px] max-h-[700px] overflow-hidden rounded-lg bg-white shadow-xl flex flex-col">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600"
                  aria-label="Close"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>

                {/* Image Container */}
                <div className="w-full flex-shrink-0 flex justify-center items-center p-4 min-h-[300px]">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="object-contain max-w-full mx-auto"
                  />
                </div>

                {/* Content Container */}
                <div className="flex-grow p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-center text-gray-900">
                    {selectedImage.title}
                  </h3>
                  <p className="text-sm text-gray-500">{selectedImage.description._content}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">By: </span>
                    {selectedImage.ownername}
                  </p>
                  <div className="flex items-center justify-around">
                    <span className="flex items-center">
                      <ChatBubbleLeftEllipsisIcon
                        className="h-4 w-4 mr-1 text-gray-500"
                        aria-hidden="true"
                      />
                      {selectedImage.commentsCount}
                    </span>
                    <span className="flex items-center">
                      <HeartIcon className="h-4 w-4 mr-1 text-red-500" aria-hidden="true" />
                      {selectedImage.favesCount}
                    </span>
                    {imageUrl && (
                      <a
                        className="flex items-center cursor-pointer"
                        href="#"
                        onClick={onDownloadClick}
                      >
                        <ArrowDownIcon className="h-4 w-4 mr-1 text-gray-500" aria-hidden="true" />
                        Download
                      </a>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ImageModal

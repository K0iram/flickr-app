import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { ChatBubbleLeftEllipsisIcon, HeartIcon, XMarkIcon } from "@heroicons/react/20/solid"

import { FlickrPhoto } from "@/types/images"

interface ImageModalProps {
  selectedImage: FlickrPhoto | null
  open: boolean
  onClose: () => void
}

const ImageModal = ({ selectedImage, open, onClose }: ImageModalProps) => {
  if (!selectedImage) {
    return null
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
              <Dialog.Panel className="relative mx-auto my-8 w-[500px] h-[500px] overflow-hidden rounded-lg bg-white shadow-xl flex flex-col">
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
                      {selectedImage.comments_count}
                    </span>
                    <span className="flex items-center">
                      <HeartIcon className="h-4 w-4 mr-1 text-red-500" aria-hidden="true" />
                      {selectedImage.faves_count}
                    </span>
                  </div>
                  {/* Additional content can go here */}
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

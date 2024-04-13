// Photo Gallery image props
export interface PictureData {
  src: string
  width: number
  height: number
  alt: string
}

// Photo Gallery props
export interface GalleryProps {
  images: PictureData[]
}

// Returned from Flickr API
export interface FetchPicturesResponse {
  result: PictureData[]
  nextPage: number
  totalPages: number
  lastPage: number
}

// Flickr API photo description
export type FlickrPhotoDescription = {
  _content: string
}

// Returned from Flickr API
export interface FlickrPhoto {
  url_s: string
  src: string
  width_s: string
  height_s: string
  title: string
  comments_count: string
  faves_count: string
  ownername: string
  realname: string
  description: FlickrPhotoDescription
}

// Processed data for the gallery
export interface PhotoData {
  src: string
  width: number
  height: number
  alt: string
  url_s: string
  width_s: string
  height_s: string
  title: string
  count_comments: string
  count_faves: string
  ownername: string
  realname: string
  description: FlickrPhotoDescription
}

// Returned from Flickr API
export interface PageData {
  result: PhotoData[]
  nextPage: number
  totalPages: number
  lastPage: number
}

// Api call parameters
export interface FetchPicturesParams {
  pageParam: number
  query: string
}

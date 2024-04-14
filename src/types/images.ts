// Flickr API photo data
export interface PhotoData {
  src: string
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

// Flickr API photo description
export type FlickrPhotoDescription = {
  _content: string
}

// Adjusted Flickr API photo data
export interface FlickrPhoto {
  src: string
  width: number
  height: number
  title: string
  alt: string
  commentsCount: string
  favesCount: string
  ownername: string
  realname: string
  description: FlickrPhotoDescription
}

// Photo Gallery props
export interface GalleryProps {
  images: FlickrPhoto[]
}

// Returned from Flickr API
export interface FetchPicturesResponse {
  result: FlickrPhoto[]
  nextPage: number
  totalPages: number
  lastPage: number
}

// Api call parameters
export interface FetchPicturesParams {
  pageParam: number
  query: string
}

// Flickr API photo data
export interface PhotoData {
  id: string
  src: string
  url_w: string
  alt: string
  width_w: string
  height_w: string
  title: string
  count_comments: string
  count_faves: string
  owner: string
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
  id: string
  thumbSrc: string
  src: string
  width: number
  height: number
  title: string
  alt: string
  commentsCount: string
  favesCount: string
  ownername: string
  userId: string
  realname: string
  description: FlickrPhotoDescription
}

// Photo Gallery props
export interface GalleryProps {
  images: FlickrPhoto[]
}

// Flickr API response
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

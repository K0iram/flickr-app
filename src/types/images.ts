export interface PictureData {
  src: string
  width: number
  height: number
  alt: string
}

export interface GalleryProps {
  images: PictureData[]
}

export interface FetchPicturesResponse {
  result: PictureData[]
  nextPage: number
  totalPages: number
  lastPage: number
}

export type FlickrPhotoDescription = {
  _content: string
}

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

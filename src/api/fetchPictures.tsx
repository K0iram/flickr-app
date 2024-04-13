import { FetchPicturesResponse, FlickrPhotoDescription } from "@/types/images"

interface PhotoData {
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

interface PageData {
  result: PhotoData[]
  nextPage: number
  totalPages: number
  lastPage: number
}

interface FetchPicturesParams {
  pageParam: number
  query: string
}

const fetchPictures = async ({
  pageParam,
  query
}: FetchPicturesParams): Promise<FetchPicturesResponse> => {
  const { REACT_APP_FLICKR_API_KEY } = process.env
  const searchTerm = query
  if (!searchTerm) return { result: [], nextPage: 1, totalPages: 1, lastPage: 1 } as PageData

  const extras = `count_comments,count_faves,description,owner_name,path_alias,realname,url_s`

  const response = await fetch(
    `https://api.flickr.com/services/rest?method=flickr.photos.search&sort=relevance&api_key=${REACT_APP_FLICKR_API_KEY}&text=${searchTerm}&format=json&nojsoncallback=1&extras=${extras}&per_page=20&page=${pageParam}`
  )
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  const data = await response.json()

  return {
    result: data.photos.photo.map((photo: PhotoData) => ({
      src: photo.url_s,
      width: parseInt(photo.width_s, 10) || 150,
      height: parseInt(photo.height_s, 10) || 150,
      alt: photo.title,
      description: photo.description._content,
      comments_count: photo.count_comments,
      faves_count: photo.count_faves,
      ownername: photo.ownername,
      realname: photo.realname,
      title: photo.title
    })),
    nextPage: (pageParam as number) + 1,
    totalPages: data.photos.pages
  } as PageData
}

export default fetchPictures

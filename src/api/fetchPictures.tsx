import { FetchPicturesParams, FetchPicturesResponse, PageData, PhotoData } from "@/types/images"

/**
 * fetchPictures is an asynchronous function that fetches pictures from the Flickr API based on the provided search query and pagination parameters.
 *
 * @param {FetchPicturesParams} params - The parameters for fetching pictures, including the page number and search query.
 * @returns {Promise<FetchPicturesResponse>} A promise that resolves to the fetched pictures' data, including an array of photo data, next page number, total pages, and last page number.
 *
 * The function constructs a URL with the necessary query parameters for the Flickr API request, including the API key, search text, extras for additional photo information, and pagination details.
 * If the search term is not provided, it returns a default response with empty results.
 * On a successful API call, it processes the response to extract and format the necessary photo data for the application.
 * If the API call fails, it throws an error indicating a network issue.
 */

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

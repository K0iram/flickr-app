import { useEffect, useRef } from "react"
import { useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

import fetchPictures from "./api/fetchPictures"
import Gallery from "./components/ImageGallery"
import Navbar from "./components/Navbar"
import SvgSpinner from "./components/SvgSpinner"
import { FetchPicturesResponse } from "./types/images"

/**
 * This component is the main entry point of the application. It handles the search functionality,
 * fetching of pictures using an infinite query, and rendering the main UI components such as the Navbar,
 * Gallery, and a loading spinner.
 *
 * State:
 * - loadMoreRef: A reference to the div element used for triggering the fetch of the next page of pictures.
 * - searchParams, setSearchParams: State for managing URL search parameters.
 * - searchQuery: The current search query derived from the URL search parameters.
 *
 * Functions:
 * - handleKeyPress: Handles the 'Enter' key press in the search input to initiate a search.
 * - handleClear: Clears the search input and search parameters when the input is cleared.
 *
 * Hooks:
 * - useInfiniteQuery: Fetches pictures in an infinite scrolling manner based on the search query.
 * - useEffect: Sets up an IntersectionObserver to trigger the fetch of the next page when the user scrolls to the bottom.
 *
 * The component renders:
 * - Navbar: The top navigation bar with a search input.
 * - Gallery: A grid of images fetched based on the search query.
 * - SvgSpinner: A loading spinner shown while fetching the next page of images.
 */

const App = (): JSX.Element => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get("search")

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const form = e.currentTarget.form
      if (form) {
        const search = form["search"].value
        setSearchParams({ search: encodeURIComponent(search) })
      }
    }
  }

  const handleClear = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "") {
      setSearchParams({}) // Clear the search params
    }
  }

  type PaginatedFetchPicturesResponse = {
    pages: FetchPicturesResponse[]
    pageParams: { page: number; perPage: number }[]
    nextPage?: number
    totalPages: number
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    refetch
  }: UseInfiniteQueryResult<PaginatedFetchPicturesResponse, unknown> = useInfiniteQuery({
    queryKey: ["fetchPictures", { searchQuery }],
    queryFn: async ({ pageParam = 1 }) => {
      if (!searchQuery) {
        return { pages: [], pageParams: [], totalPages: 0, nextPage: undefined }
      }
      return await fetchPictures({ pageParam, query: searchQuery })
    },
    getNextPageParam: lastPage =>
      lastPage.nextPage && lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,
    initialPageParam: 1
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      },
      { rootMargin: "100px", threshold: 0.1 }
    )
    if (loadMoreRef.current) observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage])

  useEffect(() => {
    refetch()
  }, [searchQuery, refetch])

  const images =
    data?.pages.flatMap(page => page.result || []).filter(photo => photo && photo.src) || []

  return (
    <>
      <Navbar handleClear={handleClear} handleKeyPress={handleKeyPress} />
      {isFetching && !isFetchingNextPage && (
        <div className="flex justify-center items-center space-x-4">
          <SvgSpinner />
          <p className="text-gray-900 mr-4 text-xl">Loading...</p>
        </div>
      )}
      {images.length > 0 ?
        <Gallery images={images} />
      : !isFetching && searchQuery ?
        <p className="text-center text-gray-500 text-xl">
          No images found. Try a different search!
        </p>
      : !isFetching && !searchQuery ?
        <p className="text-center text-gray-500 text-xl">Enter a search term to find images.</p>
      : null}
      <div ref={loadMoreRef} style={{ height: "20px", visibility: "hidden" }} />
      {isFetchingNextPage && (
        <div className="flex justify-center items-center space-x-4">
          <SvgSpinner />
          <p className="text-gray-900 mr-4 text-xl">Loading More...</p>
        </div>
      )}
    </>
  )
}

export default App

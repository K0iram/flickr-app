import { useEffect, useRef } from "react"
import { useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

import fetchPictures from "./api/fetchPictures"
import Gallery from "./components/ImageGallery"
import Navbar from "./components/Navbar"
import SvgSpinner from "./components/SvgSpinner"
import { FetchPicturesResponse } from "./types/images"

function App(): JSX.Element {
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

      {images.length > 0 ?
        <Gallery images={images} />
      : <p className="text-center text-gray-900 text-xl font-bold">
          Search for images using the search bar above
        </p>
      }

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

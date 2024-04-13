import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"

import flickrLogo from "../images/flickrLogo.png"

const Navbar = ({
  handleClear,
  handleKeyPress
}: {
  handleClear: (e: React.FormEvent<HTMLInputElement>) => void
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
}) => {
  return (
    <>
      <div className="min-h-full">
        <div className="bg-grey-600 pb-6">
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-grey-400 lg:border-opacity-25">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <img className="block h-4" src={flickrLogo} alt="Flickr" />
                  <h1 className="text-black text-2xl font-bold">Flickr Search</h1>
                </div>
              </div>
              <form>
                <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                  <div className="w-full max-w-lg lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative text-gray-400 focus-within:text-gray-600">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <input
                        id="search"
                        className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Search"
                        type="search"
                        name="search"
                        onKeyDown={handleKeyPress}
                        onInput={handleClear}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar

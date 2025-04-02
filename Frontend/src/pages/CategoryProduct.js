import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { FaFilter, FaSort, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa"
import productCategory from "../helpers/productCategory"
import SummaryApi from "../common"
import SearchResults from "../components/SearchResults"

const CategoryProduct = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Get categories from URL
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListinArray = urlSearch.getAll("category")
  const urlCategoryListObject = {}

  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true
  })

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])
  const [sortBy, setSortBy] = useState("")

  // Mobile filter state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [categoryExpanded, setCategoryExpanded] = useState(true)
  const [sortExpanded, setSortExpanded] = useState(true)

  // Fetch data with error handling
  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          category: filterCategoryList,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }

      const dataResponse = await response.json()

      // Apply sorting if needed
      let sortedData = dataResponse?.data || []
      if (sortBy === "asc") {
        sortedData = [...sortedData].sort((a, b) => a.Price - b.Price)
      } else if (sortBy === "dsc") {
        sortedData = [...sortedData].sort((a, b) => b.Price - a.Price)
      }

      setData(sortedData)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Handle category selection
  const handleSelectCategory = (e) => {
    const { value, checked } = e.target
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }))
  }

  // Handle sorting
  const handleOnChangeSortBy = (e) => {
    const { value } = e.target
    setSortBy(value)

    // Re-fetch data with new sorting
    fetchData()
  }

  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen)
  }

  // Update filters and URL
  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter((categoryKeyName) => selectCategory[categoryKeyName])

    setFilterCategoryList(arrayOfCategory)

    if (arrayOfCategory.length > 0) {
      const urlParams = arrayOfCategory.map((el) => `category=${encodeURIComponent(el)}`).join("&")
      navigate(`/product-category?${urlParams}`, { replace: true })
    } else {
      navigate("/product-category", { replace: true })
    }
  }, [selectCategory, navigate])

  // Fetch data when filters change
  useEffect(() => {
    fetchData()
  }, [filterCategoryList, sortBy])

  // Filter component for both mobile and desktop
  const FiltersComponent = () => (
    <>
      {/* Sort By */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-2"
          onClick={() => setSortExpanded(!sortExpanded)}
        >
          <h3 className="text-base font-semibold text-gray-800">Sort by</h3>
          {sortExpanded ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
        </div>

        {sortExpanded && (
          <div className="pl-2 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="sort-asc"
                name="sortBy"
                checked={sortBy === "asc"}
                onChange={handleOnChangeSortBy}
                value="asc"
                className="text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="sort-asc" className="text-gray-700">
                Price - Low to High
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="sort-dsc"
                name="sortBy"
                checked={sortBy === "dsc"}
                onChange={handleOnChangeSortBy}
                value="dsc"
                className="text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="sort-dsc" className="text-gray-700">
                Price - High to Low
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Filter By Category */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer mb-2"
          onClick={() => setCategoryExpanded(!categoryExpanded)}
        >
          <h3 className="text-base font-semibold text-gray-800">Categories</h3>
          {categoryExpanded ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
        </div>

        {categoryExpanded && (
          <div className="pl-2 space-y-2 text-sm">
            {productCategory.map((categoryName) => (
              <div key={categoryName.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`category-${categoryName.value}`}
                  name="category"
                  checked={!!selectCategory[categoryName.value]}
                  value={categoryName.value}
                  onChange={handleSelectCategory}
                  className="text-blue-600 focus:ring-blue-500 rounded"
                />
                <label htmlFor={`category-${categoryName.value}`} className="text-gray-700">
                  {categoryName.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Error: {error}</p>
          <p>Please try again later or contact support if the problem persists.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Product Catalog</h1>

      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={toggleMobileFilters}
          className="flex items-center justify-center w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-sm"
        >
          <FaFilter className="mr-2" />
          {mobileFiltersOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Active Filters Display */}
      {filterCategoryList.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {filterCategoryList.map((category) => {
            const categoryLabel = productCategory.find((c) => c.value === category)?.label || category
            return (
              <div
                key={category}
                className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
              >
                {categoryLabel}
                <button
                  onClick={() => setSelectCategory((prev) => ({ ...prev, [category]: false }))}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <FaTimes className="h-3 w-3" />
                </button>
              </div>
            )
          })}
          <button onClick={() => setSelectCategory({})} className="text-sm text-blue-600 hover:text-blue-800 underline">
            Clear all
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filters (Slide Down) */}
        {mobileFiltersOpen && (
          <div className="lg:hidden bg-white rounded-lg shadow-md p-4 mb-4 transition-all duration-300">
            <FiltersComponent />
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <FiltersComponent />
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-700">
                {loading ? "Searching products..." : `${data.length} products found`}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <FaSort className="mr-2" />
                <span>Sorted by: </span>
                <select
                  value={sortBy}
                  onChange={handleOnChangeSortBy}
                  className="ml-2 border-none bg-transparent text-blue-600 font-medium focus:outline-none focus:ring-0"
                >
                  <option value="">Relevance</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="dsc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : data.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try changing your filters or search for something else.</p>
              <button
                onClick={() => setSelectCategory({})}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <SearchResults data={data} loading={loading} />
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct


import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import z from 'zod'

const productSearchSchema = z.object({
  category: z.enum(["all", "running", "casual"]).default("all").catch("all"),
  brand: z
    .enum(["all", "Nike", "Adidas", "Converse", "Reebook", "Vans"])
    .default("all").catch("all"),
  sortBy: z.enum(["name", "price-asc", "price-desc"]).default("name").catch("name"),
  // catch used when user type invalid number from url to call back the default
  page: z.number().int().positive().default(1).catch(1)
})

type ProductSearch = z.infer<typeof productSearchSchema>
export const Route = createFileRoute('/shop')({
  component: RouteComponent,
  validateSearch: productSearchSchema
})
const ALL_PRODUCTS = [
  // Nike
  {
    id: 1,
    name: "Nike Air Zoom",
    brand: "Nike",
    category: "running",
    price: 120,
  },
  {
    id: 2,
    name: "Nike Pegasus",
    brand: "Nike",
    category: "running",
    price: 150,
  },
  {
    id: 3,
    name: "Nike Court Vision",
    brand: "Nike",
    category: "casual",
    price: 95,
  },
  {
    id: 4,
    name: "Nike Air Force 1",
    brand: "Nike",
    category: "casual",
    price: 140,
  },

  // Adidas
  {
    id: 5,
    name: "Adidas Ultraboost",
    brand: "Adidas",
    category: "running",
    price: 180,
  },
  {
    id: 6,
    name: "Adidas Adizero",
    brand: "Adidas",
    category: "running",
    price: 170,
  },
  {
    id: 7,
    name: "Adidas Stan Smith",
    brand: "Adidas",
    category: "casual",
    price: 110,
  },
  {
    id: 8,
    name: "Adidas Superstar",
    brand: "Adidas",
    category: "casual",
    price: 100,
  },

  // Converse
  {
    id: 9,
    name: "Converse Run Star",
    brand: "Converse",
    category: "running",
    price: 130,
  },
  {
    id: 10,
    name: "Converse Speed",
    brand: "Converse",
    category: "running",
    price: 125,
  },
  {
    id: 11,
    name: "Converse Chuck 70",
    brand: "Converse",
    category: "casual",
    price: 90,
  },
  {
    id: 12,
    name: "Converse All Star",
    brand: "Converse",
    category: "casual",
    price: 80,
  },

  // Reebook
  {
    id: 13,
    name: "Reebook Floatride",
    brand: "Reebook",
    category: "running",
    price: 160,
  },
  {
    id: 14,
    name: "Reebook Nano",
    brand: "Reebook",
    category: "running",
    price: 145,
  },
  {
    id: 15,
    name: "Reebook Classic",
    brand: "Reebook",
    category: "casual",
    price: 85,
  },
  {
    id: 16,
    name: "Reebook Club C",
    brand: "Reebook",
    category: "casual",
    price: 92,
  },

  // Vans
  {
    id: 17,
    name: "Vans UltraRun",
    brand: "Vans",
    category: "running",
    price: 115,
  },
  {
    id: 18,
    name: "Vans Speed Runner",
    brand: "Vans",
    category: "running",
    price: 105,
  },
  {
    id: 19,
    name: "Vans Old Skool",
    brand: "Vans",
    category: "casual",
    price: 75,
  },
  {
    id: 20,
    name: "Vans Authentic",
    brand: "Vans",
    category: "casual",
    price: 70,
  },

  // Extra products
  {
    id: 21,
    name: "Nike Revolution",
    brand: "Nike",
    category: "running",
    price: 98,
  },
  {
    id: 22,
    name: "Adidas Lite Racer",
    brand: "Adidas",
    category: "running",
    price: 88,
  },
  {
    id: 23,
    name: "Converse Street",
    brand: "Converse",
    category: "casual",
    price: 78,
  },
  {
    id: 24,
    name: "Vans Era",
    brand: "Vans",
    category: "casual",
    price: 82,
  },
]
function RouteComponent() {
  const defaultSearch: ProductSearch = {
    category: 'all', // 
    brand: 'all',
    sortBy: 'name',
    page: 1
  }
  // filter using search params
  const { category, brand, sortBy, page } = useSearch({ from: '/shop' })
  const navigate = useNavigate({ from: '/shop' });
  // filter using state
  // const [search, setSearch] = useState<ProductSearch>(defaultSearch)
  const [showFilters, _] = useState<boolean>(true)

  const filteredProducts = ALL_PRODUCTS.filter(
    (p) => category === "all" || p.category === category
  ).filter((p) => brand === "all" || p.brand === brand)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      return a.name.localeCompare(b.name)
    })

  // pagination
  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIdx = (page - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(
    startIdx,
    startIdx + itemsPerPage
  )
  // Update search params (update the actual URL)
  const updateSearch = (update: Partial<ProductSearch>) => {
    // using state
    // setSearch((prev) => ({ ...prev, ...update, page: 1 }))
    // using searchParams tanstack
    navigate({ search: (prev) => ({ ...prev, ...update, page: 1 }) })
  }


  const updatePage = (newPage: number) => {
    // setSearch((prev) => ({ ...prev, page: newPage }))
    navigate({ search: (prev) => ({ ...prev, page: newPage }) })
  }

  const clearFilters = () => {
    // setSearch(defaultSearch)
    navigate({ search: defaultSearch })
  }
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 py-4'>
      {showFilters && (
        <div className='lg:col-span-1'>
          <div className='bg-white rounded-lg shadow p-6 space-y-6'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  updateSearch({ category: e.target.value as unknown as any })
                }}
                className='w-full px-3 py-2 border rounded-lg focus:outline-none '
              >
                <option value={"all"}>All categories</option>
                <option value={"running"}>Running</option>
                <option value={"casual"}>Casual</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Brand
              </label>
              <select
                value={brand}
                onChange={(e) => {
                  updateSearch({ brand: e.target.value as unknown as any })
                }}
                className='w-full px-3 py-2 border rounded-lg focus:outline-none '
              >
                <option value={"all"}>All Brands</option>
                <option value={"Nike"}>Nike</option>
                <option value={"Adidas"}>Adidas</option>
                <option value={"Converse"}>Converse</option>
                <option value={"Reebook"}>Reebook</option>
                <option value={"Vans"}>Vans</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  updateSearch({ sortBy: e.target.value as unknown as any })
                }}
                className='w-full px-3 py-2 border rounded-lg focus:outline-none '
              >
                <option value={"name"}>Name</option>
                <option value={"price-asc"}>Price: Low to High</option>
                <option value={"price-desc"}>Price: High to Low</option>
              </select>
            </div>
            <button
              onClick={clearFilters}
              className='w-full px-4 py-2 text-sm text-gray-700 bg-gray rounded-xl border '
            >
              clear Filters
            </button>
          </div>
        </div>
      )}

      <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
        <div className='mb-4 text-sm text-gray-600'>
          Showing {paginatedProducts.length} of {filteredProducts.length} {" "} products
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              className='bg-white rounded-lg shadow p-4 hover:shadow-lg transition'
            >
              <div className='h-32 bg-gray-200 rounded mb-3 flex items-center justify-center'>
                <span className='text-gray-400 text-sm'>Product Image</span>
              </div>
              <h3 className='font-semibold text-gray-900 mb-1'>
                {product.name}
              </h3>
              <p className='text-sm text-gray-600 mb-2'>{product.brand}</p>
              <div className='flex items-center justify-between'>
                <span className='text-lg font-bold text-gray-900'>
                  {product.price}
                </span>
                <span className='text-xs px-2 bg-gray-100 rounded'>
                  {product.category}
                </span>
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className='flex items-center justify-center gap-2'>
            <button
              onClick={() => { updatePage(page - 1) }}
              disabled={page === 1}
              className='px-4 py-2 border rounded-lg disabled:opacity-50 '
            >
              Previous
            </button>
            <button
              onClick={() => { updatePage(page + 1) }}
              disabled={page === totalPages}
              className='px-4 py-2 border rounded-lg disabled:opacity-50 '
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

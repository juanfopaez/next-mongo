import { ProductTableOptions, Table } from '@/app/components'
import { ProductTableCols, baseUrl } from '@/app/constants'
import Link from 'next/link'

interface ProductsProps {
    params: {
      id: string
    }
  }

const fetchProductsData = async (id: String) => {
  try {
    const data = await fetch(`${baseUrl}/api/users/${id}/products`, { cache: 'no-store' })
    return (data.json())
  } catch (err) {
    console.error(err)
  }
}

export default async function Products ({ params }:ProductsProps) {
  const { id } = params

  const { products }: { products: Array<any> } = await fetchProductsData(id)

  return (
    <div>
      {products
        ? (
          <div className='bg-gray-200'>
            <div className='container mx-auto p-4'>
              <h1 className='text-3xl font-bold text-blue-600 mb-4 text-center'>Product App</h1>
              <Table columns={ProductTableCols}>
                {products?.map((product, index) => (
                  <tr key={index}>
                    <td className='py-2 px-4 text-center'>{product.name}</td>
                    <td className='py-2 px-4 text-center'>{product.category}</td>
                    <td className='py-2 px-4 text-center'>{product.model}</td>
                    <td className='py-2 px-4 text-center'>{product.serial}</td>
                    <td className='py-2 px-4 text-center'>{product.brand}</td>
                    <td className='py-2 px-4 flex justify-center'>
                      <ProductTableOptions userId={id} productId={product._id.toString()} />
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          </div>
          )
        : null}
      <div className='flex justify-end bg-gray-200'>
        <Link href='/' prefetch={false}>
          <button className='bg-yellow-600 text-white py-1 px-2 rounded-md mr-4 mb-4' type='button'>Go Back</button>
        </Link>
        <Link href={`/users/${id}/products/add`} prefetch={false}>
          <button className='bg-green-600 text-white py-1 px-2 rounded-md mr-4 mb-4' type='button'>Create Product</button>
        </Link>
      </div>
    </div>
  )
}

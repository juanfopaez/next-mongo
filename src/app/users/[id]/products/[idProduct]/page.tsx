import { ProductForm } from '@/app/components'
import { baseUrl } from '@/app/constants'

interface EditProductProps {
  params: {
    id: string
    idProduct: string
  }
}

const fetchProductData = async (userId: string, productId: string) => {
  try {
    const product = await fetch(`${baseUrl}/api/users/${userId}/products/${productId}`, { cache: 'no-cache' })
    return product.json()
  } catch (err) {
    console.error(err)
  }
}

export default async function EditProduct ({ params }: EditProductProps) {
  const { id, idProduct } = params

  const { product } = await fetchProductData(id, idProduct)

  const defaultValues = product
    ? {
        name: product.name,
        category: product.category,
        model: product.model,
        serial: product.serial,
        brand: product.brand
      }
    : {}

  return (
    <div className='bg-gray-200'>
      <ProductForm defaultValues={defaultValues} userId={id} productId={idProduct} />
    </div>
  )
}

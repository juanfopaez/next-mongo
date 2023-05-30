import { ProductForm } from '@/app/components'

export default async function ProductCreation ({ params }: {params: {id: string}}) {
  const { id } = params
  return (
    <div className='bg-gray-200'>
      <ProductForm userId={id} />
    </div>
  )
}

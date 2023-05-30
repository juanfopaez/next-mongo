'use client'

import { useRouter } from 'next/navigation'

interface ProductTableOptionsProps {
  userId: string
  productId: string
}

async function deleteProduct (userId:string, productId: string, refresh: () => void) {
  try {
    await fetch(`/api/users/${userId}/products/${productId}`, {
      method: 'DELETE'
    })
    refresh()
  } catch (err) {
    console.error(err)
  }
}

export function ProductTableOptions ({ userId, productId }:ProductTableOptionsProps) {
  const router = useRouter()

  const handleOnEdit = () => {
    router.push(`/users/${userId}/products/${productId}`)
  }

  const handleOnDelete = async () => {
    deleteProduct(userId, productId, router.refresh)
  }

  return (
    <div>
      <button className='bg-blue-600 text-white py-1 px-2 rounded-md mr-2' onClick={() => handleOnEdit()}>Edit</button>
      <button className='bg-red-600 text-white py-1 px-2 rounded-md' onClick={() => handleOnDelete()}>Delete</button>
    </div>
  )
}

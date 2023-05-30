'use client'

import { useRouter } from 'next/navigation'

interface UserTableOptionsProps {
  userId: string
}

async function deleteUser (userId: string, refresh: () => void) {
  try {
    await fetch(`/api/users/${userId}`, {
      method: 'DELETE'
    })
    refresh()
  } catch (err) {
    console.error(err)
  }
}

export function UserTableOptions ({ userId }:UserTableOptionsProps) {
  const router = useRouter()

  const handleOnAddProduct = () => {
    router.push(`/products/${userId}`)
  }

  const handleOnEdit = () => {
    router.push(`/user/${userId}`)
  }

  const handleOnDelete = async () => {
    deleteUser(userId, router.refresh)
  }

  return (
    <div>
      <button className='bg-yellow-600 text-white py-1 px-2 rounded-md mr-2' onClick={() => handleOnAddProduct()}>Add Product</button>
      <button className='bg-blue-600 text-white py-1 px-2 rounded-md mr-2' onClick={() => handleOnEdit()}>Edit</button>
      <button className='bg-red-600 text-white py-1 px-2 rounded-md' onClick={() => handleOnDelete()}>Delete</button>
    </div>
  )
}

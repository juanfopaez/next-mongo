'use client'

import { useRouter } from 'next/navigation'

interface UserTableOptionsProps {
  userId: string
}

export function UserTableOptions ({ userId }:UserTableOptionsProps) {
  const router = useRouter()

  const handleOnEdit = () => {
    router.push(`/user/${userId}`)
  }

  return (
    <div>
      <button className='bg-yellow-600 text-white py-1 px-2 rounded-md mr-2' onClick={() => handleOnEdit()}>Add Product</button>
      <button className='bg-blue-600 text-white py-1 px-2 rounded-md mr-2' onClick={() => handleOnEdit()}>Edit</button>
      <button className='bg-red-600 text-white py-1 px-2 rounded-md' onClick={() => handleOnEdit()}>Delete</button>
    </div>
  )
}

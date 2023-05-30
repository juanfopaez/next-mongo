'use client'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'
import { baseUrl } from '../constants'

interface Product {
    name: string;
    category: string;
    model: string;
    serial: string;
    brand: string;
}

interface ProductFormProps {
    defaultValues?: Partial<Product>;
    productId?: string;
}

const putProductData = async (id: string, data: Product) => {
  try {
    const productUpdated = await fetch(`${baseUrl}/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...data })
    })
    return productUpdated.json()
  } catch (err) {
    console.error(err)
  }
}

const postProductData = async (data: Product) => {
  try {
    const newProduct = await fetch(`${baseUrl}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...data })
    })
    return newProduct.json()
  } catch (err) {
    console.error(err)
  }
}

export function ProductForm ({ defaultValues, productId }: ProductFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<Product>({ defaultValues })

  const router = useRouter()

  const handleOnCancel = () => {
    router.push('/')
  }

  const handleOnSubmit:SubmitHandler<Product> = async (data) => {
    if (productId) {
      try {
        const productUpdated = await putProductData(productId, data)
        if (productUpdated) {
          router.refresh()
          router.push('/')
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        const newProduct = await postProductData(data)
        if (newProduct) {
          router.refresh()
          router.push('/')
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className='min-w-md mx-auto bg-gray-100 p-6 rounded-lg'>
      <h1 className='text-3xl font-bold text-blue-600 mb-4'>{defaultValues ? 'Edit' : 'Create'} Product Form</h1>
      <div className='mb-4 w-96'>
        <label htmlFor='name' className='block mb-1'>Name</label>
        <div className='flex flex-col'>
          <input {...register('name', { required: true })} type='text' id='name' className='border rounded px-2 py-1 w-full' />
          {errors.name && <span className='text-red-500 ml-2'>Name is required</span>}
        </div>
      </div>

      <div className='mb-4 w-96'>
        <label htmlFor='category' className='block mb-1'>Category</label>
        <div className='flex flex-col'>
          <input {...register('category', { required: true })} type='text' id='category' className='border rounded px-2 py-1 w-full' />
          {errors.category && <span className='text-red-500 ml-2'>Category is required</span>}
        </div>
      </div>

      <div className='mb-4 w-96'>
        <label htmlFor='model' className='block mb-1'>Model</label>
        <div className='flex flex-col'>
          <input {...register('model', { required: true })} type='text' id='model' className='border rounded px-2 py-1 w-full' />
          {errors.model && <span className='text-red-500 ml-2'>Mode is required</span>}
        </div>
      </div>

      <div className='mb-4 w-96'>
        <label htmlFor='serial' className='block mb-1'>Serial</label>
        <div className='flex flex-col'>
          <input {...register('serial', { required: true })} type='text' id='serial' className='border rounded px-2 py-1 w-full' />
          {errors.serial && <span className='text-red-500 ml-2'>Serial is required</span>}
        </div>
      </div>

      <div className='mb-4 w-96'>
        <label htmlFor='brand' className='block mb-1'>Brand</label>
        <div className='flex flex-col'>
          <input {...register('brand', { required: true })} type='text' id='brand' className='border rounded px-2 py-1 w-full' />
          {errors.brand && <span className='text-red-500 ml-2'>Brand is required</span>}
        </div>
      </div>

      <div className='flex justify-between'>
        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>Submit</button>
        <button onClick={handleOnCancel} type='button' className='bg-red-500 text-white px-4 py-2 rounded'>Cancel</button>
      </div>
    </form>
  )
}

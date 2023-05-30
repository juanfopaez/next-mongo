'use client'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'
import { baseUrl } from '../constants'

interface User {
    name: string;
    lastName: string;
    email: string;
    address?: string;
    position?: string;
    salary: number;
}

interface UserFormProps {
    defaultValues?: Partial<User>;
    userId?: string;
}

const putUserData = async (id: string, data: User) => {
  try {
    const userUpdated = await fetch(`${baseUrl}/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...data })
    })
    return userUpdated.json()
  } catch (err) {
    console.error(err)
  }
}

const postUserData = async (data: User) => {
  try {
    const newUser = await fetch(`${baseUrl}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...data })
    })
    return newUser.json()
  } catch (err) {
    console.error(err)
  }
}

export function UserForm ({ defaultValues, userId }: UserFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<User>({ defaultValues })

  const router = useRouter()

  const handleOnCancel = () => {
    router.push('/')
  }

  const handleOnSubmit:SubmitHandler<User> = async (data) => {
    if (userId) {
      try {
        const userUpdated = await putUserData(userId, data)
        if (userUpdated) {
          router.refresh()
          router.push('/')
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        const newUser = await postUserData(data)
        if (newUser) {
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
      <h1 className='text-3xl font-bold text-blue-600 mb-4'>{defaultValues ? 'Edit' : 'Create'} User Form</h1>
      <div className='mb-4 w-96'>
        <label htmlFor='name' className='block mb-1'>Name</label>
        <div className='flex flex-col'>
          <input {...register('name', { required: true })} type='text' id='name' className='border rounded px-2 py-1 w-full' />
          {errors.name && <span className='text-red-500 ml-2'>Name is required</span>}
        </div>
      </div>

      <div className='mb-4 w-96'>
        <label htmlFor='lastName' className='block mb-1'>Surname</label>
        <div className='flex flex-col'>
          <input {...register('lastName', { required: true })} type='text' id='lastName' className='border rounded px-2 py-1 w-full' />
          {errors.lastName && <span className='text-red-500 ml-2'>Surname is required</span>}
        </div>
      </div>

      <div className='mb-4 w-96'>
        <label htmlFor='email' className='block mb-1'>Email</label>
        <div className='flex flex-col'>
          <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} type='email' id='email' className='border rounded px-2 py-1 w-full' />
          {errors.email && <span className='text-red-500 ml-2'>Valid email is required</span>}
        </div>
      </div>

      <div className='mb-4 w-96'>
        <label htmlFor='address' className='block mb-1'>Address</label>
        <textarea {...register('address')} id='address' className='border rounded px-2 py-1 w-full' rows={3} />
      </div>

      <div className='mb-4 w-96'>
        <label htmlFor='position' className='block mb-1'>Position</label>
        <input {...register('position')} type='text' id='position' className='border rounded px-2 py-1 w-full' />
      </div>

      <div className='mb-4 w-96'>
        <label htmlFor='salary' className='block mb-1'>Salary</label>
        <div className='flex flex-col'>
          <input {...register('salary', { required: true, pattern: /^[1-9]\d*$/ })} type='number' id='salary' className='border rounded px-2 py-1 w-full' />
          {errors.salary && <span className='text-red-500 ml-2'>Salary must be a positive number</span>}
        </div>
      </div>

      <div className='flex justify-between'>
        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>Submit</button>
        <button onClick={handleOnCancel} type='button' className='bg-red-500 text-white px-4 py-2 rounded'>Cancel</button>
      </div>
    </form>
  )
}

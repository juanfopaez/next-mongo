import { UserForm } from '@/app/components'
import { baseUrl } from '@/app/constants'

interface UserEditProps {
  params: {
    id: string
  }
}

const fetchUserData = async (id: string) => {
  try {
    const user = await fetch(`${baseUrl}/api/users/${id}`, { cache: 'no-cache' })
    return user.json()
  } catch (err) {
    console.error(err)
  }
}

export default async function UserEdit ({ params }: UserEditProps) {
  const { id } = params

  const { user } = await fetchUserData(id)

  const defaultValues = user
    ? {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        position: user.position,
        salary: user.salary,
        address: user.address
      }
    : {}

  return (
    <div className='bg-gray-200'>
      <UserForm defaultValues={defaultValues} userId={id} />
    </div>
  )
}

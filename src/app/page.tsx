import Link from 'next/link'
import { Table, UserTableOptions } from './components'

import { UserTableCols, baseUrl } from './constants'

const fetchUsersData = async () => {
  try {
    const data = await fetch(`${baseUrl}/api/users`, { cache: 'no-cache' })
    return (data.json())
  } catch (err) {
    console.error(err)
  }
}

export default async function Home () {
  const { users }: { users: Array<any> } = await fetchUsersData() || []
  return (
    <div>
      {users
        ? (
          <div className='bg-gray-200'>
            <div className='container mx-auto p-4'>
              <h1 className='text-3xl font-bold text-blue-600 mb-4 text-center'>User App</h1>
              <Table columns={UserTableCols}>
                {users?.map((user, index) => (
                  <tr key={index}>
                    <td className='py-2 px-4 text-center'>{user.name}</td>
                    <td className='py-2 px-4 text-center'>{user.lastName}</td>
                    <td className='py-2 px-4 text-center'>{user.email}</td>
                    <td className='py-2 px-4 text-center'>{user.email}</td>
                    <td className='py-2 px-4 text-center'>{user.position}</td>
                    <td className='py-2 px-4 text-center'>${user.salary}</td>
                    <td className='py-2 px-4 flex justify-center'>
                      <UserTableOptions userId={user._id.toString()} />
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          </div>
          )
        : null}
      <div className='flex justify-end bg-gray-200'>
        <Link href='/user' prefetch={false}>
          <button className='bg-green-600 text-white py-1 px-2 rounded-md mr-4 mb-4' type='button'>Create User</button>
        </Link>
      </div>
    </div>
  )
}

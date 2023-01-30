import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Spinner } from '../components'

export const Home = () => {
  const [users, setUsers] = useState([])

  const payload = JSON.parse(localStorage.getItem('payload'))

  // Fetch Users
  const fetchUsers = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`)
    return res.data
  }

    // Fetch Albums
    const fetchAlbums = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/albums`)
      return res.data
    }

  useEffect(() => {
    const getUsers = async () => {
      const usersFromServer = await fetchUsers()
      const albumsFromServer = await fetchAlbums()

      // Map total albums to each respective user
      const usersData = usersFromServer.map((user) => {
        let albums = albumsFromServer.filter((album) => album.userId === user.id)
        return {...user, albums: albums.length}
      })
      setUsers(usersData)
    }
    getUsers()
  }, [])

  return (
    <>
      <section className='mx-8'>
      <h4 className='font-bold text-2xl text-black'>Welcome {payload.name ?? ""}</h4>

        <div className="flex items-center justify-between my-6">
          <h4 data-testid="title" className='font-semibold text-2xl text-black'>Users</h4>
        <h4 className='font-semibold text-xl text-green-600'>{payload.email ?? ""}</h4>


        </div>
        <div className="overflow-hidden overflow-x-auto border border-gray-100 rounded">
          {
            users.length === 0 ? <Spinner /> :
              <table className="min-w-full text-sm divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="sticky left-0 px-4 py-2 text-left bg-gray-50">

                    </th>
                    <th className="px-4 py-2 font-medium text-left text-gray-900">
                      Name
                    </th>
                    <th className="px-4 py-2 font-medium text-left text-gray-900">
                      Email
                    </th>
                    <th className="px-4 py-2 font-medium text-left text-gray-900">
                      Street
                    </th>
                    <th className="px-4 py-2 font-medium text-left text-gray-900">
                      Phone
                    </th>
                    <th className="px-4 py-2 font-medium text-left text-gray-900">
                      Website
                    </th>
                    <th className="px-4 py-2 font-medium text-left text-gray-900">
                      Albums
                    </th>
                    <th className="px-4 py-2 font-medium text-left text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users &&
                    users.map((user, index) => (
                      <tr key={index} data-testid="user">
                        <td className="px-4 py-2 font-medium text-gray-900">
                          {user.id}
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900">
                          {user?.name}
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900">
                          {user?.email}
                        </td>
                        <td className="px-4 py-2 text-gray-700">
                          {user?.address.street}
                        </td>
                        <td className="px-4 py-2 text-gray-700">
                          {user?.phone}
                        </td>
                        <td className="px-4 py-2 text-gray-700">
                          {user?.website}
                        </td>
                        <td className="px-4 py-2 text-gray-700 text-center">
                        {user?.albums}
                        </td>
                        <td className="px-4 py-2 text-gray-700">
                          <Link
                            className="my-6 text-xs"
                            to={`/user/${user.id}`}
                          >
                            <button className="bg-green-700 p-2 font-bold text-white border rounded hover:bg-black">
                              View
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
          }
        </div>
      </section>
    </>
  )
}
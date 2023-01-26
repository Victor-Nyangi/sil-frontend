import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Spinner } from '../components'

export const User = () => {
  const [user, setUser] = useState({})
  const [albums, setAlbums] = useState([])
  const params = useParams();
  const user_id = params.user_id;

  // Fetch User
  const fetchUser = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${id}`)
    return res.data
  }

  const getAlbums = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${id}/albums?_start=0&_limit=5`)
    return res.data
  }

  useEffect(() => {
    const getUsers = async () => {
      const userData = await fetchUser(user_id)
      const userAlbums = await getAlbums(user_id)

      setUser(userData)
      setAlbums(userAlbums)
    }

    getUsers()
  }, [user_id])

  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between mx-4 my-5">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {user?.name}
          </h2>
          <div className="mt-1 ml-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 text-indigo-700 font-medium">
            <div className="mt-2 flex items-center text-sm">
              <span className='mr-2 font-normal text-gray-400'>Username:</span>{user?.username}
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className='mr-2 font-normal text-gray-400'>Email:</span>{user?.email}
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className='mr-2 font-normal text-gray-400'>Address:</span>
              {`${user.address?.street} ${user.address?.suite} ${user.address?.city} ${user.address?.zipcode}`}
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className='mr-2 font-normal text-gray-400'>Phone:</span>
              {user?.phone}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-indigo-700"><span className='mr-2 font-normal text-gray-400'>Website:</span>{user?.website}</h3>
          <p className="mt-1 max-w-3xl text-sm text-indigo-700"><span className='mr-2 font-normal text-gray-400'>Company:</span>{`${user.company?.name}, ${user.company?.catchPhrase} ${user.company?.bs} ${user.address?.zipcode}`}</p>
        </div>
      </div>

      <section className='mx-20'>

        <div className="flex items-center justify-between my-6">
          <h4 className='font-semibold text-2xl text-black'>Albums</h4>

        </div>
        <div className="overflow-hidden overflow-x-auto border border-gray-100 rounded">
          {
            albums.length === 0 ? <Spinner /> :
              <table className="min-w-full text-sm divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="sticky left-0 px-4 py-2 text-left bg-gray-50">
                      Id
                    </th>
                    <th className="px-4 py-2 font-medium text-left text-gray-900">
                      Title
                    </th>
                    <th className="px-4 py-2 font-medium text-left text-gray-900">
                      Count
                    </th>

                    <th className="px-4 py-2 font-medium text-left text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {albums &&
                    albums.map((album, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 font-medium text-gray-900">
                          {album.id}
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900">
                          {album?.title}
                        </td>
                        <td className="px-4 py-2 text-gray-700">
                          10
                        </td>

                        <td className="px-4 py-2 text-gray-700">

                          <Link
                            className="my-6 text-xs"
                            to={`/album/${user.id}`}
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
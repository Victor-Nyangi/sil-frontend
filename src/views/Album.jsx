import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Spinner } from '../components'

export const Album = () => {
  const [photos, setPhotos] = useState([])
  const [album, setAlbum] = useState({})
  const params = useParams();
  const album_id = params.album_id;

  useEffect(() => {
    const getPhotos = async () => {
      const photosFromServer = await fetchPhotos(album_id)
      const albumData = await fetchAlbum(album_id)
      setPhotos(photosFromServer)
      setAlbum(albumData)
    }
    getPhotos()
  }, [album_id])

  // Fetch Album
  const fetchAlbum = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/albums/${id}`)
    return res.data
  }
  // Fetch Photos
  const fetchPhotos = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/albums/${id}/photos?_start=0&_limit=7`)
    return res.data
  }

  return (
    <>
      <section className='mx-8'>

        <div className="flex items-center justify-between my-6">
          <h4 className='font-semibold text-2xl text-black'>Album {album?.title}</h4>

        </div>
        <div className="overflow-hidden overflow-x-auto border border-gray-100 rounded">
          {
            photos.length === 0 ? <Spinner /> :
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
                      Url
                    </th>
                    <th className="px-4 py-2 font-medium text-left text-gray-900">
                      Thumbnail
                    </th>
                    <th className="px-4 py-2 font-medium text-left text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {photos &&
                    photos.map((photo, index) => (
                      <tr key={index} data-testid='photo'>
                        <td className="px-4 py-2 font-medium text-gray-900">
                          {photo.id}
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900">
                          {photo?.title}
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900">
                          {photo?.url}
                        </td>
                        <td className="px-4 py-2 text-gray-700">
                          {photo?.thumbnailUrl}
                        </td>
                        <td className="px-4 py-2 text-gray-700">
                          <Link
                            className="my-6 text-xs"
                            to={`/photo/${photo.id}`}
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
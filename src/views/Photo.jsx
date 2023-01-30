import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Alert } from '../components'
import { Spinner } from '../components'

export const Photo = () => {

  const [photo, setPhoto] = useState({})
  const [status, setStatus] = useState('')
  const [new_title, setTitle] = useState('')
  const params = useParams();
  const photo_id = params.photo_id;

  useEffect(() => {
    const getPhoto = async () => {
      const photoData = await fetchPhoto(photo_id)
      setPhoto(photoData)
      setTitle(photoData.title)
    }
    getPhoto()
    return () => {setStatus('')}
  }, [photo_id])

  // Fetch Album
  const fetchPhoto = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/photos/${id}`)
    return res.data
  }

  const updateTitle = async (e) => {
    e.preventDefault();
    const res = await axios.patch(`${process.env.REACT_APP_BASE_URL}/photos/${photo_id}`, {
      title: new_title
    })
    if (res.data) setStatus('success')
    setPhoto(res.data)
  }

  return (
    <>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        {
          photo === null ? <Spinner /> :
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
                <div className="max-w-xl mb-6">
                  <p className="text-base text-gray-700 md:text-lg">
                    Title: <span data-testid="phototitle" className='font-semibold'>{photo?.title}
                    </span>
                  </p>
                </div>
                {status !== '' ? <Alert status={status} message='Title successfully updated' /> : <></>}
                <form action="post" className='mb-6'
                  onSubmit={updateTitle}
                >
                  <div className="flex space-x-4">
                    <input
                    data-testid="search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="text"
                      id="title"
                      placeholder="Title"
                      name="title"
                      required
                      value={new_title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <button className='px-2 py-2 bg-blue-600 text-white rounded block'>Update</button>
                  </div>
                </form>
                <div>
                </div>
              </div>
              <div className="flex items-center justify-center -mx-4 lg:pl-8">
                <div className="">
                  <img
                    className="w-80 h-80 mb-6 rounded shadow-lg"
                    src={photo?.url}
                    alt={photo?.title}
                  />
                </div>
              </div>
            </div>
        }
      </div>
    </>
  )
}
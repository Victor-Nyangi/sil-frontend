import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'

export const Header = () => {
    const payload =  JSON.parse(localStorage.getItem('payload'))
    const navigate = useNavigate()

        // Logout user
        const logout = () => {
            localStorage.removeItem('payload')
            navigate("/");
          }

    return (
        <>
            <header>
                <nav className="px-4 lg:px-6 py-2.5 my-6">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <Link to="/" className="flex items-center">
                            <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Tech Jobs" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap">PicSavannah</span>
                        </Link>
                        {
                            payload?.token ?
                        <div className='flex space-x-4 items-center'>

                        <Link to="/dashboard" className="block text-lg font-medium text-center text-green-700 hover:text-green-900 font-bold">
                            Dashboard
                        </Link>
                        <button onClick={logout} className="text-lg font-medium text-center text-white bg-black rounded p-2 hover:bg-gray-600 font-bold">
                            Logout
                        </button>
                        </div> : <></>
                        }
                    </div>
                </nav>
            </header>
        </>
    )
}
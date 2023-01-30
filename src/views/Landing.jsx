import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import login from "../assets/login.jpg"
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios'

export const Landing = () => {
    const payload = JSON.parse(localStorage.getItem('payload'))
    const navigate = useNavigate()

    const saveToken = async (credentialResponse) => {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/verify`,
            {
                client_id: credentialResponse.clientId,
                jwtToken: credentialResponse.credential
            })

        if (response.data) {
            localStorage.setItem('payload', JSON.stringify(response.data))
            navigate("/dashboard");
        }

        return response.data
    }

    return (
        <>
            <div className="relative flex items-top justify-center min-h-screen bg-white dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <section className="bg-white dark:bg-gray-900">
                        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                            <div className="mr-auto place-self-center lg:col-span-7">
                                <h1 className="max-w-2xl mb-4 text-3xl font-bold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white" data-testid="title">Savannah and a picture Galore</h1>
                                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">A simple portal that enlists some users, their albums and photos. With Google authentication, a simple and intuititve design and REST api calls.</p>
                                {payload?.token ? (

                                    <Link to='/dashboard' className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-green-900 hover:text-gray-300 focus:ring-4 focus:ring-green-300 ">
                                        Dashboard
                                        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                    </Link>)
                                    : (
                                        <>
                                            <GoogleLogin
                                                theme="filled_blue"
                                                shape="circle"
                                                data-testid="loginbutton"
                                                onSuccess={credentialResponse => {
                                                    saveToken(credentialResponse)
                                                }}

                                                onError={() => {
                                                    console.log('Login Failed');
                                                }}

                                            />
                                        </>)}
                            </div>
                            <div className="hidden lg:my-10 lg:col-span-5 lg:flex  justify-end">
                                <img src={login} alt="mockup" className='rounded-2xl h-5/6 w-5/6' />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
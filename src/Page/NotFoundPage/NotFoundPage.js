import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
    let navigate = useNavigate();
    
    return (
        <div id='notFoundPage' className='w-screen h-screen text-center bg-pink-100'>
            <img className='lg:w-1/3 mx-auto' src='./image/notfoundImg2.svg' alt='404' />
            <h1 className='font-bold text-pink-600 text-5xl'>PAGE NOT FOUND</h1>
            <p className='w-1/2 mx-auto md:w-full my-5 text-xl uppercase font-bold'> The page you requested could not be found</p>
            <button className='btnGlobal mr-5 font-bold' onClick={() => { navigate('/') }}>GO HOME</button>
            <button className='btnGlobalOutline font-bold' onClick={() => { navigate('/') }}>GET SUPPORT</button>
        </div>
    )
}

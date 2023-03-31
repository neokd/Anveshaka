import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    JSON.stringify({
        time: new Date(),
    })
    // const token = sessionStorage.getItem("token")
    sessionStorage.clear()
    const handleClick = () => {
        sessionStorage.clear()
        const data = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
        fetch('/api/token', data).then(
            res => res.json()
        ).then((data) => {
            sessionStorage.setItem("token", data.access_token)
            console.log(data.access_token)
            navigate('/admin')
        }).catch((e) => {
            console.log(e)
        })
    }
    return (
        <>
            <div className='flex items-center justify-center h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black scroll-smooth'>
                <div className=' shadow-card rounded-xl bg-clip-border text-white h-auto border border-1 border-gray-600 my-4 bg-gray-800 backdrop-blur-xl hover:transform transition duration-500 hover:shadow-2xl lg:hover:shadow-white/50 font-normal p-8'>
                    <h1 className='text-4xl font-semibold text-center py-4'>Admin Anveshaka🤖</h1>
                    <div className='flex flex-col text-black justify-center'>
                        <input className='my-4 py-2 rounded-2xl px-2' type="text" placeholder='test@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className='my-4 py-2 rounded-2xl px-2 ' type="password" placeholder='*********' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className='text-white rounded-2xl bg-white/40 mx-32 font-bold my-4 px-4 py-2' onClick={handleClick}>Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login

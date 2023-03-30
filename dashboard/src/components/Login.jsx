import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const token = sessionStorage.getItem("token")
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
        fetch('http://127.0.0.1:5000/token', data).then(
            res => res.json()
        ).then((data) => {
            sessionStorage.setItem("token", data.access_token)
        }).catch((e) => {
            console.log(e)
        })
    }
    return (
        <>
            {(token && token != "" && token != undefined) ? <Navigate replace to='/'/>:
                <div>
                    <h1>Login In</h1>
                    <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleClick}>Login</button>
                </div>
            }
        </>
    )
}

export default Login

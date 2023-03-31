import React from 'react'
import { Link } from 'react-router-dom'
import Typewriter from 'typewriter-effect'

function Error404() {
    return (
        <div className="flex items-center justify-center h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black scroll-smooth">
            <div className="text-white text-center">
                <h1 className="text-12 font-bold mb-6">404</h1>
                <p className="text-3xl mb-8">
                    {
                        <Typewriter
                            options={{
                                autoStart: true,
                                loop: true,
                            }}
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString("Hang On 🤖")
                                    .pauseFor(1000)
                                    .deleteAll()
                                    .typeString(`Oops! Looks like you took a wrong turn. Let's get you back on track!`)
                                    .deleteAll()
                                    .typeString(`It seems like you've stumbled upon uncharted territory. But don't worry, we're here to guide you!`)
                                    .start();
                            }}
                        />
                    }
                </p>
                <Link to="/">
                    <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 backdrop-filter backdrop-blur-lg">
                        Go Home
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Error404

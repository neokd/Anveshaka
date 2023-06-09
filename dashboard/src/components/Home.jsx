import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../fonts/SamarkanOblique-BXew.ttf';
import '../App.css'

function Home() {
    const url = '/api/data'
    const cachedData = localStorage.getItem('cachedData');
    // GET FROM SERVER
    const [data, setData] = useState({})
    useEffect(() => {
        fetch(url).then((res) => {
            res.json().then((data) => {
                setData(data)
            })
        })
    }, [])

    // POST TO SERVER
    const [searchKey, setSearchKey] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.clear()
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                header: searchKey
            }),
            headers: {
                'Accept': 'application/json',
            },
        }).then(response => response.json())
        setSearchKey('')
        navigate('/success')

    };

    return (
        <>
            <div className="flex h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black scroll-smooth">
                <div className="m-auto">
                    <h1 className='text-slate-200 text-8xl font-bold font-face-sk'>{data.title}</h1>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3 mt-2">
                        <form onSubmit={handleSubmit}>
                            <input type="text" id="searchKey" autoComplete='off' name="searchKey" value={searchKey} placeholder="Search on Anveshaka" onChange={(e) => setSearchKey(e.target.value)} className="px-3 py-3 text-md placeholder-slate-600 relative bg-gray-200 text-black rounded-2xl border-0 outline-none focus:outline-none focus:ring w-128 pr-10 shadow-2xl focus:shadow-purple-800" />
                            <span className="z-10 h-full leading-snug  font-normal absolute text-center text-gray-700 bg-transparent rounded text-base items-center justify-center  right-0 p-2 pr-2">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </button>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
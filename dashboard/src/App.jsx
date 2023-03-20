import { useEffect, useState } from 'react'
import './fonts/SamarkanOblique-BXew.ttf';
import './App.css'
function App() {
  const url = 'http://127.0.0.1:5000/data'

  const [data, setData] = useState({})
  useEffect(() => {
    fetch(url).then((res) => {
      res.json().then((data) => {
        setData(data)
      })
    })
  }, [])

  const [sendData, setSendData] = useState({
    search: ""
  })

  const handle = (e) => {

    const newData = { ...sendData };
    newData[e.target.id] = e.target.value;
    setSendData(newData)
    // console.log(newData.search)
    submit(newData.search)
  }

  const submit = (e) => {
    // e.preventDefault()
    // console.log(e)
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        header:e
      }),
      headers: {
        'Accept': 'application/json',
      },
    }).then(response => response.json())
  }

  return (
    <>
      <div className="flex h-screen bg-gray-900">
        <div className="m-auto">
          <h1 className='text-white text-8xl font-bold font-face-sk '>{data.head}</h1>
          <div className="relative flex w-full flex-wrap items-stretch mb-3 mt-2">
            <form onSubmit={(e) => submit(e)}>
              <input onChange={(e) => handle(e)} id="search" value={sendData.search} name="search" type="text" placeholder="Search on Anveshaka" className="px-3 py-3 text-md placeholder-slate-300 text-slate-600 relative bg-white rounded-2xl  border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10" />
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

export default App

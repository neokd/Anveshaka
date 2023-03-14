import { useEffect, useState } from 'react'
import './fonts/SamarkanOblique-BXew.ttf';
import './App.css'
function App() {

  const [data, setData] = useState({})
  useEffect(() => {
    fetch('http://127.0.0.1:5000/data').then((res) => {
      res.json().then((data) => {
        setData(data)
      })
    })
  }, [])

  return (
    <div className="h-screen bg-gray-900 flex justify-center items-center">
      <div className='flex-row'>
        <h1 className='text-white text-7xl font-bold font-face-sk '>Anveshaka</h1>
        <h3 className='text-white text-center text-3xl'>{data.head}</h3>
      </div>
    </div>
  )
}

export default App

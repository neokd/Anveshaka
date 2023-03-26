import React, { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'
import Typewriter from 'typewriter-effect'

function Results() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [head, setHead] = useState({})
  const [expandedSummary, setExpandedSummary] = useState(null)
  const [selectedItem,setSelectedItem] = useState(null)

  useEffect(() => {
    fetch('/api/success')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => console.log(error))
  }, []);

  useEffect(() => {
    fetch('/api/head')
      .then(response => response.json())
      .then(head => {
        setHead(head);
      }, [])
      .catch(error => console.log(error))
  }, []);

  const handleCardHover = (index) => {
    setTimeout(() => {
      setExpandedSummary(index);
    }, 2000);
  }

  const handleCardLeave = () => {
    setExpandedSummary(null);
  }

  return (
    <>
      {loading ? (
        <div className="fixed backdrop-blur-xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center">
          <HashLoader color="#7b38eb" size={75} />
          <div className='text-white py-5 text-3xl font-semibold'>
            {<Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("Hang On 🤖")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString(`Anveshaka is fetching the data...`)
                  .start();
              }}
            />
            }
          </div>
        </div>
      ) : (
        <div className='bg-gradient-to-tl from-gray-700 via-gray-900 to-black h-full pb-16'>
          <div className='container mx-auto lg:mx-24 pt-16'>
            <h1 className='text-white mx-4 text-3xl lg:px-0 lg:text-4xl mb-8'><span className='font-semibold '>Anveshaka</span> has fetched the results for <span className='font-bold '>{head.heading}</span>!</h1>
            {
              data.map((item, index) => (
                <div key={item.key}>
                  {item.title != "" && item.description != "" && item.summary != "" ?
                    <div className="shadow-card flex flex-col rounded-xl bg-clip-border text-white lg:w-180 border border-1 border-gray-600 my-4 bg-gray-800 backdrop-blur-xl hover:transform lg:hover:scale-10 transition duration-500 hover:shadow-2xl lg:hover:shadow-white/50 font-normal hover:font-bold lg:mx-0 mx-4">
                      <div className="p-6">
                        <a href={item.url} target="_blank">
                          <h3 className='py-2 text-2xl font-semibold'>{item.title}</h3>
                        </a>
                        <div className={`mb-3 my-2 text-md font-normal ${expandedSummary === index ? ' line-clamp-none transition-all duration-500 ease-out' : 'lg:line-clamp-2 line-clamp-1'}`} onMouseEnter={() => handleCardHover(index)} onMouseLeave={handleCardLeave}>
                          {item.summary}
                        </div>
                        <div className="flex flex-row flex-wrap py-2 ">
                          {item.keywords.map(keyword => (
                            <span key={keyword} className="text-xs mr-2 mb-2 px-2 py-1 rounded-full font-normal bg-gray-700">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    : null}
                </div>
              ))
            }
          </div>
        </div>
      )}
    </>
  )
}

export default Results

import React, { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'
import Typewriter from 'typewriter-effect'
import { Link } from 'react-router-dom';

function Results() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [head, setHead] = useState({})
  const [generate, setGenerate] = useState({})
  const [expandedSummary, setExpandedSummary] = useState(null)
 
  useEffect(() => {
    const cachedData = localStorage.getItem('cachedData');
    const generatedData = localStorage.getItem('generatedData')
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setLoading(false);
    } else {
      fetch('/api/success')
        .then(response => response.json())
        .then(data => {
          setData(data);
          localStorage.setItem('cachedData', JSON.stringify(data));
          setLoading(false);
        })
        .catch(error => console.log(error))
    }
  }, []);


  useEffect(() => {
    fetch('/api/head')
      .then(response => response.json())
      .then(head => {
        setHead(head);
      }, [])
      .catch(error => console.log(error))
  }, []);

  useEffect(() => {
    fetch('/api/generate')
      .then(response => response.json())
      .then(generate => {
        setGenerate(generate);
        localStorage.setItem('generatedData', JSON.stringify(generate));
        // setLoading(false)
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
  data.map((item) => (
    item.sentiment[1]
  ))

  return (
    <>
      {loading ? (
        <div className="fixed backdrop-blur-xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center">
          <HashLoader color="#7b38eb" size={75} />
          <div className='text-white py-5 text-3xl font-semibold'>
            {<Typewriter
              options={{
                autoStart: true,
                loop: true,
              }}
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
        <div className='bg-gradient-to-tl from-gray-700 via-gray-900 to-black h-full min-h-screen pb-16'>
          <div className='container mx-auto lg:mx-24 overflow-x-hidden'>

            {generate.generated !== "" ? (
              <div className='flex flex-cols gap-6 h-auto pt-16' >
                <div className='flex-row'>
                  <h1 className='text-white mx-4 text-3xl lg:px-0 lg:text-4xl mb-8'><span className='font-semibold '>Anveshaka</span>🤖</h1>
                  <div className="shadow-card flex flex-col rounded-xl bg-clip-border text-white  lg:w-180 border border-1 border-gray-600 my-4 bg-gray-800 backdrop-blur-xl hover:transform lg:hover:scale-10 transition duration-500 hover:shadow-2xl lg:hover:shadow-white/50 font-normal lg:mx-0 mx-4 p-6">
                    <h2 className='flex flex-row text-lg'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#7b38eb" viewBox="0 0 24 24" strokeWidth={"1.5"} stroke="currentColor" className="w-6 h-6 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                      </svg>
                      {
                        <span className='text-xl'>
                          <Typewriter
                            onInit={(typewriter) => {
                              typewriter
                                .typeString(generate.generated)
                                .pauseFor(2000)
                                .start()
                            }}
                          />
                        </span>
                      }
                    </h2>
                  </div>
                </div>

                <div className="shadow-card  rounded-xl bg-clip-border text-white h-auto border border-1 border-gray-600 my-4 bg-gray-800 backdrop-blur-xl hover:transform transition duration-500 hover:shadow-2xl lg:hover:shadow-white/50 font-normal  lg:mx-0 mx-4 p-4 mt-18 collapse lg:visible w-72 ">
                  <span className='font-semibold text-xl'>Search Analysis</span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat molestias non impedit perspiciatis architecto perferendis? Fugit porro placeat harum, quaerat illo voluptatibus eveniet unde enim vitae ullam quisquam nemo corporis! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia rerum neque placeat commodi dolores qui eaque provident sapiente recusandae magni voluptas adipisci in, eius, dolor quam vero voluptatibus nemo illum!
                </div>

              </div>
            ) : null}
            <div className=''>
              <h1 className='text-white mx-4 text-3xl lg:px-0 lg:text-4xl mb-8 mt-8'>Results for <span className='font-bold '>{head.heading}</span>!</h1>
              {
                data.map((item, index) => (
                  <div key={item.key}>
                    {item.title != "" && item.description != "" && item.summary != "" ?

                      <div className="shadow-card flex flex-col rounded-xl bg-clip-border text-white lg:w-180 border border-1 border-gray-600 my-4 bg-gray-800 backdrop-blur-xl hover:transform lg:hover:scale-10 transition duration-500 hover:shadow-2xl lg:hover:shadow-white/50 font-normal hover:font-bold lg:mx-0 mx-4">
                        <Link to={`/article/${item.key}`} state={{ from: data }}>
                          <div className="p-6">
                            <h3 className='py-2 text-2xl font-semibold'>{item.title}</h3>
                            <div className="flex flex-row flex-wrap py-2  ">
                              <span className="text-xs mr-2 mb-2 px-2 py-1 rounded-full font-normal bg-green-500">
                                {item.sentiment[0]}
                              </span>
                            </div>
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
                        </Link>
                      </div>
                      : null}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )
      }
    </>
  )
}

export default Results

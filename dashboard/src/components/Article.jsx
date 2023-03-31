import React from 'react'
import { useParams, useLocation } from 'react-router-dom'

function Article() {
  const { id } = useParams();
  const location = useLocation()
  const { from } = location.state
  const article = from.find((item) => item.key === id);
  const paragraph = article.description.replace(/(\r\n|\r|\n)/g, '<br/>')

  return (
    <>
      <div className='bg-gradient-to-tl from-gray-700 via-gray-900 to-black min-h-screen scroll-smooth pb-16'>
        <div className='containerlg:mx-auto lg:mx-24  pt-16'>
          <div className='mx-4'>
            <h1 className="text-white text-4xl font-bold lg:mr-32 ">{article.title}</h1>
            <div className="flex flex-row flex-wrap my-12 text-white lg:mr-32">
              <span className='text-2xl font-bold mr-4 '>Topics :</span> {article.keywords.map(keyword => (
                <span key={keyword} className="text-md mr-2 mb-2 px-2 py-1 rounded-full font-normal bg-gray-700">
                  {keyword}
                </span>
              ))}
            </div>
            <div>
              <p className='text-white/90 lg:mr-32 text-lg pb-24 first-letter:text-3xl leading-relaxed' dangerouslySetInnerHTML={{ __html: paragraph }}>
              </p>
              <p className='text-white/90 mr-32 text-lg pb-12'>Refer Original Article: <a className='underline' href={article.url} target="_blank">
                Link </a></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Article

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

function Admin() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const [data, setData] = useState([]);
    ChartJS.register(ArcElement, Tooltip, Legend);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [navigate, token]);

    useEffect(() => {
        fetch('/api/admindb')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
    }, []);

    if (!token) {
        return null;
    }

    const chartdata = {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [
            {
                label: 'Organic Result',
                data: [57, 40, 3],
                backgroundColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const searchdata = {
        labels: ['Narendra Modi', 'Man Killed', 'AI'],
        datasets: [
            {
                label: 'Total Searches',
                data: [24, 40, 64],
                backgroundColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='bg-gradient-to-tl from-gray-700 via-gray-900 to-black min-h-screen pb-16 scroll-smooth'>
            <div className='container mx-auto lg:mx-24 overflow-x-hidden pt-16'>
                <div className="text-white text-4xl font-semibold mx-4">Admin Dashboard 🤖</div>
                <hr className='my-6 lg:mr-32' />
                <nav className="flex justify-start mb-12">
                    <div className="text-sm font-medium text-center text-white/80">
                        <ul className="flex flex-wrap">
                            <li className="mr-2 text-2xl">
                                <a href="/" className="inline-block p-4 hover:text-white">Home</a>
                            </li>
                            <li className="mr-2 text-2xl">
                                <a href="#analysis" className="inline-block p-4 hover:text-white">Analysis</a>
                            </li>
                            <li className="mr-2 text-2xl">
                                <a href="#history" className="inline-block p-4 hover:text-white">History</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className='text-white'>
                    <div className='my-8 mx-auto' id='analysis'>
                        <h1 id="history" className='text-3xl pb-6 font-semibold'>Search Analysis</h1>
                        <div className="flex flex-row lg:mr-36 mx-4 gap-8">
                            <div className="shadow-card rounded-xl bg-clip-border text-white h-auto border border-1 border-gray-600 my-4 bg-gray-800 backdrop-blur-xl hover:transform transition duration-500 hover:shadow-2xl lg:hover:shadow-white/50 font-normal p-4  w-1/2">
                                <div className='w-128'>
                                    <span className="font-semibold text-lg">Sentiment Analysis</span>
                                    <Doughnut className='my-4 flex justify-center ml-24' data={chartdata} />
                                </div>
                            </div>
                            <div className="shadow-card rounded-xl bg-clip-border text-white h-auto border border-1 border-gray-600 my-4 bg-gray-800 backdrop-blur-xl hover:transform transition duration-500 hover:shadow-2xl lg:hover:shadow-white/50 font-normal p-4  collapse xl:visible w-1/2">
                                <div className='w-128'>
                                    <span className="font-semibold text-lg">Number of Topics Searched</span>
                                    <Doughnut className='my-4 flex justify-center ml-24' data={searchdata} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <h1 id="history" className='text-3xl pb-6 font-semibold'>Search History</h1>
                    <div className="relative  shadow-md rounded-2xl sm:rounded-lg lg:mr-36">
                        <table className="w-full mx-auto justify-center text-left text-gray-400">
                            <thead className=" uppercase  bg-gray-700 text-gray-400 text-lg">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        News title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sentiment
                                    </th>
                                    <th scope="col" className="px-0 py-3">
                                        Search Key
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Time
                                    </th>
                                </tr>
                            </thead>
                            {
                                data.database && data.database.length > 0 ? (
                                    data.database.map((item) => (
                                        item.title != "" ? (
                                            <tbody>
                                                <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 text-md">
                                                    <th scope="row" className="px-6 py-4 font-medium line-clamp-1 max-w-md whitespace-nowrap text-white">
                                                        {item.title.length > 50 ? item.title.slice(0, 50) + "..." : item.title}
                                                    </th>
                                                    <td className="px-8 py-4">
                                                        {item.sentiment[0]}
                                                    </td>
                                                    <td className="px-0 py-4">
                                                        {item.searchKey}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {item.datetime}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ) : null
                                    ))
                                ) : (
                                    <div className='text-white text-2xl py-4'>No data available</div>
                                )
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;

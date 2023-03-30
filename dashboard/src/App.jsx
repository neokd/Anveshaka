import React from 'react'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Results from './components/Results'
import Article from './components/Article'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Results/>} />
          <Route path="/article/:id" element={<Article/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

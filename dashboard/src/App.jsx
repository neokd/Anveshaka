import React from 'react'
import Home from './components/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Results from './components/Results'
import Article from './components/Article'
import Admin from './components/Admin'
import Error404 from './components/Error404'

function App() {
  const token = sessionStorage.getItem("token")
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/success" element={<Results />} />
          <Route exact path="/article/:id" element={<Article />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/error" element={<Error404 />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

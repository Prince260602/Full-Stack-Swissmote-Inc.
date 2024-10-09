import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AnimeList from './pages/AnimeList.jsx'
import AnimeDetail from './pages/AnimeDetail.jsx'


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<AnimeList />} />
      <Route path='/anime/:id' element={<AnimeDetail />} />
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App






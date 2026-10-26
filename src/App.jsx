import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Approutes from './Components/Routes/Approutes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Approutes />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}
export default App

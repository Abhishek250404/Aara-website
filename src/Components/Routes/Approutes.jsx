import React from 'react'
import Home from '../Homepage/Home'
import { Route, Routes } from 'react-router-dom'
import About from '../Aboutpage/About'
import Services from '../Servicespage/Services'
import Gallery from '../Gallerypage/Gallery'
import Contact from '../Contactpage/Contact'
import Footer from '../Footer/Footer'

function Approutes() {
    return (
        <>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/service" element={<Services />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />

            </Routes>
            <Footer />
        </>
    )
}

export default Approutes
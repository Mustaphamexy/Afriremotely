import React from 'react'
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer'

const About = () => {
  return (
    <div>
        <Header />
        <div className='bg-black py-32  flex  text-center justify-center'>
            <h1 className='text-5xl text-white text-center'>About Page</h1>
        </div>
        <Footer />
    </div>
  )
}

export default About
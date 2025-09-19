import React from 'react'
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button"


const NotFound = () => {

    const navigate = useNavigate();
  return (
    <div className='min-h-screen'>
        <Header />
        <div className='pt-32 pb-12 bg-black'>
            <div className=' justify-center items-center text-center px-4'>
                <h1 className='text-9xl font-extrabold mb-4 text-primary-500 '>404</h1>
                <p className='mb-4 text-3xl font-bold text-white'>Oops! The page you’re looking for doesn’t exist.</p>
                <p className='text-xl  italic text-secondary-500 mb-4'>Maybe you followed a broken link or mistyped the URL.</p>
                <Button variant="primary" size="md" className="cursor-pointer" onClick={() => {navigate(-1); window.scrollTo({ top: 0, behavior: "smooth" });}} >
                    Go Back
        </Button>
       </div>
        </div>
        <Footer />

    </div>
  )
}

export default NotFound
import React from 'react'
import Hero from "../sections/Hero"
import Jobsection from '../sections/Jobsection'
import CategorySection from '../sections/CategorySection'
import Footer from '../components/layout/Footer'
import InfoSection from '../sections/InfoSection'
import TestimonialSection from '../sections/TestimonialSection'

const LandingPage = () => {
  return (
    <div>
        <Hero />
        <Jobsection />
        <CategorySection />
        <InfoSection />
        <TestimonialSection />
        <Footer />

    </div>
  )
}

export default LandingPage
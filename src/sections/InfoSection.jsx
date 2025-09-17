import React from 'react'
import Button from '../components/UI/Button'
import { officeImage, infoImage} from '../components/UI/Details'



const InfoSection = () => {
    const stats = [
    {
      id: 1,
      number: "12k+",
      title: "Clients worldwide",
      description: "We've successfully connected thousands of professionals with leading companies across the globe, building lasting career relationships."
    },
    {
      id: 2,
      number: "20k+",
      title: "Active resume",
      description: "Our platform hosts thousands of active, high-quality resumes from talented professionals ready for their next career opportunity."
    },
    {
      id: 3,
      number: "18k+",
      title: "Companies",
      description: "From startups to Fortune 500 companies, we partner with diverse organizations seeking exceptional talent."
    }
  ];

  return (
    <div className='py-16 bg-neutral-50'> 
        <div className='container mx-auto px-4'>
            <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
                <div className='w-full max-w-2xl'>
                    <img src={officeImage} alt=""  className='rounded-md'/>
                </div>
                <div classname="">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"> Good Life Begins <br />With A Good Company</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl ">
                        Finding the right career opportunity is more than just landing a job – it's about 
                        discovering a workplace culture that values your growth, supports your ambitions, 
                        and empowers you to make a meaningful impact. We connect talented professionals 
                        with companies that understand this fundamental truth.
                    </p>
                    <div className='flex flex-row gap-4'>
                        <Button variant="primary" size="md">
                            Search Job
                        </Button>
                        <Button variant="outline" size="md">
                            Learn more
                        </Button>
                    </div>
                </div>

            </div>

            <div className='grid md:grid-cols-3 gap-8 mt-8'>
                {stats.map((stat) => (
                    <div key={stat.id} className='text-center'>
                        <div className='mb-4'>
                            <h3 className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">
                                {stat.number}
                            </h3>
                            <h4 className="text-xl font-semibold text-neutral-900">
                                {stat.title}
                            </h4>
                        </div>
                        <p className="text-neutral-600">
                            {stat.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className='mt-12'>
            <div className='relative bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-3xl p-8 md:p-12 overflow-hidden'>
                {/* Background Image */}
                <div className='absolute inset-0 opacity-50'>
                  <img src={infoImage} alt="" className='w-full h-full object-cover object- rounded-3xl'/>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center">
                    <div className="text-center lg:text-left mb-8 lg:mb-0 lg:mr-8">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                            Create A Better Future For Yourself
                        </h2>
                        <p className="text-gray-300 text-lg max-w-2xl">
                            Take the first step towards your dream career. Join thousands of professionals 
                            who have found their perfect job match through our platform.
                        </p>
                        <Button variant="primary" size="sm" className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 mt-16 mb-8 rounded-lg font-semibold">
                      Search Job
                    </Button>
                    </div>
                </div>
            </div>
            </div>


        </div>
        
    </div>
  )
}

export default InfoSection
import React from 'react'
import { FaSeedling, FaCog, FaShoppingBag, FaHardHat, FaBed, FaGraduationCap, FaDollarSign, FaTruck } from 'react-icons/fa';

const CategorySection = () => {

    const categories = [
    {
      id: 1,
      title: "Agriculture",
      jobCount: "1254 jobs",
      icon: <FaSeedling className="w-8 h-8 text-teal-500" />,
    },
    {
      id: 2,
      title: "Metal Production",
      jobCount: "816 jobs",
      icon: <FaCog className="w-8 h-8 text-teal-500" />,
    },
    {
      id: 3,
      title: "Commerce",
      jobCount: "2082 jobs",
      icon: <FaShoppingBag className="w-8 h-8 text-teal-500" />,
    },
    {
      id: 4,
      title: "Construction",
      jobCount: "1520 jobs",
      icon: <FaHardHat className="w-8 h-8 text-teal-500" />,
      
    },
    {
      id: 5,
      title: "Hotels & Tourism",
      jobCount: "1022 jobs",
      icon: <FaBed className="w-8 h-8 text-teal-500" />,
      
    },
    {
      id: 6,
      title: "Education",
      jobCount: "1496 jobs",
      icon: <FaGraduationCap className="w-8 h-8 text-teal-500" />,
      
    },
    {
      id: 7,
      title: "Financial Services",
      jobCount: "1529 jobs",
      icon: <FaDollarSign className="w-8 h-8 text-teal-500" />,
    },
    {
      id: 8,
      title: "Transport",
      jobCount: "1244 jobs",
      icon: <FaTruck className="w-8 h-8 text-teal-500" />,
    }
  ];

  return (
    <div className='flex items-center mt-8 py-8 bg-primary-100'>
        <div className='container mx-auto py-6 text-center px-4'>
            <div className='mb-12'>
                <h2 className='text-3xl pb-4  '>Browse by Category</h2>
                <p>Search For Job By Category</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-12 md:px-0 '>
                {categories.map((category) => (
                    <div key={category.id} className="bg-white rounded-lg p-8 text-center cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md border border-neutral-300">

                        <div className='flex justify-center mb-6 rounded-full'>
                            {category.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                            {category.title}
                        </h3>
                        <p className="text-primary-500 font-medium bg-secondary-200 inline p-2 rounded-full">
                            {category.jobCount}
                        </p>


                    </div>
                ))}
                
            </div>
        </div>

    </div>
  )
}

export default CategorySection
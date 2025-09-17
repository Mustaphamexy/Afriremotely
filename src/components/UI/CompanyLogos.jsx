import React from 'react'
import { FaSpotify, FaSlack } from "react-icons/fa";
import { SiAsana, SiLinear, SiAdobe  } from "react-icons/si";

const CompanyLogos = () => {

    const companies = [
    { icon: FaSpotify, name: 'Spotify' },
    { icon: FaSlack, name: 'Slack' },
    { icon: SiAdobe , name: 'Adobe' },
    { icon: SiAsana, name: 'Asana' },
    { icon: SiLinear, name: 'Linear' }
  ];

  return (
    <div className="mt-12 mb-8 lg:mt-20">
      <div className="flex justify-between px-4 lg:px-8 ">
        {companies.map((company, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center space-x-2 text-white hover:opacity-100 transition-opacity">
            <company.icon className="text-xl lg:text-5xl" />
            <span className="text-md lg:text-4xl font-medium  ">{company.name}</span>
          </div>
        ))}

        
      </div>
    </div>
  )
}

export default CompanyLogos
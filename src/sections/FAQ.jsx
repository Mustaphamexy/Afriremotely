import React, { useState } from 'react';
import { LuCirclePlus } from "react-icons/lu";
import { ImCancelCircle } from "react-icons/im";

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "Can I upload a CV?",
      answer: "Yes, you can easily upload your CV during the registration process or anytime through your profile. We accept various formats including PDF, DOC, and DOCX. Our system will automatically parse your CV to help match you with relevant remote job opportunities across Africa and globally."
    },
    {
      question: "How long will the recruitment process take?",
      answer: "The recruitment timeline varies depending on the specific role and company requirements. Typically, our streamlined process takes 1-3 weeks from application to final decision. This includes initial screening, skills assessment, interviews with our team, and final client interviews. We'll keep you updated throughout the entire process."
    },
    {
      question: "Do you recruit for Graduates, Apprentices and Students?",
      answer: "Absolutely! We welcome applications from recent graduates, apprentices, and final-year students. We have partnerships with companies specifically looking for entry-level talent and offer internship programs. Many of our clients value fresh perspectives and are willing to provide mentorship and training for promising candidates."
    },
    {
      question: "What does the recruitment and selection process involve?",
      answer: "Our comprehensive recruitment process includes: 1) Profile review and CV screening, 2) Initial phone/video interview with our recruitment team, 3) Skills assessment and technical evaluation (if applicable), 4) Cultural fit interview, 5) Client introduction and final interviews, 6) Reference checks and offer negotiation. We ensure transparency throughout each step."
    },
    {
      question: "Can I receive notifications for any future jobs that may interest me?",
      answer: "Yes! Once you create your profile, you can set up personalized job alerts based on your skills, experience level, preferred industries, and location preferences. You'll receive notifications via email and through our platform when new opportunities matching your criteria become available. You can modify these preferences anytime in your account settings."
    }
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 text-center mb-12">
          Find answers to common questions about our platform and services
        </p>
        
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="bg-secondary-200 rounded-lg border border-primary-200 overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between "
                onClick={() => toggleItem(index)}
              >
                <div className="flex items-center">
                  <span className="text-primary-500 font-bold text-lg mr-4">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-semibold text-gray-900">{item.question}</h3>
                </div>
                <div className="flex items-center">
                  {openItems[index] ? (
                    <ImCancelCircle  size={20} className="text-gray-400" />
                  ) : (
                    <LuCirclePlus size={20} className="text-gray-400" />
                  )}
                </div>
              </button>
              
              {openItems[index] && (
                <div className="px-6 pb-4">
                  <div className="pl-8">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
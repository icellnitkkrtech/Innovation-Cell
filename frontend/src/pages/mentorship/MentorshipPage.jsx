import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MentorshipPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleFindMentor = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/mentorship/find' } });
      return;
    }
    navigate('/mentorship/find');
  };

  const handleBecomeMentor = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/mentorship/become' } });
      return;
    }
    
    if (user.role !== 'alumni') {
      alert('Only alumni can become mentors');
      return;
    }
    
    navigate('/mentorship/become');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold">Mentorship Program</h1>
          <p className="mt-4 text-xl text-amber-100 max-w-3xl mx-auto">
            Connect with experienced alumni who can guide you through your academic and professional journey
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">Find a Mentor</h2>
              <p className="text-gray-300 mb-6">
                Connect with experienced alumni who can provide guidance, share insights, and help you navigate your academic and career path.
              </p>
              <ul className="text-gray-300 mb-8 space-y-2">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Get personalized career advice
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Learn from industry professionals
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Expand your professional network
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Get feedback on your resume and portfolio
                </li>
              </ul>
              <button
                onClick={handleFindMentor}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-md"
              >
                Find a Mentor
              </button>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">Become a Mentor</h2>
              <p className="text-gray-300 mb-6">
                Share your knowledge and experience with current students. Help shape the next generation of professionals in your field.
              </p>
              <ul className="text-gray-300 mb-8 space-y-2">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Give back to your alma mater
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Develop your leadership skills
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Expand your professional network
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Make a meaningful impact on students' lives
                </li>
              </ul>
              <button
                onClick={handleBecomeMentor}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-md"
              >
                Become a Mentor
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">How Our Mentorship Program Works</h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-amber-600 flex items-center justify-center text-white text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-bold mt-4 mb-2">Connect</h3>
              <p className="text-gray-300">
                Browse our mentor directory and find someone whose experience aligns with your goals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-amber-600 flex items-center justify-center text-white text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-bold mt-4 mb-2">Request</h3>
              <p className="text-gray-300">
                Send a mentorship request explaining your goals and what you hope to learn.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-amber-600 flex items-center justify-center text-white text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-bold mt-4 mb-2">Grow</h3>
              <p className="text-gray-300">
                Meet regularly with your mentor to receive guidance, feedback, and support.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to Get Started?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleFindMentor}
              className="py-3 px-8 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-md"
            >
              Find a Mentor
            </button>
            <button
              onClick={handleBecomeMentor}
              className="py-3 px-8 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
            >
              Become a Mentor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorshipPage; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AlumniDirectory = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    graduationYear: '',
    company: '',
    skills: ''
  });

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        // This would be replaced with actual API call
        // const res = await axios.get('/api/users/alumni');
        // setAlumni(res.data);
        
        // Simulated data
        setAlumni([
          {
            id: 1,
            name: 'Rahul Sharma',
            email: 'rahul.sharma@example.com',
            graduationYear: 2018,
            company: 'Google',
            position: 'Senior Software Engineer',
            skills: ['JavaScript', 'React', 'Node.js'],
            profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg'
          },
          {
            id: 2,
            name: 'Priya Patel',
            email: 'priya.patel@example.com',
            graduationYear: 2019,
            company: 'Amazon',
            position: 'Product Manager',
            skills: ['Product Management', 'UX Design', 'Data Analysis'],
            profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg'
          },
          {
            id: 3,
            name: 'Amit Kumar',
            email: 'amit.kumar@example.com',
            graduationYear: 2020,
            company: 'Microsoft',
            position: 'Data Scientist',
            skills: ['Python', 'Machine Learning', 'Data Visualization'],
            profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg'
          },
          {
            id: 4,
            name: 'Neha Singh',
            email: 'neha.singh@example.com',
            graduationYear: 2017,
            company: 'Facebook',
            position: 'Frontend Developer',
            skills: ['HTML', 'CSS', 'JavaScript', 'React'],
            profilePicture: 'https://randomuser.me/api/portraits/women/4.jpg'
          },
          {
            id: 5,
            name: 'Vikram Reddy',
            email: 'vikram.reddy@example.com',
            graduationYear: 2016,
            company: 'Netflix',
            position: 'Backend Engineer',
            skills: ['Java', 'Spring Boot', 'Microservices'],
            profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg'
          }
        ]);
      } catch (error) {
        console.error('Error fetching alumni:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredAlumni = alumni.filter(person => {
    // Search term filter
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Graduation year filter
    const matchesYear = !filters.graduationYear || person.graduationYear.toString() === filters.graduationYear;
    
    // Company filter
    const matchesCompany = !filters.company || person.company.toLowerCase().includes(filters.company.toLowerCase());
    
    // Skills filter
    const matchesSkills = !filters.skills || person.skills.some(skill => 
      skill.toLowerCase().includes(filters.skills.toLowerCase())
    );
    
    return matchesSearch && matchesYear && matchesCompany && matchesSkills;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white">Alumni Directory</h1>
          <p className="mt-2 text-xl text-gray-300">Connect with alumni from your institution</p>
        </div>

        <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="search"
                name="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-600 focus:border-amber-500 focus:ring-amber-500 focus:text-white sm:text-sm"
                placeholder="Search by name, company, position, or skills"
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-300">Graduation Year</label>
              <select
                id="graduationYear"
                name="graduationYear"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md bg-gray-700 text-white"
                value={filters.graduationYear}
                onChange={handleFilterChange}
              >
                <option value="">All Years</option>
                {[...new Set(alumni.map(a => a.graduationYear))].sort().map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-300">Company</label>
              <input
                type="text"
                name="company"
                id="company"
                className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-600 focus:border-amber-500 focus:ring-amber-500 focus:text-white sm:text-sm"
                placeholder="Filter by company"
                value={filters.company}
                onChange={handleFilterChange}
              />
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-300">Skills</label>
              <input
                type="text"
                name="skills"
                id="skills"
                className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-600 focus:border-amber-500 focus:ring-amber-500 focus:text-white sm:text-sm"
                placeholder="Filter by skills"
                value={filters.skills}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.length > 0 ? (
            filteredAlumni.map(person => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-600 mr-4">
                      <img
                        src={person.profilePicture}
                        alt={person.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150?text=Alumni";
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{person.name}</h3>
                      <p className="text-amber-500">{person.position}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span className="text-gray-300">{person.email}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814l-4.419-2.95-4.419 2.95A1 1 0 014 16V4zm5 0a1 1 0 00-1 1v6.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V5a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300">Graduated in {person.graduationYear}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814l-4.419-2.95-4.419 2.95A1 1 0 014 16V4zm5 0a1 1 0 00-1 1v6.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V5a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300">Works at {person.company}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-400">Skills</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {person.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-amber-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                      Connect
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-white">No alumni found</h3>
              <p className="mt-1 text-gray-400">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlumniDirectory; 
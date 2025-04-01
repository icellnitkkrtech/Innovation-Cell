import React, { useState, useEffect } from 'react';
import { alumniAPI } from '../../services/api';
import { toast } from 'react-toastify';

const AlumniDirectory = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    graduationYear: '',
    industry: '',
    location: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [alumniPerPage] = useState(12);

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      setLoading(true);
      const response = await alumniAPI.getAllAlumni(filters);
      setAlumni(response.data);
    } catch (error) {
      console.error('Error fetching alumni:', error);
      toast.error('Failed to load alumni directory');
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (alumniId) => {
    try {
      await alumniAPI.connectWithAlumni(alumniId);
      toast.success('Connection request sent!');
      // Optionally update the UI to reflect the connection request
    } catch (error) {
      console.error('Error connecting with alumni:', error);
      toast.error('Failed to send connection request');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    fetchAlumni();
  };

  // Filter alumni based on search term and filter
  const filteredAlumni = alumni.filter(alumnus => {
    const matchesSearch = 
      alumnus.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      alumnus.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      (alumnus.company && alumnus.company.toLowerCase().includes(filters.search.toLowerCase())) ||
      (alumnus.position && alumnus.position.toLowerCase().includes(filters.search.toLowerCase()));
    
    if (filters.graduationYear === '') return matchesSearch;
    return matchesSearch && alumnus.graduationYear === parseInt(filters.graduationYear);
  });

  // Get current alumni for pagination
  const indexOfLastAlumnus = currentPage * alumniPerPage;
  const indexOfFirstAlumnus = indexOfLastAlumnus - alumniPerPage;
  const currentAlumni = filteredAlumni.slice(indexOfFirstAlumnus, indexOfLastAlumnus);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate graduation year options (last 20 years)
  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 20 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Alumni Directory</h1>
        
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, company..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={filters.search}
              onChange={handleFilterChange}
              name="search"
            />
          </div>
          <div className="w-full md:w-64">
            <select
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={filters.graduationYear}
              onChange={handleFilterChange}
              name="graduationYear"
            >
              <option value="">All Graduation Years</option>
              {graduationYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Alumni Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8).fill().map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 animate-pulse">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 bg-gray-700 rounded-full"></div>
                </div>
                <div className="h-4 bg-gray-700 rounded mb-3"></div>
                <div className="h-3 bg-gray-700 rounded mb-2 w-3/4 mx-auto"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {currentAlumni.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentAlumni.map(alumnus => (
                  <div key={alumnus._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <img 
                          src={alumnus.avatar || "https://via.placeholder.com/150?text=Alumni"} 
                          alt={alumnus.name} 
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-medium text-white mb-1">{alumnus.name}</h3>
                      <p className="text-amber-500 mb-2">Class of {alumnus.graduationYear}</p>
                      {alumnus.position && alumnus.company && (
                        <p className="text-gray-400 mb-3">{alumnus.position} at {alumnus.company}</p>
                      )}
                      <div className="flex justify-center space-x-3 mt-4">
                        {alumnus.linkedin && (
                          <a href={alumnus.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                            <i className="fab fa-linkedin fa-lg"></i>
                          </a>
                        )}
                        {alumnus.twitter && (
                          <a href={alumnus.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                            <i className="fab fa-twitter fa-lg"></i>
                          </a>
                        )}
                        <button className="text-gray-400 hover:text-amber-500">
                          <i className="fas fa-envelope fa-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400">No alumni found matching your search criteria.</p>
              </div>
            )}
            
            {/* Pagination */}
            {filteredAlumni.length > alumniPerPage && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center">
                  <button 
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md mr-2 bg-gray-800 text-gray-400 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.ceil(filteredAlumni.length / alumniPerPage) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`px-3 py-1 rounded-md mx-1 ${
                        currentPage === index + 1 
                          ? 'bg-amber-600 text-white' 
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredAlumni.length / alumniPerPage)}
                    className="px-3 py-1 rounded-md ml-2 bg-gray-800 text-gray-400 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AlumniDirectory; 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { alumniAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const AlumniResources = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    category: 'Career Development',
    link: '',
    file: null
  });

  useEffect(() => {
    fetchResources();
  }, [activeCategory]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const filters = activeCategory !== 'all' ? { category: activeCategory } : {};
      if (searchTerm) {
        filters.search = searchTerm;
      }
      const response = await alumniAPI.getResources(filters);
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitResource = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newResource.title);
      formData.append('description', newResource.description);
      formData.append('category', newResource.category);
      formData.append('link', newResource.link);
      
      if (newResource.file) {
        formData.append('file', newResource.file);
      }
      
      await alumniAPI.submitResource(formData);
      toast.success('Resource submitted successfully!');
      setShowResourceModal(false);
      setNewResource({
        title: '',
        description: '',
        category: 'Career Development',
        link: '',
        file: null
      });
      fetchResources(); // Refresh resources
    } catch (error) {
      console.error('Error submitting resource:', error);
      toast.error('Failed to submit resource');
    }
  };

  const handleFileChange = (e) => {
    setNewResource({
      ...newResource,
      file: e.target.files[0]
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource({
      ...newResource,
      [name]: value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchResources();
  };

  // Calculate filtered resources based on search term
  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Alumni Resources</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Resource Categories Sidebar */}
          <div className="w-full md:w-64 bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-medium mb-4 border-b border-gray-700 pb-2">Resource Categories</h2>
            {loading && !resources.length ? (
              <div className="animate-pulse space-y-2">
                {Array(5).fill().map((_, index) => (
                  <div key={index} className="h-10 bg-gray-700 rounded"></div>
                ))}
              </div>
            ) : (
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === 'all' 
                        ? 'bg-amber-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <i className={`${activeCategory === 'all' ? 'fas fa-check' : 'fas fa-circle'} mr-2`}></i>
                      <span>All</span>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveCategory('Career Development')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === 'Career Development' 
                        ? 'bg-amber-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <i className={`${activeCategory === 'Career Development' ? 'fas fa-check' : 'fas fa-circle'} mr-2`}></i>
                      <span>Career Development</span>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveCategory('Continuing Education')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === 'Continuing Education' 
                        ? 'bg-amber-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <i className={`${activeCategory === 'Continuing Education' ? 'fas fa-check' : 'fas fa-circle'} mr-2`}></i>
                      <span>Continuing Education</span>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveCategory('Entrepreneurship')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === 'Entrepreneurship' 
                        ? 'bg-amber-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <i className={`${activeCategory === 'Entrepreneurship' ? 'fas fa-check' : 'fas fa-circle'} mr-2`}></i>
                      <span>Entrepreneurship</span>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveCategory('Financial Planning')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === 'Financial Planning' 
                        ? 'bg-amber-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <i className={`${activeCategory === 'Financial Planning' ? 'fas fa-check' : 'fas fa-circle'} mr-2`}></i>
                      <span>Financial Planning</span>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveCategory('Research & Publications')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === 'Research & Publications' 
                        ? 'bg-amber-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <i className={`${activeCategory === 'Research & Publications' ? 'fas fa-check' : 'fas fa-circle'} mr-2`}></i>
                      <span>Research & Publications</span>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveCategory('Alumni Benefits')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === 'Alumni Benefits' 
                        ? 'bg-amber-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <i className={`${activeCategory === 'Alumni Benefits' ? 'fas fa-check' : 'fas fa-circle'} mr-2`}></i>
                      <span>Alumni Benefits</span>
                    </div>
                  </button>
                </li>
              </ul>
            )}
          </div>
          
          {/* Resources List */}
          <div className="flex-1">
            {loading ? (
              <div className="animate-pulse space-y-6">
                {Array(6).fill().map((_, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-6">
                    <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                    <div className="flex space-x-2">
                      <div className="h-6 w-16 bg-gray-700 rounded"></div>
                      <div className="h-6 w-16 bg-gray-700 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {filteredResources.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map(resource => (
                      <div key={resource._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col">
                        {resource.imageUrl && (
                          <div className="h-40 overflow-hidden">
                            <img 
                              src={resource.imageUrl} 
                              alt={resource.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-semibold">{resource.title}</h3>
                              <span className="bg-gray-700 text-amber-400 text-xs px-2 py-1 rounded">
                                {resource.category}
                              </span>
                            </div>
                            <p className="text-gray-400 mb-4">{resource.description}</p>
                            
                            {resource.tags && resource.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {resource.tags.map((tag, index) => (
                                  <span 
                                    key={index} 
                                    className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-gray-500 text-sm">
                              {new Date(resource.createdAt).toLocaleDateString()}
                            </span>
                            <a 
                              href={resource.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
                            >
                              View Resource
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-800 rounded-lg p-8 text-center">
                    <p className="text-gray-400">No resources found matching your search criteria.</p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setActiveCategory('all');
                      }}
                      className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Resource Categories Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Resource Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-750 transition-colors"
              onClick={() => setActiveCategory('Career Development')}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center mr-4">
                  <i className="fas fa-briefcase text-blue-300 text-xl"></i>
                </div>
                <h3 className="text-lg font-medium">Career Development</h3>
              </div>
              <p className="text-gray-400">
                Resume templates, interview tips, job search strategies, and career transition resources.
              </p>
            </div>
            
            <div 
              className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-750 transition-colors"
              onClick={() => setActiveCategory('Continuing Education')}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-900 flex items-center justify-center mr-4">
                  <i className="fas fa-graduation-cap text-green-300 text-xl"></i>
                </div>
                <h3 className="text-lg font-medium">Continuing Education</h3>
              </div>
              <p className="text-gray-400">
                Online courses, certifications, workshops, and educational opportunities for alumni.
              </p>
            </div>
            
            <div 
              className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-750 transition-colors"
              onClick={() => setActiveCategory('Entrepreneurship')}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center mr-4">
                  <i className="fas fa-lightbulb text-purple-300 text-xl"></i>
                </div>
                <h3 className="text-lg font-medium">Entrepreneurship</h3>
              </div>
              <p className="text-gray-400">
                Startup guides, funding resources, business plan templates, and networking opportunities.
              </p>
            </div>
            
            <div 
              className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-750 transition-colors"
              onClick={() => setActiveCategory('Financial Planning')}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-900 flex items-center justify-center mr-4">
                  <i className="fas fa-chart-line text-amber-300 text-xl"></i>
                </div>
                <h3 className="text-lg font-medium">Financial Planning</h3>
              </div>
              <p className="text-gray-400">
                Investment guides, retirement planning, student loan management, and financial literacy resources.
              </p>
            </div>
            
            <div 
              className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-750 transition-colors"
              onClick={() => setActiveCategory('Research & Publications')}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-red-900 flex items-center justify-center mr-4">
                  <i className="fas fa-book text-red-300 text-xl"></i>
                </div>
                <h3 className="text-lg font-medium">Research & Publications</h3>
              </div>
              <p className="text-gray-400">
                Academic journals, research papers, faculty publications, and industry reports.
              </p>
            </div>
            
            <div 
              className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-750 transition-colors"
              onClick={() => setActiveCategory('Alumni Benefits')}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-teal-900 flex items-center justify-center mr-4">
                  <i className="fas fa-gift text-teal-300 text-xl"></i>
                </div>
                <h3 className="text-lg font-medium">Alumni Benefits</h3>
              </div>
              <p className="text-gray-400">
                Exclusive discounts, campus privileges, library access, and other alumni perks.
              </p>
            </div>
          </div>
        </div>
        
        {/* Submit Resource CTA */}
        <div className="mt-12 bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Have a Resource to Share?</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            If you've found a valuable resource that could benefit other alumni, we'd love to add it to our collection.
            Submit your resource suggestion and help grow our community knowledge base.
          </p>
          <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors">
            Submit a Resource
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlumniResources; 
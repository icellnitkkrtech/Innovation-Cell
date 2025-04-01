import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { alumniAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const AlumniForums = () => {
  const { user } = useAuth();
  const [forums, setForums] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeForumId, setActiveForumId] = useState(null);
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);
  const [newTopic, setNewTopic] = useState({
    title: '',
    content: '',
    tags: []
  });
  const [newTag, setNewTag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchForums();
  }, []);

  useEffect(() => {
    if (activeForumId) {
      fetchTopics(activeForumId);
    }
  }, [activeForumId]);

  const fetchForums = async () => {
    try {
      setLoading(true);
      const response = await alumniAPI.getForums();
      setForums(response.data);
      
      // Set the first forum as active if none is selected
      if (response.data.length > 0 && !activeForumId) {
        setActiveForumId(response.data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching forums:', error);
      toast.error('Failed to load forums');
    } finally {
      setLoading(false);
    }
  };

  const fetchTopics = async (forumId) => {
    try {
      setLoading(true);
      const filters = {};
      if (searchTerm) {
        filters.search = searchTerm;
      }
      const response = await alumniAPI.getForumTopics(forumId, filters);
      setTopics(response.data);
    } catch (error) {
      console.error('Error fetching topics:', error);
      toast.error('Failed to load topics');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTopic = async (e) => {
    e.preventDefault();
    try {
      const topicData = {
        ...newTopic,
        forumId: activeForumId
      };
      
      await alumniAPI.createForumTopic(topicData);
      toast.success('Topic created successfully!');
      setShowNewTopicModal(false);
      setNewTopic({
        title: '',
        content: '',
        tags: []
      });
      fetchTopics(activeForumId); // Refresh topics
    } catch (error) {
      console.error('Error creating topic:', error);
      toast.error('Failed to create topic');
    }
  };

  const addTag = () => {
    if (newTag.trim() !== '' && !newTopic.tags.includes(newTag.trim())) {
      setNewTopic({
        ...newTopic,
        tags: [...newTopic.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setNewTopic({
      ...newTopic,
      tags: newTopic.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTopic({
      ...newTopic,
      [name]: value
    });
  };

  const handleSearch = () => {
    if (activeForumId) {
      fetchTopics(activeForumId);
    }
  };

  // Filter topics based on search term
  const filteredTopics = topics.filter(topic => {
    return (
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (topic.tags && topic.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  });

  // Get active forum
  const activeForum = forums.find(forum => forum._id === activeForumId);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Alumni Forums</h1>
          {activeForumId && (
            <button 
              onClick={() => setShowNewTopicModal(true)}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>
              New Topic
            </button>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Forum Categories Sidebar */}
          <div className="w-full md:w-64 bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-medium mb-4 border-b border-gray-700 pb-2">Forum Categories</h2>
            {loading && !forums.length ? (
              <div className="animate-pulse space-y-2">
                {Array(5).fill().map((_, index) => (
                  <div key={index} className="h-10 bg-gray-700 rounded"></div>
                ))}
              </div>
            ) : (
              <ul className="space-y-1">
                {forums.map(forum => (
                  <li key={forum._id}>
                    <button
                      onClick={() => setActiveForumId(forum._id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        activeForumId === forum._id 
                          ? 'bg-amber-600 text-white' 
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <i className={`${forum.icon || 'fas fa-comments'} mr-2`}></i>
                        <span>{forum.name}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Topics List */}
          <div className="flex-1">
            {activeForum ? (
              <>
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-2">{activeForum.name}</h2>
                  <p className="text-gray-400">{activeForum.description}</p>
                </div>
                
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search topics..."
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    {Array(5).fill().map((_, index) => (
                      <div key={index} className="bg-gray-800 rounded-lg p-6">
                        <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="h-4 bg-gray-700 rounded w-32"></div>
                          <div className="h-4 bg-gray-700 rounded w-24"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {filteredTopics.length > 0 ? (
                      <div className="space-y-4">
                        {filteredTopics.map(topic => (
                          <Link 
                            key={topic._id} 
                            to={`/alumni/forums/topic/${topic._id}`}
                            className="block bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-medium">{topic.title}</h3>
                              <div className="flex items-center text-gray-500 text-sm">
                                <i className="fas fa-comment-alt mr-1"></i>
                                <span>{topic.replyCount || 0}</span>
                              </div>
                            </div>
                            
                            <p className="text-gray-400 mt-2 line-clamp-2">{topic.content}</p>
                            
                            {topic.tags && topic.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {topic.tags.map((tag, index) => (
                                  <span 
                                    key={index} 
                                    className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-gray-700 mr-2"></div>
                                <span>{topic.author.name}</span>
                              </div>
                              <div>
                                {topic.lastActivity ? (
                                  <span>Last reply {new Date(topic.lastActivity).toLocaleDateString()}</span>
                                ) : (
                                  <span>Posted {new Date(topic.createdAt).toLocaleDateString()}</span>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-800 rounded-lg p-8 text-center">
                        <p className="text-gray-400 mb-4">No topics found in this forum.</p>
                        <button
                          onClick={() => setShowNewTopicModal(true)}
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
                        >
                          Start a New Discussion
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400">Please select a forum category from the sidebar.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* New Topic Modal */}
        {showNewTopicModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Create New Topic</h2>
                  <button 
                    onClick={() => setShowNewTopicModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
                
                <form onSubmit={handleCreateTopic}>
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-1">Topic Title*</label>
                    <input
                      type="text"
                      name="title"
                      value={newTopic.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-1">Content*</label>
                    <textarea
                      name="content"
                      value={newTopic.content}
                      onChange={handleInputChange}
                      required
                      rows={8}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    ></textarea>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-400 mb-1">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {newTopic.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {tag}
                          <button 
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-gray-400 hover:text-white"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                        className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-r-md"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowNewTopicModal(false)}
                      className="px-4 py-2 bg-gray-700 text-white rounded-md mr-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md"
                    >
                      Create Topic
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniForums; 
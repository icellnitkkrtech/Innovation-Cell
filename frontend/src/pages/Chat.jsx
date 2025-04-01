import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layouts/DashboardLayout';
import axios from 'axios';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const Chat = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(import.meta.env.VITE_API_URL);
    
    // Listen for incoming messages
    socketRef.current.on('receive_message', (data) => {
      if (activeConversation && data.room === activeConversation._id) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
      
      // Update last message in conversation list
      setConversations((prevConversations) => 
        prevConversations.map((conv) => 
          conv._id === data.room 
            ? { ...conv, lastMessage: new Date(), unreadCount: activeConversation && activeConversation._id === conv._id ? 0 : (conv.unreadCount || 0) + 1 }
            : conv
        )
      );
    });
    
    // Fetch conversations on component mount
    fetchConversations();
    
    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Fetch messages when active conversation changes
    if (activeConversation) {
      fetchMessages(activeConversation._id);
      
      // Join the socket room
      socketRef.current.emit('join_room', activeConversation._id);
      
      // Mark messages as read
      markConversationAsRead(activeConversation._id);
    }
  }, [activeConversation]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/chat/conversations`);
      setConversations(res.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast.error('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/chat/messages/${conversationId}`);
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/search?query=${searchQuery}`);
      setUsers(res.data);
    } catch (error) {
      console.error('Error searching users:', error);
      toast.error('Failed to search users');
    }
  };

  const markConversationAsRead = async (conversationId) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/chat/read/${conversationId}`);
      
      // Update the unread count in the UI
      setConversations((prevConversations) => 
        prevConversations.map((conv) => 
          conv._id === conversationId 
            ? { ...conv, unreadCount: 0 }
            : conv
        )
      );
    } catch (error) {
      console.error('Error marking conversation as read:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!messageInput.trim() || !activeConversation) return;
    
    const messageData = {
      content: messageInput,
      sender: user._id,
      room: activeConversation._id,
      timestamp: new Date()
    };
    
    // Emit the message to the socket
    socketRef.current.emit('send_message', messageData);
    
    // Add the message to the UI immediately
    setMessages((prevMessages) => [...prevMessages, messageData]);
    
    // Update the conversation list
    setConversations((prevConversations) => 
      prevConversations.map((conv) => 
        conv._id === activeConversation._id 
          ? { ...conv, lastMessage: new Date() }
          : conv
      )
    );
    
    // Clear the input
    setMessageInput('');
    
    try {
      // Save the message to the database
      await axios.post(`${import.meta.env.VITE_API_URL}/api/chat/messages`, {
        conversationId: activeConversation._id,
        content: messageInput
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const handleStartNewChat = async (userId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat/conversations`, {
        participantId: userId
      });
      
      // Add the new conversation to the list
      setConversations((prevConversations) => [res.data, ...prevConversations]);
      
      // Set it as active
      setActiveConversation(res.data);
      
      // Close the new chat dialog
      setShowNewChat(false);
      setSearchQuery('');
      setUsers([]);
    } catch (error) {
      console.error('Error starting new chat:', error);
      toast.error('Failed to start new conversation');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    
    if (e.target.value.trim()) {
      fetchUsers();
    } else {
      setUsers([]);
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="py-6"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-white">Chat</h1>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="flex h-[calc(100vh-200px)]">
                {/* Sidebar */}
                <div className="w-1/3 border-r border-gray-700 flex flex-col">
                  <div className="p-4 border-b border-gray-700">
                    <button
                      onClick={() => setShowNewChat(true)}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                      New Conversation
                    </button>
                  </div>
                  
                  {/* Conversations list */}
                  <div className="flex-1 overflow-y-auto">
                    {loading && conversations.length === 0 ? (
                      <div className="animate-pulse p-4 space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center space-x-4">
                            <div className="rounded-full bg-gray-700 h-10 w-10"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : conversations.length > 0 ? (
                      <ul className="divide-y divide-gray-700">
                        {conversations.map((conversation) => {
                          const otherParticipant = conversation.participants.find(
                            (p) => p._id !== user._id
                          );
                          
                          return (
                            <li
                              key={conversation._id}
                              className={`hover:bg-gray-700 cursor-pointer ${
                                activeConversation?._id === conversation._id ? 'bg-gray-700' : ''
                              }`}
                              onClick={() => setActiveConversation(conversation)}
                            >
                              <div className="flex items-center px-4 py-3 relative">
                                <div className="flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={otherParticipant?.profilePicture || 'https://via.placeholder.com/40'}
                                    alt=""
                                  />
                                </div>
                                <div className="min-w-0 flex-1 px-4">
                                  <div>
                                    <p className="text-sm font-medium text-white truncate">
                                      {conversation.isGroupChat
                                        ? conversation.groupName
                                        : otherParticipant?.name}
                                    </p>
                                    <p className="text-sm text-gray-400 truncate">
                                      {conversation.lastMessage
                                        ? `Last message: ${new Date(conversation.lastMessage).toLocaleString()}`
                                        : 'No messages yet'}
                                    </p>
                                  </div>
                                </div>
                                {conversation.unreadCount > 0 && (
                                  <div className="absolute right-4 top-4">
                                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-amber-500 rounded-full">
                                      {conversation.unreadCount}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4">
                        <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-center">No conversations yet. Start a new one!</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Chat area */}
                <div className="w-2/3 flex flex-col">
                  {activeConversation ? (
                    <>
                      {/* Chat header */}
                      <div className="p-4 border-b border-gray-700 flex items-center">
                        {activeConversation.isGroupChat ? (
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                                {activeConversation.groupName.charAt(0)}
                              </div>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-white">{activeConversation.groupName}</p>
                              <p className="text-xs text-gray-400">
                                {activeConversation.participants.length} members
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={
                                  activeConversation.participants.find((p) => p._id !== user._id)?.profilePicture ||
                                  'https://via.placeholder.com/40'
                                }
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-white">
                                {activeConversation.participants.find((p) => p._id !== user._id)?.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                {activeConversation.participants.find((p) => p._id !== user._id)?.role}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Messages */}
                      <div className="flex-1 p-4 overflow-y-auto">
                        {loading ? (
                          <div className="animate-pulse space-y-4">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : ''}`}>
                                <div className={`rounded-lg p-3 max-w-xs ${i % 2 === 0 ? 'bg-amber-500/20' : 'bg-gray-700'}`}>
                                  <div className="h-4 bg-gray-600 rounded w-full"></div>
                                  <div className="h-4 mt-2 bg-gray-600 rounded w-3/4"></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : messages.length > 0 ? (
                          <div className="space-y-4">
                            {messages.map((message, index) => (
                              <div
                                key={index}
                                className={`flex ${message.sender === user._id ? 'justify-end' : ''}`}
                              >
                                <div
                                  className={`rounded-lg p-3 max-w-xs ${
                                    message.sender === user._id
                                      ? 'bg-amber-500/20 text-amber-100'
                                      : 'bg-gray-700 text-white'
                                  }`}
                                >
                                  <p>{message.content}</p>
                                  <p className="text-xs mt-1 opacity-70">
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                            <div ref={messagesEndRef} />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <p>No messages yet. Start the conversation!</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Message input */}
                      <div className="p-4 border-t border-gray-700">
                        <form onSubmit={handleSendMessage} className="flex">
                          <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            className="flex-1 rounded-l-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                            placeholder="Type a message..."
                          />
                          <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                          >
                            Send
                          </button>
                        </form>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p className="text-lg">Select a conversation or start a new one</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* New chat dialog */}
      {showNewChat && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-white mb-4">Start a new conversation</h3>
                    
                    <div className="mt-2">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Search for users..."
                      />
                    </div>
                    
                    <div className="mt-4 max-h-60 overflow-y-auto">
                      {users.length > 0 ? (
                        <ul className="divide-y divide-gray-700">
                          {users.map((searchedUser) => (
                            <li
                              key={searchedUser._id}
                              className="py-3 flex items-center hover:bg-gray-700 cursor-pointer"
                              onClick={() => handleStartNewChat(searchedUser._id)}
                            >
                              <div className="flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={searchedUser.profilePicture || 'https://via.placeholder.com/40'}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-white">{searchedUser.name}</p>
                                <p className="text-xs text-gray-400">{searchedUser.role}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : searchQuery ? (
                        <p className="text-center text-gray-400 py-4">No users found</p>
                      ) : (
                        <p className="text-center text-gray-400 py-4">Search for users to start a conversation</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowNewChat(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Chat; 
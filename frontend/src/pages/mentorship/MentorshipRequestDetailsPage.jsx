import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userAPI } from '../../services/api';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const MentorshipRequestDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responding, setResponding] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setLoading(true);
        const response = await userAPI.getMentorshipRequestById(id);
        setRequest(response.data);
      } catch (error) {
        console.error('Error fetching mentorship request:', error);
        toast.error('Failed to load mentorship request details');
        navigate('/mentorship');
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id, navigate]);

  const handleRespond = async (status) => {
    try {
      setResponding(true);
      await userAPI.respondToMentorshipRequest(id, status);
      toast.success(`Mentorship request ${status}`);
      
      // Update the request status locally
      setRequest(prev => ({
        ...prev,
        status,
        responseDate: new Date()
      }));
    } catch (error) {
      console.error('Error responding to mentorship request:', error);
      toast.error('Failed to respond to mentorship request');
    } finally {
      setResponding(false);
    }
  };

  const handleComplete = async () => {
    try {
      setResponding(true);
      await userAPI.completeMentorshipRequest(id);
      toast.success('Mentorship marked as completed');
      
      // Update the request status locally
      setRequest(prev => ({
        ...prev,
        status: 'completed',
        completedDate: new Date()
      }));
    } catch (error) {
      console.error('Error completing mentorship:', error);
      toast.error('Failed to mark mentorship as completed');
    } finally {
      setResponding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Mentorship request not found</h2>
        <button
          onClick={() => navigate('/mentorship')}
          className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-500"
        >
          Back to Mentorship
        </button>
      </div>
    );
  }

  const isStudent = user.role === 'student';
  const isMentor = user.role === 'alumni' && request.mentor._id === user._id;
  const canRespond = isMentor && request.status === 'pending';
  const canComplete = (isStudent || isMentor) && request.status === 'accepted';

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/mentorship')}
            className="flex items-center text-white mb-4 hover:underline"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Mentorship
          </button>
          <h1 className="text-3xl font-bold">Mentorship Request</h1>
          <div className="mt-2 flex items-center">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              request.status === 'pending' ? 'bg-yellow-600 text-white' :
              request.status === 'accepted' ? 'bg-green-600 text-white' :
              request.status === 'rejected' ? 'bg-red-600 text-white' :
              'bg-blue-600 text-white'
            }`}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
            <span className="ml-2 text-amber-100">
              Requested on {format(new Date(request.createdAt), 'MMMM d, yyyy')}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Message</h2>
                <div className="text-gray-300 whitespace-pre-line">{request.message}</div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Topics of Interest</h2>
                <div className="flex flex-wrap gap-2">
                  {request.topics.map((topic, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-300"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Requested Duration</h2>
                <p className="text-gray-300">
                  {request.duration === '1_month' ? '1 Month' :
                   request.duration === '3_months' ? '3 Months' :
                   request.duration === '6_months' ? '6 Months' :
                   'Ongoing'}
                </p>
              </div>
              
              {request.status === 'accepted' && (
                <div className="mt-8 p-4 bg-gray-750 rounded-lg border border-amber-600">
                  <h3 className="text-lg font-bold text-amber-500 mb-2">Next Steps</h3>
                  <p className="text-gray-300 mb-4">
                    Now that your mentorship request has been accepted, here's what you should do next:
                  </p>
                  <ol className="list-decimal list-inside text-gray-300 space-y-2">
                    <li>Schedule an initial meeting to discuss goals and expectations</li>
                    <li>Create a mentorship plan with specific objectives</li>
                    <li>Set up regular check-ins (weekly or bi-weekly)</li>
                    <li>Keep track of your progress and learnings</li>
                  </ol>
                </div>
              )}
              
              {request.status === 'rejected' && (
                <div className="mt-8 p-4 bg-gray-750 rounded-lg border border-red-600">
                  <h3 className="text-lg font-bold text-red-500 mb-2">Request Declined</h3>
                  <p className="text-gray-300">
                    This mentorship request has been declined. This could be due to the mentor's availability or other factors.
                    We encourage you to explore other mentors who might be a better fit for your needs.
                  </p>
                </div>
              )}
              
              {request.status === 'completed' && (
                <div className="mt-8 p-4 bg-gray-750 rounded-lg border border-green-600">
                  <h3 className="text-lg font-bold text-green-500 mb-2">Mentorship Completed</h3>
                  <p className="text-gray-300">
                    This mentorship has been marked as completed. We hope it was a valuable experience!
                    Consider leaving feedback to help improve the mentorship program.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 sticky top-6">
              {isStudent ? (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Your Mentor</h3>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white text-xl font-bold">
                      {request.mentor.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-300">{request.mentor.name}</p>
                      <p className="text-gray-400 text-sm">{request.mentor.jobTitle || 'Alumni'}</p>
                      {request.mentor.company && (
                        <p className="text-amber-500 text-sm">{request.mentor.company}</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Student</h3>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white text-xl font-bold">
                      {request.student.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-300">{request.student.name}</p>
                      <p className="text-gray-400 text-sm">{request.student.major || 'Student'}</p>
                      {request.student.graduationYear && (
                        <p className="text-amber-500 text-sm">Class of {request.student.graduationYear}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Status Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs font-bold mt-0.5">
                      1
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-300">Request Submitted</p>
                      <p className="text-gray-400 text-sm">
                        {format(new Date(request.createdAt), 'MMMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5 ${
                      request.status === 'pending' ? 'bg-gray-600' :
                      request.status === 'accepted' ? 'bg-green-600' :
                      'bg-red-600'
                    }`}>
                      2
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-300">
                        {request.status === 'pending' ? 'Awaiting Response' :
                         request.status === 'accepted' ? 'Request Accepted' :
                         request.status === 'rejected' ? 'Request Declined' :
                         'Request Processed'}
                      </p>
                      {request.responseDate && (
                        <p className="text-gray-400 text-sm">
                          {format(new Date(request.responseDate), 'MMMM d, yyyy')}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5 ${
                      request.status === 'completed' ? 'bg-blue-600' : 'bg-gray-600'
                    }`}>
                      3
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-300">
                        {request.status === 'completed' ? 'Mentorship Completed' : 'Mentorship in Progress'}
                      </p>
                      {request.completedDate && (
                        <p className="text-gray-400 text-sm">
                          {format(new Date(request.completedDate), 'MMMM d, yyyy')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {canRespond && (
                <div className="space-y-3">
                  <button
                    onClick={() => handleRespond('accepted')}
                    disabled={responding}
                    className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {responding ? 'Processing...' : 'Accept Request'}
                  </button>
                  <button
                    onClick={() => handleRespond('rejected')}
                    disabled={responding}
                    className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {responding ? 'Processing...' : 'Decline Request'}
                  </button>
                </div>
              )}
              
              {canComplete && (
                <button
                  onClick={handleComplete}
                  disabled={responding}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {responding ? 'Processing...' : 'Mark as Completed'}
                </button>
              )}
              
              {request.status === 'accepted' && (
                <div className="mt-6">
                  <button
                    onClick={() => navigate(`/messages/${isStudent ? request.mentor._id : request.student._id}`)}
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-md"
                  >
                    Send Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorshipRequestDetailsPage; 
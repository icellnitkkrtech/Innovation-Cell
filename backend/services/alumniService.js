const User = require('../models/User');
const Event = require('../models/Event');
const Job = require('../models/Job');
const Project = require('../models/Project');
const Payment = require('../models/Payment');
const Campaign = require('../models/Campaign');
const MentorshipRequest = require('../models/MentorshipRequest');
const Resource = require('../models/Resource');
const Forum = require('../models/Forum');
const ForumTopic = require('../models/ForumTopic');
const Announcement = require('../models/Announcement');

// Dashboard
exports.getDashboardData = async (userId) => {
  try {
    // Get recent announcements
    const recentAnnouncements = await Announcement.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate('createdBy', 'name');

    // Get upcoming events
    const today = new Date();
    const upcomingEvents = await Event.find({
      date: { $gte: today },
      isPublished: true
    })
      .sort({ date: 1 })
      .limit(3)
      .populate('createdBy', 'name');

    // Get recent job opportunities
    const jobOpportunities = await Job.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate('postedBy', 'name');

    // Get networking opportunities (other alumni)
    const networkingOpportunities = await User.find({
      role: 'alumni',
      _id: { $ne: userId }
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name profilePicture graduationYear position company');

    // Get alumni spotlight (featured alumni)
    const alumniSpotlight = await User.findOne({
      role: 'alumni',
      isVerified: true
    }).select('name profilePicture graduationYear position company bio');

    return {
      recentAnnouncements,
      upcomingEvents,
      jobOpportunities,
      networkingOpportunities,
      alumniSpotlight
    };
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    throw new Error('Failed to get dashboard data');
  }
};

// Directory
exports.getAllAlumni = async (filters = {}) => {
  try {
    const query = { role: 'alumni' };
    
    // Apply filters
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { company: { $regex: filters.search, $options: 'i' } },
        { position: { $regex: filters.search, $options: 'i' } }
      ];
    }
    
    if (filters.graduationYear) {
      query.graduationYear = filters.graduationYear;
    }
    
    if (filters.industry) {
      query.industry = filters.industry;
    }
    
    if (filters.location) {
      query.location = { $regex: filters.location, $options: 'i' };
    }
    
    return await User.find(query)
      .select('name profilePicture graduationYear position company')
      .sort({ name: 1 });
  } catch (error) {
    console.error('Error getting alumni directory:', error);
    throw new Error('Failed to get alumni directory');
  }
};

exports.getAlumniById = async (alumniId) => {
  try {
    return await User.findOne({ _id: alumniId, role: 'alumni' })
      .select('-password');
  } catch (error) {
    console.error('Error getting alumni profile:', error);
    throw new Error('Failed to get alumni profile');
  }
};

exports.connectWithAlumni = async (userId, alumniId, message) => {
  try {
    // In a real application, you would create a connection request
    // For now, we'll just return a success message
    
    return { 
      success: true, 
      message: 'Connection request sent successfully' 
    };
  } catch (error) {
    console.error('Error connecting with alumni:', error);
    throw new Error('Failed to connect with alumni');
  }
};

// Events
exports.getEvents = async (filters = {}) => {
  try {
    const query = {};
    
    if (filters.status === 'upcoming') {
      query.date = { $gte: new Date() };
    } else if (filters.status === 'past') {
      query.date = { $lt: new Date() };
    }
    
    return await Event.find(query)
      .sort({ date: filters.status === 'past' ? -1 : 1 })
      .populate('createdBy', 'name');
  } catch (error) {
    console.error('Error getting events:', error);
    throw new Error('Failed to get events');
  }
};

exports.getEventById = async (eventId) => {
  try {
    return await Event.findById(eventId)
      .populate('createdBy', 'name')
      .populate('attendees', 'name profilePicture');
  } catch (error) {
    console.error('Error getting event details:', error);
    throw new Error('Failed to get event details');
  }
};

exports.registerForEvent = async (eventId, userId) => {
  try {
    const event = await Event.findById(eventId);
    
    if (!event) {
      throw new Error('Event not found');
    }
    
    // Check if user is already registered
    if (event.attendees.includes(userId)) {
      throw new Error('You are already registered for this event');
    }
    
    // Add user to attendees
    event.attendees.push(userId);
    await event.save();
    
    return { 
      success: true, 
      message: 'Successfully registered for event' 
    };
  } catch (error) {
    console.error('Error registering for event:', error);
    throw error;
  }
};

exports.cancelEventRegistration = async (eventId, userId) => {
  try {
    const event = await Event.findById(eventId);
    
    if (!event) {
      throw new Error('Event not found');
    }
    
    // Check if user is registered
    if (!event.attendees.includes(userId)) {
      throw new Error('You are not registered for this event');
    }
    
    // Remove user from attendees
    event.attendees = event.attendees.filter(
      attendee => attendee.toString() !== userId.toString()
    );
    await event.save();
    
    return { 
      success: true, 
      message: 'Event registration cancelled successfully' 
    };
  } catch (error) {
    console.error('Error cancelling event registration:', error);
    throw error;
  }
};

exports.proposeEvent = async (eventData, userId) => {
  try {
    const newEvent = new Event({
      ...eventData,
      createdBy: userId
    });
    
    await newEvent.save();
    
    return newEvent;
  } catch (error) {
    console.error('Error proposing event:', error);
    throw new Error('Failed to propose event');
  }
};

// Jobs
exports.getJobs = async (filters = {}) => {
  try {
    const query = { isActive: true };
    
    if (filters.type) {
      query.type = filters.type;
    }
    
    if (filters.location) {
      query.location = { $regex: filters.location, $options: 'i' };
    }
    
    return await Job.find(query)
      .sort({ createdAt: -1 })
      .populate('postedBy', 'name company');
  } catch (error) {
    console.error('Error getting jobs:', error);
    throw new Error('Failed to get jobs');
  }
};

exports.getJobById = async (jobId) => {
  try {
    return await Job.findById(jobId)
      .populate('postedBy', 'name company profilePicture');
  } catch (error) {
    console.error('Error getting job details:', error);
    throw new Error('Failed to get job details');
  }
};

exports.postJob = async (jobData, userId) => {
  try {
    const newJob = new Job({
      ...jobData,
      postedBy: userId
    });
    
    await newJob.save();
    
    return newJob;
  } catch (error) {
    console.error('Error posting job:', error);
    throw new Error('Failed to post job');
  }
};

exports.updateJob = async (jobId, jobData, userId) => {
  try {
    const job = await Job.findById(jobId);
    
    if (!job) {
      throw new Error('Job not found');
    }
    
    // Check if user is the job poster
    if (job.postedBy.toString() !== userId.toString()) {
      throw new Error('Not authorized to update this job');
    }
    
    // Update job fields
    Object.keys(jobData).forEach(key => {
      job[key] = jobData[key];
    });
    
    job.updatedAt = Date.now();
    await job.save();
    
    return job;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

exports.deleteJob = async (jobId, userId) => {
  try {
    const job = await Job.findById(jobId);
    
    if (!job) {
      throw new Error('Job not found');
    }
    
    // Check if user is the job poster
    if (job.postedBy.toString() !== userId.toString()) {
      throw new Error('Not authorized to delete this job');
    }
    
    await job.remove();
    
    return { success: true, message: 'Job deleted successfully' };
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};

exports.applyForJob = async (jobId, userId, applicationData) => {
  try {
    // In a real application, you would store the application data
    // For now, we'll just return a success message
    
    return { 
      success: true, 
      message: 'Application submitted successfully',
      applicationData
    };
  } catch (error) {
    console.error('Error applying for job:', error);
    throw new Error('Failed to apply for job');
  }
};

// Mentorship
exports.getMentorships = async (userId) => {
  try {
    // Get mentorships where user is either mentor or student
    return await MentorshipRequest.find({
      $or: [
        { mentor: userId },
        { student: userId }
      ]
    })
      .populate('mentor', 'name profilePicture position company')
      .populate('student', 'name profilePicture graduationYear');
  } catch (error) {
    console.error('Error getting mentorships:', error);
    throw new Error('Failed to get mentorships');
  }
};

exports.getAvailableMentors = async () => {
  try {
    return await User.find({
      role: 'alumni',
      isAvailableForMentoring: true
    })
      .select('name profilePicture position company bio skills')
      .sort({ name: 1 });
  } catch (error) {
    console.error('Error getting available mentors:', error);
    throw new Error('Failed to get available mentors');
  }
};

exports.getMentorProfile = async (userId) => {
  try {
    const user = await User.findById(userId)
      .select('name profilePicture position company bio skills');
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch (error) {
    console.error('Error getting mentor profile:', error);
    throw new Error('Failed to get mentor profile');
  }
};

exports.updateMentorProfile = async (userId, profileData) => {
  try {
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Update mentor profile fields
    if (profileData.bio) user.bio = profileData.bio;
    if (profileData.expertise) user.skills = profileData.expertise;
    
    // Add isAvailableForMentoring field if it doesn't exist
    if (profileData.isAvailable !== undefined) {
      user.isAvailableForMentoring = profileData.isAvailable;
    }
    
    await user.save();
    
    return user;
  } catch (error) {
    console.error('Error updating mentor profile:', error);
    throw new Error('Failed to update mentor profile');
  }
};

exports.requestMentorship = async (mentorId, userId, requestData) => {
  try {
    const newRequest = new MentorshipRequest({
      student: userId,
      mentor: mentorId,
      message: requestData.message,
      topics: requestData.goals.split(',').map(topic => topic.trim()),
      duration: requestData.duration
    });
    
    await newRequest.save();
    
    return newRequest;
  } catch (error) {
    console.error('Error requesting mentorship:', error);
    throw new Error('Failed to request mentorship');
  }
};

exports.acceptMentorship = async (requestId, userId) => {
  try {
    const request = await MentorshipRequest.findById(requestId);
    
    if (!request) {
      throw new Error('Mentorship request not found');
    }
    
    // Check if user is the mentor
    if (request.mentor.toString() !== userId.toString()) {
      throw new Error('Not authorized to accept this request');
    }
    
    // Update request status
    request.status = 'accepted';
    request.responseDate = Date.now();
    
    await request.save();
    
    return request;
  } catch (error) {
    console.error('Error accepting mentorship:', error);
    throw error;
  }
};

exports.declineMentorship = async (requestId, userId) => {
  try {
    const request = await MentorshipRequest.findById(requestId);
    
    if (!request) {
      throw new Error('Mentorship request not found');
    }
    
    // Check if user is the mentor
    if (request.mentor.toString() !== userId.toString()) {
      throw new Error('Not authorized to decline this request');
    }
    
    // Update request status
    request.status = 'rejected';
    request.responseDate = Date.now();
    
    await request.save();
    
    return request;
  } catch (error) {
    console.error('Error declining mentorship:', error);
    throw error;
  }
};

exports.endMentorship = async (mentorshipId, userId) => {
  try {
    const mentorship = await MentorshipRequest.findById(mentorshipId);
    
    if (!mentorship) {
      throw new Error('Mentorship not found');
    }
    
    // Check if user is the mentor or student
    if (mentorship.mentor.toString() !== userId.toString() && 
        mentorship.student.toString() !== userId.toString()) {
      throw new Error('Not authorized to end this mentorship');
    }
    
    // Update mentorship status
    mentorship.status = 'completed';
    mentorship.completedDate = Date.now();
    
    await mentorship.save();
    
    return mentorship;
  } catch (error) {
    console.error('Error ending mentorship:', error);
    throw error;
  }
};

// Projects
exports.getProjects = async (filters = {}) => {
  try {
    const query = {};
    
    if (filters.status && filters.status !== 'all') {
      query.status = filters.status;
    }
    
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } }
      ];
    }
    
    return await Project.find(query)
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name profilePicture')
      .populate('collaborators', 'name profilePicture');
  } catch (error) {
    console.error('Error getting projects:', error);
    throw new Error('Failed to get projects');
  }
};

exports.getProjectById = async (projectId) => {
  try {
    return await Project.findById(projectId)
      .populate('createdBy', 'name profilePicture')
      .populate('collaborators', 'name profilePicture position');
  } catch (error) {
    console.error('Error getting project details:', error);
    throw new Error('Failed to get project details');
  }
};

exports.proposeProject = async (projectData, userId) => {
  try {
    const newProject = new Project({
      ...projectData,
      createdBy: userId,
      collaborators: [userId] // Add creator as first collaborator
    });
    
    await newProject.save();
    
    return newProject;
  } catch (error) {
    console.error('Error proposing project:', error);
    throw new Error('Failed to propose project');
  }
};

exports.updateProject = async (projectId, projectData, userId) => {
  try {
    const project = await Project.findById(projectId);
    
    if (!project) {
      throw new Error('Project not found');
    }
    
    // Check if user is the project creator
    if (project.createdBy.toString() !== userId.toString()) {
      throw new Error('Not authorized to update this project');
    }
    
    // Update project fields
    const allowedFields = ['title', 'description', 'objectives', 'skills', 'timeline', 'status'];
    
    allowedFields.forEach(field => {
      if (projectData[field] !== undefined) {
        project[field] = projectData[field];
      }
    });
    
    project.updatedAt = Date.now();
    await project.save();
    
    return project;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

exports.deleteProject = async (projectId, userId) => {
  try {
    const project = await Project.findById(projectId);
    
    if (!project) {
      throw new Error('Project not found');
    }
    
    // Check if user is the project creator
    if (project.createdBy.toString() !== userId.toString()) {
      throw new Error('Not authorized to delete this project');
    }
    
    await project.remove();
    
    return { success: true, message: 'Project deleted successfully' };
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

exports.joinProject = async (projectId, userId) => {
  try {
    const project = await Project.findById(projectId);
    
    if (!project) {
      throw new Error('Project not found');
    }
    
    // Check if user is already a collaborator
    if (project.collaborators.includes(userId)) {
      throw new Error('You are already a collaborator on this project');
    }
    
    // Add user to collaborators
    project.collaborators.push(userId);
    await project.save();
    
    return { success: true, message: 'Successfully joined project' };
  } catch (error) {
    console.error('Error joining project:', error);
    throw error;
  }
};

exports.leaveProject = async (projectId, userId) => {
  try {
    const project = await Project.findById(projectId);
    
    if (!project) {
      throw new Error('Project not found');
    }
    
    // Check if user is a collaborator
    if (!project.collaborators.includes(userId)) {
      throw new Error('You are not a collaborator on this project');
    }
    
    // Check if user is the creator
    if (project.createdBy.toString() === userId.toString()) {
      throw new Error('Project creator cannot leave the project');
    }
    
    // Remove user from collaborators
    project.collaborators = project.collaborators.filter(
      collaborator => collaborator.toString() !== userId.toString()
    );
    await project.save();
    
    return { success: true, message: 'Successfully left project' };
  } catch (error) {
    console.error('Error leaving project:', error);
    throw error;
  }
};

// Donations
exports.getDonationCampaigns = async () => {
  try {
    return await Campaign.find({ isActive: true })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name');
  } catch (error) {
    console.error('Error getting donation campaigns:', error);
    throw new Error('Failed to get donation campaigns');
  }
};

// Continuing from where we left off...

exports.getUserDonations = async (userId) => {
    try {
      return await Payment.find({
        user: userId,
        relatedTo: 'donation'
      })
        .sort({ paymentDate: -1 })
        .populate({
          path: 'relatedId',
          model: 'Campaign',
          select: 'title'
        });
    } catch (error) {
      console.error('Error getting user donations:', error);
      throw new Error('Failed to get user donations');
    }
  };
  
  exports.makeDonation = async (userId, donationData) => {
    try {
      // Create a new payment record
      const payment = new Payment({
        user: userId,
        amount: donationData.amount,
        paymentMethod: donationData.paymentMethod,
        description: `Donation to ${donationData.campaignTitle}`,
        relatedTo: 'donation',
        relatedId: donationData.campaignId,
        relatedToModel: 'Campaign',
        status: 'completed' // In a real app, this would be 'pending' until payment is processed
      });
      
      await payment.save();
      
      // Update campaign amount raised
      await Campaign.findByIdAndUpdate(donationData.campaignId, {
        $inc: { amountRaised: donationData.amount }
      });
      
      return payment;
    } catch (error) {
      console.error('Error making donation:', error);
      throw new Error('Failed to process donation');
    }
  };
  
  // Resources
  exports.getResources = async (filters = {}) => {
    try {
      const query = { isApproved: true };
      
      if (filters.category && filters.category !== 'all') {
        query.category = filters.category;
      }
      
      if (filters.search) {
        query.$or = [
          { title: { $regex: filters.search, $options: 'i' } },
          { description: { $regex: filters.search, $options: 'i' } }
        ];
      }
      
      return await Resource.find(query)
        .sort({ createdAt: -1 })
        .populate('submittedBy', 'name');
    } catch (error) {
      console.error('Error getting resources:', error);
      throw new Error('Failed to get resources');
    }
  };
  
  exports.getResourceById = async (resourceId) => {
    try {
      return await Resource.findById(resourceId)
        .populate('submittedBy', 'name')
        .populate('approvedBy', 'name');
    } catch (error) {
      console.error('Error getting resource details:', error);
      throw new Error('Failed to get resource details');
    }
  };
  
  exports.submitResource = async (resourceData, userId) => {
    try {
      const resource = new Resource({
        title: resourceData.title,
        description: resourceData.description,
        category: resourceData.category,
        link: resourceData.link,
        fileUrl: resourceData.fileUrl,
        submittedBy: userId,
        isApproved: false // Resources need approval before being visible
      });
      
      await resource.save();
      
      return resource;
    } catch (error) {
      console.error('Error submitting resource:', error);
      throw new Error('Failed to submit resource');
    }
  };
  
  // Forums
  exports.getForums = async () => {
    try {
      return await Forum.find()
        .sort({ order: 1 });
    } catch (error) {
      console.error('Error getting forums:', error);
      throw new Error('Failed to get forums');
    }
  };
  
  exports.getForumTopics = async (forumId, filters = {}) => {
    try {
      const query = { forum: forumId };
      
      if (filters.search) {
        query.$or = [
          { title: { $regex: filters.search, $options: 'i' } },
          { content: { $regex: filters.search, $options: 'i' } }
        ];
      }
      
      // First get pinned topics
      const pinnedTopics = await ForumTopic.find({
        ...query,
        isPinned: true
      })
        .sort({ lastActivity: -1 })
        .populate('createdBy', 'name profilePicture');
      
      // Then get regular topics
      const regularTopics = await ForumTopic.find({
        ...query,
        isPinned: false
      })
        .sort({ lastActivity: -1 })
        .populate('createdBy', 'name profilePicture');
      
      // Combine the results
      return [...pinnedTopics, ...regularTopics];
    } catch (error) {
      console.error('Error getting forum topics:', error);
      throw new Error('Failed to get forum topics');
    }
  };
  
  exports.getTopicById = async (topicId) => {
    try {
      const topic = await ForumTopic.findById(topicId)
        .populate('createdBy', 'name profilePicture')
        .populate('replies.createdBy', 'name profilePicture');
      
      if (!topic) {
        throw new Error('Topic not found');
      }
      
      // Increment view count
      topic.views += 1;
      await topic.save();
      
      return topic;
    } catch (error) {
      console.error('Error getting topic details:', error);
      throw new Error('Failed to get topic details');
    }
  };
  
  exports.createForumTopic = async (topicData, userId) => {
    try {
      const topic = new ForumTopic({
        title: topicData.title,
        content: topicData.content,
        forum: topicData.forumId,
        createdBy: userId,
        tags: topicData.tags || []
      });
      
      await topic.save();
      
      // Update forum's topic count and last activity
      await Forum.findByIdAndUpdate(topicData.forumId, {
        $inc: { topicCount: 1 },
        lastActivity: Date.now()
      });
      
      return topic;
    } catch (error) {
      console.error('Error creating forum topic:', error);
      throw new Error('Failed to create forum topic');
    }
  };
  
  exports.replyToTopic = async (topicId, replyData, userId) => {
    try {
      const topic = await ForumTopic.findById(topicId);
      
      if (!topic) {
        throw new Error('Topic not found');
      }
      
      if (topic.isLocked) {
        throw new Error('This topic is locked and cannot receive new replies');
      }
      
      const newReply = {
        content: replyData.content,
        createdBy: userId,
        createdAt: Date.now()
      };
      
      topic.replies.push(newReply);
      topic.lastActivity = Date.now();
      
      await topic.save();
      
      // Update forum's last activity
      await Forum.findByIdAndUpdate(topic.forum, {
        lastActivity: Date.now()
      });
      
      return topic;
    } catch (error) {
      console.error('Error replying to topic:', error);
      throw new Error('Failed to reply to topic');
    }
  };
  
  // Profile
  exports.getUserProfile = async (userId) => {
    try {
      return await User.findById(userId)
        .select('-password');
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw new Error('Failed to get user profile');
    }
  };
  
  exports.updateUserProfile = async (userId, profileData) => {
    try {
      const user = await User.findById(userId);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // Update user profile fields
      const allowedFields = [
        'name', 'bio', 'skills', 'graduationYear', 
        'company', 'position'
      ];
      
      for (const field of allowedFields) {
        if (profileData[field] !== undefined) {
          user[field] = profileData[field];
        }
      }
      
      await user.save();
      
      return user;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Failed to update user profile');
    }
  };
  
  exports.uploadProfileImage = async (userId, file) => {
    try {
      // In a real application, you would upload the file to a storage service
      // For now, we'll just update the user's profile image URL
      
      // Assume we have a function to upload the file and get a URL
      const imageUrl = `/uploads/profile/${userId}_${Date.now()}_${file.originalname}`;
      
      // Update user's profile image
      await User.findByIdAndUpdate(userId, {
        profilePicture: imageUrl
      });
      
      return imageUrl;
    } catch (error) {
      console.error('Error uploading profile image:', error);
      throw new Error('Failed to upload profile image');
    }
  };
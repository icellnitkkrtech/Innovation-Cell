const Project = require('../models/Project');

// Get projects based on user role
exports.getProjects = async (user) => {
  // Students see only approved projects
  if (user.role === 'student') {
    return await Project.find({ status: 'approved' })
      .sort({ createdAt: -1 });
  } 
  // Alumni see their own submitted projects
  else if (user.role === 'alumni') {
    return await Project.find({ 
      clientEmail: user.email 
    }).sort({ createdAt: -1 });
  }
  // Admins see all projects
  else {
    return await Project.find()
      .sort({ createdAt: -1 })
      .populate('assignedTo', 'name email');
  }
};

// Get recent projects
exports.getRecentProjects = async (user, limit = 3) => {
  if (user.role === 'student') {
    return await Project.find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .limit(limit);
  } else {
    return await Project.find()
      .sort({ createdAt: -1 })
      .limit(limit);
  }
};

// Create new project
exports.createProject = async (projectData, user) => {
  const newProject = new Project({
    ...projectData,
    // If alumni is submitting, use their info
    clientName: user.role === 'alumni' ? user.name : projectData.clientName,
    clientEmail: user.role === 'alumni' ? user.email : projectData.clientEmail
  });

  return await newProject.save();
};

// Get project by ID
exports.getProjectById = async (projectId) => {
  return await Project.findById(projectId);
};

// Update project
exports.updateProject = async (projectId, updateData) => {
  return await Project.findByIdAndUpdate(
    projectId,
    { $set: updateData },
    { new: true }
  );
};

// Delete project
exports.deleteProject = async (projectId) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new Error('Project not found');
  }
  
  await project.remove();
  return { message: 'Project removed' };
}; 
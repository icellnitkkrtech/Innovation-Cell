const projectService = require('../services/projectService');

// Get projects (filtered by role)
exports.getProjects = async (req, res) => {
  try {
    const projects = await projectService.getProjects(req.user);
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get recent projects
exports.getRecentProjects = async (req, res) => {
  try {
    const projects = await projectService.getRecentProjects(req.user);
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create new project
exports.createProject = async (req, res) => {
  try {
    const project = await projectService.createProject(req.body, req.user);
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Admin: Update project
exports.updateProject = async (req, res) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Admin: Delete project
exports.deleteProject = async (req, res) => {
  try {
    const result = await projectService.deleteProject(req.params.id);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    if (err.message === 'Project not found') {
      return res.status(404).json({ msg: err.message });
    }
    res.status(500).send('Server Error');
  }
}; 
/**
 * Calculate the progress percentage of a roadmap
 * @param {Object} roadmap - The roadmap object
 * @returns {number} Progress percentage (0-100)
 */
export const calculateRoadmapProgress = (roadmap) => {
  if (!roadmap.skills || roadmap.skills.length === 0) return 0;
  const completed = roadmap.skills.filter((s) => s.completed).length;
  return Math.round((completed / roadmap.skills.length) * 100);
};

/**
 * Get skill status counts from a roadmap
 */
export const getSkillStatusCounts = (roadmap) => {
  const counts = {
    'Not Started': 0,
    Learning: 0,
    Practicing: 0,
    Completed: 0,
  };

  if (!roadmap.skills) return counts;
  roadmap.skills.forEach((skill) => {
    if (counts[skill.status] !== undefined) {
      counts[skill.status]++;
    }
  });
  return counts;
};

/**
 * Get project status counts from a roadmap
 */
export const getProjectStatusCounts = (roadmap) => {
  const counts = {
    'Not Started': 0,
    'In Progress': 0,
    Completed: 0,
  };

  if (!roadmap.projects) return counts;
  roadmap.projects.forEach((project) => {
    if (counts[project.status] !== undefined) {
      counts[project.status]++;
    }
  });
  return counts;
};

/**
 * Aggregate stats across all roadmaps
 */
export const getGlobalStats = (roadmaps) => {
  let totalSkills = 0;
  let completedSkills = 0;
  let learningSkills = 0;
  let practicingSkills = 0;
  let totalProjects = 0;
  let completedProjects = 0;

  roadmaps.forEach((rm) => {
    if (rm.skills) {
      totalSkills += rm.skills.length;
      completedSkills += rm.skills.filter((s) => s.status === 'Completed').length;
      learningSkills += rm.skills.filter((s) => s.status === 'Learning').length;
      practicingSkills += rm.skills.filter((s) => s.status === 'Practicing').length;
    }
    if (rm.projects) {
      totalProjects += rm.projects.length;
      completedProjects += rm.projects.filter((p) => p.status === 'Completed').length;
    }
  });

  return {
    totalRoadmaps: roadmaps.length,
    totalSkills,
    completedSkills,
    learningSkills,
    practicingSkills,
    totalProjects,
    completedProjects,
  };
};

/**
 * Get chart data for skills status distribution across all roadmaps
 */
export const getSkillsDistributionData = (roadmaps) => {
  const stats = getGlobalStats(roadmaps);
  return [
    { name: 'Not Started', value: stats.totalSkills - stats.completedSkills - stats.learningSkills - stats.practicingSkills, color: '#94a3b8' },
    { name: 'Learning', value: stats.learningSkills, color: '#facc15' },
    { name: 'Practicing', value: stats.practicingSkills, color: '#3b82f6' },
    { name: 'Completed', value: stats.completedSkills, color: '#22c55e' },
  ].filter((d) => d.value > 0);
};

/**
 * Get per-roadmap progress data for bar chart
 */
export const getRoadmapProgressData = (roadmaps) =>
  roadmaps.map((rm) => ({
    name: rm.name.length > 12 ? rm.name.substring(0, 12) + '…' : rm.name,
    progress: calculateRoadmapProgress(rm),
    skills: rm.skills?.length || 0,
    completed: rm.skills?.filter((s) => s.completed).length || 0,
  }));

/**
 * Career Readiness Calculator
 *
 * Formula:
 *   40% Skills Completion
 *   30% Project Completion
 *   20% Consistency (notes & resources added to skills)
 *   10% Notes & Resources Added
 */

/**
 * Calculate Career Readiness Score for all roadmaps
 * @param {Array} roadmaps - Array of roadmap objects
 * @returns {Object} { score, level, suggestions }
 */
export const calculateReadiness = (roadmaps) => {
  if (!roadmaps || roadmaps.length === 0) {
    return { score: 0, level: 'Beginner', suggestions: ['Create your first roadmap to get started!'] };
  }

  let totalSkills = 0;
  let completedSkills = 0;
  let totalProjects = 0;
  let completedProjects = 0;
  let skillsWithNotes = 0;
  let skillsWithResources = 0;
  let practicingOrCompleted = 0;

  roadmaps.forEach((rm) => {
    if (rm.skills) {
      totalSkills += rm.skills.length;
      rm.skills.forEach((s) => {
        if (s.completed || s.status === 'Completed') completedSkills++;
        if (s.status === 'Practicing' || s.status === 'Completed') practicingOrCompleted++;
        if (s.notes && s.notes.trim().length > 0) skillsWithNotes++;
        if (s.resources && s.resources.length > 0) skillsWithResources++;
      });
    }
    if (rm.projects) {
      totalProjects += rm.projects.length;
      completedProjects += rm.projects.filter((p) => p.status === 'Completed').length;
    }
  });

  // Calculate sub-scores
  const skillScore = totalSkills > 0 ? (completedSkills / totalSkills) * 100 : 0;
  const projectScore = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;
  const consistencyScore = totalSkills > 0 ? (practicingOrCompleted / totalSkills) * 100 : 0;
  const notesScore = totalSkills > 0
    ? ((skillsWithNotes + skillsWithResources) / (totalSkills * 2)) * 100
    : 0;

  // Weighted total
  const score = Math.round(
    skillScore * 0.4 +
    projectScore * 0.3 +
    consistencyScore * 0.2 +
    notesScore * 0.1
  );

  // Determine level
  let level;
  if (score >= 90) level = 'Expert';
  else if (score >= 75) level = 'Advanced Learner';
  else if (score >= 50) level = 'Intermediate';
  else if (score >= 25) level = 'Beginner';
  else level = 'Getting Started';

  // Generate suggestions
  const suggestions = [];

  // Find incomplete skills across all roadmaps
  roadmaps.forEach((rm) => {
    if (rm.skills) {
      const incompleteSkills = rm.skills.filter((s) => !s.completed);
      if (incompleteSkills.length > 0) {
        const randomSkill = incompleteSkills[Math.floor(Math.random() * incompleteSkills.length)];
        suggestions.push(`Complete "${randomSkill.title}" in ${rm.name}`);
      }
    }

    if (rm.projects) {
      const incompleteProjects = rm.projects.filter((p) => p.status !== 'Completed');
      if (incompleteProjects.length > 0) {
        suggestions.push(`Build more projects in ${rm.name}`);
      }
    }
  });

  if (skillsWithNotes < totalSkills * 0.5) {
    suggestions.push('Add notes to more skills to improve retention');
  }
  if (skillsWithResources < totalSkills * 0.3) {
    suggestions.push('Add learning resources to your skills');
  }

  return {
    score: Math.min(score, 100),
    level,
    suggestions: suggestions.slice(0, 4),
    breakdown: {
      skills: Math.round(skillScore),
      projects: Math.round(projectScore),
      consistency: Math.round(consistencyScore),
      documentation: Math.round(notesScore),
    },
  };
};

/**
 * Get readiness level color
 */
export const getReadinessColor = (score) => {
  if (score >= 90) return '#22c55e';
  if (score >= 75) return '#3b82f6';
  if (score >= 50) return '#f59e0b';
  if (score >= 25) return '#f97316';
  return '#94a3b8';
};

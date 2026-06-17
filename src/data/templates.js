// Roadmap templates for various career paths
import { v4 as uuidv4 } from 'uuid';

const createSkill = (title) => ({
  id: uuidv4(),
  title,
  status: 'Not Started',
  notes: '',
  resources: [],
  completed: false,
});

const createProject = (name, description, difficulty) => ({
  id: uuidv4(),
  name,
  description,
  difficulty,
  status: 'Not Started',
  completionDate: null,
});

export const templates = {
  'Web Development': {
    name: 'Web Development',
    description: 'Full-stack web development roadmap covering frontend, backend, and deployment.',
    icon: '🌐',
    color: '#6366f1',
    skills: [
      'HTML', 'CSS', 'JavaScript', 'Git', 'GitHub', 'React', 'Redux',
      'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Authentication',
      'REST APIs', 'Testing', 'Deployment', 'System Design',
    ],
    projects: [
      { name: 'Portfolio Website', description: 'Personal portfolio showcasing your work', difficulty: 'Beginner' },
      { name: 'Weather App', description: 'Real-time weather app using an API', difficulty: 'Beginner' },
      { name: 'E-Commerce App', description: 'Full-featured online store with cart', difficulty: 'Advanced' },
      { name: 'Social Media App', description: 'Social platform with posts and profiles', difficulty: 'Advanced' },
    ],
  },
  'Cybersecurity': {
    name: 'Cybersecurity',
    description: 'Cybersecurity roadmap from networking basics to bug bounty hunting.',
    icon: '🔒',
    color: '#ef4444',
    skills: [
      'Networking Basics', 'Linux', 'Bash', 'Nmap', 'Wireshark',
      'Burp Suite', 'OWASP Top 10', 'Web Security', 'Privilege Escalation',
      'CTFs', 'Bug Bounty', 'Report Writing',
    ],
    projects: [
      { name: 'Home Lab Setup', description: 'Set up a virtual security lab', difficulty: 'Beginner' },
      { name: 'Network Scanner', description: 'Build a Python-based network scanner', difficulty: 'Intermediate' },
      { name: 'Vulnerability Report', description: 'Write a professional vulnerability report', difficulty: 'Intermediate' },
      { name: 'CTF Writeups', description: 'Solve and document CTF challenges', difficulty: 'Advanced' },
    ],
  },
  'AI / ML': {
    name: 'AI / ML',
    description: 'Artificial Intelligence and Machine Learning roadmap from basics to deployment.',
    icon: '🤖',
    color: '#8b5cf6',
    skills: [
      'Python', 'NumPy', 'Pandas', 'Statistics', 'Data Visualization',
      'Machine Learning', 'Deep Learning', 'Neural Networks', 'NLP',
      'Transformers', 'MLOps', 'Projects',
    ],
    projects: [
      { name: 'Data Analysis Dashboard', description: 'Visualize datasets with pandas and matplotlib', difficulty: 'Beginner' },
      { name: 'Image Classifier', description: 'Build a CNN image classifier', difficulty: 'Intermediate' },
      { name: 'Chatbot', description: 'NLP-powered chatbot using transformers', difficulty: 'Advanced' },
      { name: 'Recommendation System', description: 'Collaborative filtering recommendation engine', difficulty: 'Advanced' },
    ],
  },
  'Data Science': {
    name: 'Data Science',
    description: 'Data Science roadmap covering statistics, analysis, visualization, and modeling.',
    icon: '📊',
    color: '#10b981',
    skills: [
      'Python', 'Statistics', 'Probability', 'SQL', 'Data Wrangling',
      'Pandas', 'NumPy', 'Data Visualization', 'Matplotlib', 'Seaborn',
      'Scikit-Learn', 'Feature Engineering', 'Model Evaluation', 'Storytelling with Data',
    ],
    projects: [
      { name: 'EDA Notebook', description: 'Exploratory data analysis on a real dataset', difficulty: 'Beginner' },
      { name: 'Sales Dashboard', description: 'Interactive sales analytics dashboard', difficulty: 'Intermediate' },
      { name: 'Predictive Model', description: 'Build a predictive model for a real-world problem', difficulty: 'Advanced' },
    ],
  },
  'DevOps': {
    name: 'DevOps',
    description: 'DevOps engineering roadmap covering CI/CD, containers, cloud, and monitoring.',
    icon: '⚙️',
    color: '#f59e0b',
    skills: [
      'Linux', 'Bash Scripting', 'Git', 'Docker', 'Kubernetes',
      'CI/CD', 'Jenkins', 'GitHub Actions', 'AWS', 'Terraform',
      'Ansible', 'Monitoring', 'Nginx', 'Networking',
    ],
    projects: [
      { name: 'Docker Compose Stack', description: 'Multi-container app with Docker Compose', difficulty: 'Beginner' },
      { name: 'CI/CD Pipeline', description: 'Automated build and deploy pipeline', difficulty: 'Intermediate' },
      { name: 'K8s Cluster', description: 'Deploy an app on a Kubernetes cluster', difficulty: 'Advanced' },
    ],
  },
  'Mobile Development': {
    name: 'Mobile Development',
    description: 'Mobile app development roadmap covering React Native and Flutter.',
    icon: '📱',
    color: '#06b6d4',
    skills: [
      'JavaScript', 'React', 'React Native', 'Expo', 'Navigation',
      'State Management', 'APIs', 'Firebase', 'Push Notifications',
      'App Store Deployment', 'Flutter', 'Dart',
    ],
    projects: [
      { name: 'Todo App', description: 'Cross-platform todo app', difficulty: 'Beginner' },
      { name: 'Recipe App', description: 'Recipe finder with API integration', difficulty: 'Intermediate' },
      { name: 'Chat App', description: 'Real-time messaging app', difficulty: 'Advanced' },
    ],
  },
  'UI / UX Design': {
    name: 'UI / UX Design',
    description: 'UI/UX design roadmap covering research, wireframing, prototyping, and testing.',
    icon: '🎨',
    color: '#ec4899',
    skills: [
      'Design Thinking', 'User Research', 'Personas', 'Wireframing',
      'Prototyping', 'Figma', 'Color Theory', 'Typography',
      'Responsive Design', 'Usability Testing', 'Design Systems', 'Accessibility',
    ],
    projects: [
      { name: 'App Redesign', description: 'Redesign an existing app UI', difficulty: 'Beginner' },
      { name: 'Design System', description: 'Create a complete design system', difficulty: 'Intermediate' },
      { name: 'Case Study', description: 'End-to-end UX case study', difficulty: 'Advanced' },
    ],
  },
  'DSA & Placements': {
    name: 'DSA & Placements',
    description: 'Data Structures, Algorithms, and placement preparation roadmap.',
    icon: '🧠',
    color: '#f97316',
    skills: [
      'Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Queues',
      'Trees', 'BST', 'Graphs', 'Greedy', 'Dynamic Programming',
      'Backtracking', 'OS', 'DBMS', 'CN', 'OOPs', 'SQL',
      'Interview Preparation',
    ],
    projects: [
      { name: 'LeetCode Tracker', description: 'Track your LeetCode problem-solving progress', difficulty: 'Beginner' },
      { name: 'Algorithm Visualizer', description: 'Visual representations of sorting/searching algorithms', difficulty: 'Intermediate' },
      { name: 'Mock Interview Portfolio', description: 'Document mock interviews and feedback', difficulty: 'Intermediate' },
    ],
  },
};

/**
 * Generate a full roadmap object from a template key
 */
export const generateRoadmapFromTemplate = (templateKey) => {
  const template = templates[templateKey];
  if (!template) return null;

  return {
    id: uuidv4(),
    name: template.name,
    description: template.description,
    icon: template.icon,
    color: template.color,
    skills: template.skills.map(createSkill),
    projects: template.projects.map((p) => createProject(p.name, p.description, p.difficulty)),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Generate an empty roadmap for "Create From Scratch"
 */
export const generateEmptyRoadmap = (name = 'My Custom Roadmap') => ({
  id: uuidv4(),
  name,
  description: 'A custom roadmap created from scratch.',
  icon: '🚀',
  color: '#6366f1',
  skills: [],
  projects: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

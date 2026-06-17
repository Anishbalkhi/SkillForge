import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ProjectCard from './ProjectCard';
import { HiOutlinePlus } from 'react-icons/hi';

export default function ProjectList({ projects, onUpdateProjects }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', difficulty: 'Beginner' });

  const handleAdd = () => {
    if (!form.name.trim()) return;
    const newProject = {
      id: uuidv4(),
      name: form.name.trim(),
      description: form.description.trim(),
      difficulty: form.difficulty,
      status: 'Not Started',
      completionDate: null,
    };
    onUpdateProjects([...projects, newProject]);
    setForm({ name: '', description: '', difficulty: 'Beginner' });
    setShowAdd(false);
  };

  const handleUpdate = (updated) => {
    onUpdateProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDelete = (id) => {
    onUpdateProjects(projects.filter((p) => p.id !== id));
  };

  const completedCount = projects.filter((p) => p.status === 'Completed').length;
  const completionPct = projects.length > 0 ? Math.round((completedCount / projects.length) * 100) : 0;

  return (
    <div>
      {/* Completion header */}
      {projects.length > 0 && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {completedCount}/{projects.length} completed
          </span>
          <span className="text-sm font-bold text-primary-500">{completionPct}%</span>
        </div>
      )}

      {/* Add project */}
      {showAdd ? (
        <div className="space-y-3 mb-4 p-4 rounded-xl border border-primary-200 dark:border-primary-800/50 bg-primary-50/30 dark:bg-primary-900/10 animate-fade-in">
          <input
            autoFocus
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Project name"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
            placeholder="Description (optional)"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
          />
          <div className="flex items-center gap-3">
            <select
              value={form.difficulty}
              onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <button
              onClick={handleAdd}
              className="px-4 py-2 rounded-xl bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-default"
            >
              Add Project
            </button>
            <button
              onClick={() => { setShowAdd(false); setForm({ name: '', description: '', difficulty: 'Beginner' }); }}
              className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-default"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-200 dark:border-slate-600 text-sm text-gray-500 dark:text-gray-400 hover:border-primary-400 hover:text-primary-500 transition-default mb-4 w-full justify-center"
        >
          <HiOutlinePlus className="w-4 h-4" />
          Add Project
        </button>
      )}

      {/* Projects list */}
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">🛠️</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No projects yet. Add projects to practice what you learn!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 stagger-children">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

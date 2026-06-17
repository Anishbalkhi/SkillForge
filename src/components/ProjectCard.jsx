import { useState } from 'react';
import { HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi';

const STATUS_OPTIONS = ['Not Started', 'In Progress', 'Completed'];
const STATUS_BG = {
  'Not Started': 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300',
  'In Progress': 'bg-pastel-blue dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
  Completed: 'bg-pastel-mint dark:bg-primary-900/20 text-primary-700 dark:text-primary-300',
};
const DIFF_BG = {
  Beginner: 'bg-primary-500 text-white',
  Intermediate: 'bg-accent-orange text-white',
  Advanced: 'bg-accent-rose text-white',
};

export default function ProjectCard({ project, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: project.name, description: project.description, difficulty: project.difficulty });

  const handleSave = () => { if (form.name.trim()) onUpdate({ ...project, ...form, name: form.name.trim(), description: form.description.trim() }); setEditing(false); };
  const handleStatusChange = (status) => onUpdate({ ...project, status, completionDate: status === 'Completed' ? new Date().toISOString() : null });

  return (
    <div className="group card p-4 hover:shadow-md">
      {editing ? (
        <div className="space-y-3 animate-fade-in">
          <input autoFocus value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20" placeholder="Project name" />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none" placeholder="Description" />
          <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20">
            <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold">Beginner</option>
            <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold">Intermediate</option>
            <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold">Advanced</option>
          </select>
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-1.5 rounded-lg bg-primary-500 text-white text-xs font-bold hover:bg-primary-600 transition-default">Save</button>
            <button onClick={() => setEditing(false)} className="px-4 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold transition-default">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between mb-3">
            <div className="min-w-0">
              <h4 className={`font-bold text-sm ${project.status === 'Completed' ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}>{project.name}</h4>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{project.description}</p>
            </div>
            <div className="flex gap-0.5 flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><HiOutlinePencil className="w-3.5 h-3.5 text-gray-400" /></button>
              <button onClick={() => onDelete(project.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"><HiOutlineTrash className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" /></button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`pill text-[10px] ${DIFF_BG[project.difficulty] || DIFF_BG.Beginner}`}>{project.difficulty}</span>
            <select value={project.status} onChange={(e) => handleStatusChange(e.target.value)}
              className={`text-[11px] font-bold px-2 py-1 rounded-lg border-0 cursor-pointer focus:outline-none ${STATUS_BG[project.status]}`}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold">
                  {s}
                </option>
              ))}
            </select>
            {project.completionDate && <span className="text-[10px] text-gray-400 ml-auto font-medium">✓ {new Date(project.completionDate).toLocaleDateString()}</span>}
          </div>
        </>
      )}
    </div>
  );
}

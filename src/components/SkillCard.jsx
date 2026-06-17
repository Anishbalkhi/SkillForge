import { useState } from 'react';
import { HiOutlineTrash, HiOutlinePencil, HiOutlineCheck, HiOutlineX, HiOutlineExternalLink, HiOutlinePlus, HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';

const STATUS_OPTIONS = ['Not Started', 'Learning', 'Practicing', 'Completed'];
const STATUS_COLORS = {
  'Not Started': { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-300', dot: 'not-started' },
  Learning:      { bg: 'bg-pastel-yellow dark:bg-yellow-900/20', text: 'text-yellow-700 dark:text-yellow-300', dot: 'learning' },
  Practicing:    { bg: 'bg-pastel-blue dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-300', dot: 'practicing' },
  Completed:     { bg: 'bg-pastel-mint dark:bg-primary-900/20', text: 'text-primary-700 dark:text-primary-300', dot: 'completed' },
};

export default function SkillCard({ skill, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(skill.title);
  const [notes, setNotes] = useState(skill.notes || '');
  const [newResource, setNewResource] = useState('');
  const statusStyle = STATUS_COLORS[skill.status] || STATUS_COLORS['Not Started'];

  const handleSaveTitle = () => { if (editTitle.trim()) onUpdate({ ...skill, title: editTitle.trim() }); setEditing(false); };
  const handleStatusChange = (status) => onUpdate({ ...skill, status, completed: status === 'Completed' });
  const handleSaveNotes = () => onUpdate({ ...skill, notes });
  const handleAddResource = () => { if (newResource.trim()) { onUpdate({ ...skill, resources: [...(skill.resources || []), newResource.trim()] }); setNewResource(''); } };
  const handleRemoveResource = (i) => onUpdate({ ...skill, resources: skill.resources.filter((_, idx) => idx !== i) });
  const handleToggleComplete = () => { const c = !skill.completed; onUpdate({ ...skill, completed: c, status: c ? 'Completed' : 'Not Started' }); };

  return (
    <div className={`group rounded-xl border transition-all ${
      skill.completed
        ? 'border-primary-200/60 dark:border-primary-800/30 bg-primary-50/30 dark:bg-primary-900/5'
        : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-[#16181f] hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm'
    }`}>
      <div className="flex items-center gap-3 px-4 py-3">
        <button onClick={handleToggleComplete}
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            skill.completed ? 'border-primary-500 bg-primary-500' : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
          }`}>
          {skill.completed && <HiOutlineCheck className="w-3 h-3 text-white" />}
        </button>

        {editing ? (
          <div className="flex items-center gap-2 flex-1">
            <input autoFocus value={editTitle} onChange={(e) => setEditTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
              className="flex-1 px-3 py-1.5 rounded-lg border border-primary-300 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-gray-900 dark:text-white" />
            <button onClick={handleSaveTitle} className="text-primary-500 p-1"><HiOutlineCheck className="w-4 h-4" /></button>
            <button onClick={() => setEditing(false)} className="text-gray-400 p-1"><HiOutlineX className="w-4 h-4" /></button>
          </div>
        ) : (
          <span className={`flex-1 text-sm font-semibold ${skill.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}>{skill.title}</span>
        )}

        <div className="flex items-center gap-2">
          <span className={`status-dot ${statusStyle.dot}`} />
          <select value={skill.status} onChange={(e) => handleStatusChange(e.target.value)}
            className={`text-[11px] font-bold px-2 py-1 rounded-lg border-0 cursor-pointer focus:outline-none ${statusStyle.bg} ${statusStyle.text}`}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold">
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><HiOutlinePencil className="w-3.5 h-3.5 text-gray-400" /></button>
          <button onClick={() => onDelete(skill.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"><HiOutlineTrash className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" /></button>
          <button onClick={() => setExpanded(!expanded)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            {expanded ? <HiOutlineChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <HiOutlineChevronDown className="w-3.5 h-3.5 text-gray-400" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-50 dark:border-gray-800 animate-fade-in">
          <div className="mb-3">
            <label className="text-[10px] font-black text-gray-400 block mb-1.5 uppercase tracking-widest">Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} onBlur={handleSaveNotes} rows={2} placeholder="Add notes…"
              className="w-full text-sm px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 block mb-1.5 uppercase tracking-widest">Resources</label>
            {skill.resources?.length > 0 && (
              <ul className="space-y-1 mb-2">
                {skill.resources.map((res, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs group/res p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <HiOutlineExternalLink className="w-3 h-3 text-primary-500 flex-shrink-0" />
                    <a href={res.startsWith('http') ? res : `https://${res}`} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline truncate flex-1 font-medium">{res}</a>
                    <button onClick={() => handleRemoveResource(i)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover/res:opacity-100"><HiOutlineX className="w-3 h-3" /></button>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex gap-2">
              <input value={newResource} onChange={(e) => setNewResource(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddResource()} placeholder="Paste a link…"
                className="flex-1 text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
              <button onClick={handleAddResource} className="px-3 py-2 rounded-lg bg-primary-500 text-white text-xs font-bold hover:bg-primary-600 transition-default">
                <HiOutlinePlus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

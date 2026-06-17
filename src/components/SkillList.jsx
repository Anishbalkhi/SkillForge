import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SkillCard from './SkillCard';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import { HiOutlinePlus } from 'react-icons/hi';

const SKILL_FILTERS = ['All', 'Not Started', 'Learning', 'Practicing', 'Completed'];

export default function SkillList({ skills, onUpdateSkills }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [newSkillTitle, setNewSkillTitle] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = skills.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAdd = () => {
    if (!newSkillTitle.trim()) return;
    const newSkill = {
      id: uuidv4(),
      title: newSkillTitle.trim(),
      status: 'Not Started',
      notes: '',
      resources: [],
      completed: false,
    };
    onUpdateSkills([...skills, newSkill]);
    setNewSkillTitle('');
    setShowAdd(false);
  };

  const handleUpdate = (updated) => {
    onUpdateSkills(skills.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleDelete = (id) => {
    onUpdateSkills(skills.filter((s) => s.id !== id));
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <div className="flex-1 w-full sm:w-auto">
          <SearchBar value={search} onChange={setSearch} placeholder="Search skills…" />
        </div>
        <FilterBar filters={SKILL_FILTERS} activeFilter={filter} onChange={setFilter} label="Status:" />
      </div>

      {/* Add skill */}
      {showAdd ? (
        <div className="flex gap-2 mb-4 animate-fade-in">
          <input
            autoFocus
            value={newSkillTitle}
            onChange={(e) => setNewSkillTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Enter skill name…"
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-default"
          >
            Add
          </button>
          <button
            onClick={() => { setShowAdd(false); setNewSkillTitle(''); }}
            className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-default"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-200 dark:border-slate-600 text-sm text-gray-500 dark:text-gray-400 hover:border-primary-400 hover:text-primary-500 transition-default mb-4 w-full justify-center"
        >
          <HiOutlinePlus className="w-4 h-4" />
          Add Skill
        </button>
      )}

      {/* Skills list */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">📚</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {skills.length === 0
              ? 'No skills yet. Add your first skill to get started!'
              : 'No skills match your search or filter.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2 stagger-children">
          {filtered.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

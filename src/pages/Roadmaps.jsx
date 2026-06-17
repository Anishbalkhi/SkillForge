import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import RoadmapCard from '../components/RoadmapCard';
import RoadmapSelector from '../components/RoadmapSelector';
import SkillList from '../components/SkillList';
import ProjectList from '../components/ProjectList';
import SearchBar from '../components/SearchBar';
import { generateRoadmapFromTemplate, generateEmptyRoadmap } from '../data/templates';
import { calculateRoadmapProgress } from '../utils/progressCalculator';
import { HiOutlinePlus, HiOutlineArrowLeft, HiOutlinePencil, HiOutlineCheck, HiOutlineX } from 'react-icons/hi';

export default function Roadmaps({ roadmaps, setRoadmaps, onActivity }) {
  const [showSelector, setShowSelector] = useState(false);
  const [activeRoadmap, setActiveRoadmap] = useState(null);
  const [activeTab, setActiveTab] = useState('skills');
  const [search, setSearch] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleSelectTemplate = (key) => { const rm = generateRoadmapFromTemplate(key); if (rm) { setRoadmaps((p) => [...p, rm]); setShowSelector(false); onActivity(); } };
  const handleCreateScratch = () => { const name = prompt('Roadmap name:', 'My Custom Roadmap'); if (name) { setRoadmaps((p) => [...p, generateEmptyRoadmap(name)]); setShowSelector(false); onActivity(); } };
  const handleDeleteRoadmap = (id) => { if (confirm('Delete this roadmap?')) { setRoadmaps((p) => p.filter((r) => r.id !== id)); if (activeRoadmap?.id === id) setActiveRoadmap(null); } };
  const handleDuplicateRoadmap = (rm) => { const d = { ...JSON.parse(JSON.stringify(rm)), id: uuidv4(), name: `${rm.name} (Copy)`, createdAt: new Date().toISOString() }; d.skills = d.skills.map((s) => ({ ...s, id: uuidv4() })); d.projects = d.projects.map((p) => ({ ...p, id: uuidv4() })); setRoadmaps((p) => [...p, d]); };
  const handleEditRoadmap = (rm) => { setEditName(rm.name); setEditDescription(rm.description); setEditingName(rm.id); };
  const handleSaveEdit = () => { setRoadmaps((p) => p.map((r) => r.id === editingName ? { ...r, name: editName.trim() || r.name, description: editDescription.trim(), updatedAt: new Date().toISOString() } : r)); if (activeRoadmap?.id === editingName) setActiveRoadmap((p) => ({ ...p, name: editName.trim() || p.name, description: editDescription.trim() })); setEditingName(false); };
  const handleUpdateSkills = (skills) => { setRoadmaps((p) => p.map((r) => r.id === activeRoadmap.id ? { ...r, skills, updatedAt: new Date().toISOString() } : r)); setActiveRoadmap((p) => ({ ...p, skills })); onActivity(); };
  const handleUpdateProjects = (projects) => { setRoadmaps((p) => p.map((r) => r.id === activeRoadmap.id ? { ...r, projects, updatedAt: new Date().toISOString() } : r)); setActiveRoadmap((p) => ({ ...p, projects })); onActivity(); };

  const filtered = roadmaps.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  // Detail view
  if (activeRoadmap) {
    const current = roadmaps.find((r) => r.id === activeRoadmap.id) || activeRoadmap;
    const progress = calculateRoadmapProgress(current);
    return (
      <div className="animate-fade-in space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setActiveRoadmap(null)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-default group">
            <HiOutlineArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white group-hover:-translate-x-1 transition-all" />
          </button>
          <div className="flex-1 min-w-0">
            {editingName === current.id ? (
              <div className="flex items-center gap-2">
                <input autoFocus value={editName} onChange={(e) => setEditName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                  className="text-xl font-black px-3 py-1.5 rounded-xl border border-primary-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-gray-900 dark:text-white" />
                <button onClick={handleSaveEdit} className="text-primary-500 p-1"><HiOutlineCheck className="w-5 h-5" /></button>
                <button onClick={() => setEditingName(false)} className="text-gray-400 p-1"><HiOutlineX className="w-5 h-5" /></button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-2xl">{current.icon}</span>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white truncate">{current.name}</h2>
                <button onClick={() => handleEditRoadmap(current)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 opacity-50 hover:opacity-100"><HiOutlinePencil className="w-4 h-4 text-gray-400" /></button>
              </div>
            )}
            <p className="text-sm text-gray-500 truncate mt-0.5">{current.description}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Progress</span>
            <span className="text-sm font-black text-gray-900 dark:text-white">{current.skills?.filter((s) => s.completed).length || 0}/{current.skills?.length || 0} skills • {progress}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-primary-500 transition-all duration-700 animate-progress-fill relative" style={{ width: `${progress}%` }}>
              <div className="absolute inset-0 shimmer" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          {['skills', 'projects'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-bold transition-default capitalize ${
                activeTab === tab ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}>{tab} ({tab === 'skills' ? current.skills?.length || 0 : current.projects?.length || 0})</button>
          ))}
        </div>

        {activeTab === 'skills' ? <SkillList skills={current.skills || []} onUpdateSkills={handleUpdateSkills} /> : <ProjectList projects={current.projects || []} onUpdateProjects={handleUpdateProjects} />}
      </div>
    );
  }

  // List view
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Roadmaps</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your career learning paths</p>
        </div>
        <button onClick={() => setShowSelector(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold hover:scale-105 transition-default">
          <HiOutlinePlus className="w-4 h-4" /> Create Roadmap
        </button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search roadmaps…" />

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4 animate-float">🗺️</div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{roadmaps.length === 0 ? 'No Roadmaps Yet' : 'No results'}</h3>
          <p className="text-gray-500 text-sm mb-6">{roadmaps.length === 0 ? 'Create your first roadmap to start!' : 'Try different keywords.'}</p>
          {roadmaps.length === 0 && (
            <button onClick={() => setShowSelector(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-500 text-white text-sm font-bold hover:bg-primary-600 transition-default">
              <HiOutlinePlus className="w-4 h-4" /> Create Roadmap
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 stagger-children">
          {filtered.map((rm) => <RoadmapCard key={rm.id} roadmap={rm} onSelect={setActiveRoadmap} onDelete={handleDeleteRoadmap} onDuplicate={handleDuplicateRoadmap} onEdit={handleEditRoadmap} />)}
        </div>
      )}

      {editingName && !activeRoadmap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="card shadow-2xl w-full max-w-md mx-4 p-6 animate-scale-in">
            <div className="h-1.5 bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 -mx-6 -mt-6 mb-6 rounded-t-2xl" />
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-4">Edit Roadmap</h3>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-black text-gray-400 mb-1.5 block uppercase tracking-widest">Name</label>
                <input autoFocus value={editName} onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 mb-1.5 block uppercase tracking-widest">Description</label>
                <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleSaveEdit} className="flex-1 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-bold hover:bg-primary-600 transition-default">Save</button>
              <button onClick={() => setEditingName(false)} className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-bold transition-default">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showSelector && <RoadmapSelector onSelect={handleSelectTemplate} onCreateScratch={handleCreateScratch} onClose={() => setShowSelector(false)} />}
    </div>
  );
}

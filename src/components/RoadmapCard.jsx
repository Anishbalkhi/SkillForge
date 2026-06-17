import { HiOutlineTrash, HiOutlineDuplicate, HiOutlinePencil, HiOutlineArrowRight } from 'react-icons/hi';
import { calculateRoadmapProgress } from '../utils/progressCalculator';

const CARD_COLORS = [
  'from-primary-400 to-teal-500',
  'from-purple-400 to-violet-500',
  'from-orange-400 to-amber-500',
  'from-pink-400 to-rose-500',
  'from-blue-400 to-indigo-500',
  'from-yellow-400 to-orange-400',
  'from-teal-400 to-cyan-500',
  'from-rose-400 to-red-500',
];

export default function RoadmapCard({ roadmap, onSelect, onDelete, onDuplicate, onEdit }) {
  const progress = calculateRoadmapProgress(roadmap);
  const completedSkills = roadmap.skills?.filter((s) => s.completed).length || 0;
  const totalSkills = roadmap.skills?.length || 0;
  const completedProjects = roadmap.projects?.filter((p) => p.status === 'Completed').length || 0;
  const totalProjects = roadmap.projects?.length || 0;

  // Pick a consistent color based on roadmap name hash
  const hash = roadmap.name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const colorClass = CARD_COLORS[hash % CARD_COLORS.length];

  return (
    <div className="card group overflow-hidden cursor-pointer hover:shadow-lg" onClick={() => onSelect(roadmap)}>
      {/* Vibrant colored header */}
      <div className={`h-28 bg-gradient-to-br ${colorClass} relative overflow-hidden`}>
        {/* Decorative circles */}
        <div className="absolute top-3 right-3 w-16 h-16 rounded-full bg-white/15" />
        <div className="absolute bottom-2 right-10 w-8 h-8 rounded-full bg-white/10" />
        <div className="absolute top-4 left-4">
          <span className="text-4xl drop-shadow-sm">{roadmap.icon || '📋'}</span>
        </div>
        <div className="absolute bottom-3 left-4">
          <span className="pill bg-white/25 text-white text-[10px] font-black uppercase">{progress}% done</span>
        </div>
        {/* Actions */}
        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
          <button onClick={(e) => { e.stopPropagation(); onEdit(roadmap); }}
            className="p-1.5 rounded-lg bg-white/20 hover:bg-white/40 text-white transition-default">
            <HiOutlinePencil className="w-3.5 h-3.5" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDuplicate(roadmap); }}
            className="p-1.5 rounded-lg bg-white/20 hover:bg-white/40 text-white transition-default">
            <HiOutlineDuplicate className="w-3.5 h-3.5" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(roadmap.id); }}
            className="p-1.5 rounded-lg bg-white/20 hover:bg-red-400/50 text-white transition-default">
            <HiOutlineTrash className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-black text-gray-900 dark:text-white text-base mb-1 truncate">{roadmap.name}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-4">{roadmap.description}</p>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
          <div className={`h-full rounded-full bg-gradient-to-r ${colorClass} transition-all duration-700 animate-progress-fill relative`}
            style={{ width: `${progress}%` }}>
            <div className="absolute inset-0 shimmer" />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span><span className="font-bold text-gray-900 dark:text-white">{completedSkills}</span>/{totalSkills} skills</span>
            <span><span className="font-bold text-gray-900 dark:text-white">{completedProjects}</span>/{totalProjects} projects</span>
          </div>
          <div className="p-1.5 rounded-full bg-gray-50 dark:bg-gray-800 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-default">
            <HiOutlineArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary-500 transition-default" />
          </div>
        </div>
      </div>
    </div>
  );
}

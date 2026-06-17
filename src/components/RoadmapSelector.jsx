import { templates } from '../data/templates';
import { HiOutlineX, HiOutlinePlus } from 'react-icons/hi';

const templateKeys = Object.keys(templates);
const TEMPLATE_COLORS = ['bg-pastel-mint', 'bg-pastel-purple', 'bg-pastel-orange', 'bg-pastel-pink', 'bg-pastel-blue', 'bg-pastel-yellow', 'bg-pastel-teal', 'bg-pastel-rose'];

export default function RoadmapSelector({ onSelect, onCreateScratch, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="card shadow-2xl w-full max-w-2xl mx-4 max-h-[85vh] overflow-hidden animate-scale-in">
        {/* Header with colored strip */}
        <div className="h-1.5 bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400" />
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white">Create Roadmap</h2>
              <p className="text-sm text-gray-500 mt-0.5">Choose a template or start from scratch</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-default group">
              <HiOutlineX className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:rotate-90 transition-all" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh] stagger-children">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {templateKeys.map((key, i) => {
              const t = templates[key];
              const bgColor = TEMPLATE_COLORS[i % TEMPLATE_COLORS.length];
              return (
                <button key={key} onClick={() => onSelect(key)}
                  className="group text-left rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all hover:shadow-md hover:scale-[1.02]">
                  <div className={`${bgColor} p-4 flex items-center gap-3`}>
                    <span className="text-3xl">{t.icon}</span>
                    <div>
                      <h3 className="font-black text-gray-900 dark:text-white text-sm">{t.name}</h3>
                      <p className="text-[11px] text-gray-600 dark:text-gray-300 line-clamp-1 mt-0.5">{t.description}</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-white dark:bg-[#16181f] flex gap-2">
                    <span className="pill bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-[10px]">{t.skills.length} skills</span>
                    <span className="pill bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-[10px]">{t.projects.length} projects</span>
                  </div>
                </button>
              );
            })}

            <button onClick={onCreateScratch}
              className="group rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 p-6 flex items-center gap-4 transition-all hover:bg-primary-50/50 dark:hover:bg-primary-900/10">
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-default group-hover:scale-110 group-hover:rotate-3">
                <HiOutlinePlus className="w-6 h-6 text-gray-400 group-hover:text-primary-500 group-hover:rotate-90 transition-all" />
              </div>
              <div className="text-left">
                <h3 className="font-black text-gray-900 dark:text-white text-sm group-hover:text-primary-600">Create From Scratch</h3>
                <p className="text-xs text-gray-500 mt-0.5">Build your own custom roadmap</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

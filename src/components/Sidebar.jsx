import { Link, useLocation } from 'react-router-dom';
import { HiOutlineHome, HiOutlineMap, HiOutlineChartBar, HiOutlineSparkles } from 'react-icons/hi';

const sideItems = [
  { path: '/', label: 'Dashboard', icon: HiOutlineHome },
  { path: '/roadmaps', label: 'Roadmaps', icon: HiOutlineMap },
  { path: '/analytics', label: 'Analytics', icon: HiOutlineChartBar },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside className="hidden lg:flex flex-col w-60 h-[calc(100vh-4rem)] sticky top-16 border-r border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-[#0c0d12]/50">
      <div className="flex-1 py-6 px-3 space-y-1">
        {sideItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-default ${
                active
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
              }`}>
              <item.icon className={`w-5 h-5 ${active ? 'text-primary-500' : ''}`} />
              {item.label}
              {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500" />}
            </Link>
          );
        })}
      </div>
      <div className="p-3 border-t border-gray-100 dark:border-gray-800">
        <div className="p-4 rounded-2xl bg-pastel-mint dark:bg-primary-900/20">
          <div className="flex items-center gap-2 mb-2">
            <HiOutlineSparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="text-xs font-bold text-primary-700 dark:text-primary-300 uppercase tracking-wider">Tip</span>
          </div>
          <p className="text-xs text-primary-800/70 dark:text-primary-300/70 leading-relaxed">
            Track daily to keep your streak alive and boost readiness!
          </p>
        </div>
      </div>
    </aside>
  );
}

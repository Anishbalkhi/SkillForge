import DashboardCards from '../components/DashboardCards';
import AnalyticsCharts from '../components/AnalyticsCharts';
import { getGlobalStats } from '../utils/progressCalculator';
import { calculateReadiness } from '../utils/readinessCalculator';
import { Link } from 'react-router-dom';
import { HiOutlinePlus, HiOutlineChartBar, HiOutlineArrowRight } from 'react-icons/hi';

export default function Dashboard({ roadmaps, streak, achievements, darkMode }) {
  const stats = getGlobalStats(roadmaps);
  const readiness = calculateReadiness(roadmaps);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ===== Hero ===== */}
      <div className="relative overflow-hidden rounded-3xl">
        {/* Colorful background – mint gradient with decorative shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-primary-500 to-teal-600" />

        {/* Decorative elements inspired by the reference */}
        <div className="absolute top-6 right-8 w-24 h-24 rounded-full bg-yellow-300/30 animate-float-slow" />
        <div className="absolute top-16 right-24 w-16 h-16 rounded-full bg-purple-400/25 animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-4 left-8 w-20 h-20 rounded-2xl bg-white/10 rotate-12 animate-float-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-4 left-[30%] w-3 h-3 rounded-full bg-yellow-300 animate-pulse-soft" />
        <div className="absolute bottom-8 right-[40%] w-2 h-2 rounded-full bg-white animate-pulse-soft" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 p-8 sm:p-10 lg:p-12">
          <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-white/90 text-xs font-bold mb-4 tracking-wide uppercase">
            Career Growth Platform
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight">
            Welcome to SkillForge
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-lg font-medium mb-8">
            Build Skills. Track Progress. Reach Your Goal.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/roadmaps"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 text-sm font-bold hover:bg-gray-50 transition-default shadow-lg shadow-black/10 hover:scale-105">
              <HiOutlinePlus className="w-4 h-4" /> Create Roadmap
            </Link>
            <Link to="/analytics"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 text-white text-sm font-bold hover:bg-white/30 transition-default border border-white/25">
              <HiOutlineChartBar className="w-4 h-4" /> View Analytics
            </Link>
          </div>
        </div>
      </div>

      {/* ===== Stats ===== */}
      <DashboardCards stats={stats} readinessScore={readiness.score} />

      {/* ===== Bento Grid: Actions + Streak + Badges ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quick Actions */}
        <div className="card p-6">
          <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-widest">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { to: '/roadmaps', label: 'New Roadmap', color: 'bg-pastel-mint dark:bg-primary-900/20', textColor: 'text-primary-700 dark:text-primary-300', icon: '🗺️' },
              { to: '/analytics', label: 'View Analytics', color: 'bg-pastel-purple dark:bg-purple-900/20', textColor: 'text-purple-700 dark:text-purple-300', icon: '📊' },
              { to: '/roadmaps', label: 'Track Progress', color: 'bg-pastel-orange dark:bg-orange-900/20', textColor: 'text-orange-700 dark:text-orange-300', icon: '🎯' },
            ].map((a) => (
              <Link key={a.label} to={a.to}
                className={`group flex items-center gap-3 p-3 rounded-xl ${a.color} transition-default hover:scale-[1.02]`}>
                <span className="text-xl">{a.icon}</span>
                <span className={`text-sm font-bold ${a.textColor}`}>{a.label}</span>
                <HiOutlineArrowRight className={`w-4 h-4 ml-auto ${a.textColor} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
              </Link>
            ))}
          </div>
        </div>

        {/* Streak */}
        <div className="card overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400" />
          <div className="p-6 text-center">
            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-widest">Learning Streak</h3>
            <div className="relative inline-block mb-2">
              <span className="text-7xl font-black text-gray-900 dark:text-white">{streak}</span>
              <span className="absolute -top-3 -right-8 text-3xl animate-float">🔥</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {streak === 1 ? 'day' : 'days'} in a row
            </p>
            <div className="mt-4 p-3 rounded-xl bg-pastel-orange dark:bg-orange-900/15">
              <p className="text-xs text-orange-700 dark:text-orange-300 font-semibold">
                Update a skill daily to keep it going! 💪
              </p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="card p-6">
          <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-widest">Achievement Badges</h3>
          <div className="grid grid-cols-3 gap-2">
            {achievements.map((badge) => (
              <div key={badge.id} title={badge.description}
                className={`text-center p-2 rounded-xl transition-all cursor-default ${
                  badge.unlocked
                    ? 'bg-pastel-yellow dark:bg-yellow-900/15 hover:scale-110'
                    : 'bg-gray-50 dark:bg-gray-800/50 opacity-30 grayscale'
                }`}>
                <span className="text-xl block">{badge.icon}</span>
                <p className="text-[8px] font-black text-gray-600 dark:text-gray-300 mt-1 uppercase tracking-wider leading-tight">{badge.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Charts ===== */}
      <AnalyticsCharts roadmaps={roadmaps} darkMode={darkMode} />
    </div>
  );
}

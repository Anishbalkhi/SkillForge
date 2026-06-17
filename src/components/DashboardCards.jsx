import { HiOutlineMap, HiOutlineLightningBolt, HiOutlineCheckCircle, HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineSparkles } from 'react-icons/hi';

const cardConfig = [
  { key: 'totalRoadmaps',    label: 'Total Roadmaps',  icon: HiOutlineMap,            bg: 'bg-pastel-mint dark:bg-primary-900/15',    iconBg: 'bg-primary-500',    text: 'text-primary-700 dark:text-primary-300' },
  { key: 'totalSkills',      label: 'Total Skills',     icon: HiOutlineLightningBolt,  bg: 'bg-pastel-purple dark:bg-purple-900/15',   iconBg: 'bg-accent-purple',  text: 'text-purple-700 dark:text-purple-300' },
  { key: 'completedSkills',  label: 'Completed',        icon: HiOutlineCheckCircle,    bg: 'bg-pastel-teal dark:bg-teal-900/15',       iconBg: 'bg-accent-teal',    text: 'text-teal-700 dark:text-teal-300' },
  { key: 'learningSkills',   label: 'Learning',         icon: HiOutlineAcademicCap,    bg: 'bg-pastel-yellow dark:bg-yellow-900/15',   iconBg: 'bg-accent-yellow',  text: 'text-yellow-700 dark:text-yellow-300' },
  { key: 'completedProjects',label: 'Projects Done',    icon: HiOutlineBriefcase,      bg: 'bg-pastel-pink dark:bg-pink-900/15',       iconBg: 'bg-accent-pink',    text: 'text-pink-700 dark:text-pink-300' },
  { key: 'readinessScore',   label: 'Readiness',        icon: HiOutlineSparkles,       bg: 'bg-pastel-orange dark:bg-orange-900/15',   iconBg: 'bg-accent-orange',  text: 'text-orange-700 dark:text-orange-300', suffix: '%' },
];

export default function DashboardCards({ stats, readinessScore }) {
  const merged = { ...stats, readinessScore };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 stagger-children">
      {cardConfig.map((c) => (
        <div key={c.key} className={`rounded-2xl p-5 ${c.bg} transition-default hover:scale-[1.03] cursor-default`}>
          <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center mb-3 shadow-sm`}>
            <c.icon className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            {merged[c.key] ?? 0}{c.suffix || ''}
          </p>
          <p className={`text-[11px] font-bold mt-1 uppercase tracking-widest ${c.text}`}>
            {c.label}
          </p>
        </div>
      ))}
    </div>
  );
}

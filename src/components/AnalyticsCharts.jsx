import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area, Legend, RadialBarChart, RadialBar,
} from 'recharts';
import { getSkillsDistributionData, getRoadmapProgressData } from '../utils/progressCalculator';
import { calculateReadiness, getReadinessColor } from '../utils/readinessCalculator';

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  if (percent < 0.05) return null;
  return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={800}>{`${(percent * 100).toFixed(0)}%`}</text>;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl px-4 py-3 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-gray-100">
      {label && <p className="text-xs font-bold text-gray-400 mb-1">{label}</p>}
      {payload.map((e, i) => <p key={i} className="text-sm font-bold" style={{ color: e.color || e.fill }}>{e.name}: {e.value}</p>)}
    </div>
  );
};

export default function AnalyticsCharts({ roadmaps, darkMode }) {
  const distributionData = getSkillsDistributionData(roadmaps);
  const roadmapProgressData = getRoadmapProgressData(roadmaps);
  const readiness = calculateReadiness(roadmaps);
  const readinessColor = getReadinessColor(readiness.score);
  const projectsData = roadmaps.map((rm) => ({
    name: rm.name.length > 12 ? rm.name.substring(0, 12) + '…' : rm.name,
    completed: rm.projects?.filter((p) => p.status === 'Completed').length || 0,
    inProgress: rm.projects?.filter((p) => p.status === 'In Progress').length || 0,
    notStarted: rm.projects?.filter((p) => p.status === 'Not Started').length || 0,
  }));
  const radialData = [{ name: 'Readiness', value: readiness.score, fill: readinessColor }];

  if (roadmaps.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4 animate-float">📊</div>
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">No Data Yet</h3>
        <p className="text-gray-500 text-sm">Create your first roadmap to see analytics.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Readiness */}
        <div className="card p-6">
          <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 mb-5 uppercase tracking-widest">Career Readiness</h3>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-36 h-36 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}>
                  <RadialBar dataKey="value" cornerRadius={10} background={{ fill: darkMode ? '#1f2937' : '#f3f4f6' }} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-3xl font-black" style={{ color: readinessColor }}>{readiness.score}%</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{readiness.level}</p>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="space-y-3 mb-4">
                {readiness.breakdown && Object.entries(readiness.breakdown).map(([key, val]) => (
                  <div key={key}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400 capitalize font-semibold">{key}</span>
                      <span className="font-black text-gray-900 dark:text-white">{val}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-primary-500 transition-all duration-700 animate-progress-fill" style={{ width: `${val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              {readiness.suggestions.length > 0 && (
                <div className="p-3 rounded-xl bg-pastel-mint dark:bg-primary-900/10">
                  <p className="text-xs font-bold text-primary-700 dark:text-primary-300 mb-1">Suggestions</p>
                  <ul className="space-y-0.5">
                    {readiness.suggestions.map((s, i) => <li key={i} className="text-xs text-primary-800/70 dark:text-primary-300/70">› {s}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pie */}
        <div className="card p-6">
          <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 mb-5 uppercase tracking-widest">Skills Distribution</h3>
          {distributionData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={distributionData} cx="50%" cy="50%" labelLine={false} label={renderCustomLabel} outerRadius={105} innerRadius={40} dataKey="value" strokeWidth={3} stroke="transparent">
                  {distributionData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} formatter={(v) => <span className="text-xs text-gray-500 font-medium">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="text-center text-gray-400 py-16 text-sm">No data yet</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-6">
          <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 mb-5 uppercase tracking-widest">Roadmap Progress</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={roadmapProgressData} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#1f2937' : '#f3f4f6'} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="progress" fill="#10b981" radius={[8, 8, 0, 0]} name="Progress %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-6">
          <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 mb-5 uppercase tracking-widest">Projects Progress</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={projectsData} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#1f2937' : '#f3f4f6'} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(v) => <span className="text-xs text-gray-500 font-medium">{v}</span>} />
              <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
              <Bar dataKey="inProgress" stackId="a" fill="#3b82f6" name="In Progress" />
              <Bar dataKey="notStarted" stackId="a" fill={darkMode ? '#374151' : '#d1d5db'} name="Not Started" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 mb-5 uppercase tracking-widest">Completed vs Remaining</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={roadmapProgressData}>
            <defs>
              <linearGradient id="cGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
              <linearGradient id="tGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} /><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} /></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#1f2937' : '#f3f4f6'} vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={(v) => <span className="text-xs text-gray-500 font-medium">{v}</span>} />
            <Area type="monotone" dataKey="skills" stroke="#8b5cf6" fill="url(#tGrad)" name="Total Skills" strokeWidth={2.5} />
            <Area type="monotone" dataKey="completed" stroke="#10b981" fill="url(#cGrad)" name="Completed" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

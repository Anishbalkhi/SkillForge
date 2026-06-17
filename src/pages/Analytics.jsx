import AnalyticsCharts from '../components/AnalyticsCharts';

export default function Analytics({ roadmaps, darkMode }) {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Insights into your learning progress and career readiness
        </p>
      </div>
      <AnalyticsCharts roadmaps={roadmaps} darkMode={darkMode} />
    </div>
  );
}

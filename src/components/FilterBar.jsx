export default function FilterBar({ filters, activeFilter, onChange, label = 'Filter:' }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-1">{label}</span>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-default ${
            activeFilter === f
              ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
              : 'bg-gray-100 dark:bg-slate-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600/50'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

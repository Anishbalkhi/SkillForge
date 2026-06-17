import { HiOutlineSearch } from 'react-icons/hi';

export default function SearchBar({ value, onChange, placeholder = 'Search…' }) {
  return (
    <div className="relative group">
      <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-primary-500 transition-default" />
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#16181f] text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-default" />
    </div>
  );
}

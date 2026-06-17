import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineHome, HiOutlineMap, HiOutlineChartBar, HiOutlineSun, HiOutlineMoon, HiOutlineMenu, HiOutlineX, HiOutlineDownload, HiOutlineUpload } from 'react-icons/hi';

const navItems = [
  { path: '/', label: 'Dashboard', icon: HiOutlineHome },
  { path: '/roadmaps', label: 'Roadmaps', icon: HiOutlineMap },
  { path: '/analytics', label: 'Analytics', icon: HiOutlineChartBar },
];

export default function Navbar({ darkMode, toggleDarkMode, onExport, onImport }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => { try { onImport(JSON.parse(ev.target.result)); } catch { alert('Invalid JSON.'); } };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <nav className="sticky top-0 z-50 glass-nav">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white text-sm font-black">SF</span>
            </div>
            <span className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
              Skill<span className="text-primary-500">Forge</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-default ${
                    active
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}>
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button onClick={onExport} title="Export" className="p-2 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-default">
              <HiOutlineDownload className="w-5 h-5" />
            </button>
            <button onClick={handleImport} title="Import" className="p-2 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-default">
              <HiOutlineUpload className="w-5 h-5" />
            </button>
            <button onClick={toggleDarkMode} title="Toggle theme"
              className="p-2 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-default">
              {darkMode ? <HiOutlineSun className="w-5 h-5 text-amber-400" /> : <HiOutlineMoon className="w-5 h-5" />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-default">
              {mobileOpen ? <HiOutlineX className="w-5 h-5" /> : <HiOutlineMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-default ${
                    active ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}>
                  <item.icon className="w-5 h-5" /> {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

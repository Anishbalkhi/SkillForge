import { useState, useEffect, useMemo, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Roadmaps from './pages/Roadmaps';
import Analytics from './pages/Analytics';
import { useLocalStorage } from './hooks/useLocalStorage';

const BADGE_DEFINITIONS = [
  { id: 'first-roadmap', name: 'Trailblazer', icon: '🗺️', description: 'Create your first roadmap', check: (r) => r.length >= 1 },
  { id: 'five-skills', name: 'Skill Hunter', icon: '🎯', description: 'Track 5 skills', check: (r) => r.reduce((a, rm) => a + (rm.skills?.length || 0), 0) >= 5 },
  { id: 'first-complete', name: 'Completionist', icon: '✅', description: 'Complete your first skill', check: (r) => r.some((rm) => rm.skills?.some((s) => s.completed)) },
  { id: 'ten-complete', name: 'Decathlon', icon: '🏅', description: 'Complete 10 skills', check: (r) => r.reduce((a, rm) => a + (rm.skills?.filter((s) => s.completed).length || 0), 0) >= 10 },
  { id: 'first-project', name: 'Builder', icon: '🛠️', description: 'Complete your first project', check: (r) => r.some((rm) => rm.projects?.some((p) => p.status === 'Completed')) },
  { id: 'three-roadmaps', name: 'Multi-Tracker', icon: '🚀', description: 'Create 3 roadmaps', check: (r) => r.length >= 3 },
  { id: 'half-skills', name: 'Halfway There', icon: '⚡', description: 'Complete 50% of all skills', check: (r) => { const t = r.reduce((a, rm) => a + (rm.skills?.length || 0), 0); const c = r.reduce((a, rm) => a + (rm.skills?.filter((s) => s.completed).length || 0), 0); return t > 0 && c / t >= 0.5; } },
  { id: 'note-taker', name: 'Note Taker', icon: '📝', description: 'Add notes to 5 skills', check: (r) => r.reduce((a, rm) => a + (rm.skills?.filter((s) => s.notes?.trim()).length || 0), 0) >= 5 },
  { id: 'resourceful', name: 'Resourceful', icon: '📚', description: 'Add resources to 5 skills', check: (r) => r.reduce((a, rm) => a + (rm.skills?.filter((s) => s.resources?.length > 0).length || 0), 0) >= 5 },
];

export default function App() {
  const [roadmaps, setRoadmaps] = useLocalStorage('skillforge-roadmaps', []);
  const [darkMode, setDarkMode] = useLocalStorage('skillforge-darkmode', false);
  const [streakData, setStreakData] = useLocalStorage('skillforge-streak', { count: 0, lastDate: null });
  const [settings, setSettings] = useLocalStorage('skillforge-settings', {});

  useEffect(() => { document.documentElement.classList.toggle('dark', darkMode); }, [darkMode]);
  const toggleDarkMode = useCallback(() => setDarkMode((p) => !p), [setDarkMode]);

  const recordActivity = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    setStreakData((prev) => {
      if (prev.lastDate === today) return prev;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      return { count: prev.lastDate === yesterday ? prev.count + 1 : 1, lastDate: today };
    });
  }, [setStreakData]);

  const achievements = useMemo(() => BADGE_DEFINITIONS.map((b) => ({ ...b, unlocked: b.check(roadmaps) })), [roadmaps]);

  const handleExport = useCallback(() => {
    const d = { roadmaps, settings, streakData, exportDate: new Date().toISOString(), version: '1.0.0' };
    const blob = new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `skillforge-${new Date().toISOString().split('T')[0]}.json`; a.click();
    URL.revokeObjectURL(url);
  }, [roadmaps, settings, streakData]);

  const handleImport = useCallback((data) => {
    if (data.roadmaps && Array.isArray(data.roadmaps)) {
      const merge = confirm('Merge with existing data? Cancel to replace.');
      if (merge) { setRoadmaps((p) => { const ids = new Set(p.map((r) => r.id)); return [...p, ...data.roadmaps.filter((r) => !ids.has(r.id))]; }); }
      else { setRoadmaps(data.roadmaps); }
      if (data.streakData) setStreakData(data.streakData);
      if (data.settings) setSettings(data.settings);
      alert('Imported!');
    } else { alert('Invalid format.'); }
  }, [setRoadmaps, setStreakData, setSettings]);

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="min-h-screen flex flex-col bg-[#fafbfc] dark:bg-[#0c0d12] transition-colors duration-300">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} onExport={handleExport} onImport={handleImport} />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1200px] w-full mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard roadmaps={roadmaps} streak={streakData.count} achievements={achievements} darkMode={darkMode} />} />
                <Route path="/roadmaps" element={<Roadmaps roadmaps={roadmaps} setRoadmaps={setRoadmaps} onActivity={recordActivity} />} />
                <Route path="/analytics" element={<Analytics roadmaps={roadmaps} darkMode={darkMode} />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

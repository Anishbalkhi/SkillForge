export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0c0d12] mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center">
              <span className="text-white text-xs font-black">SF</span>
            </div>
            <span className="font-black text-gray-900 dark:text-white">
              Skill<span className="text-primary-500">Forge</span>
            </span>
            <span className="hidden sm:inline text-xs text-gray-400 ml-1">Build Skills. Track Progress.</span>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Crafted by <span className="font-bold text-gray-900 dark:text-white">Mohd Anis Balkhi</span>
            </p>
            <p className="text-xs text-gray-400 mt-0.5">anisbalkhi@gmail.com</p>
          </div>

          <a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold hover:scale-105 transition-default">
            🦸 Built for Digital Heroes
          </a>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-50 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} SkillForge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

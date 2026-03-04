import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600">EDU-CI</h1>
        </div>
        <nav className="mt-6 space-y-1">
          <Link href="/dashboard" className="block px-6 py-2 text-gray-700 hover:bg-gray-100 hover:text-indigo-600">
            Tableau de bord
          </Link>
          <Link href="/dashboard/students" className="block px-6 py-2 text-gray-700 hover:bg-gray-100 hover:text-indigo-600">
            Élèves
          </Link>
          <Link href="/dashboard/teachers" className="block px-6 py-2 text-gray-700 hover:bg-gray-100 hover:text-indigo-600">
            Enseignants
          </Link>
          <Link href="/dashboard/grades" className="block px-6 py-2 text-gray-700 hover:bg-gray-100 hover:text-indigo-600">
            Notes & Bulletins
          </Link>
          <Link href="/dashboard/attendance" className="block px-6 py-2 text-gray-700 hover:bg-gray-100 hover:text-indigo-600">
            Présences
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
          <div className="flex items-center">
            <span className="text-gray-500">Année Scolaire 2025-2026</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">Notifications</button>
            <div className="relative">
              <button className="flex items-center space-x-2 text-gray-700 focus:outline-none">
                <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
                <span>Admin</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

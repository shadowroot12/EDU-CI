export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
              {/* Icon placeholder */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700">Élèves</h2>
              <p className="text-2xl font-bold text-gray-900">1,245</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700">Présence</h2>
              <p className="text-2xl font-bold text-gray-900">98.5%</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700">Retards</h2>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full text-red-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700">Alertes</h2>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity or Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Actions Rapides</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded text-indigo-700 font-medium">
              + Saisir une absence
            </button>
            <button className="w-full text-left px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded text-indigo-700 font-medium">
              + Ajouter une note
            </button>
            <button className="w-full text-left px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded text-indigo-700 font-medium">
              + Envoyer un message aux parents
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Dernières Actualités</h3>
          <ul className="space-y-3">
             <li className="flex items-start">
               <span className="flex-shrink-0 h-2 w-2 mt-2 bg-indigo-500 rounded-full"></span>
               <p className="ml-3 text-sm text-gray-600">Réunion parents-professeurs le 15 Mars à 09h00.</p>
             </li>
             <li className="flex items-start">
               <span className="flex-shrink-0 h-2 w-2 mt-2 bg-indigo-500 rounded-full"></span>
               <p className="ml-3 text-sm text-gray-600">Publication des bulletins du 1er trimestre prévue le 20 Mars.</p>
             </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

export default function GradesPage() {
  const [selectedClass, setSelectedClass] = useState('6ème 1');
  const [selectedSubject, setSelectedSubject] = useState('Mathématiques');

  // Mock data pour la grille de saisie
  const [grades, setGrades] = useState([
    { id: '1', name: 'KOFFI Aya Marie', grade: 14 },
    { id: '2', name: 'DIALLO Moussa', grade: 11 },
    { id: '3', name: 'YAO Grace', grade: 16.5 },
  ]);

  const handleGradeChange = (id: string, value: string) => {
    const newGrades = grades.map(g => 
      g.id === id ? { ...g, grade: parseFloat(value) || 0 } : g
    );
    setGrades(newGrades);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving grades...', grades);
    alert('Notes enregistrées avec succès !');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Saisie des Notes</h1>

      {/* Filtres de sélection */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4 md:space-y-0 md:flex md:space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Classe</label>
          <select 
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-black border"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option>6ème 1</option>
            <option>6ème 2</option>
            <option>3ème 1</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Matière</label>
          <select 
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-black border"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option>Mathématiques</option>
            <option>Physique-Chimie</option>
            <option>Français</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Type d'évaluation</label>
          <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-black border">
            <option>Interrogation</option>
            <option>Devoir Surveillé</option>
            <option>Composition</option>
          </select>
        </div>
      </div>

      {/* Grille de saisie */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {selectedClass} - {selectedSubject}
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Élève</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note (/20)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commentaire</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grades.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.25"
                      className="w-24 px-2 py-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 text-black"
                      value={item.grade}
                      onChange={(e) => handleGradeChange(item.id, e.target.value)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      placeholder="Optionnel"
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 text-black"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Enregistrer les notes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

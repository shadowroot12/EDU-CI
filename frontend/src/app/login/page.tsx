'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login, setToken } from '@/lib/api/auth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (!username.trim() || !password.trim()) {
        setError('Veuillez remplir tous les champs');
        return;
      }

      const data = await login(username, password);
      if (!data.access_token) {
        setError('Erreur: Token non reçu du serveur');
        return;
      }
      setToken(data.access_token);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Erreur login complète:', err);
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Une erreur est survenue. Vérifiez votre connexion Internet et que le serveur est actif.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">EDU-CI Connexion</h2>
        
        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Matricule / Email</label>
            <input
              id="username"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ex: admin"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ex: password123"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          Pas encore de compte?{" "}
          <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            S'inscrire
          </Link>
        </p>
        <p className="text-sm text-center text-gray-500">
          Système de Gestion Scolaire - Côte d'Ivoire
        </p>
      </div>
    </div>
  );
}

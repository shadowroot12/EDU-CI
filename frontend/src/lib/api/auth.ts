export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function parseResponse(res: Response) {
  const contentType = res.headers.get('content-type');
  
  if (!res.ok) {
    if (contentType?.includes('application/json')) {
      const errorData = await res.json();
      throw new Error(errorData.message || `Erreur ${res.status}`);
    } else {
      const text = await res.text();
      throw new Error(`Erreur ${res.status}: ${text.substring(0, 100)}`);
    }
  }
  
  if (contentType?.includes('application/json')) {
    return res.json();
  } else {
    throw new Error(`Réponse invalide: attendu JSON, reçu ${contentType}`);
  }
}

export async function login(username: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    return await parseResponse(res);
  } catch (error) {
    console.error('Erreur login:', error);
    throw error;
  }
}

export async function register(userData: any) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    return await parseResponse(res);
  } catch (error) {
    console.error('Erreur register:', error);
    throw error;
  }
}

export function setToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('edu_token', token);
  }
}

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('edu_token');
}

export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('edu_token');
  }
}

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (res.status === 401) {
      removeToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new Error('Session expirée - Veuillez vous reconnecter');
    }

    return await parseResponse(res);
  } catch (error) {
    console.error('Erreur fetchWithAuth:', error);
    throw error;
  }
}

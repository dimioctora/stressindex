/**
 * Centralized API utility for frontend requests
 * Automatically appends the API base URL and includes the Authorization token if available.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export async function fetchApi(endpoint: string, options: FetchOptions = {}) {
  // Construct full URL (assumes endpoint starts with '/')
  const url = `${API_BASE_URL}${endpoint}`;

  // Get token from localStorage
  // Note: localStorage is only available in the browser (client-side)
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('admin_token');
  }

  // Setup headers
  const headers = new Headers(options.headers || {});
  
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  if (options.body && !headers.has('Content-Type') && typeof options.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle common errors (like 401 Unauthorized)
  if (response.status === 401 && typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
    // Optional: Auto redirect to login if token is expired/invalid
    // This is a failsafe if the middleware misses it or token expires mid-session
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    window.location.href = '/login';
  }

  return response;
}

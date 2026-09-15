import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AdminAuthContextType {
  isAdmin: boolean;
  username: string | null;
  token: string | null;
  loading: boolean;
  login: (credentials: { username?: string; password?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  handleSessionExpired: () => void;
  authFetch: (url: string, init?: RequestInit) => Promise<Response>;
  isAuthModalOpen: boolean;
  openAuthModal: (onSuccess?: () => void) => void;
  closeAuthModal: () => void;
  isAdminDashboardOpen: boolean;
  openAdminDashboard: () => void;
  closeAdminDashboard: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const TOKEN_STORAGE_KEY = 'sr_admin_jwt_token';

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(TOKEN_STORAGE_KEY) || localStorage.getItem(TOKEN_STORAGE_KEY);
    }
    return null;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);
  const [onSuccessCallback, setOnSuccessCallback] = useState<(() => void) | null>(null);

  const authFetch = useCallback(
    async (url: string, init: RequestInit = {}): Promise<Response> => {
      const headers = new Headers(init.headers || {});
      if (!headers.has('Accept')) {
        headers.set('Accept', 'application/json');
      }
      const activeToken =
        token ||
        (typeof window !== 'undefined'
          ? sessionStorage.getItem(TOKEN_STORAGE_KEY) || localStorage.getItem(TOKEN_STORAGE_KEY)
          : null);

      if (activeToken && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${activeToken}`);
        headers.set('x-admin-token', activeToken);
      }

      const response = await fetch(url, {
        ...init,
        headers,
        credentials: 'include',
      });

      if (response.status === 401 || response.status === 403) {
        // If the server explicitly rejected auth token
        const authData = await response.clone().json().catch(() => null);
        if (authData?.error && authData.error.toLowerCase().includes('session expired')) {
          handleSessionExpired();
        }
      }

      return response;
    },
    [token]
  );

  const checkAuth = async (): Promise<boolean> => {
    try {
      const activeToken =
        token ||
        (typeof window !== 'undefined'
          ? sessionStorage.getItem(TOKEN_STORAGE_KEY) || localStorage.getItem(TOKEN_STORAGE_KEY)
          : null);

      const headers: Record<string, string> = { Accept: 'application/json' };
      if (activeToken) {
        headers['Authorization'] = `Bearer ${activeToken}`;
        headers['x-admin-token'] = activeToken;
      }

      const res = await fetch('/api/admin/me', {
        headers,
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          setIsAdmin(true);
          setUsername(data.user.username);
          if (data.token) {
            setToken(data.token);
            if (typeof window !== 'undefined') {
              sessionStorage.setItem(TOKEN_STORAGE_KEY, data.token);
              localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
            }
          }
          return true;
        }
      }
      setIsAdmin(false);
      setUsername(null);
      return false;
    } catch {
      setIsAdmin(false);
      setUsername(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSessionExpired = () => {
    setIsAdmin(false);
    setUsername(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials: { username?: string; password?: string }) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAdmin(true);
        setUsername(data.user?.username || 'Admin');
        if (data.token) {
          setToken(data.token);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(TOKEN_STORAGE_KEY, data.token);
            localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
          }
        }
        if (onSuccessCallback) {
          onSuccessCallback();
          setOnSuccessCallback(null);
        }
        setIsAuthModalOpen(false);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Authentication failed' };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error during login' };
    }
  };

  const logout = async () => {
    try {
      await authFetch('/api/admin/logout', {
        method: 'POST',
      });
    } catch (e) {
      console.warn('Logout request error:', e);
    } finally {
      handleSessionExpired();
    }
  };

  const openAuthModal = (onSuccess?: () => void) => {
    if (onSuccess) {
      setOnSuccessCallback(() => onSuccess);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setOnSuccessCallback(null);
  };

  const openAdminDashboard = () => {
    setIsAdminDashboardOpen(true);
  };

  const closeAdminDashboard = () => {
    setIsAdminDashboardOpen(false);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAdmin,
        username,
        token,
        loading,
        login,
        logout,
        checkAuth,
        handleSessionExpired,
        authFetch,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        isAdminDashboardOpen,
        openAdminDashboard,
        closeAdminDashboard,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return ctx;
};

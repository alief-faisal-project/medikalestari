"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AdminUser } from "@/lib/types";
import { supabase } from "@/lib/supabase";

type AuthContextType = {
  token: string | null;
  user: AdminUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (
    token: string,
    user?: AdminUser | null,
    sessionObj?: unknown,
  ) => Promise<void> | void;
  logout: () => Promise<void> | void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "ml_auth_token";
const USER_KEY = "ml_auth_user";
const SESSION_KEY = "ml_auth_session";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let mounted = true;

    const restore = async () => {
      const sessionRaw = localStorage.getItem(SESSION_KEY);
      if (sessionRaw) {
        try {
          const sessionObj = JSON.parse(sessionRaw);
          // best-effort hydrate supabase client
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await supabase.auth.setSession(sessionObj as any).catch(() => null);
          if (!mounted) return;
          if (sessionObj?.access_token) setToken(sessionObj.access_token);
        } catch {
          // ignore
        }
      } else {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);
        if (storedToken) setToken(storedToken);
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser) as AdminUser);
          } catch {
            setUser(null);
          }
        }
      }

      // subscribe to supabase auth changes
      const { data: listener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (!mounted) return;
          // handle common events
          if (
            event === "SIGNED_IN" ||
            event === "TOKEN_REFRESHED" ||
            event === "USER_UPDATED"
          ) {
            const access = session?.access_token || null;
            setToken(access);
            try {
              if (access) localStorage.setItem(TOKEN_KEY, access);
              if (session)
                localStorage.setItem(SESSION_KEY, JSON.stringify(session));
            } catch {
              /* ignore */
            }
            if (session?.user) {
              try {
                localStorage.setItem(USER_KEY, JSON.stringify(session.user));
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setUser(session.user as any);
              } catch {
                /* ignore */
              }
            }
          } else if (event === "SIGNED_OUT") {
            setToken(null);
            setUser(null);
            try {
              localStorage.removeItem(TOKEN_KEY);
              localStorage.removeItem(USER_KEY);
              localStorage.removeItem(SESSION_KEY);
            } catch {
              /* ignore */
            }
          }
        },
      );

      setTimeout(() => setLoading(false), 150);

      return () => {
        mounted = false;
        listener?.subscription.unsubscribe();
      };
    };

    restore();
    // ensure cleanup when unmount - listener will be unsubscribed inside restore return
    return () => {
      /* noop */
    };
  }, []);

  const login = async (
    newToken: string,
    newUser?: AdminUser | null,
    sessionObj?: unknown,
  ) => {
    setToken(newToken);
    setUser(newUser || null);
    try {
      localStorage.setItem(TOKEN_KEY, newToken);
      if (newUser) localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      else localStorage.removeItem(USER_KEY);
      if (sessionObj)
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionObj));
      // hydrate supabase client if session provided
      if (sessionObj) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await supabase.auth.setSession(sessionObj as any).catch(() => null);
      }
    } catch {
      /* ignore */
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    try {
      await supabase.auth.signOut().catch(() => null);
    } catch {
      /* ignore */
    }
  };

  const value = useMemo(
    () => ({ token, user, loading, isAuthenticated: !!token, login, logout }),
    [token, user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthContext;

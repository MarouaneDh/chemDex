/* ============================================================
   AuthContext — the player's account session.

   Holds the JWT (persisted to localStorage) and the user record.
   GameContext reads this to decide when to push/pull cloud progress.
   Wraps GameProvider so the whole app can see the session.
   ============================================================ */

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { apiFetch } from "../api/client.js";

const AuthContext = createContext(null);
const TOKEN_KEY = "chemdex.token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem(TOKEN_KEY) || null;
    } catch {
      return null;
    }
  });
  const [user, setUser] = useState(null);
  // "loading" while a stored token is being validated, then "ready"
  const [status, setStatus] = useState(token ? "loading" : "ready");

  // mirror the token to localStorage
  useEffect(() => {
    try {
      if (token) localStorage.setItem(TOKEN_KEY, token);
      else localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* storage unavailable — session lives in memory only */
    }
  }, [token]);

  // on first load, validate any stored token against /me
  const didCheck = useRef(false);
  useEffect(() => {
    if (didCheck.current) return;
    didCheck.current = true;
    if (!token) return;
    apiFetch("/auth/me", { token })
      .then((data) => {
        setUser(data.user);
        setStatus("ready");
      })
      .catch(() => {
        // expired or invalid — drop it and continue as a guest
        setToken(null);
        setUser(null);
        setStatus("ready");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // accept the { token, user } payload returned by register / login
  const adopt = (data) => {
    setToken(data.token);
    setUser(data.user);
    setStatus("ready");
  };

  const register = async ({ email, password, displayName }) => {
    adopt(await apiFetch("/auth/register", {
      method: "POST",
      body: { email, password, displayName },
    }));
  };

  const login = async ({ email, password }) => {
    adopt(await apiFetch("/auth/login", { method: "POST", body: { email, password } }));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  // Replace the avatar — server validates shape and size. Pass "" to clear.
  // Returns the updated user, or throws.
  const uploadAvatar = async (dataURL) => {
    const data = await apiFetch("/auth/me/avatar", {
      method: "PUT",
      token,
      body: { avatar: dataURL || "" },
    });
    setUser(data.user);
    return data.user;
  };

  const value = {
    token,
    user,
    status,
    isAuthed: !!token && !!user,
    isAdmin: user?.role === "admin",
    register,
    login,
    logout,
    uploadAvatar,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

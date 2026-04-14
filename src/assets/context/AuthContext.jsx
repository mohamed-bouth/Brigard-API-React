import { createContext, useContext, useEffect, useState } from "react";
import api from "../../api/axios";

const AuthContext = createContext(null);

function getErrorMessage(error, fallback) {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return fallback;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  async function fetchUser() {
    const { data } = await api.get("/profile");
    return data.profile ?? data.user ?? data;
  }

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      if (!token) {
        if (isMounted) {
          setUser(null);
          setAuthLoading(false);
        }
        return;
      }

      try {
        setAuthLoading(true);
        const profile = await fetchUser();
        if (isMounted) {
          setUser(profile);
          setAuthError("");
        }
      } catch (error) {
        if (isMounted) {
          setUser(null);
          setAuthError(getErrorMessage(error, "Failed to load user."));
        }
      } finally {
        if (isMounted) {
          setAuthLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      isMounted = false;
    };
  }, [token]);

  async function login(email, password) {
    setAuthError("");

    try {
      const { data } = await api.post("/login", { email, password });
      const nextToken = data.token ?? data.access_token;

      if (!nextToken) {
        setAuthError("No token returned from login.");
        return { ok: false, message: "No token returned from login." };
      }

      localStorage.setItem("token", nextToken);
      setToken(nextToken);

      const profile = await fetchUser();
      setUser(profile);

      return { ok: true };
    } catch (error) {
      const message = getErrorMessage(error, "Login failed.");
      setAuthError(message);
      return { ok: false, message };
    }
  }

  async function Register({ name, email, password }) {
    setAuthError("");

    try {
      const { data } = await api.post("/register", {
        name,
        email,
        password,
      });

      const nextToken = data.token ?? data.access_token;
      if (nextToken) {
        localStorage.setItem("token", nextToken);
        setToken(nextToken);
      }

      if (data.user || data.profile) {
        setUser(data.user ?? data.profile);
      } else {
        const profile = await fetchUser();
        setUser(profile);
      }

      return { ok: true };
    } catch (error) {
      const message = getErrorMessage(error, "Registration failed.");
      const errors = error?.response?.data?.errors ?? {};
      setAuthError(message);
      return { ok: false, message, errors };
    }
  }

  async function logout() {
    setAuthError("");

    try {
      await api.post("/logout");
    } catch (error) {
      setAuthError(getErrorMessage(error, "Logout failed."));
    } finally {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        authLoading,
        authError,
        login,
        Register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

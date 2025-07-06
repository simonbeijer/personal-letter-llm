"use client";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/auth/user", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        console.log('[Context] User loaded:', data.user.email);
      } else if (response.status !== 401) {
        console.error('[Context] Failed to fetch user:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('[Context] User fetch error:', error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

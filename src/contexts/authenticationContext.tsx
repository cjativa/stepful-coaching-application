import React, { createContext } from "react";

import { STUDENTS, COACHES } from "../constants";

type User = {
  name: string;
  id: string;
};

interface AuthenticationContextType {
  user: User | null;
  login: (username: string) => boolean | null;
  logout: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextType>({
  user: null,
  login: () => {
    return null;
  },
  logout: () => {},
});

export const AuthenticationProvider = ({ children }: { children: any }) => {
  const [user, setUser] = React.useState<User | null>(null);

  const login = (tentativeUserName: string): boolean | null => {
    const existingUser = [...STUDENTS, ...COACHES].find((userCredential) => {
      return userCredential.name === tentativeUserName;
    });

    // Basic checking if a user exists for this tentative user
    // If so, we'll allow sign-in
    if (existingUser) {
      setUser(existingUser);
      return true;
    }

    // Otherwise, return false since the attempted user has no match
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

import { createContext } from 'react';

export const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: (currentUser: any) => {},
});

import { createContext } from 'react';

export const AuthContext = createContext({
  currentUser: Object,
  setCurrentUser: (currentUser: Object) => {},
});

import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            // When logging in, we have a user and we are definitely done loading
            return { user: action.payload, loading: false };
            
        case 'LOGOUT':
            // When logging out, user is null and we are done loading
            return { user: null, loading: false };
        
        case 'INITIALIZE_AUTH':
            // This handles the initial page-load check
            return { user: action.payload, loading: false };
    
        default:
            // "state" here represents the current state object (e.g., { user: null, loading: true })
            // Returning it unchanged acts as a fallback safety net.
            return state; 
    }
}

export const AuthContextProvider = ({ children }) => {
  // 1. CRITICAL FIX: Start with loading set to true!
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true 
  });

  useEffect(() => {
    // 2. Safely read from localStorage on page refresh
    const user = JSON.parse(localStorage.getItem('user'));

    // 3. Always dispatch INITIALIZE_AUTH so loading flips to false, 
    // whether a user was found in localStorage or not!
    dispatch({ type: 'INITIALIZE_AUTH', payload: user });
  }, []);


  return (
    // 4. Exposing ...state means your application now receives both { user, loading }
    <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
    </AuthContext.Provider>
  );
};
import {createContext , useReducer , useEffect} from 'react'


export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user : action.payload}//take the token for user
            
        case 'LOGOUT':
            return {user:null}  //remove the user from localStorage  
    
        default:
            return state //what is this state?
    }
}

export const AuthContextProvider = ({children}) => {
  const [state , dispatch] = useReducer(authReducer , {
    user: null
  })

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'))//storing the user info to the localStorage

  if (user) {
    dispatch({type:'LOGIN' , payload: user})//calling the user when login to the localStorage
  }
  }, [])

  console.log('AuthContext state :',  state);

  return (
    <AuthContext.Provider value={{...state , dispatch}}>
        {children}         {/*children is the where we are passing to */}
    </AuthContext.Provider>
  )
}
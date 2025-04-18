import { createContext, useState }from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null)

    return (
        <AuthContext.Provider value={{token, setToken, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
 
const Auth = {
    Context: AuthContext,
    Provider: AuthProvider
}

export default Auth
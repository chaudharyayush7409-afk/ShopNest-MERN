import React,{createContext,useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(()=>{
        try{
            const raw = localStorage.getItem("userinfo");
            return raw ? JSON.parse(raw) : null;
        }catch(e){
            return null;
        }
    });

    const login =(userData)=>{
        setUser(userData);
        localStorage.setItem("userinfo",JSON.stringify(userData));
    };

    const logout = ()=>{
        setUser(null);
        localStorage.removeItem("userinfo");
    }
    

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )

}

 

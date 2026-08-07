import React,{createContext,useState} from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

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
    const dispatch = useDispatch();

    const login =(userData)=>{
        setUser(userData);
        localStorage.setItem("userinfo",JSON.stringify(userData));
    };

    const logout = ()=>{
        setUser(null);
        localStorage.removeItem("userinfo");
        dispatch(clearCart());
    }
    

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )

}

 

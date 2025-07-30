import React, {createContext, useContext, useEffect, useState} from "react"
import {LocalStorage, requestHandler} from "../utils/index"
import type {SignupFormValues, LoginFormValues} from "../interfaces/form"
import type { UserInterface } from "@/interfaces/user"
import {loginUser, regsiterUser, logoutUser} from "../api/auth"
import { useNavigate } from "react-router"
import {Loader} from "../components/index"


// Create a context to manage authentication-related data and functions
const AuthContext = createContext<{
    user: UserInterface | null;
    token: string | null;
    login: (data: LoginFormValues)=> Promise<void>;
    register:(data: SignupFormValues)=> Promise<void>;
    logout: ()=> Promise<void>

}>({
    user: null,
    token: null,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
})

const useAuth = () => useContext(AuthContext)

// Create a component that provides authentication-related data and functions
const AuthProvider = ({children}: {children: React.ReactNode})=>{
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<UserInterface | null>(null)
    const [token, setToken] = useState<string | null>(null)

    const navigate = useNavigate();

    //Function to handle user login 
    const login = async (data: LoginFormValues)=>{
        await requestHandler(
            async ()=> await loginUser(data),
            setIsLoading,
            (res)=>{
                const {data} = res;
                setUser(data.user);
                setToken(data.accessToken);
                LocalStorage.set("user", data.user);
                LocalStorage.set("token", data.accessToken)
                navigate("/") // navigate to home page after successful login
            },
            alert // Display error alerts on request failure
        )
    }

    //Function to handle user registeration
    const register = async(data: SignupFormValues)=>{
        await requestHandler(
            async ()=> await regsiterUser(data),
            setIsLoading,
            ()=>{
                alert("Account created successfully! Go ahead and login.")
                navigate("/login")
            },
            alert //Display error alerts on request failure
        )
    }

    //Function to handle user logout
    const logout = async()=>{
        await requestHandler(
            async ()=> await logoutUser(),
            setIsLoading,
            ()=>{
                setUser(null);
                setToken(null)
                LocalStorage.clear(); //Clear local storage on logout
                navigate("/login")
            },
            alert //Display error alerts on request failure
        )
    }


    // Check for saved user and token in local storage during component initialization
    useEffect(()=>{
        setIsLoading(true)
        const _user = LocalStorage.get("user")
        const _token = LocalStorage.get("token")
        if(_token && _user?._id){
            setUser(_user)
            setToken(_token)
        }
        setIsLoading(false)
    }, [])


    // Provide authentication-related data and functions through the context
    return (
        <AuthContext value={{user, login, register, logout, token}}>
            {isLoading ? <Loader/> : children} {/* Display a loader while loading */}
        </AuthContext>
    )
}

// Export the context, provider component, and custom hook
export {AuthContext, AuthProvider, useAuth}
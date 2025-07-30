import type {AxiosResponse} from "axios"
import type {FreeAPISuccessResponseInterface} from "../interfaces/api"

// A utility function for handling API requests with loading, success, and error handling
export const requestHandler = async(
    api: ()=> Promise<AxiosResponse<FreeAPISuccessResponseInterface, any>>,
    setLoading: ((loading: boolean)=> void) | null,
    onSuccess: (data: FreeAPISuccessResponseInterface)=> void,
    onError: (error:string)=>void
)=>{
    if(setLoading){
        setLoading(true)
    }
    try {
        //Make API request
        const response = await api();
        const {data} = response;
        if(data?.success){
            // Call the onSuccess callback with the response data
            onSuccess(data)
        }
    } catch (error:any) {
        console.log(error)
        // Handle error cases, including unauthorized and forbidden cases
        if([401, 403].includes(error?.response.data?.statusCode)){
            localStorage.clear() //clear local storage on authentication issues 
            if(isBrowser) window.location.href = "/login" //Redirect to login page
        }
        onError(error?.response?.data?.message || "Something went wrong.")
    } finally{
        if(setLoading){
            setLoading(false)
        }
    }
}

// Check if the code is running in a browser environment
export const isBrowser = typeof window !== "undefined";

// A class that provides utility functions for working with local storage
export class LocalStorage {
    //Get a value from local storage by key
    static get(key:string){
        if(!isBrowser) return;
        const value = localStorage.getItem(key);
        if(value){
            try {
                return JSON.parse(value)
            } catch (error) {
                return null
            }
        }
        return null;
    }

    //set a value in local storage by key
    static set(key:string, value:any){
        if(!isBrowser) return;
        localStorage.setItem(key, JSON.stringify(value))
    }

    //remove a value from local storage by key
    static clear(){
        if(!isBrowser) return;
        localStorage.clear();   
    }
}
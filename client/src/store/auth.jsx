import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({children})=>{
    
    const [token,setToken]= useState(localStorage.getItem("token"))
    const[isLoading,setIsLoading]= useState(true);
    const [user,setUser] = useState("");
    const [services,setServices]=useState([]);

    const authorizationToken = `Bearer ${token}` ;

    const storeTokenInLS = (serverToken)=>{
        setToken(serverToken)
        return localStorage.setItem( "token", serverToken)
    }

    let isLoggedIn = !!token;

    const LogoutUser = () =>{
        setToken("");
        return localStorage.removeItem("token");
    }


    const userAuthentication = async ()=>{
        try {

            const response = await fetch("http://localhost:5000/api/auth/users",{
                method:"GET",
                headers:{Authorization:authorizationToken}
            })

            if(response.ok){
                const data = await response.json();
                console.log("user data", data.userData)
                setUser(data.userData)
                setIsLoading(false)
            }else{
                setIsLoading(false)
            }
            
        } catch (error) {
            console.log(error , "error fetching user")
        }
    }



   // to fetch the services data from the database
    const getServices = async() => {
        try {
            const response = await fetch('http://localhost:5000/api/data/service')
            // ,{
            //     method:"GET",
            // })

            const services = await response.json();
               // console.log(services)
                setServices(services)
            // if(response.ok){
            //     const services = await response.json();
            //     console.log(services)
            //     setServices(services.data)
                
            // }
        } catch (error) {
            console.log(error)
        }
    }

   useEffect(()=>{
    getServices();
    userAuthentication();
   },[])

    return (
        <AuthContext.Provider value={{storeTokenInLS,LogoutUser,isLoggedIn,user,services,authorizationToken,isLoading}}> 
            {children} 
        </AuthContext.Provider> 

    )
}
export const useAuth = ()=>{                    //custom hook
    const useContextValue = useContext(AuthContext);
    return useContextValue;
}                       


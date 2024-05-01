import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img4 from "../images/img4.jpg"

export const Login = ()=>{
    const [user,setUser] = useState({
        email :"" ,
        password :""
})

const navigate = useNavigate();
const {storeTokenInLS} = useAuth();

const handleInput=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
   setUser({
        ...user,
        [name]:value
    })}

const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log(user);

        try {
          const response = await fetch("http://localhost:5000/api/auth/login",{
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body: JSON.stringify(user), 
          });
          
          const res_data = await response.json();
          console.log("response from login server", res_data);

          if(response.ok){
          
            storeTokenInLS(res_data.token);

            setUser({email:"",password:""});
            navigate("/");
            toast.success("login successful")
            }
            else{
              toast.error(res_data.extraDetails? res_data.extraDetails : res_data.message)
            }  
      
          console.log(await response.json())  
        } 
                
      
          catch (error) {
              console.log("registration errorrrr", error)
         }   
        
       

    }


    return(  <>
        <section className="Login-Section">
          <main >
            <div className="section-registration">
              <div className="container grid grid-two-cols">
                <div className="registration-image reg-img">
                  <img
                    src={img4}
                    alt="a nurse with a cute look"
                    width="400"
                    height="500"
                  />
                </div>
                <div className="registration-form">
                <h1 className="main-heading mb-3">Login Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter Your Email..."
                      value={user.email}
                      onChange={handleInput}
                      
                    />
                  </div>
                
                 
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="**********"
                      value={user.password}
                      onChange={handleInput}     
                    />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">
                    submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
   </>)
}
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminUpdate = ()=>{

const [data,setData]= useState({
    username:"",
    email:"",
    phone:""
})

const params = useParams();

const {authorizationToken} = useAuth();


const getSingleUserData= async()=>{
    try {
        
        const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`,
        {
            method: "GET",
            headers:{
                Authorization: authorizationToken,
            }
        })      

        const data = await response.json()
        console.log(data)
        setData(data)


       
    }
     catch (error)  {
        console.log(error)
    }
}
useEffect(()=>{
getSingleUserData();
},[])     



const handleInput = (e)=>{
  let name = e.target.name;
  let value = e.target.value;
  setData({
    ...data,
    [name]:value
  })
}

const handleSubmit = async (e) => {
  try {
    const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`,
    {
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        Authorization:authorizationToken},
        body: JSON.stringify(data) 
       });

       //toast.success("data UPDATED successfully")
        
       
  } catch (error) {
      console.log(error)
  }
}

    return <>
           <section className="admin-edit-form">
            <main>
              <div className="section-registration">
                 <div className="container grid grid-two-cols">
                
                  <div className="registration-form">
                  <h1 className="main-heading mb-3">User's Details </h1>
                  <br />
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="username">username</label>
                      <input
                        type="text"
                        name="username"
                        placeholder="enter ur username"
                        value={data.username}
                        onChange={handleInput}
                        
                      />
                    </div>
                  
                   
                    <div>
                      <label htmlFor="email">email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={data.email}
                        onChange={handleInput}     
                      />
                    </div>
  
                    <div>
                      <label htmlFor="phone">phone no.</label>
                      <input
                        type="number"
                        name="phone"
                        placeholder="phone"
                        value={data.phone}
                        onChange={handleInput}     
                      />
                    </div>
  
                    <br />
                    <button type="submit" className="btn btn-submit">
                      update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </section>
    </>
}
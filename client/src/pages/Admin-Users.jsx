import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import '../index.css'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const AdminUsers =  ()=>{
    const [users,setUsers]=useState([])
    const {authorizationToken} = useAuth();

    
    const getAllUsers = async()=>{
        try {
            const response = await fetch('http://localhost:5000/api/admin/users',{
                method:"GET",
                headers:{Authorization:authorizationToken}
            });
    
            const data = await response.json()
            console.log("users ", data)
            setUsers(data)            
            
        } catch (error) {
            console.log(error)
            
        } 
    }


    const deleteUser= async(id)=>{
            try {
                
                const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`,
                {
                    method: "DELETE",
                    headers:{
                        Authorization: authorizationToken,
                    }
                })
                if(response.ok){ 
                    toast.success("data DELETED successfully")
                  }
                const data = await response.json()
                console.log(data)

                if(response.ok){
                    getAllUsers();
                }
            }
             catch (error)  {
                console.log(error)
            }
    }


    useEffect(()=>{
        getAllUsers();
    },[])     
 
    return (<>
<section className="admin-user">

    <div className="main">
        <h1 className="heading">User's Data Collections</h1>
        <table className="table">
            <thead className="table-heading">
                <tr className="table-heading-contents">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>UPDATE</th>
                    <th>DROP</th>
                </tr>
            </thead>
            <tbody className="table-body">

            {users?.map((curElem,index)=>{
            return <tr key={index}>
                <td>{curElem.username}</td>
                <td>{curElem.email}</td>
                <td>{curElem.phone}</td>
                <td><Link to={`/admin/users/${curElem._id}/edit`}><button>Edit</button> </Link> </td>
                <td>
                <button onClick={()=>deleteUser(curElem._id)}>
                Delete</button>
                </td>
               </tr>
             })}
            </tbody>
        </table>
    </div>

</section>
       
    </>)
}
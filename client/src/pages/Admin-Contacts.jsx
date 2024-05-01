import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const AdminContacts = ()=>{

    const [contactD,setContactD] = useState([])
    const {authorizationToken} = useAuth();

    const getContact = async()=>{
        try {
            const response = await fetch("http://localhost:5000/api/admin/contacts", {
                method:"GET",
                headers:{
                    Authorization: authorizationToken,
                }
            })
            
            const data =await response.json();
            console.log(data)
            setContactD(data);
        } catch(error) {
            console.log(error)
        }
    } 

    const deleteUser = async(id)=>{
        try {
            
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,
            {
                method: "DELETE",
                headers:{
                    Authorization: authorizationToken,
                }
            })
            if(response.ok){
                getContact();
            }
            if(response.ok){ 
                toast.success("Contact data DELETED successfully")
              }
           
           
        }
         catch (error)  {
            console.log(error)
        }
}


useEffect(()=>{
            getContact();
    },[])

       
 

    return<>

    <section className="admin-contact">
        <h1>Admin dashboard - Contacts data</h1>
        <div>
        <table className="table">
            <thead className="table-heading">
                <tr className="table-heading-contents">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>DROP</th>
                </tr>
            </thead>
            <tbody className="table-body">

            {contactD?.map((curElem,index)=>{
            return <tr key={index}>
                <td>{curElem.username}</td>
                <td>{curElem.email}</td>
                <td>{curElem.message}</td>
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
        
    </>
}
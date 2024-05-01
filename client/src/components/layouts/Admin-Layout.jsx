import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { IoMdContacts,IoIosHome } from "react-icons/io";
import { useAuth } from "../../store/auth";
import img2 from '../../images/img2.webp'

export const AdminLayout = ()=>{           //in react application only one Return at a time 
 
const {user,isLoading} = useAuth();

if(isLoading){
    return <h1>loading....</h1>
 }


if(!user){
    return <Navigate to="/" />
}

    return (<>
  <section className="admin-homepage">
  <h1>Admin Dashboard</h1>
        <header>
            <div>
                <ul>
                    <li><NavLink to={'/admin'}><IoIosHome />Home</NavLink></li>
                    <li><NavLink to={'/admin/users'}><FaUsers />users</NavLink></li>
                    <li><NavLink to={'/admin/contacts'}><IoMdContacts />contact</NavLink></li>
                </ul>
            </div>
        </header>

        <div className="image">
        <img src={img2} alt="designer" width="200" />
        </div>
  </section>
        <Outlet/>
    </>)
}
import { useState } from "react"
import { useAuth } from "../store/auth"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img5 from '../images/img5.jpg'



export const Contact = ()=>{

  const defaultContactFormData = {
    username: "",
    email: "",
    message: "",
  };

const [contact,setContact] = useState(defaultContactFormData);
  
const [userData, setUserData] = useState(true);
 
const user = useAuth();
 
if (userData && user){
  setContact ({
    username: user.username,
    email: user.email,
    message: "",
  });
  setUserData(false)
}


    const handleInput = (e)=>{        
        const name = e.target.name;
        const value = e.target.value;        
        setContact({ 
          ...contact,
          [name]: value
         });
    }


 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/form/contact',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(contact)
      })

      if (response.ok){
        //alert('message sent successfully');
        toast.success('message sent successfully')
      }
    } catch (error) {
      console.log(error, 'error while sending data from contact to backend')
      
    }
 }

    return (<>
        <section className="contact-section">
          <main>
            <div className="section-registration">
              <div className="container grid grid-two-cols">
                <div className="registration-image reg-img">
                  <img
                    src={img5}
                    alt="a nurse with a cute look"
                    width="400"
                    height="500"
                  />
                </div>
                <div className="registration-form">
                <h1 className="main-heading mb-3"> Contact Form </h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter Your Name"
                      value={contact.username}
                      onChange={handleInput}
                      
                    />
                  </div>
                
                 
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      value={contact.email}
                      onChange={handleInput}     
                    />
                  </div>

                  <div>
                    <label htmlFor="message">Message</label>
                    <textarea                      
                      name="message"
                      placeholder="Enter Your Message"
                      value={contact.message}
                      onChange={handleInput}     
                    ></textarea>
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














// import { useEffect, useState } from "react";
// import { useAuth } from "../store/auth";

// const defaultContactFormData = {
//   username: "",
//   email: "",
//   message: "",
// };

// // type UserAuth = boolean;
// export const Contact = () => {
//   const [data, setData] = useState(defaultContactFormData);
//   const [userData, setUserData] = useState(true);

//   const { user } = useAuth();

//   console.log("frontend user ", user.email);

 

//   if (userData && user) {
//     setData({
//       username: user.username,
//       email: user.email,
//       message: "",
//     });
//     setUserData(false);
//   }

//   const handleInput = (e) => {
//     // console.log(e);
//     const name = e.target.name;
//     const value = e.target.value;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleContactForm = async (e) => {
//     e.preventDefault();
//   };


//   return (
//     <>
//       <section className="section-contact">
//         <div className="contact-content container">
//           <h1 className="main-heading">contact us</h1>
//         </div>
//         {/* <h1>Contact Page</h1> */}
//         <div className="container grid grid-half-cols">
//           <div className="contact-img">
//             <img src="/images/support.png" alt="always ready to help you" />
//           </div>

//           <section className="section-form">
//             <form onSubmit={handleContactForm}>
//               <div>
//                 <label htmlFor="username">Username</label>
//                 <input
//                   type="text"
//                   name="username"
//                   id="username"
//                   value={data.username}
//                   onChange={handleInput}
//                   autoCapitalize="off"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="username">Email</label>
//                 <input
//                   type="text"
//                   name="username"
//                   id="username"
//                   value={data.email}
//                   onChange={handleInput}
//                   autoCapitalize="off"
//                   required
//                 />
//               </div>

//              <div>  
//               <label htmlFor="message">message</label>
//                      <textarea                      
//                       name="message"
//                       placeholder="enter ur message"
//                       value={data.message}
//                       onChange={handleInput}     
//                     ></textarea>
//               </div>
             
//               <div>
//                 <button type="submit"> Submit </button>
//               </div>
//             </form>
//           </section>
//         </div>
//       </section>
//     </>
//   );
// };





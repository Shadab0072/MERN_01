import { useAuth } from "../store/auth"
import img5 from '../images/img5.jpg'

export const About = ()=>{

    const {user} = useAuth();

    return (
    <>
 

 <section class="about-us">
    <header>
        <h1>About Us</h1>
    </header>
    <div class="flex-container">
        <div class="container-1">
            <h1>Join Our Team</h1>
            <p>
                Online training courses offer a convenient and flexible way to learn new skills or enhance existing ones from the comfort of your own home or office. Whether you're looking to advance your career, explore a new hobby, or simply expand your knowledge, online courses provide a wide range of options to suit your interests and goals. With expert instructors, interactive content, and a supportive online community, you can learn at your own pace and on your own schedule. Plus, many online courses offer certificates or credentials upon completion, allowing you to showcase your new skills and knowledge to employers or colleagues. So why wait? Start your learning journey today with online training courses!
            </p>
            <button>Enquiry</button>
        </div>
        <div class="container-2">
            <img src={img5} alt="a nurse with a cute look" width="300px" height="300px" />
        </div>
    </div>
</section>

    </>
    )
}



   ////<p>welcome back {user.username}</p>
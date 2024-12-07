import SignIn from "./signin/SignIn"
import Header from "./Navbar"
import {useNavigate} from "react-router-dom"
function SigninPage(){
    const navigate = useNavigate();
    // const toggleForm = (isVerified) => {
    //     console.log("Into the form");
    //     if(isVerified === "true"){
    //         navigate("/");
    //     }
    //     else if(isVerified === "Signup"){
    //         navigate("/signup");
    //     }
    //     else{
    //         console.log("Login failed!");
    //     }
    // }
    return (
        <>
        <Header/>
        <SignIn/>
        </>
    );
}

export default SigninPage;
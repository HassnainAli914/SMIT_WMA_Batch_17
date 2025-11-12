import Navbar from "../components/Navbar";
import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp";
import { useSign } from "../components/UseSign";


function Auth() {
    const { sign } = useSign();


    return (
        <>
            <Navbar />
            {sign == 'Sign-In' && <SignIn />}
            {sign == 'Sign-Up' && <SignUp />}
        </>
    )
}
export default Auth;
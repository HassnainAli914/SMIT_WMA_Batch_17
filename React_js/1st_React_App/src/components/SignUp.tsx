import { useState } from "react";
import { useSign } from "./UseSign";

function SignUp() {
    const [showPass, setShowPass] = useState('password');
    const {setSign} = useSign();

    return (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '100vw' }}>
            <div style={{ height: '400px', width: '330px', border: '1px solid', padding: '20px', borderRadius: '10px', color: 'white', backgroundColor: '#ff4757', fontStyle: 'italic', textAlign:'center' }}>
                <h4 style={{textAlign:'center'}}>Sign-up </h4>
                <hr />
                <p style={{margin:'0px', marginTop:'5px'}}>Full Name: </p>
                <input type="text" style={{ borderRadius: '10px', width:'80%' }} placeholder="Enter Name Here..." />
                <p style={{margin:'0px', marginTop:'5px'}}>Email: </p>
                <input type="email" style={{ borderRadius: '10px', width:'80%' }} placeholder="Enter Email Here..." />
                <br />
                <p style={{margin:'0px', marginTop:'5px'}}>Password: </p>
                <input type={showPass} style={{ borderRadius: '10px 0px 0px 10px' }} placeholder="Enter Password Here..." />
                <button onClick={() => (showPass == 'password' ? setShowPass('text') : setShowPass('password'))} style={{ borderRadius: '0px 10px 10px 0px' }}>🕵️</button>
                <br /><br />
                <input type="submit" style={{ borderRadius: '10px', backgroundColor: 'lightblue', fontStyle: 'italic' }} value="Sign-Up" />
                <hr />
                <p style={{ padding: '10px' }}>❗ Have an'accout click here <span style={{ color: 'black', cursor:'pointer' }} onClick={()=> setSign('Sign-In')}>Sign-In.</span></p>
            </div>
        </div>
    )
}
export default SignUp;
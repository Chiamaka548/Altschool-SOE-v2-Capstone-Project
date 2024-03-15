import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate, Link } from "react-router-dom";
import googleLogo from '../../assets/images/googleicon1.png';
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const SignUpPage: React.FC = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSignUpWithEmail = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            alert("You have successfully created an account")
            navigate('/Login');
        })
        .catch((error) => {
            console.error('Error occurred during Google signup:', error);
            setErrorMessage('Failed to sign up with Google. Please try again later.');
        }
        );
    }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
    const isPasswordStrong = (password: string): boolean => {
            return password.length >= 6;
        };
        
        const handleSignUpWithGoogle = () => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider )
            .then((result) => {
                const credential =  GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;
                console.log(user, credential);
                navigate("/logout");
            })
            .catch((error) => {
                console.error(error);
            });
        };


        return (
        <div className='signup-container'>
            <div className='signup-box'>
                {errorMessage && <p className="error-message">{errorMessage}</p>}    
                <h1>Sign Up</h1>
                <div className='underline'></div>
                <div className='signup-main'>
                    <div className='signup-group'>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='signup-group'>
                        <label>Password:</label>
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                        {!isPasswordStrong(password) && <p>Password must be at least 6 characters long</p>}
                    </div>
                    <div className='signup-group'>
                        <label>Confirm Password:</label>
                        <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                        {password !== confirmPassword && <p>Passwords do not match</p>}
                    </div>
                </div>
                <button onClick={handleSignUpWithEmail} className='signup-btn email-btn'>Sign Up with Email</button>
                <button onClick={handleSignUpWithGoogle} className='signup-btn google-btn'>
                    <img src={googleLogo}  className="google-icon" alt='Google Logo' />
                    Sign Up with Google
                </button>
                <div className='signup-footer'>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;

    

    

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../utils/Config/config';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import googleLogo from '/static/images/googleicon1.png';
import './Login.css';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
     
   
    const handleSignInWithEmailAndPassword = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/Compressly');
        } catch (error) {
            console.error('Error occurred during email/password login:', error);
            setError('Invalid email or password. Please try again.');
        }
    };
    
    const handleSignInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate('/Compressly');
        } catch (error) {
            console.error('Error occurred during Google authentication:', error);
            setError('Failed to sign in with Google. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <div className='form-box'>
                {error && <p className="error-message">{error}</p>}
                <h1>Login</h1>
                <div className='underline'></div>
                <div className='login-main'>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className='form-link'>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
                <button onClick={handleSignInWithEmailAndPassword} className='login-btn email-btn'>Login</button>
                <button onClick={handleSignInWithGoogle} className='login-btn google-btn'> 
                    <img src={googleLogo}  className="google-icon" alt='Google Logo' />
                    Sign In with Google
                </button>
                <div className='login-footer'>
                    <p>
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>     
    );
    };

    export default Login;

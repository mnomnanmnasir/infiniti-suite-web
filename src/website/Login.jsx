import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useHistory hook



    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginData = {
            email,
            password
        };

        const apiEndpoint = "https://infinitisuiteapi.vercel.app/api/v1/signin";

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("email", email)
        localStorage.setItem("password", password)
                toast.success('Login successfully!');
                // Redirect to dashboard or any other route
              
                navigate('/dashboard'); // Replace '/dashboard' with your desired route
                event.target.reset(); // Reset form fields
            }

            else {
                toast.error('Invalid email or password');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again later.');
        }
    };


    return (
        <>
            <Header />
            <ToastContainer />
            {/* Banner Section */}
            <section className="ud-page-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ud-banner-content">
                                <h1>Login Page</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Login Section */}
            <section className="ud-login">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ud-login-wrapper">
                                {/* <div className="ud-login-logo">
                                    <img src="assets/images/logo/logo-2.svg" alt="logo" />
                                </div> */}
                                <form onSubmit={handleSubmit}>
                                    <div className="ud-login-form">
                                        <div className="ud-form-group">
                                            <input
                                                id="email_input"
                                                type="email"
                                                name="email"
                                                placeholder="Email/username"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="ud-form-group">
                                            <input
                                                id="password_input"
                                                type="password"
                                                name="password"
                                                placeholder="*********"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="ud-form-group w-100" style={{marginLeft: '2%'}}>
                                            <button className="ud-main-btn w-100" type="submit">
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                {/* <div className="ud-socials-connect">
                                    <p>Connect With</p>
                                    <ul>
                                        <li>
                                            <a href="javascript:void(0)" className="facebook">
                                                <i className="lni lni-facebook-filled"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)" className="twitter">
                                                <i className="lni lni-twitter-filled"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)" className="google">
                                                <i className="lni lni-google"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div> */}
                                <p className="signup-option">

                                    Not a member yet? <a href="signup.html">
                                        <Link to='/signup'>
                                            Sign Up
                                        </Link>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Login;

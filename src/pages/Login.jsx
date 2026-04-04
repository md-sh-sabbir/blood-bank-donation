import React, { use, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthContext';
import Navbar from '../components/Navbar';

const Login = () => {

    const { signInUser, signInWithGoogle } = use(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation()
    const navigate = useNavigate()

    const handleSingIn = event => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value

        signInUser(email, password)
            .then(result => {
                event.target.reset()
                navigate(location.state || '/')
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error);
            })
    }

    // Demo Login Handler
    const handleDemoLogin = () => {
        // Pre-fill the form with demo credentials
        const demoEmail = 'demo@bloodbank.com'
        const demoPassword = 'Demo@1234'
        
        setEmail(demoEmail)
        setPassword(demoPassword)
        
        // Optional: Auto-submit after a short delay so user can see the fields being filled
        setTimeout(() => {
            signInUser(demoEmail, demoPassword)
                .then(result => {
                    navigate(location.state || '/')
                })
                .catch(error => {
                    console.log(error);
                })
        }, 500)
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className='flex justify-center items-center h-[calc(100vh-182px)] py-30'>
                <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 border-white border-1 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold">Login now!</h1>
                        <form onSubmit={handleSingIn}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label className="label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="input"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <button className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                        </form>

                        {/* Demo Login Button */}
                        <div className="divider">OR</div>
                        <button 
                            onClick={handleDemoLogin} 
                            className="btn bg-gradient-to-r from-red-500 to-pink-600 text-white border-none hover:from-red-600 hover:to-pink-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Login as Demo User
                        </button>

                        {/* Commented Google Sign In */}
                        {/* <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button> */}
                        
                        <p>
                            New to our website?{" "}
                            <Link className="text-blue-500 hover:text-blue-800 ml-1" to="/register">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
import React, { use, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import Container from './Container';
import logo from '../assets/logo-1.png'
import { AuthContext } from '../providers/AuthContext';

const Navbar = () => {

    const { user, signOutUser } = use(AuthContext)

    const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")

    useEffect(() => {
        const html = document.querySelector('html')
        html.setAttribute("data-theme", theme)
        localStorage.setItem("theme", theme)
    }, [theme])


    // const handleTheme = (checked) => {
    //     setTheme(checked ? "dark" : "light")
    // }

    const defaultLinkClass = 'font-semibold text-base'

    const activeLinkClass = 'font-bold text-base text-[#EA1241] gradient-underline';

    const links = <>
        <li><NavLink to="/" className={({ isActive }) => `${defaultLinkClass} ${isActive ? activeLinkClass : ''}`}>Home</NavLink></li>
        <li><NavLink to="/all-donation-requests" className={({ isActive }) => `${defaultLinkClass} ${isActive ? activeLinkClass : ''}`}>Donation requests</NavLink></li>
        <li><NavLink to="/dashboard" className={({ isActive }) => `${defaultLinkClass} ${isActive ? activeLinkClass : ''}`}>Dashboard</NavLink></li>
        <li><NavLink to="/search" className={({ isActive }) => `${defaultLinkClass} ${isActive ? activeLinkClass : ''}`}>Search</NavLink></li>
        <li><NavLink to="/donate" className={({ isActive }) => `${defaultLinkClass} ${isActive ? activeLinkClass : ''}`}>Donate</NavLink></li>
       
    </>

    const handleLogOut = () => {
        // console.log("user trying to LogOut");
        signOutUser()
            .then(() => {
                // alert("You Logged Out successfully");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="font-inter bg-white shadow-sm sticky top-0 w-full z-50">
            <Container>
                <div className='navbar'>
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-sm z-[50] mt-2 w-52 p-2 shadow">
                                {links}
                            </ul>
                        </div>
                        <Link to="/" className=" text-2xl lg:text-4xl font-bold text-[#2F4464] flex items-center">
                            <img src={logo} className='w-12 md:w-18 mr-2' alt="GameHub Logo" />
                            <span className='hidden sm:inline-block text-[#EA1241]'>BloodBank</span>
                        </Link>
                    </div>
                    <div className="navbar-center">
                        <ul className="hidden lg:flex menu menu-horizontal px-1">
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <div className='flex items-center gap-5'>
                            {/* <label className="flex cursor-pointer gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5" />
                                    <path
                                        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                                </svg>
                                <input onChange={(e) => handleTheme(e.target.checked)}
                                    defaultChecked={localStorage.getItem('theme') === "dark"}
                                    type="checkbox" value="synthwave" className="toggle theme-controller" />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            </label> */}
                            {
                                user ? (
                                    <div className="login-btn flex gap-3 lg:gap-5 items-center">
                                        <img
                                            className='w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover ring-2 ring-[#EA1241] ring-offset-2'
                                            src={user.photoURL}
                                            alt="User Profile"
                                        />
                                        <button
                                         onClick={handleLogOut} 
                                        className="btn bg-[#EA1241] text-white px-6 lg:px-10">Log Out</button>
                                    </div>
                                ) : (
                                    <div className='flex justify-center items-center gap-2 lg:gap-3 ml-3'>
                                        <Link to="/login" className='btn bg-[#EA1241] text-white w-20 lg:w-24 h-10'>Login</Link>
                                        <Link to="/register" className='btn bg-[#EA1241] text-white w-20 lg:w-24 h-10'>Register</Link>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Navbar;
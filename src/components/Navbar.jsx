import React, { use, useEffect, useState, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import Container from './Container';
import logo from '../assets/logo-1.png'
import { AuthContext } from '../providers/AuthContext';
import useAxios from '../hooks/useAxios';

const Navbar = () => {

    const { user, signOutUser } = use(AuthContext);
    const axiosSecure = useAxios();
    const navigate = useNavigate();

    const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [popup, setPopup] = useState(null);

    const dropdownRef = useRef(null);
    const prevIdsRef = useRef(null); // null = first load not done yet
    const popupTimerRef = useRef(null);

    useEffect(() => {
        const html = document.querySelector('html');
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Poll /recent-requests every 5 seconds
    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const res = await axiosSecure.get('/recent-requests');
                const data = res.data;
                const currentIds = data.map((d) => d._id);

                if (prevIdsRef.current === null) {
                    // First load: store IDs silently, no popup
                    prevIdsRef.current = currentIds;
                } else {
                    // Subsequent polls: detect truly new items
                    const newItems = data.filter(
                        (item) => !prevIdsRef.current.includes(item._id)
                    );

                    if (newItems.length > 0) {
                        setPopup(newItems[0]);
                        setUnreadCount((prev) => prev + newItems.length);

                        clearTimeout(popupTimerRef.current);
                        popupTimerRef.current = setTimeout(() => {
                            setPopup(null);
                        }, 5000);
                    }

                    prevIdsRef.current = currentIds;
                }

                setNotifications(data);
            } catch (err) {
                console.error("Failed to fetch notifications:", err);
            }
        };

        loadNotifications();
        const interval = setInterval(loadNotifications, 5000);
        return () => {
            clearInterval(interval);
            clearTimeout(popupTimerRef.current);
        };
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleBellClick = () => {
        setShowDropdown((prev) => !prev);
        setUnreadCount(0);
    };

    // Navigate to specific donation request detail page
    const handleNotificationClick = (id) => {
        setShowDropdown(false);
        setPopup(null);
        navigate(`/donation-request/${id}`);
    };

    const timeAgo = (dateStr) => {
        const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
        if (diff < 60) return `${diff}s ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    const defaultLinkClass = 'font-semibold text-base';
    const activeLinkClass = 'font-bold text-base text-[#EA1241] gradient-underline';

    const links = <>
        <li><NavLink to="/" className={({ isActive }) => `${defaultLinkClass} ${isActive ? activeLinkClass : ''}`}>Home</NavLink></li>
        <li><NavLink to="/all-donation-requests" className={({ isActive }) => `${defaultLinkClass} ${isActive ? activeLinkClass : ''}`}>Donation requests</NavLink></li>
        <li><NavLink to="/dashboard" className={({ isActive }) => `${defaultLinkClass} ${isActive ? activeLinkClass : ''}`}>Dashboard</NavLink></li>
        <li><NavLink to="/search" className={({ isActive }) => `${defaultLinkClass} ${isActive ? activeLinkClass : ''}`}>Search</NavLink></li>
        <li><NavLink to="/donate" className={({ isActive }) => `${defaultLinkClass} ${isActive ? activeLinkClass : ''}`}>Donate</NavLink></li>
    </>;

    const handleLogOut = () => {
        signOutUser().catch((error) => console.log(error));
    };

    return (
        <>
            {/* ── Floating Toast Popup (clickable) ── */}
            {popup && (
                <div className="fixed top-5 right-5 z-[9999]">
                    <div
                        onClick={() => handleNotificationClick(popup._id)}
                        className="bg-white border-l-4 border-[#EA1241] shadow-2xl rounded-xl p-4 w-72 flex gap-3 items-start cursor-pointer hover:bg-red-50 transition-colors"
                    >
                        <div className="bg-[#EA1241] text-white rounded-full w-10 h-10 flex items-center justify-center text-lg shrink-0">
                            🩸
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-gray-800 text-sm">New Blood Request!</p>
                            <p className="text-[#EA1241] font-extrabold text-2xl leading-tight">
                                {popup.bloodGroup}
                            </p>
                            <p className="text-gray-500 text-xs mt-0.5">
                                📍 {popup.district}, {popup.upazila}
                            </p>
                            {popup.hospital && (
                                <p className="text-gray-500 text-xs">🏥 {popup.hospital}</p>
                            )}
                            <p className="text-[#EA1241] text-xs font-semibold mt-1">
                                Click to view details →
                            </p>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // prevent navigating when closing
                                setPopup(null);
                            }}
                            className="text-gray-400 hover:text-gray-700 text-lg leading-none mt-0.5 cursor-pointer"
                        >
                            ✕
                        </button>
                    </div>
                    {/* Auto-dismiss progress bar */}
                    <div className="h-1 bg-gray-200 rounded-b-xl overflow-hidden mx-1">
                        <div
                            className="h-full bg-[#EA1241] rounded-b-xl"
                            style={{ animation: "shrink 5s linear forwards" }}
                        />
                    </div>
                </div>
            )}

            {/* ── Navbar ── */}
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
                                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-sm z-[50] mt-2 w-52 p-2 shadow">
                                    {links}
                                </ul>
                            </div>
                            <Link to="/" className="text-2xl lg:text-4xl font-bold text-[#2F4464] flex items-center">
                                <img src={logo} className='w-12 md:w-18 mr-2' alt="BloodBank Logo" />
                                <span className='hidden sm:inline-block text-[#EA1241]'>BloodBank</span>
                            </Link>
                        </div>

                        <div className="navbar-center">
                            <ul className="hidden lg:flex menu menu-horizontal px-1">
                                {links}
                            </ul>
                        </div>

                        <div className="navbar-end">
                            <div className='flex items-center gap-3 lg:gap-5'>

                                {/* 🔔 Bell Icon */}
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={handleBellClick}
                                        className="relative btn btn-ghost btn-circle text-gray-600 hover:text-[#EA1241] cursor-pointer"
                                        title="Notifications"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>

                                        {/* Unread Badge */}
                                        {unreadCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-[#EA1241] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                                                {unreadCount > 9 ? "9+" : unreadCount}
                                            </span>
                                        )}
                                    </button>

                                    {/* Dropdown */}
                                    {showDropdown && (
                                        <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[999] overflow-hidden">
                                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
                                                <p className="font-bold text-gray-700 text-sm">🔔 Recent Requests</p>
                                                <span className="text-xs text-gray-400">{notifications.length} total</span>
                                            </div>

                                            <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                                                {notifications.length > 0 ? (
                                                    notifications.map((item, index) => (
                                                        <div
                                                            key={item._id || index}
                                                            onClick={() => handleNotificationClick(item._id)}
                                                            className="flex items-start gap-3 px-4 py-3 hover:bg-red-50 transition-colors cursor-pointer"
                                                        >
                                                            <div className="bg-[#EA1241] text-white rounded-full w-9 h-9 flex items-center justify-center font-extrabold text-sm shrink-0">
                                                                {item.bloodGroup}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-semibold text-gray-800 truncate">
                                                                    {item.hospitalName || "Unknown Hospital"}
                                                                </p>
                                                                <p className="text-xs text-gray-500 truncate">
                                                                    📍 {item.recipientDistrict}, {item.recipientUpazila}
                                                                </p>
                                                            </div>
                                                            <span className="text-xs text-gray-400 shrink-0 mt-0.5">
                                                                {item.createdAt ? timeAgo(item.createdAt) : ""}
                                                            </span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-8 text-center text-gray-400 text-sm">
                                                        No recent requests
                                                    </div>
                                                )}
                                            </div>

                                            <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 text-center">
                                                <Link
                                                    to="/all-donation-requests"
                                                    onClick={() => setShowDropdown(false)}
                                                    className="text-xs text-[#EA1241] font-semibold hover:underline"
                                                >
                                                    View all donation requests →
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* User / Auth */}
                                {user ? (
                                    <div className="login-btn flex gap-3 lg:gap-5 items-center">
                                        <img
                                            className='w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover ring-2 ring-[#EA1241] ring-offset-2'
                                            src={user.photoURL}
                                            alt="User Profile"
                                        />
                                        <button
                                            onClick={handleLogOut}
                                            className="btn bg-[#EA1241] text-white px-6 lg:px-10"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                ) : (
                                    <div className='flex justify-center items-center gap-2 lg:gap-3 ml-3'>
                                        <Link to="/login" className='btn bg-[#EA1241] text-white w-20 lg:w-24 h-10'>Login</Link>
                                        <Link to="/register" className='btn bg-[#EA1241] text-white w-20 lg:w-24 h-10'>Register</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <style>{`
                @keyframes shrink {
                    from { width: 100%; }
                    to { width: 0%; }
                }
            `}</style>
        </>
    );
};

export default Navbar;
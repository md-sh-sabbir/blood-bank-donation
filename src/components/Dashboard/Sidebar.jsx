import { use, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import logo from '../../assets/logo-1.png'
// Icons
import { GrLogout } from 'react-icons/gr'
import { AiOutlineBars } from 'react-icons/ai'
import { MdDashboard, MdPersonOutline } from 'react-icons/md'
import { BiDonateBlood } from 'react-icons/bi'
import { IoAddCircleOutline, IoSettingsOutline } from 'react-icons/io5'


import useRole from '../../hooks/useRole'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import { AuthContext } from '../../providers/AuthContext'
import MenuItem from '../Shared/Menu/MenuItem'
import DonorMenu from './Menu/DonorMenu'
import VolunteerMenu from './Menu/VolunteerMenu'
import AdminMenu from './Menu/AdminMenu'

const Sidebar = () => {
    const { signOutUser } = use(AuthContext)
    const [isActive, setActive] = useState(false)
    const [role, isRoleLoading] = useRole()

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }

    if (isRoleLoading) return <LoadingSpinner></LoadingSpinner>

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
        <>
            {/* Small Screen Navbar, only visible till md breakpoint */}
            <div className='bg-[#EA1241] text-white flex justify-between md:hidden border-b'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to='/' className='flex items-center gap-2'>
                            <img src={logo} alt='logo' className='w-8 h-8' />
                            <h1 className='text-white text-xl'>BloodBank</h1>
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-red-700'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-white w-80 space-y-6 px-4 py-4 absolute inset-y-0 left-0 transform ${
                    isActive && '-translate-x-full'
                }  md:translate-x-0  transition duration-200 ease-in-out border-r shadow-sm`}
            >
                <div className='flex flex-col h-full'>
                    {/* Top Content */}
                    <div>
                        {/* Logo */}
                        <div className='w-full hidden md:flex px-4 py-6 flex-col justify-center items-center mx-auto border-2 border-[#EA1241] rounded-lg mb-6'>
                            <Link to='/' className='flex flex-col items-center'>
                                <img src={logo} alt='logo' className='mb-2 w-20 h-20 object-contain' />
                                <h1 className='text-2xl font-bold text-[#EA1241]'>BloodBank</h1>
                            </Link>
                        </div>
                    </div>

                    {/* Middle Content */}
                    <div className='flex flex-col justify-between flex-1'>
                        {/* Menu Items */}
                        <nav className='space-y-1'>
                            {/* Common Menu */}

                            <MenuItem icon={MdDashboard}
                                label='Dashboard'
                                address='/dashboard'
                            />

                            <MenuItem icon={MdPersonOutline}
                                label='My Profile'
                                address='/dashboard/profile'
                            />

                            

                            {/* Role-Based Menu */}
                            {role === 'donor' && <DonorMenu />}
                            {role === 'volunteer' && <VolunteerMenu />}
                            {role === 'admin' && <AdminMenu />}
                        </nav>
                    </div>

                    {/* Bottom Content */}
                    <div className='mt-auto'>
                        <hr className='mb-4 border-gray-200' />

                        
                        {/* Logout */}
                        <button
                            onClick={handleLogOut}
                            className='flex cursor-pointer w-full items-center px-4 py-3 mt-1 text-gray-700 hover:bg-gray-100 transition-colors duration-200 rounded-lg'
                        >
                            <GrLogout className='w-5 h-5' />
                            <span className='ml-3 font-medium'>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
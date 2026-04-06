
import { NavLink } from 'react-router'

const MenuItem = ({ label, address, icon: Icon }) => {
    return (
        <NavLink
            to={address}
            end
            className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
                    ? 'bg-[#EA1241] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
            }
        >
            <Icon className='w-5 h-5' />

            <span className='mx-4 font-medium'>{label}</span>
        </NavLink>
    )
}

export default MenuItem
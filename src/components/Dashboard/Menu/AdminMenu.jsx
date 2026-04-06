import React from 'react';
import { BiDonateBlood } from 'react-icons/bi';
import { FaUsers } from "react-icons/fa";
import MenuItem from '../../Shared/Menu/MenuItem';
import { MdAddCircle } from 'react-icons/md';

const AdminMenu = () => {
    return (
        <div>
            <MenuItem icon={FaUsers}
                label='All Users'
                address='/dashboard/all-users'
            ></MenuItem>
            <MenuItem icon={BiDonateBlood}
                label='All Donation Requests'
                address='/dashboard/admin-all-donation-requests'
            ></MenuItem>
            <MenuItem icon={MdAddCircle}
                label='Add Volunteer'
                address='/dashboard/add-volunteer'
            ></MenuItem>
        </div>
    );
};

export default AdminMenu;
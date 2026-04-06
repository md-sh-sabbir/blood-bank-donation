import React from 'react';
import MenuItem from '../../Shared/Menu/MenuItem';
import { IoAddCircleOutline } from 'react-icons/io5';
import { BiDonateBlood } from 'react-icons/bi';

const DonorMenu = () => {
    return (
        <div>
            <MenuItem icon={IoAddCircleOutline} 
                label='Create Donation Request'
                address='/dashboard/add-request'
            ></MenuItem>
            <MenuItem icon={BiDonateBlood} 
                label='My Donation Requests'
                address='/dashboard/my-donation-requests'
            ></MenuItem>
        </div>
    );
};

export default DonorMenu;
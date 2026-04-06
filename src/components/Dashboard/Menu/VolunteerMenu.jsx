import React from 'react';
import MenuItem from '../../Shared/Menu/MenuItem';
import { BiDonateBlood } from 'react-icons/bi';

const VolunteerMenu = () => {
    return (
        <div>
            <MenuItem icon={BiDonateBlood}
                label='All Donation Requests'
                address='/dashboard/volunteer-all-donation-requests'
            ></MenuItem>
        </div>
    );
};

export default VolunteerMenu;
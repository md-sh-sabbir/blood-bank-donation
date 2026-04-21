import React from 'react';
import banner from '../assets/banner-image.jpg';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div className='relative h-[calc(100vh-82px)] w-full'>
            {/* Banner Image */}
            <img
                src={banner}
                alt="New Year Banner"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Banner Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-[#070211FF] to-[#07021100] pointer-events-none"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white overflow-hidden">
                <h1 className="font-geom text-6xl font-black text-center">Blood Can Save a Life, Share It</h1>
                <h6 className='text-2xl mt-5'>Your blood is precious to save one's life. Make your effort to greatness.</h6>
                <div className='mt-8'>
                    <Link to='/register' className='btn bg-green-500 border-0 shadow-none w-50 text-white text-lg mr-5'>Join As Donors</Link>
                    <Link to='/search' className='btn bg-[#EA1241] border-0 shadow-none w-50 text-white text-lg'>Search Donors</Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;
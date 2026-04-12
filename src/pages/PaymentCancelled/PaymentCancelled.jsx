import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { MdCancel } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import useAxios from '../../hooks/useAxios';

const PaymentCancelled = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')

    const axiosInstance = useAxios()

    useEffect(() => {
        if (sessionId) {
            axiosInstance.post(`/payment-cancelled?session_id=${sessionId}`)
                .then(res => {
                    // console.log(res.data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [sessionId, axiosInstance])


    return (
        <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4'>
            <div className='bg-white p-10 rounded-lg shadow-lg text-center max-w-md w-full'>
                <MdCancel className='w-16 h-16 text-red-500 mx-auto mb-4' />
                <h1 className='text-3xl font-bold text-gray-800 mb-2'>
                    Payment Cancelled
                </h1>
                <p className='text-gray-600 mb-6'>
                    Your donation payment was cancelled. No charges have been made to your account.
                </p>
                
                <div className='bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-left'>
                    <p className='text-sm text-gray-700'>
                        <strong>What happened?</strong>
                    </p>
                    <p className='text-sm text-gray-600 mt-1'>
                        You chose to cancel the payment process. If this was a mistake, you can try again.
                    </p>
                </div>

                <div className='flex flex-col gap-3'>
                    <Link
                        to='/donate'
                        className='inline-block bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-md hover:from-red-600 hover:to-pink-700 transition duration-300'
                    >
                        <div className='flex items-center justify-center gap-2'>
                            <FaHeart className='w-4 h-4' />
                            <span>Try Again</span>
                        </div>
                    </Link>
                    <Link
                        to='/'
                        className='inline-block bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-md hover:bg-gray-300 transition duration-300'
                    >
                        Go to Home
                    </Link>
                </div>

                <p className='text-sm text-gray-500 mt-6'>
                    Need help? <Link to='/contact-page' className='text-red-500 hover:text-red-700 underline'>Contact Support</Link>
                </p>
            </div>
        </div>
    );
};

export default PaymentCancelled;
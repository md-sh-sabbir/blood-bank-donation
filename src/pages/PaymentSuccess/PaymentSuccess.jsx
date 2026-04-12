import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { IoBagCheckOutline } from "react-icons/io5";
import useAxios from '../../hooks/useAxios';

const PaymentSuccess = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')

    const axiosInstance = useAxios()

    useEffect(() => {
        if (sessionId) {
            axiosInstance.post(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    // console.log(res.data);
                })
        }
    }, [sessionId, axiosInstance])


    return (
        <div className='min-h-screen flex flex-col items-center justify-center p-4'>
            <div className='bg-white p-10 rounded-lg shadow-lg text-center'>
                <IoBagCheckOutline className='w-16 h-16 text-green-500 mx-auto mb-4' />
                <h1 className='text-3xl font-bold text-gray-800 mb-2'>
                    Payment Successful!
                </h1>
                <p className='text-gray-600 mb-6'>
                    Thank you for your donation. Your fund is being processed.
                </p>
                <Link
                    to='/'
                    className='inline-block bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition duration-300'
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
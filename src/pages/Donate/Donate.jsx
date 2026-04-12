import React, { use } from 'react';
import useAxios from '../../hooks/useAxios';
import Navbar from '../../components/Navbar';
import { AuthContext } from '../../providers/AuthContext';

const Donate = () => {

    const axiosInstance = useAxios()
    const {user} = use(AuthContext)

    const handleCheckout = (e) => {
        e.preventDefault()

        const donateAmount = e.target.donateAmount.value
        const donorEmail = user?.email
        const donorName = user?.displayName

        const formData = {
            donateAmount,
            donorEmail,
            donorName
        }

        axiosInstance.post('/create-payment-checkout', formData)
            .then(res => {
                // console.log(res.data);
                window.location.href = res.data.url
            })
    }

    return (
        <div>
            <Navbar></Navbar>

            <form onSubmit={handleCheckout} className='flex flex-col justify-center items-center min-h-[calc(100vh-92px)] gap-4'>
                <h2 className='text-center text-6xl font-bold'>Donate your assests in our <span className='text-red-500'>organization</span> </h2>
                <div className='flex justify-center mt-7 gap-2'>
                    <input type="text" name='donateAmount' placeholder='Enter the amount for donation' className='input w-96' />
                    <button className='btn bg-[#EA1241] text-white' type='submit'>Donate</button>
                </div>
            </form>
        </div>
    );
};

export default Donate;
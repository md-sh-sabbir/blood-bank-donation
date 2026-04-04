import React, { useContext, useState } from 'react'; // Added useState
import { useLocation, useParams, useNavigate } from 'react-router'; // Added useNavigate
import Navbar from '../../../components/Navbar';
import { BiDonateHeart } from 'react-icons/bi';
import { AuthContext } from '../../../providers/AuthContext';
import { toast } from 'react-toastify';
import useAxios from '../../../hooks/useAxios';

const DonationDetails = () => {
    const { state } = useLocation();
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate(); 
    const axiosSecure = useAxios();
    const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state

    // Store the state data in component state to preserve it
    const [donationData] = useState(state);

    const handleDonate = async (e) => {
        e.preventDefault(); // Prevent default form submission
        
        if (!donationData?._id && !id) {
            toast.error('Donation request ID not found');
            return;
        }
        
        setIsSubmitting(true);
        try {
            const donationId = donationData?._id || id;
            const result = await axiosSecure.patch(`/donation-requests/${donationId}`);
            
            // console.log(result.data);
            toast.success('Request status has been updated');
            
            // Close the modal
            document.getElementById('my_modal_1').close();
            
            // Optional: You can also navigate away or update local state
            // navigate('/dashboard'); // Uncomment if you want to navigate
            
        } catch (error) {
            console.error(error);
            toast.error('Failed to update request status');
        } finally {
            setIsSubmitting(false);
        }
    }

    // Fallback to check if state is available
    if (!state && !donationData) {
        return (
            <div>
                <Navbar />
                <div className='flex justify-center items-center h-[calc(100vh-82px)]'>
                    <div className="text-center">
                        <h2 className="text-2xl text-red-500">No donation data found</h2>
                        <button 
                            className="btn btn-primary mt-4"
                            onClick={() => navigate(-1)}
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Use the stored data instead of directly from location state
    const displayData = donationData || state;

    return (
        <div>
            <Navbar />
            <div className='flex justify-center items-center min-h-[calc(100vh-82px)] p-4'>
                <div className="bg-white md:w-4/5 lg:w-3/5 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className='flex flex-col items-center mb-5'>
                        <BiDonateHeart size={82} color='red' />
                        <h3 className='text-red-500 text-3xl md:text-4xl lg:text-5xl font-bold text-center'>
                            Donation Requests Details
                        </h3>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Blood Needs For: {displayData?.bloodGroup || 'Not specified'}
                    </h3>

                    <div className="mb-3">
                        <span className="font-semibold text-gray-700">Recipient: </span>
                        <span className="text-gray-600">{displayData?.recipientName || 'Not specified'}</span>
                    </div>

                    <div className="mb-3">
                        <span className="font-semibold text-gray-700">Hospital Name: </span>
                        <span className="text-gray-600">{displayData?.hospitalName || 'Not specified'}</span>
                    </div>

                    <div className="mb-3">
                        <span className="font-semibold text-gray-700">Address: </span>
                        <span className="text-gray-600">
                            {displayData?.recipientDistrict || 'Not specified'}, {displayData?.recipientUpazila || ''}
                        </span>
                    </div>

                    <div className="mb-3">
                        <span className="font-semibold text-gray-700">Full Address: </span>
                        <span className="text-gray-600">
                            {displayData?.fullAddress || 'Not specified'}
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 mb-5">
                        <div>
                            <span className="font-semibold text-gray-700">Date: </span>
                            <span className="text-gray-600">{displayData?.donationDate || 'Not specified'}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Time: </span>
                            <span className="text-gray-600">{displayData?.donationTime || 'Not specified'}</span>
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <button 
                            className='btn bg-blue-400 text-black hover:bg-blue-500 transition-colors' 
                            onClick={() => document.getElementById('my_modal_1').showModal()}
                        >
                            Donate
                        </button>
                    </div>

                    {/* Modal */}
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className='flex justify-center text-3xl font-bold mb-5'>Donor Information</h3>
                            <form onSubmit={handleDonate}>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text font-semibold">Donor Name</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        className="input input-bordered w-full" 
                                        value={user?.displayName || ''} 
                                        readOnly 
                                    />
                                </div>
                                
                                <div className="form-control mb-6">
                                    <label className="label">
                                        <span className="label-text font-semibold">Donor Email</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        className="input input-bordered w-full" 
                                        value={user?.email || ''} 
                                        readOnly 
                                    />
                                </div>
                                
                                <div className='flex justify-center gap-4 mt-5'>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="loading loading-spinner"></span>
                                                Processing...
                                            </>
                                        ) : 'Confirm Donation'}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn" 
                                        onClick={() => document.getElementById('my_modal_1').close()}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default DonationDetails;
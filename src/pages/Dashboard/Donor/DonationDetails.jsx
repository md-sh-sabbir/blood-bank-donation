import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router';
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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [donationData, setDonationData] = useState(state || null);
    const [isLoading, setIsLoading] = useState(!state);

    // Donation eligibility
    const [canDonate, setCanDonate] = useState(true);
    const [nextDonationDate, setNextDonationDate] = useState(null);
    const [eligibilityLoading, setEligibilityLoading] = useState(false);

    // Fetch donation data by ID if no location state (e.g. from notification popup)
    useEffect(() => {
        if (!state && id) {
            setIsLoading(true);
            axiosSecure
                .get(`/donation-request/${id}`)
                .then((res) => setDonationData(res.data))
                .catch((err) => {
                    console.error(err);
                    toast.error('Failed to load donation details');
                })
                .finally(() => setIsLoading(false));
        }
    }, [id, state]);

    // Check if logged-in user is eligible to donate
    useEffect(() => {
        if (user?.email) {
            setEligibilityLoading(true);
            axiosSecure
                .get(`/can-donate/${user.email}`)
                .then((res) => {
                    setCanDonate(res.data.canDonate);
                    setNextDonationDate(res.data.nextDonationDate);
                })
                .catch((err) => console.error('Eligibility check failed:', err))
                .finally(() => setEligibilityLoading(false));
        }
    }, [user?.email]);

    const handleDonate = async (e) => {
        e.preventDefault();

        // Frontend guard (backend also validates)
        if (!canDonate) {
            toast.error('You are not eligible to donate yet.');
            return;
        }

        if (!donationData?._id && !id) {
            toast.error('Donation request ID not found');
            return;
        }

        setIsSubmitting(true);
        try {
            const donationId = donationData?._id || id;

            // ✅ Send donorEmail so backend can update lastDonationDate
            await axiosSecure.patch(`/donation-requests/${donationId}`, {
                donorEmail: user?.email,
            });

            // Update eligibility state locally so button disables immediately
            setCanDonate(false);
            const next = new Date();
            next.setDate(next.getDate() + 120);
            setNextDonationDate(next);

            toast.success('Thank you! Donation confirmed successfully.');
            document.getElementById('my_modal_1').close();
        } catch (error) {
            console.error(error);
            toast.error('Failed to confirm donation');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div>
                <Navbar />
                <div className="flex justify-center items-center h-[calc(100vh-82px)]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#EA1241] mx-auto mb-4"></div>
                        <p className="text-xl text-gray-600">Loading donation details...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Not found state
    if (!donationData) {
        return (
            <div>
                <Navbar />
                <div className="flex justify-center items-center h-[calc(100vh-82px)]">
                    <div className="text-center">
                        <h2 className="text-2xl text-red-500">No donation data found</h2>
                        <button className="btn btn-primary mt-4" onClick={() => navigate(-1)}>
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center min-h-[calc(100vh-82px)] p-4">
                <div className="bg-white md:w-4/5 lg:w-3/5 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-col items-center mb-5">
                        <BiDonateHeart size={82} color="red" />
                        <h3 className="text-red-500 text-3xl md:text-4xl lg:text-5xl font-bold text-center">
                            Donation Request Details
                        </h3>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Blood Needed:{' '}
                        <span className="text-[#EA1241]">
                            {donationData?.bloodGroup || 'Not specified'}
                        </span>
                    </h3>

                    <div className="mb-3">
                        <span className="font-semibold text-gray-700">Recipient: </span>
                        <span className="text-gray-600">
                            {donationData?.recipientName || 'Not specified'}
                        </span>
                    </div>

                    <div className="mb-3">
                        <span className="font-semibold text-gray-700">Hospital Name: </span>
                        <span className="text-gray-600">
                            {donationData?.hospitalName || 'Not specified'}
                        </span>
                    </div>

                    <div className="mb-3">
                        <span className="font-semibold text-gray-700">Address: </span>
                        <span className="text-gray-600">
                            {donationData?.recipientDistrict || 'Not specified'},{' '}
                            {donationData?.recipientUpazila || ''}
                        </span>
                    </div>

                    <div className="mb-3">
                        <span className="font-semibold text-gray-700">Full Address: </span>
                        <span className="text-gray-600">
                            {donationData?.fullAddress || 'Not specified'}
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 mb-3">
                        <div>
                            <span className="font-semibold text-gray-700">Date: </span>
                            <span className="text-gray-600">
                                {donationData?.donationDate || 'Not specified'}
                            </span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Time: </span>
                            <span className="text-gray-600">
                                {donationData?.donationTime || 'Not specified'}
                            </span>
                        </div>
                    </div>

                    <div className="mb-5">
                        <span className="font-semibold text-gray-700">Contact No.: </span>
                        <span className="text-gray-600">{donationData?.requesterNumber || 'Not specified'}</span>
                    </div>

                    {/* ── Eligibility Notice ── */}
                    {!canDonate && nextDonationDate && (
                        <div className="mb-5 bg-yellow-50 border border-yellow-300 rounded-lg px-4 py-3 text-sm text-yellow-800">
                            ⏳ You donated recently. You can donate again on{' '}
                            <span className="font-bold">
                                {new Date(nextDonationDate).toDateString()}
                            </span>
                            .
                        </div>
                    )}

                    {/* ── Donate Button ── */}
                    <div className="flex flex-col items-center gap-2">
                        <button
                            className={`btn transition-colors ${
                                canDonate && !eligibilityLoading
                                    ? 'bg-blue-400 text-black hover:bg-blue-500'
                                    : 'btn-disabled bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={!canDonate || eligibilityLoading || !user}
                            onClick={() =>
                                document.getElementById('my_modal_1').showModal()
                            }
                        >
                            {eligibilityLoading
                                ? 'Checking eligibility...'
                                : !user
                                ? 'Login to Donate'
                                : canDonate
                                ? 'Donate'
                                : 'Not Eligible Yet'}
                        </button>

                        {!user && (
                            <p className="text-xs text-gray-500">
                                Please{' '}
                                <span
                                    className="text-[#EA1241] cursor-pointer underline"
                                    onClick={() => navigate('/login')}
                                >
                                    log in
                                </span>{' '}
                                to donate.
                            </p>
                        )}
                    </div>

                    {/* ── Modal ── */}
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="flex justify-center text-3xl font-bold mb-5">
                                Donor Information
                            </h3>
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

                                <div className="flex justify-center gap-4 mt-5">
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
                                        ) : (
                                            'Confirm Donation'
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() =>
                                            document.getElementById('my_modal_1').close()
                                        }
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


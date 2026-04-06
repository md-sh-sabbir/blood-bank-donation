import React, { use, useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../providers/AuthContext';

const AllDonationRequest = () => {
    const axiosSecure = useAxios();
    const { user } = use(AuthContext);
    const [statusFilter, setStatusFilter] = useState('all');
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    const { data, isLoading, error } = useQuery({
        queryKey: ["admin-all-donation-requests", user?.email, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/admin-all-donation-requests?page=${currentPage}&size=${itemsPerPage}`
            );
            return res.data;
        },
    });

    const requests = data?.request || [];
    const totalRequest = data?.totalRequest || 0;

    const numberOfPages = Math.ceil(totalRequest / itemsPerPage);

    const pages = [...Array(numberOfPages).keys()].map(e => e + 1);
    const totalPages = numberOfPages;

    // Filter requests based on status (client-side filtering)
    const filteredRequests = requests.filter((req) => {
        if (statusFilter === 'all') return true;
        return req.donationStatus === statusFilter;
    });

    // Get status badge color
    const getStatusBadge = (status) => {
        const statusColors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            inprogress: 'bg-blue-100 text-blue-800 border-blue-300',
            done: 'bg-green-100 text-green-800 border-green-300',
            canceled: 'bg-red-100 text-red-800 border-red-300',
        };

        return (
            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber - 1);
    };

   

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#EA1241] mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600">Loading donation requests...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-red-600">Error loading donation requests</p>
                    <p className="text-gray-600 mt-2">{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Page Title */}
                <h1 className="text-4xl font-bold text-gray-800 mb-8">All Donation Requests</h1>

                {/* Filter Buttons */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Filter by Status:</h2>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setStatusFilter('all')}
                            className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                                statusFilter === 'all'
                                    ? 'bg-[#EA1241] text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setStatusFilter('pending')}
                            className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                                statusFilter === 'pending'
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setStatusFilter('inprogress')}
                            className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                                statusFilter === 'inprogress'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            In Progress
                        </button>
                        <button
                            onClick={() => setStatusFilter('done')}
                            className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                                statusFilter === 'done'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Done
                        </button>
                        <button
                            onClick={() => setStatusFilter('canceled')}
                            className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                                statusFilter === 'canceled'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Canceled
                        </button>
                    </div>
                </div>

                
                 
                {/* Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100 border-b-2 border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">SL No.</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Recipient Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hospital</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Blood Group</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredRequests.length > 0 ? (
                                    filteredRequests.map((req, index) => (
                                        <tr key={req._id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {currentPage * itemsPerPage + index + 1}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700 font-medium">{req.recipientName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {req.recipientDistrict}, {req.recipientUpazila}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700 font-medium">{req.hospitalName}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                                                    {req.bloodGroup}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <div>{req.donationDate}</div>
                                                <div className="text-xs text-gray-500">{req.donationTime}</div>
                                            </td>
                                            <td className="px-6 py-4">{getStatusBadge(req.donationStatus)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                            No donation requests found for the selected filter.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center items-center gap-2">
                        {/* Previous Button */}
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 0}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                                currentPage === 0
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-[#EA1241] text-white hover:bg-[#d10f38]'
                            }`}
                        >
                            Previous
                        </button>

                        {/* Page Numbers */}
                        <div className="flex gap-2">
                            {pages.map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageClick(page)}
                                    className={`w-10 h-10 rounded-lg font-semibold transition-colors duration-200 ${
                                        currentPage === page - 1
                                            ? 'bg-[#EA1241] text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages - 1}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                                currentPage === totalPages - 1
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-[#EA1241] text-white hover:bg-[#d10f38]'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllDonationRequest;
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import DonationCard from "./DonationCard";
import Navbar from "../../../components/Navbar";

// Main Component - All Donation Requests
const AllDonationReq = () => {
    const axiosSecure = useAxios();

    // Fetch donation requests from API
    const { data: requests, isLoading, error } = useQuery({
        queryKey: ["all-donation-requests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/all-donation-requests");
            return res.data;
        },
    });

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
        <div>
            <Navbar></Navbar>
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-7xl mx-auto">

                    <h1 className="text-5xl font-bold text-[#EA1241] text-center mb-12">
                        All Donation Request
                    </h1>

                    {requests && requests.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {requests.map((request) => (
                                <DonationCard key={request._id} request={request} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-2xl text-gray-500">No donation requests found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllDonationReq;
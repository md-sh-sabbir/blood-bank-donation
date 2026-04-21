// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../../hooks/useAxios";
// import DonationCard from "./DonationCard";
// import Navbar from "../../../components/Navbar";

// // Main Component - All Donation Requests
// const AllDonationReq = () => {
//     const axiosSecure = useAxios();

//     // Fetch donation requests from API
//     const { data: requests, isLoading, error } = useQuery({
//         queryKey: ["all-donation-requests"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/all-donation-requests");
//             return res.data;
//         },
//     });

//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#EA1241] mx-auto mb-4"></div>
//                     <p className="text-xl text-gray-600">Loading donation requests...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <p className="text-xl text-red-600">Error loading donation requests</p>
//                     <p className="text-gray-600 mt-2">{error.message}</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <Navbar></Navbar>
//             <div className="min-h-screen bg-gray-50 py-8 px-4">
//                 <div className="max-w-7xl mx-auto">

//                     <h1 className="text-5xl font-bold text-[#EA1241] text-center mb-12">
//                         All Donation Request
//                     </h1>

//                     {requests && requests.length > 0 ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {requests.map((request) => (
//                                 <DonationCard key={request._id} request={request} />
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-20">
//                             <p className="text-2xl text-gray-500">No donation requests found</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AllDonationReq;


// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../../hooks/useAxios";
// import DonationCard from "./DonationCard";
// import Navbar from "../../../components/Navbar";

// // Main Component - All Donation Requests
// const AllDonationReq = () => {
//     const axiosSecure = useAxios();

//     // Fetch donation requests from API
//     const { data: requests, isLoading, error } = useQuery({
//         queryKey: ["all-donation-requests"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/all-donation-requests");
//             return res.data;
//         },
//     });

//     // Fetch blood group stats
//     const { data: stats = [], isLoading: statsLoading } = useQuery({
//         queryKey: ["blood-stats"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/blood-stats");
//             return res.data;
//         },
//     });

//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#EA1241] mx-auto mb-4"></div>
//                     <p className="text-xl text-gray-600">Loading donation requests...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <p className="text-xl text-red-600">Error loading donation requests</p>
//                     <p className="text-gray-600 mt-2">{error.message}</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <Navbar />
//             <div className="min-h-screen bg-gray-50 py-8 px-4">
//                 <div className="max-w-7xl mx-auto">

//                     <h1 className="text-5xl font-bold text-[#EA1241] text-center mb-12">
//                         All Donation Request
//                     </h1>

//                     {/* Blood Group Stats Section */}
//                     {!statsLoading && stats.length > 0 && (
//                         <div className="mb-12">
//                             <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
//                                 Requests by Blood Group
//                             </h2>
//                             <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
//                                 {stats.map((item, index) => (
//                                     <div
//                                         key={index}
//                                         className={`flex flex-col items-center justify-center rounded-xl py-4 px-2 shadow-md border
//                                             ${index === 0
//                                                 ? "bg-[#EA1241] text-white border-[#EA1241] scale-105"
//                                                 : "bg-white text-gray-700 border-gray-200"
//                                             }`}
//                                     >
//                                         <span className={`text-2xl font-extrabold ${index === 0 ? "text-white" : "text-[#EA1241]"}`}>
//                                             {item._id}
//                                         </span>
//                                         <span className={`text-sm mt-1 ${index === 0 ? "text-red-100" : "text-gray-500"}`}>
//                                             {item.count} {item.count === 1 ? "request" : "requests"}
//                                         </span>
//                                         {index === 0 && (
//                                             <span className="text-xs bg-white text-[#EA1241] font-semibold px-2 py-0.5 rounded-full mt-2">
//                                                 Most Needed
//                                             </span>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Donation Request Cards */}
//                     {requests && requests.length > 0 ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {requests.map((request) => (
//                                 <DonationCard key={request._id} request={request} />
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-20">
//                             <p className="text-2xl text-gray-500">No donation requests found</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AllDonationReq;


import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import DonationCard from "./DonationCard";
import Navbar from "../../../components/Navbar";

const AllDonationReq = () => {
    const axiosSecure = useAxios();
    const [selectedGroup, setSelectedGroup] = useState("All");

    // Fetch all donation requests
    const { data: requests = [], isLoading, error } = useQuery({
        queryKey: ["all-donation-requests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/all-donation-requests");
            return res.data;
        },
    });

    // Fetch blood group stats
    const { data: stats = [], isLoading: statsLoading } = useQuery({
        queryKey: ["blood-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/blood-stats");
            return res.data;
        },
    });

    // Filter requests based on selected blood group
    const filteredRequests =
        selectedGroup === "All"
            ? requests
            : requests.filter((r) => r.bloodGroup === selectedGroup);

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
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-7xl mx-auto">

                    <h1 className="text-5xl font-bold text-[#EA1241] text-center mb-12">
                        All Donation Request
                    </h1>

                    {/* Blood Group Filter Tabs */}
                    {!statsLoading && (
                        <div className="mb-10">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                                Categories of Blood Group
                            </h2>

                            <div className="flex flex-wrap justify-center gap-3">
                                {/* All Button */}
                                <button
                                    onClick={() => setSelectedGroup("All")}
                                    className={`px-5 py-2.5 rounded-full font-bold text-sm border-2 transition-all duration-200 cursor-pointer
                                        ${selectedGroup === "All"
                                            ? "bg-[#EA1241] text-white border-[#EA1241] shadow-lg scale-105"
                                            : "bg-white text-gray-600 border-gray-300 hover:border-[#EA1241] hover:text-[#EA1241]"
                                        }`}
                                >
                                    All
                                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-semibold
                                        ${selectedGroup === "All" ? "bg-white text-[#EA1241]" : "bg-gray-100 text-gray-500"}`}>
                                        {requests.length}
                                    </span>
                                </button>

                                {/* Blood Group Buttons (sorted by most requested) */}
                                {stats.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedGroup(item._id)}
                                        className={`px-5 py-2.5 rounded-full font-bold text-sm border-2 transition-all duration-200 cursor-pointer
                                            ${selectedGroup === item._id
                                                ? "bg-[#EA1241] text-white border-[#EA1241] shadow-lg scale-105"
                                                : "bg-white text-gray-600 border-gray-300 hover:border-[#EA1241] hover:text-[#EA1241]"
                                            }`}
                                    >
                                        {item._id}
                                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-semibold
                                            ${selectedGroup === item._id ? "bg-white text-[#EA1241]" : "bg-gray-100 text-gray-500"}`}>
                                            {item.count}
                                        </span>
                                        {index === 0 && selectedGroup !== item._id && (
                                            <span className="ml-1 text-xs">🔥</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Active filter label */}
                    <p className="text-center text-gray-500 text-sm mb-6">
                        Showing{" "}
                        <span className="font-semibold text-[#EA1241]">
                            {selectedGroup === "All" ? "all" : selectedGroup}
                        </span>{" "}
                        requests —{" "}
                        <span className="font-semibold">{filteredRequests.length}</span> found
                    </p>

                    {/* Donation Request Cards */}
                    {filteredRequests.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredRequests.map((request) => (
                                <DonationCard key={request._id} request={request} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-2xl text-gray-500">
                                No requests found for blood group{" "}
                                <span className="text-[#EA1241] font-bold">{selectedGroup}</span>
                            </p>
                            <button
                                onClick={() => setSelectedGroup("All")}
                                className="mt-4 px-6 py-2 bg-[#EA1241] text-white rounded-full font-semibold hover:bg-red-700 transition cursor-pointer"
                            >
                                Show All Requests
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllDonationReq;
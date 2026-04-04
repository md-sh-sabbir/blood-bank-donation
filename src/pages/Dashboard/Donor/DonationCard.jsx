import React from "react";
import { Link } from "react-router-dom";

// Single Card Component
const DonationCard = ({ request }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Blood Needs For: {request.bloodGroup}
            </h3>

            {/* Recipient */}
            <div className="mb-3">
                <span className="font-semibold text-gray-700">Recipient: </span>
                <span className="text-gray-600">{request.recipientName}</span>
            </div>

            {/* Address */}
            <div className="mb-3">
                <span className="font-semibold text-gray-700">Address: </span>
                <span className="text-gray-600">
                    {request.recipientDistrict}, {request.recipientUpazila}
                </span>
            </div>

            {/* Date and Time */}
            <div className="flex gap-6 mb-5">
                <div>
                    <span className="font-semibold text-gray-700">Date: </span>
                    <span className="text-gray-600">{request.donationDate}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Time: </span>
                    <span className="text-gray-600">{request.donationTime}</span>
                </div>
            </div>

            {/* View Details Button */}
            <Link
                to={`/donation-request/${request._id}`} state={request}
                className="inline-block px-6 py-3 bg-[#EA1241] hover:bg-[#d10f38] text-white font-semibold rounded-lg transition-colors duration-200"
            >
                View Details
            </Link>
        </div>
    );
};

export default DonationCard;
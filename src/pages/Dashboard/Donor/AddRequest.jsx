import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

const AddRequest = () => {
    const { user } = use(AuthContext);
    const axiosSecure = useAxios();
    const queryClient = useQueryClient();


    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState('')
    const [upazila, setUpazila] = useState('')

    useEffect(() => {
        axios.get('/upazilas.json')
            .then(res => {
                // console.log(res.data);
                setUpazilas(res.data.upazilas)
            })

        axios.get('/districts.json')
            .then(res => {
                // console.log(res.data);
                setDistricts(res.data.districts)
            })
    }, [])

    const createRequest = useMutation({
        mutationFn: (requestData) =>
            axiosSecure.post("/add-request", requestData),
        onSuccess: () => {
            queryClient.invalidateQueries(["donation-requests"]);
            toast.success("Donation request created successfully!");
            // Optional: Reset form or redirect
        },
        onError: (error) => {
            console.error("Error creating request:", error);
            toast.error("Failed to create donation request. Please try again.");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const requestData = {
            requesterName: form.requesterName.value,
            requesterEmail: form.requesterEmail.value,
            recipientName: form.recipientName.value,
            recipientDistrict: form.recipientDistrict.value,
            recipientUpazila: form.recipientUpazila.value,
            hospitalName: form.hospitalName.value,
            fullAddress: form.fullAddress.value,
            bloodGroup: form.bloodGroup.value,
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
            requestMessage: form.requestMessage.value,
            donationStatus: "pending", // Default status
        };

        createRequest.mutate(requestData);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">
                            Create Donation Request
                        </h1>
                        <p className="text-gray-600">
                            Fill out the form below to request blood donation
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Requester Information */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-[#EA1241]">
                                Requester Information
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Requester Name (Read Only) */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Requester Name
                                    </label>
                                    <input
                                        type="text"
                                        name="requesterName"
                                        readOnly
                                        defaultValue={user?.displayName || user?.name}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-600 focus:outline-none"
                                    />
                                </div>

                                {/* Requester Email (Read Only) */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Requester Email
                                    </label>
                                    <input
                                        type="email"
                                        name="requesterEmail"
                                        readOnly
                                        defaultValue={user?.email}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-600 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Recipient Information */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-[#EA1241]">
                                Recipient Information
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Recipient Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Recipient Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="recipientName"
                                        required
                                        placeholder="Enter recipient name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA1241] focus:border-transparent"
                                    />
                                </div>

                                {/* Blood Group */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Blood Group <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="bloodGroup"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA1241] focus:border-transparent"
                                    >
                                        <option value="">Select Blood Group</option>
                                        <option>A+</option>
                                        <option>A-</option>
                                        <option>B+</option>
                                        <option>B-</option>
                                        <option>AB+</option>
                                        <option>AB-</option>
                                        <option>O+</option>
                                        <option>O-</option>
                                    </select>
                                </div>

                                {/* Recipient District */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        District <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={district}
                                        onChange={(e) => setDistrict(e.target.value)}
                                        name="recipientDistrict"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA1241] focus:border-transparent"
                                    >
                                        <option disabled selected value=''>Select Your District</option>
                                        {
                                            districts.map(d => <option value={d?.name} key={d.id}>{d?.name}</option>)
                                        }
                                    </select>
                                </div>

                                {/* Recipient Upazila */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Upazila <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={upazila}
                                        onChange={(e) => setUpazila(e.target.value)}
                                        name="recipientUpazila"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA1241] focus:border-transparent"
                                    >
                                        <option disabled selected value=''>Select Your Upazila</option>
                                        {
                                            upazilas.map(u => <option value={u?.name} key={u.id}>{u?.name}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Hospital & Location Information */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-[#EA1241]">
                                Hospital & Location
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Hospital Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Hospital Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="hospitalName"
                                        required
                                        placeholder="e.g., Dhaka Medical College Hospital"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA1241] focus:border-transparent"
                                    />
                                </div>

                                {/* Full Address */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fullAddress"
                                        required
                                        placeholder="e.g., Zahir Raihan Rd, Dhaka"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA1241] focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Donation Schedule */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-[#EA1241]">
                                Donation Schedule
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Donation Date */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Donation Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="donationDate"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA1241] focus:border-transparent"
                                    />
                                </div>

                                {/* Donation Time */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Donation Time <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        name="donationTime"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA1241] focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Request Message */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-[#EA1241]">
                                Request Details
                            </h2>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Request Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="requestMessage"
                                    required
                                    rows="5"
                                    placeholder="Please describe why you need blood donation and any additional details..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA1241] focus:border-transparent resize-none"
                                ></textarea>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={createRequest.isPending}
                                className="px-12 py-4 bg-[#EA1241] hover:bg-[#d10f38] text-white text-lg font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                            >
                                {createRequest.isPending ? "Submitting..." : "Submit Request"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRequest;
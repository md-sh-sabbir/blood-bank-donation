import React, { use } from "react";
import { AuthContext } from "../../../providers/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { Link } from "react-router";
import useRole from "../../../hooks/useRole";
import { FaUsers, FaTint, FaDonate } from "react-icons/fa";

const DashboardHome = () => {
    const { user } = use(AuthContext);
    const axiosSecure = useAxios();
    const [role, isRoleLoading] = useRole();

    /* -------------------- Donor Featured Requests -------------------- */
    const { data: requests = [], isLoading } = useQuery({
        queryKey: ["featured-requests"],
        enabled: role === "donor",
        queryFn: async () => {
            const res = await axiosSecure.get("/featured-requests");
            return res.data;
        },
    });

    /* -------------------- Admin Statistics -------------------- */
    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        enabled: role === "admin",
        queryFn: async () => (await axiosSecure.get("/users")).data,
    });

    const { data: allRequests = [] } = useQuery({
        queryKey: ["all-requests"],
        enabled: role === "admin",
        queryFn: async () => (await axiosSecure.get("/all-donation-requests")).data,
    });

    const { data: payments = [] } = useQuery({
        queryKey: ["payments"],
        enabled: role === "admin",
        queryFn: async () => (await axiosSecure.get("/payments")).data,
    });

    const totalFunding = payments.reduce(
        (sum, pay) => sum + pay.amount,
        0
    );

    if (isRoleLoading || isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }


    const getStatusBadge = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800",
            inprogress: "bg-blue-100 text-blue-800",
        };
        return (
            <span className={`px-3 py-1 rounded-full text-sm ${colors[status]}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="p-6">

            <h1 className="text-5xl font-bold text-center my-10">
                <span className="text-red-500">Welcome</span> {user?.displayName}
            </h1>


            {role === "donor" && (
                <>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Recipient</th>
                                    <th>Address</th>
                                    <th>Hospital</th>
                                    <th>Blood</th>
                                    <th>Date & Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req, i) => (
                                    <tr key={req._id}>
                                        <td>{i + 1}</td>
                                        <td>{req.recipientName}</td>
                                        <td>
                                            {req.fullAddress}, {req.recipientUpazila},{" "}
                                            {req.recipientDistrict}
                                        </td>
                                        <td>{req.hospitalName}</td>
                                        <td>
                                            <span className="px-2 py-1 bg-red-100 rounded">
                                                {req.bloodGroup}
                                            </span>
                                        </td>
                                        <td>
                                            {req.donationDate}
                                            <br />
                                            <small>{req.donationTime}</small>
                                        </td>
                                        <td>{getStatusBadge(req.donationStatus)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="text-center mt-6">
                        <Link to="/all-donation-requests" className="btn bg-blue-100 text-blue-600">
                            View All Requests
                        </Link>
                    </div>
                </>
            )}

            {/* ==================== ADMIN DASHBOARD ==================== */}
            {role === "admin" && (
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
                        <FaUsers className="text-4xl text-blue-500" />
                        <div>
                            <h3 className="text-2xl font-bold">{users.length}</h3>
                            <p className="text-gray-500">Total Donors</p>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
                        <FaDonate className="text-4xl text-green-500" />
                        <div>
                            <h3 className="text-2xl font-bold">${totalFunding}</h3>
                            <p className="text-gray-500">Total Funding</p>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
                        <FaTint className="text-4xl text-red-500" />
                        <div>
                            <h3 className="text-2xl font-bold">
                                {allRequests.length}
                            </h3>
                            <p className="text-gray-500">Donation Requests</p>
                        </div>
                    </div>
                </div>

            )}



            {/* ==================== VOLUNTEER DASHBOARD ==================== */}
            {role === "volunteer" && (
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
                        <FaUsers className="text-4xl text-blue-500" />
                        <div>
                            <h3 className="text-2xl font-bold">{users.length}</h3>
                            <p className="text-gray-500">Total Donors</p>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
                        <FaDonate className="text-4xl text-green-500" />
                        <div>
                            <h3 className="text-2xl font-bold">${totalFunding}</h3>
                            <p className="text-gray-500">Total Funding</p>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
                        <FaTint className="text-4xl text-red-500" />
                        <div>
                            <h3 className="text-2xl font-bold">
                                {allRequests.length}
                            </h3>
                            <p className="text-gray-500">Donation Requests</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardHome;
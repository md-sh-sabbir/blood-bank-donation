import React, { use, useEffect, useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import { AuthContext } from '../../../providers/AuthContext';

const AllUsers = () => {

    const axiosSecure = useAxios()
    const [users, setUsers] = useState([])
    const [refetch, setRefetch] = useState(false)


    useEffect(() => {
        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data)
            })
    }, [axiosSecure, refetch])

    // console.log(users);

    const handleStatusChange = (email, status) => {
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
            .then(res => {
                // console.log(res.data);
                setRefetch(!refetch)
            })
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name & Email</th>
                            <th>Role</th>
                            <th>User Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users?.map(user => <tr key={user._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user?.photo}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user?.name}</div>
                                            <div className="text-sm opacity-50">{user?.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="text-md font-bold opacity-50">{user?.role}</span>
                                </td>
                                <td>{user?.status}</td>
                                <th>
                                    {
                                        user?.status == 'active' ? <button onClick={() => handleStatusChange(user?.email, 'blocked')} className="btn btn-error text-white btn-xs">Block</button> : <button onClick={() => handleStatusChange(user?.email, 'active')} className="btn btn-success text-white btn-xs">Active</button>
                                    }


                                </th>
                            </tr>)
                        }

                    </tbody>
                    {/* foot */}
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
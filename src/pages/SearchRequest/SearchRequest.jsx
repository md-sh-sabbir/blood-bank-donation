import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import useAxios from '../../hooks/useAxios';
import DonationCard from '../Dashboard/Donor/DonationCard';

const SearchRequest = () => {

    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState('')
    const [upazila, setUpazila] = useState('')

    const [requests, setRequests] = useState([])

    const axiosInstance = useAxios()

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

    const handleSearch = (e) => {
        e.preventDefault()
        const bloodGroup = e.target.bloodGroup.value

        axiosInstance.get(`/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
            .then(res => {
                // console.log(res.data);
                setRequests(res.data)
            })
    }

    return (
        <div>
            <Navbar></Navbar>

            <div className='max-w-7xl mx-auto my-10'>
                <form onSubmit={handleSearch} className='fieldset flex'>
                    <select name="bloodGroup" className='select' defaultValue="">
                        <option value="" disabled>
                            Select Blood Group
                        </option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>

                    <select value={district} onChange={(e) => setDistrict(e.target.value)} className='select'>
                        <option disabled selected value=''>Select Your District</option>
                        {
                            districts.map(d => <option value={d?.name} key={d.id}>{d?.name}</option>)
                        }
                    </select>

                    <select value={upazila} onChange={(e) => setUpazila(e.target.value)} className='select'>
                        <option disabled selected value=''>Select Your Upazila</option>
                        {
                            upazilas.map(u => <option value={u?.name} key={u.id}>{u?.name}</option>)
                        }
                    </select>
                    <button className="btn bg-[#EA1241] text-white">Search</button>
                </form>
            </div>

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
    );
};

export default SearchRequest;
import React, { use, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../../../providers/AuthContext';
import useAxios from '../../../hooks/useAxios';
import Navbar from '../../../components/Navbar';

const AddVolunteer = () => {

    const { user, createUser, setUser, updateUser, emailVerification } = use(AuthContext)
    const navigate = useNavigate()
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const axiosSecure = useAxios()

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


    const handleRegister = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        // if (user) {
        //     setError('Please log out first');
        //     return;
        // }

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const blood = form.bloodGroup.value;
        const imageFile = form.photo.files[0];

        // Password validation
        if (password.length < 6) {
            return setError('Password must be at least 6 characters');
        }
        if (!/[A-Z]/.test(password)) {
            return setError('Password must contain an uppercase letter');
        }
        if (!/[a-z]/.test(password)) {
            return setError('Password must contain a lowercase letter');
        }

        try {
            // Upload image
            let photoUrl = '';
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);

                const imgRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_api_key}`,
                    formData
                );

                photoUrl = imgRes.data.data.display_url;
            }

            const result = await createUser(email, password);

            await updateUser(name, photoUrl);

            // await emailVerification();

            // Save user to database
            const userData = {
                email,
                name,
                photo: photoUrl,
                blood,
                district,
                upazila,
                status: 'active',
                role: 'volunteer'
            };

            await axiosSecure.post('/users', userData);

            setUser(result.user);
            // setSuccess(
            //     'Registration successful! Please check your email for verification.'
            // );
            toast.success('Registration Successful');
            navigate('/dashboard')
            form.reset();

        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };


    return (
        <div>
            <div className='flex justify-center h-[calc(100vh-182px)] items-center py-10'>
                <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 border-white border-1 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold">Add Volunteer now!</h1>
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input"
                                    placeholder="Your Name"
                                    required
                                />
                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input"
                                    placeholder="Email"
                                    required
                                />
                                <label className="label">Photo</label>
                                <input
                                    type="file"
                                    name="photo"
                                    className="file-input"
                                    placeholder="Your Photo url"
                                />
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

                                <label className="label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="input"
                                    placeholder="Password"
                                    required
                                />

                                {/* Error Message Display */}
                                {error && (
                                    <div className="text-red-500 mt-2">
                                        <span className="text-sm">{error}</span>
                                    </div>
                                )}

                                {
                                    success && (
                                        <div className='text-green-500'>
                                            <span className='text-sm'>{success}</span>
                                        </div>
                                    )
                                }


                                <button className="btn btn-neutral mt-4 mb-1">Add Volunteer</button>

                                {/* <button onClick={handleGoogleSignIn} type="button" className="btn bg-white text-black border-[#e5e5e5]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button> */}
                            </fieldset>
                        </form>
                        <p>Already have an account? <Link className="text-blue-500 hover:text-blue-800 ml-1" to='/login'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddVolunteer;
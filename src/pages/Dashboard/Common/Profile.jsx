import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { use, useState } from "react";
import { AuthContext } from "../../../providers/AuthContext";
import useAxios from "../../../hooks/useAxios";
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });

  const updateProfile = useMutation({
    mutationFn: (updatedData) =>
      axiosSecure.put(`/user/${profile._id}`, updatedData),
      onSuccess: () => {
      queryClient.invalidateQueries(["profile", user?.email]);
      setIsEditing(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      blood: form.blood.value,
      district: form.district.value,
      upazila: form.upazila.value,
    };
    toast.success('Profile updated successfully!')

    updateProfile.mutate(updatedData);
  };

  if (isLoading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 md:p-12">

        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={profile?.photo}
              className="w-32 h-32 rounded-lg object-cover shadow-lg"
              alt="User Avatar"
            />
          </div>
          <h2 className="text-4xl font-bold mt-6 text-gray-800">User Profile</h2>

          {/* Edit Button - Only shown when not editing */}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-8 py-2 bg-teal-400 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Edit
            </button>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Email (readonly always) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                readOnly
                defaultValue={profile?.email}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-600 focus:outline-none"
              />
            </div>

            {/* Name (readonly always) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                readOnly
                defaultValue={profile?.name}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-600 focus:outline-none"
              />
            </div>

            {/* Upload Avatar - Only shown when editing */}
            {isEditing && (
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Avatar
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700"
                />
              </div>
            )}

            {/* Blood Group */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Blood Group*
              </label>
              <select
                name="blood"
                defaultValue={profile?.blood}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 ${!isEditing ? "bg-gray-50 cursor-not-allowed text-gray-600" : "bg-white"
                  }`}
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

            {/* District */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                District
              </label>
              <select
                name="district"
                defaultValue={profile?.district}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 ${!isEditing ? "bg-gray-50 cursor-not-allowed text-gray-600" : "bg-white"
                  }`}
              >
                <option value="">Select District</option>
                <option>Dhaka</option>
                <option>Brahmanbaria</option>
                <option>Chattogram</option>
                <option>Rajshahi</option>
              </select>
            </div>

            {/* Upazila */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upazila
              </label>
              <select
                name="upazila"
                defaultValue={profile?.upazila}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 ${!isEditing ? "bg-gray-50 cursor-not-allowed text-gray-600" : "bg-white"
                  }`}
              >
                <option value="">Select Upazila</option>
                <option>Amtali</option>
                <option>Akhaura</option>
                <option>Savar</option>
              </select>
            </div>
          </div>

          {/* Save Button - Only shown when editing */}
          {isEditing && (
            <div className="mt-8">
              <button
                type="submit"
                disabled={updateProfile.isPending}
                className="w-full py-4 bg-[#EA1241] hover:bg-[#d10f38] text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateProfile.isPending ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-full mt-3 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
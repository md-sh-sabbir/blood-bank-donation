import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthContext";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedBlood, setSelectedBlood] = useState("");

  useEffect(() => {
    axios.get("/upazilas.json").then((res) => setUpazilas(res.data.upazilas));
    axios.get("/districts.json").then((res) => setDistricts(res.data.districts));
  }, []);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });

  // Sync state when profile loads or updates after save
  useEffect(() => {
    if (profile) {
      setSelectedDistrict(profile.district || "");
      setSelectedUpazila(profile.upazila || "");
      setSelectedBlood(profile.blood || "");
    }
  }, [profile?.district, profile?.upazila, profile?.blood]);

  // Find district object to match upazila by district_id
  const selectedDistrictObj = districts.find((d) => d.name === selectedDistrict);

  // Filter upazilas by selected district
  const filteredUpazilas = upazilas.filter((u) => {
    if (!selectedDistrictObj) return false;
    return (
      u.district_id === selectedDistrictObj.id ||
      u.district_name === selectedDistrict
    );
  });

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedUpazila("");
  };

  // Calculate donation eligibility from lastDonationDate
  const getDonationStatus = () => {
    if (!profile?.lastDonationDate) return null;

    const last = new Date(profile.lastDonationDate);
    const now = new Date();
    const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));
    const canDonate = diffDays >= 120;

    const nextDate = new Date(last);
    nextDate.setDate(nextDate.getDate() + 120);

    return { canDonate, nextDate, diffDays };
  };

  const donationStatus = getDonationStatus();

  const updateProfile = useMutation({
    mutationFn: (updatedData) =>
      axiosSecure.put(`/user/${profile._id}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile", user?.email]);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      console.error("Update error:", error?.response?.data);
      toast.error(error?.response?.data?.message || "Failed to update profile.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      blood: selectedBlood,
      district: selectedDistrict,
      upazila: selectedUpazila,
    };
    updateProfile.mutate(updatedData);
  };

  const handleCancel = () => {
    setSelectedDistrict(profile?.district || "");
    setSelectedUpazila(profile?.upazila || "");
    setSelectedBlood(profile?.blood || "");
    setIsEditing(false);
  };

  if (isLoading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 md:p-12">
        <div className="flex flex-col items-center mb-8">
          <img
            src={profile?.photo}
            className="w-32 h-32 rounded-lg object-cover shadow-lg"
            alt="User Avatar"
          />
          <h2 className="text-4xl font-bold mt-6 text-gray-800">User Profile</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-8 py-2 bg-teal-400 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                readOnly
                defaultValue={profile?.email}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-600 focus:outline-none"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
              <input
                type="text"
                readOnly
                defaultValue={profile?.name}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-600 focus:outline-none"
              />
            </div>

            {/* Upload Avatar - edit mode only */}
            {isEditing && (
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700"
                />
              </div>
            )}

            {/* Blood Group */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Group*</label>
              <select
                value={selectedBlood}
                onChange={(e) => setSelectedBlood(e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                  !isEditing ? "bg-gray-50 cursor-not-allowed text-gray-600" : "bg-white"
                }`}
              >
                <option value="">Select Blood Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">District</label>
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                  !isEditing ? "bg-gray-50 cursor-not-allowed text-gray-600" : "bg-white"
                }`}
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option value={d.name} key={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upazila</label>
              <select
                value={selectedUpazila}
                onChange={(e) => setSelectedUpazila(e.target.value)}
                disabled={!isEditing || !selectedDistrict}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                  !isEditing || !selectedDistrict
                    ? "bg-gray-50 cursor-not-allowed text-gray-600"
                    : "bg-white"
                }`}
              >
                <option value="">
                  {selectedDistrict ? "Select Upazila" : "Select a district first"}
                </option>
                {filteredUpazilas.map((u) => (
                  <option value={u.name} key={u.id}>{u.name}</option>
                ))}
              </select>
            </div>

            {/* ── Last Donation Date (read-only, always visible) ── */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Donation Date
              </label>
              <input
                type="text"
                readOnly
                value={
                  profile?.lastDonationDate
                    ? new Date(profile.lastDonationDate).toDateString()
                    : "No donation yet"
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-600 focus:outline-none"
              />
            </div>

            {/* ── Next Eligible Donation Date ── */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Next Eligible Donation
              </label>
              {donationStatus ? (
                <div
                  className={`w-full px-4 py-3 border rounded-lg text-sm font-semibold ${
                    donationStatus.canDonate
                      ? "bg-green-50 border-green-300 text-green-700"
                      : "bg-yellow-50 border-yellow-300 text-yellow-700"
                  }`}
                >
                  {donationStatus.canDonate ? (
                    <span>✅ You are eligible to donate now!</span>
                  ) : (
                    <span>
                      ⏳ {donationStatus.nextDate.toDateString()}
                      <span className="block text-xs font-normal mt-0.5">
                        ({120 - donationStatus.diffDays} days remaining)
                      </span>
                    </span>
                  )}
                </div>
              ) : (
                <div className="w-full px-4 py-3 border border-green-300 rounded-lg bg-green-50 text-green-700 text-sm font-semibold">
                  ✅ You are eligible to donate now!
                </div>
              )}
            </div>

          </div>

          {/* Save / Cancel */}
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
                onClick={handleCancel}
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
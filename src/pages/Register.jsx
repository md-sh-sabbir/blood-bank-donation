import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../providers/AuthContext";
import axios from "axios";
import useAxios from "../hooks/useAxios";
import Navbar from "../components/Navbar";
import { useQuery } from "@tanstack/react-query";

const Register = () => {
  const { user, createUser, setUser, updateUser, emailVerification } =
    use(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const axiosSecure = useAxios();

  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

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
    }
  }, [profile?.district, profile?.upazila, profile?.blood]);

  // Find district object to match upazila by district_id
  const selectedDistrictObj = districts.find(
    (d) => d.name === selectedDistrict
  );

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
    setSelectedUpazila(""); // reset upazila when district changes
  };

  useEffect(() => {
    axios.get("/upazilas.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/districts.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (user) {
      setError("Please log out first");
      return;
    }

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const blood = form.bloodGroup.value;
    const imageFile = form.photo.files[0];

    // Location validation
    if (!selectedDistrict || !selectedUpazila) {
      return setError("Please select your district and upazila");
    }

    // Password validation
    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }
    if (!/[A-Z]/.test(password)) {
      return setError("Password must contain an uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      return setError("Password must contain a lowercase letter");
    }

    setIsSubmitting(true);

    try {
      // Upload image
      let photoUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_api_key}`,
          formData
        );

        photoUrl = imgRes.data.data.display_url;
      }

      const result = await createUser(email, password);
      await updateUser(name, photoUrl);

      // Send verification email
      await emailVerification();

      // Save user to DB as "inactive" until email is verified
      const userData = {
        email,
        name,
        photo: photoUrl,
        blood,
        district: selectedDistrict,
        upazila: selectedUpazila,
        status: "inactive",
      };

      await axiosSecure.post("/users", userData);

      setUser(result.user);
      form.reset();
      setSelectedDistrict("");
      setSelectedUpazila("");

      setIsVerifying(true);
      setSuccess(
        "Registration successful! A verification email has been sent. Please check your inbox and verify to continue."
      );
      toast.success("Verification email sent! Please check your inbox.");

      // Poll Firebase every 3s to detect when user verifies their email
      const interval = setInterval(async () => {
        await result.user.reload();
        if (result.user.emailVerified) {
          clearInterval(interval);

          // Update user status to "active" in DB
          await axiosSecure.patch(`/users/${email}`, { status: "active" });

          toast.success("Email verified! Redirecting to dashboard...");
          setIsVerifying(false);
          navigate("/dashboard");
        }
      }, 3000);

      // Stop polling after 5 minutes
      setTimeout(() => {
        clearInterval(interval);
        if (!result.user.emailVerified) {
          setIsVerifying(false);
          setError(
            "Verification timed out. Please log in and verify your email."
          );
          setSuccess("");
        }
      }, 5 * 60 * 1000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex justify-center h-[calc(100vh-182px)] items-center py-10">
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 border-white border-1 shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold">Register now!</h1>

            {/* Email Verification Pending Banner */}
            {isVerifying && (
              <div className="alert alert-warning flex items-start gap-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="font-semibold">Check your email!</p>
                  <p>
                    We sent a verification link. Click it and you'll be
                    redirected automatically.
                  </p>
                  <span className="loading loading-dots loading-xs mt-1"></span>
                </div>
              </div>
            )}

            <form onSubmit={handleRegister}>
              <fieldset className="fieldset" disabled={isVerifying}>
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

                <select name="bloodGroup" className="select" defaultValue="">
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

                <select
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  className="select"
                >
                  <option disabled value="">
                    Select Your District
                  </option>
                  {districts.map((d) => (
                    <option value={d.name} key={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedUpazila}
                  onChange={(e) => setSelectedUpazila(e.target.value)}
                  className="select"
                >
                  <option value="">
                    {selectedDistrict
                      ? "Select Upazila"
                      : "Select a district first"}
                  </option>
                  {filteredUpazilas.map((u) => (
                    <option value={u.name} key={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>

                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                  required
                />

                {/* Error Message */}
                {error && (
                  <div className="text-red-500 mt-2">
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {/* Success Message */}
                {success && !isVerifying && (
                  <div className="text-green-500">
                    <span className="text-sm">{success}</span>
                  </div>
                )}

                <button
                  className="btn btn-neutral mt-4 mb-1"
                  disabled={isSubmitting || isVerifying}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </button>
              </fieldset>
            </form>

            <p>
              Already have an account?{" "}
              <Link
                className="text-blue-500 hover:text-blue-800 ml-1"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
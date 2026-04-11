import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AllDonationReq from "../pages/Dashboard/Donor/AllDonationReq";
import DonationDetails from "../pages/Dashboard/Donor/DonationDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/Common/DashboardHome";
import Profile from "../pages/Dashboard/Common/Profile";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AllDonationRequest from "../pages/Dashboard/Admin/AllDonationRequest";
import AddVolunteer from "../pages/Dashboard/Admin/AddVolunteer";
import VolunteerAllDonationReq from "../pages/Dashboard/Volunteer/VolunteerAllDonationReq";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout
    },
    {
        path: 'register',
        Component: Register
    },
    {
        path: 'login',
        Component: Login
    },
    {
        path: 'all-donation-requests',
        element: <AllDonationReq></AllDonationReq>
    },
    {
        path: 'donation-request/:id',
        element: <DonationDetails></DonationDetails>
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                index: true,
                element: <DashboardHome></DashboardHome>
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            },
            {
                
            },
            {
                path: 'all-users',
                element: <AllUsers></AllUsers>
            },
            {
                path: 'admin-all-donation-requests',
                element: <AllDonationRequest></AllDonationRequest>
            },
            {
                path: 'volunteer-all-donation-requests',
                element: <VolunteerAllDonationReq></VolunteerAllDonationReq>
            },
            {
                path: 'add-volunteer',
                element: <AddVolunteer></AddVolunteer>
            }
        ]
    }
])
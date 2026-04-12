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
import AddRequest from "../pages/Dashboard/Donor/AddRequest";
import MyDonationReq from "../pages/Dashboard/Donor/MyDonationReq";
import Donate from "../pages/Donate/Donate";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import PaymentCancelled from "../pages/PaymentCancelled/PaymentCancelled";
import SearchRequest from "../pages/SearchRequest/SearchRequest";

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
        path: 'search',
        element: <SearchRequest></SearchRequest>
    },
    {
        path: 'donate',
        element: <PrivateRoute>
            <Donate></Donate>
        </PrivateRoute>
    },
    {
        path: 'payment-success',
        element: <PaymentSuccess></PaymentSuccess>
    },
    {
        path: 'payment-cancelled',
        element: <PaymentCancelled></PaymentCancelled>
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
                path: 'add-request',
                element: <AddRequest></AddRequest>
            },
            {
                path: 'all-users',
                element: <AllUsers></AllUsers>
            },
            {
                path: 'my-donation-requests',
                element: <MyDonationReq></MyDonationReq>
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
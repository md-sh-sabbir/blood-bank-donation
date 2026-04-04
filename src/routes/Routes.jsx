import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AllDonationReq from "../pages/Dashboard/Donor/AllDonationReq";
import DonationDetails from "../pages/Dashboard/Donor/DonationDetails";

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
    }
])
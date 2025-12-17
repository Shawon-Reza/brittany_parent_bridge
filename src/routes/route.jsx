import {
    createBrowserRouter,
} from "react-router-dom";

import Login from "../features/auth/Login";
import ForgotPassword from "../features/auth/ForgotPassword";
import OtpVerification from "../features/auth/OtpVerification";
import SetNewPassword from "../features/auth/SetNewPassword";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Dashboard from "../features/dashboard/Dashboard";
import UserManagement from "../features/userManagement/UserManagement";
import Subscription from "../features/subscription/Subscription";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "/otp-verification",
        element: <OtpVerification />,
    },
    {
        path: "/set-new-password",
        element: <SetNewPassword />,
    },
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "user-management",
                element: <UserManagement />,
            },
            {
                path: "subscription",
                element: <Subscription />,
            },
        ],
    },
]);






export default router;
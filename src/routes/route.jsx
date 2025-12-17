import {
    createBrowserRouter,
} from "react-router-dom";

import Login from "../features/auth/Login";
import ForgotPassword from "../features/auth/ForgotPassword";
import OtpVerification from "../features/auth/OtpVerification";
import SetNewPassword from "../features/auth/SetNewPassword";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login></Login>,
    },
    {
        path: "/login",
        element: <Login></Login>,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
    },
    {
        path: "/otp-verification",
        element: <OtpVerification></OtpVerification>,
    },
    {
        path: "/set-new-password",
        element: <SetNewPassword></SetNewPassword>,
    },
]);






export default router;
import { useNavigate, useParams } from "react-router";
import LoginWithPassword from "../loginWithPassword/LoginWithPassword";
import Otp from "../otp/otp";
import ForgetPassword from "../forgetPassword/ForgetPassword";
import Layout from "../../../layouts/Layout";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const LoginController = () => {
    const { loginId } = useParams();
    const navigate = useNavigate();
    const { accessToken, isLogin, oldRole } = useSelector(state => state.user);

    const accessUrl = ["otp", "password", "forget-password"];
    useEffect(() => {
        const findUrl = accessUrl.indexOf(loginId);
        if (findUrl < 0 && !accessToken) {
            navigate("/login");
        } else if (isLogin && oldRole.id !== "0") {
            navigate("/");
        }
    }, []);
    const loginNames = {
        otp: <Otp />,
        password: <LoginWithPassword />,
        "forget-password": <ForgetPassword />,
    };
    return <Layout>{loginNames[loginId]}</Layout>;
};

export default LoginController;

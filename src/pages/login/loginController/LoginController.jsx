import { useParams } from "react-router";
import SelectUserType from "../selectUserType/SelectUserType";
import LoginWithPassword from "../loginWithPassword/LoginWithPassword";
import Otp from "../otp/otp";
import ForgetPassword from "../forgetPassword/ForgetPassword";
import Layout from "../../../layouts/Layout";

const LoginController = () => {
    const { loginId } = useParams();

    const loginNames = {
        otp: <Otp />,
        password: <LoginWithPassword />,
        "user-type": <SelectUserType />,
        "forget-password": <ForgetPassword />,
    };
    return <Layout>{loginNames[loginId]}</Layout>;
};

export default LoginController;

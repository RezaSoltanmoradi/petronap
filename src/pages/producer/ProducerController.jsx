import { useNavigate, useParams } from "react-router";
import Layout from "../../layouts/Layout";
import Profile from "./profile/Profile";
import Orders from "./orders/Orders";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ViewProfile from "./profile/ViewProfile";
import ChangePassword from "../login/change-password/ChangePassword";

const ProducerController = () => {
    const { producerId } = useParams();
    const navigate = useNavigate();
    const { oldRole } = useSelector(state => state.user);
    const producerIds = [
        "profile",
        "orders",
        "view-profile",
        "change-password",
    ];

    useEffect(() => {
        const findId = producerIds.find(item => item === producerId);

        if (!findId && +oldRole.id > 0) {
            navigate("/producer/orders");
        }
    }, [producerId]);

    const producerName = {
        profile: <Profile />,
        orders: <Orders />,
        "view-profile": <ViewProfile />,
        "change-password": <ChangePassword />,
    };
    return <Layout isLogin={true}>{producerName[producerId]}</Layout>;
};

export default ProducerController;

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Layout from "src/layouts/Layout";
import Orders from "./orders/Orders";
import Profile from "./profile/Profile";
import Offers from "./offers/Offers";

const FreightController = () => {
    const { freightId } = useParams();
    const navigate = useNavigate();
    const { oldRole } = useSelector(state => state.user);
    const freightIds = [
        "profile",
        "orders",
        "offers",
        "view-profile",
        "change-password",
    ];
    useEffect(() => {
        const findId = freightIds.find(item => item === freightId);
        if (!findId && +oldRole.id > 0 && freightId !== "offers") {
            navigate("/freight/orders");
        }
    }, [freightId]);

    const freightName = {
        profile: <Profile />,
        orders: <Orders />,
        offers: <Offers />,
    };
    return <Layout isLogin={true}>{freightName[freightId]}</Layout>;
};

export default FreightController;

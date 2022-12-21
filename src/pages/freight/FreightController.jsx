import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Layout from "src/layouts/Layout";
import Orders from "./orders/Orders";
import Profile from "./profile/Profile";

const FreightController = () => {
    const { freightId } = useParams();
    const navigate = useNavigate();
    const { oldRole } = useSelector(state => state.user);
    const freightIds = ["profile", "orders"];

    useEffect(() => {
        const findId = freightIds.indexOf(freightId);
        if (findId < 0 || +oldRole.id > 0) {
            navigate("/freight/orders");
        }
    }, [freightId]);

    const freightName = {
        profile: <Profile />,
        orders: <Orders />,
    };
    return <Layout isLogin={true}>{freightName[freightId]}</Layout>;
};

export default FreightController;

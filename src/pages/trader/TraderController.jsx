import { useNavigate, useParams } from "react-router";
import Layout from "../../layouts/Layout";
import Profile from "./profile/Profile";
import Orders from "./orders/Orders";
import { useEffect } from "react";

const TraderController = () => {
    const { traderId } = useParams();
    const navigate = useNavigate();
    const traderIds = ["profile", "orders"];
    useEffect(() => {
        const findId = traderIds.indexOf(traderId);
        if (findId < 0) {
            navigate("/trader");
        }
    }, []);

    const traderName = {
        profile: <Profile />,
        orders: <Orders />,
    };
    return <Layout isLogin={true}>{traderName[traderId]}</Layout>;
};

export default TraderController;

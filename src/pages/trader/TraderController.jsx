import { useNavigate, useParams } from "react-router";
import Layout from "../../layouts/Layout";
import Profile from "./profile/Profile";
import Orders from "./orders/Orders";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const TraderController = () => {
    const { traderId } = useParams();
    const navigate = useNavigate();
    const { oldRole } = useSelector(state => state.user);

    const traderIds = ["profile", "orders", "view-profile", "change-password"];
    useEffect(() => {
        const findId = traderIds.find(item => item === traderId);

        if (!findId && +oldRole.id > 0) {
            navigate("/trader/orders");
        }
    }, [traderId]);

    const traderName = {
        profile: <Profile />,
        orders: <Orders />,
        "view-profile": <div>hi reza</div>,
        "change-password": <div>hi reza</div>,
    };
    return <Layout isLogin={true}>{traderName[traderId]}</Layout>;
};

export default TraderController;

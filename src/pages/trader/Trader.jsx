import { useParams } from "react-router";
import Layout from "../../layouts/Layout";
import Profile from "./profile/Profile";
import Order from "./order/Order";

const Trader = () => {
    const { traderId } = useParams();

    const traderName = {
        profile: <Profile />,
        order: <Order />,
    };
    return <Layout isLogin={true}>{traderName[traderId]}</Layout>;
};

export default Trader;

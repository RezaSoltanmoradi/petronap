import { useParams } from "react-router";
import Layout from "../../layouts/Layout";
import Profile from "./profile/Profile";
import Orders from "./orders/Orders";

const Trader = () => {
    const { traderId } = useParams();
    const traderName = {
        profile: <Profile />,
        orders: <Orders />,
    };
    return <Layout isLogin={true}>{traderName[traderId]}</Layout>;
};

export default Trader;

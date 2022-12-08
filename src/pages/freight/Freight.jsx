import { useParams } from "react-router";
import Layout from "./../../layouts/Layout";
import Profile from "./profile/Profile";
import Order from "./order/Order";
const Freight = () => {
    const { freightId } = useParams();

    const freightName = {
        profile: <Profile />,
        order: <Order />,
    };
    return <Layout isLogin={true}>{freightName[freightId]}</Layout>;
};

export default Freight;

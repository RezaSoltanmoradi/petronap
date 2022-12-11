import { useParams } from "react-router";
import Layout from "./../../layouts/Layout";
import Profile from "./profile/Profile";
import OrderDetail from "./orderDetail/OrderDetail";

const Freight = () => {
    const { freightId } = useParams();
    const freightName = {
        profile: <Profile />,
        orderDetail: <OrderDetail />,
    };
    return <Layout isLogin={true}>{freightName[freightId]}</Layout>;
};

export default Freight;

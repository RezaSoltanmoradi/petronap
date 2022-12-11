import { useParams } from "react-router";
import Layout from "./../../layouts/Layout";
import Profile from "./profile/Profile";
import OrderDetail from "./orderDetail/OrderDetail";

const Producer = () => {
    const { producerId } = useParams();

    const producerName = {
        profile: <Profile />,
        orderDetail: <OrderDetail />,
    };
    return (
        <Layout isLogin={true} >
            {producerName[producerId]}
        </Layout>
    );
};

export default Producer;

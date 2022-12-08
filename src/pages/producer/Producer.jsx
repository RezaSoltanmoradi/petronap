import { useParams } from "react-router";
import Layout from "./../../layouts/Layout";
import Profile from "./profile/Profile";
import Order from "./order/Order";

const Producer = () => {
    const { producerId } = useParams();

    const producerName = {
        profile: <Profile />,
        order: <Order />,
    };
    return (
        <Layout isLogin={true} >
            {producerName[producerId]}
        </Layout>
    );
};

export default Producer;

import { useNavigate, useParams } from "react-router";
import Layout from "../../layouts/Layout";
import Profile from "./profile/Profile";
import Orders from "./orders/Orders";
import { useEffect } from "react";

const ProducerController = () => {
    const { producerId } = useParams();
    const navigate = useNavigate();
    const producerIds = ["profile", "orders"];

    useEffect(() => {
        const findId = producerIds.indexOf(producerId);
        if (findId < 0) {
            navigate("/producer");
        }
    }, []);

    const producerName = {
        profile: <Profile />,
        orders: <Orders />,
    };
    return <Layout isLogin={true}>{producerName[producerId]}</Layout>;
};

export default ProducerController;

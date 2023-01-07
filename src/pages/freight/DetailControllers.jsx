import { useParams } from "react-router";
import Layout from "src/layouts/Layout";
import OrdersDetail from "./orders/detail/Detail";
import OfferDetail from "./offers/detail/Detail";

const DetailControllers = () => {
    const { freightId } = useParams();
    
    const freightName = {
        orders: <OrdersDetail />,
        offers: <OfferDetail />,
    };
    return <Layout isLogin={true}>{freightName[freightId]}</Layout>;
};

export default DetailControllers;

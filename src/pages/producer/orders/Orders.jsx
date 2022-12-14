import { useEffect, useState } from "react";
import FilterOrders from "src/components/container/filter-orders/FilterOrders";
import Scroller from "src/components/scroller/Scroller";
import OrderCard from "src/components/UI/cards/order-card/OrderCard";
import useRequest from "src/hooks/useRequest";
import classes from "./Orders.module.scss";

const DUMMY_ORDERS = [
    {
        id: "or1",
        borderPassage: "رازی",
        destination: "استانبول",
        loadingLocation: "خوزستان",
        offersNumber: 10,
        product: "اپوکسی رزین مایع",
        weight: "13 تن",
    },
    {
        id: "or2",
        borderPassage: "_",
        destination: "خوزستان",
        loadingLocation: "یزد",
        offersNumber: 10,
        product: "آمونیاک",
        weight: "20 تن",
    },
];
const Orders = () => {
    const [ordersStatus, setOrdersStatus] = useState({
        name: "isLoading",
        id: "0",
        title: "در انتظار",
    });
    const onChangeStatusHandler = status => {
        setOrdersStatus(status);
        // send request to fetch new data
        console.log("the status section was changed !");
    };
    const {
        sendRequest: getOrdersHandler,
        isLoading: ordersLoading,
        data: ordersData,
        error: ordersError,
    } = useRequest();
    useEffect(() => {
        getOrdersHandler({
            url: "orders/orders",
        });
    }, []);
    return (
        <div className={classes.Order}>
            <Scroller>
                <FilterOrders
                    filterOrders={onChangeStatusHandler}
                    ordersStatus={ordersStatus}
                />
                <div className={classes.orderCards}>
                    {DUMMY_ORDERS.map(order => (
                        <OrderCard
                            key={order.id}
                            orderId={order.id}
                            borderPassage={order.borderPassage}
                            destination={order.destination}
                            loadingLocation={order.loadingLocation}
                            offersNumber={10}
                            product={order.product}
                            weight={order.weight}
                        />
                    ))}
                </div>
            </Scroller>
        </div>
    );
};

export default Orders;

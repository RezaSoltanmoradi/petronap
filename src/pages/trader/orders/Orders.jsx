import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import FilterOrders from "src/components/container/filter-orders/FilterOrders";
import Scroller from "src/components/scroller/Scroller";
import OrderCard from "src/components/UI/cards/order-card/OrderCard";
import classes from "./Orders.module.scss";

const Orders = () => {
    const { orders } = useSelector(state => state.order);
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
    return (
        <div className={classes.Order}>
            <Scroller>
            <NavLink to='offers=1' >
                go to next one
            </NavLink>
                <FilterOrders
                    filterOrders={onChangeStatusHandler}
                    ordersStatus={ordersStatus}
                />
                <div className={classes.orderCards}>
                    {orders.map((order, index) => (
                        <OrderCard
                            key={index}
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

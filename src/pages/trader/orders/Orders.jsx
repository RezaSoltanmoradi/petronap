import { useEffect, useState } from "react";
import FilterOrders from "src/components/container/filter-orders/FilterOrders";
import Scroller from "src/components/scroller/Scroller";
import OrderCard from "src/components/UI/cards/order-card/OrderCard";
import useRequest from "src/hooks/useRequest";
import classes from "./Orders.module.scss";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Orders = () => {
    const { accessToken } = useSelector(state => state.user);

    const [ordersStatus, setOrdersStatus] = useState({
        name: "isLoading",
        id: "0",
        title: "در انتظار",
    });
    const onChangeStatusHandler = status => {
        setOrdersStatus(status);
        console.log("the status section was changed !");
    };
    const {
        sendRequest: fetchOrdersHandler,
        error: hasErrorOrders,
        data: ordersData,
    } = useRequest();

    useEffect(() => {
        if (accessToken) {
            fetchOrdersHandler({
                url: `trader/orders/`,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
        }
    }, []);
    useEffect(() => {
        if (hasErrorOrders) {
            toast.error(hasErrorOrders);
        }
    }, [hasErrorOrders]);
    return (
        <div className={classes.Order}>
            {hasErrorOrders && (
                <Toaster position="top-center" reverseOrder={false} />
            )}

            <Scroller>
                <FilterOrders
                    filterOrders={onChangeStatusHandler}
                    ordersStatus={ordersStatus}
                />
                <div className={classes.orderCards}>
                    {ordersData?.map(data => (
                        <OrderCard
                            key={data.order.id}
                            orderId={data.order.id}
                            borderPassage={data.order.border_passage}
                            destination={data.order.destination}
                            loadingLocation={data.order.loading_location}
                            product={data.order.product}
                            weight={data.order.weight}
                            loadingDate={data.order.loading_date}
                            btnText={`${data.offer_count} پیشنهاد`}
                        />
                    ))}
                </div>
            </Scroller>
        </div>
    );
};

export default Orders;

import { useEffect, useState } from "react";
import FilterOrders from "src/components/container/filter-orders/FilterOrders";
import Scroller from "src/components/scroller/Scroller";
import OrderCard from "src/components/UI/cards/order-card/OrderCard";
import useRequest from "src/hooks/useRequest";
import classes from "./Orders.module.scss";
import { useSelector } from "react-redux";
import Notification from "src/components/notification/Notification";

const Orders = () => {
    const { accessToken } = useSelector(state => state.user);
    const [ordersStatus, setOrdersStatus] = useState({
        name: "isLoading",
        id: "0",
        title: "در انتظار",
    });
    const {
        sendRequest: fetchLoadingOrders,
        error: hasErrorLoadingOrders,
        data: loadingOrdersData,
        isLoading: loadingOrdersPending,
    } = useRequest();
    const {
        sendRequest: fetchDoingOrders,
        error: hasErrorDoingOrders,
        data: doingOrdersData,
        isLoading: doingOrdersPending,
    } = useRequest();

    const onChangeStatusHandler = status => {
        setOrdersStatus(status);
    };
    useEffect(() => {
        if (accessToken) {
            if (ordersStatus.id === "0") {
                fetchLoadingOrders({
                    url: `trader/orders/`,
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                });
            } else if (ordersStatus.id === "1") {
                fetchDoingOrders({
                    url: `/trader/orders/approved/`,
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                });
            }
        }
    }, [ordersStatus]);

    let finalOrders;
    if (hasErrorDoingOrders && ordersStatus?.id === "1") {
        finalOrders = <Notification message={hasErrorDoingOrders} />;
    } else if (hasErrorLoadingOrders && ordersStatus?.id === "0") {
        finalOrders = <Notification message={hasErrorLoadingOrders} />;
    } else if (doingOrdersPending || loadingOrdersPending) {
        finalOrders = <div>درحال بارگیری...</div>;
    } else {
        finalOrders = (
            <div className={classes.orderCards}>
                {doingOrdersData?.length > 0 &&
                    ordersStatus.id === "1" &&
                    doingOrdersData?.map(data => (
                        <OrderCard
                            key={data?.id}
                            orderId={data?.id}
                            borderPassage={data?.border_passage}
                            destination={data.destination}
                            loadingLocation={data?.loading_location}
                            product={data?.product}
                            weight={data?.weight}
                            loadingDate={data?.loading_date}
                            btnText={`مشاهده شماره سفارش`}
                        />
                    ))}
                {loadingOrdersData?.length > 0 &&
                    ordersStatus.id === "0" &&
                    loadingOrdersData?.map(data => (
                        <OrderCard
                            key={data?.order.id}
                            orderId={data?.order.id}
                            borderPassage={data?.order.border_passage}
                            destination={data.order.destination}
                            loadingLocation={data?.order.loading_location}
                            product={data?.order.product}
                            weight={data?.order.weight}
                            loadingDate={data?.order.loading_date}
                            btnText={`${data?.offer_count} پیشنهاد`}
                        />
                    ))}
            </div>
        );
    }
    return (
        <div className={classes.Order}>
            <Scroller>
                <FilterOrders
                    filterOrders={onChangeStatusHandler}
                    ordersStatus={ordersStatus}
                />
                {finalOrders}
            </Scroller>
        </div>
    );
};

export default Orders;

import { memo, useEffect, useState } from "react";
import FilterOrders from "src/components/container/filter-orders/FilterOrders";
import Scroller from "src/components/scroller/Scroller";
import OrderCard from "src/components/UI/cards/order-card/OrderCard";
import classes from "./Orders.module.scss";
import useRequest from "src/hooks/useRequest";
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
                    url: `producer/orders/`,
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                });
            } else if (ordersStatus.id === "1") {
                fetchDoingOrders({
                    url: `producer/orders/approved_offers/`,
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                });
            }
        }
    }, [ordersStatus]);
    console.log("doingOrdersData: ", doingOrdersData);
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
                {loadingOrdersData?.length > 0 &&
                    ordersStatus.id === "0" &&
                    loadingOrdersData?.map(offer => (
                        <OrderCard
                            key={offer.order.id}
                            parentId={offer.order.id}
                            borderPassage={offer.order.border_passage}
                            destination={offer.order.destination}
                            loadingLocation={offer.order.loading_location}
                            product={offer.order.product}
                            weight={offer.order.weight}
                            loadingDate={offer.order.loading_date}
                            btnText={`${offer.offer_count} پیشنهاد`}
                        />
                    ))}
                {doingOrdersData?.length > 0 &&
                    ordersStatus.id === "1" &&
                    doingOrdersData?.map(data => (
                        <OrderCard
                            key={data.offer.id}
                            parentId={data.offer.id}
                            childId={data.offer.order.id}
                            borderPassage={data.offer.order.border_passage}
                            destination={data.offer.order.destination}
                            loadingLocation={data.offer.order.loading_location}
                            product={data.offer.order.product}
                            weight={data.offer.order.weight}
                            loadingDate={data.offer.order.loading_date}
                            btnText={data.flow.text}
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

export default memo(Orders);

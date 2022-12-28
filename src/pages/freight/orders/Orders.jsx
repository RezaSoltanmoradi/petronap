import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Scroller from "src/components/scroller/Scroller";
import OrderCard from "src/components/UI/cards/order-card/OrderCard";
import useRequest from "src/hooks/useRequest";
import classes from "./Orders.module.scss";
import { Toaster, toast } from "react-hot-toast";
import persian from "react-date-object/calendars/persian";
import { persian_fa } from "react-date-object/locales/persian_fa";
import { gregorian } from "react-date-object/calendars/gregorian";
import { DateObject } from "react-multi-date-picker";
import FilterOrdersDate from "src/components/container/filter-orders-date/FilterOrdersDate";
import FilterOrigin from "src/components/container/filter-origin/FilterOrigin";
import { ORDERS_NATIONALITY } from "src/helper/types";

const Orders = () => {
    const [ordersStatus, setOrdersStatus] = useState(
        new DateObject({
            calendar: gregorian,
            date: new Date(),
        })
            .convert(persian, persian_fa)
            .format()
    );
    const [originStatus, setOriginStatus] = useState(ORDERS_NATIONALITY[0]);
    const {
        sendRequest: fetchOrdersHandler,
        error: hasErrorOrders,
        data: ordersData,
    } = useRequest();

    const { accessToken } = useSelector(state => state.user);

    const onChangeOrderStatus = status => {
        setOrdersStatus(status);
        // send request to fetch new data
    };
    const onChangeOriginStatus = status => {
        setOriginStatus(status);
        // send request to fetch new data
    };
    useEffect(() => {
        if (accessToken) {
            fetchOrdersHandler({
                url: `freight/orders/`,
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
    console.log("ordersData", ordersData);
    return (
        <div className={classes.Order}>
            {hasErrorOrders && (
                <Toaster position="top-center" reverseOrder={false} />
            )}

            <Scroller>
                <FilterOrigin
                    originStatus={originStatus}
                    filterOrigin={onChangeOriginStatus}
                />
                <FilterOrdersDate
                    filterOrdersDate={onChangeOrderStatus}
                    ordersStatus={ordersStatus}
                />
                <div className={classes.orderCards}>
                    {ordersData?.map(order => (
                        <OrderCard
                            key={order.id}
                            orderId={order.id}
                            borderPassage={order.border_passage}
                            destination={order.destination}
                            loadingLocation={order.loading_location}
                            btnText="مشاهده جزئیات"
                            product={order.product}
                            weight={order.weight}
                            loadingDate={order.loading_date}
                            companyName={order.orderer.company_name}
                            image={order.orderer.profile_picture_file}
                        />
                    ))}
                </div>
            </Scroller>
        </div>
    );
};

export default Orders;

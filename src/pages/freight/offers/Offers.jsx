import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Scroller from "src/components/scroller/Scroller";
import OrderCard from "src/components/UI/cards/order-card/OrderCard";
import useRequest from "src/hooks/useRequest";
import classes from "./Offers.module.scss";
import FilterOrders from "src/components/container/filter-orders/FilterOrders";
import Notification from "src/components/notification/Notification";

const Offers = () => {
    const [offerStatus, setOfferStatus] = useState({
        name: "isLoading",
        id: "0",
        title: "در انتظار",
    });

    const {
        sendRequest: fetchLoadingOffers,
        error: hasErrorLoadingOffers,
        data: loadingOffersData,
        isLoading: loadingOffersPending,
    } = useRequest();
    const {
        sendRequest: fetchDoingOffers,
        error: hasErrorDoingOffers,
        data: doingOffersData,
        isLoading: doingOffersPending,
    } = useRequest();

    const { accessToken } = useSelector(state => state.user);

    const onChangeOfferStatus = status => {
        setOfferStatus(status);
    };
    useEffect(() => {
        if (accessToken) {
            if (offerStatus.id === "0") {
                fetchLoadingOffers({
                    url: `/freight/orders/nonaccepted_offers/`,
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                });
            } else if (offerStatus.id === "1") {
                fetchDoingOffers({
                    url: `/freight/orders/accepted_offers/`,
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                });
            }
        }
    }, [offerStatus]);

    const handleBtnText = ({ seen, orderAcception, freightAcception }) => {
        const orderNotSeen = !seen && !orderAcception;
        const orderSeen = seen && !orderAcception;
        const orderAccepted = seen && orderAcception;
        const freightAccepted = orderAccepted && freightAcception;

        const title = {
            [orderNotSeen]: "هنوز قیمت پیشنهادی شما دیده نشده",
            [orderSeen]: "قیمت پیشنهادی شما دیده شد",
            [orderAccepted]: "قبول نهایی یا رد بار",
            [freightAccepted]: "در انتظار اقدام طرف مقابل",
        };
        return title.true;
    };
    let finalOrders;

    if (hasErrorDoingOffers && offerStatus?.id === "1") {
        finalOrders = <Notification message={hasErrorDoingOffers} />;
    } else if (hasErrorLoadingOffers && offerStatus?.id === "0") {
        finalOrders = <Notification message={hasErrorLoadingOffers} />;
    } else if (doingOffersPending || loadingOffersPending) {
        finalOrders = <div>درحال بارگیری...</div>;
    } else {
        finalOrders = (
            <div className={classes.orderCards}>
                {loadingOffersData?.length > 0 &&
                    offerStatus.id === "0" &&
                    loadingOffersData?.map(offer => (
                        <OrderCard
                            key={offer.id}
                            parentId={offer.id}
                            borderPassage={offer.order.border_passage}
                            destination={offer.order.destination}
                            loadingLocation={offer.order.loading_location}
                            btnText={handleBtnText({
                                seen: offer?.seen,
                                orderAcception: offer?.orderer_acception,
                                freightAcception: offer?.freight_acception,
                            })}
                            product={offer.order.product}
                            weight={offer.order.weight}
                            loadingDate={offer.order.loading_date}
                            seen={offer.seen}
                            companyName={offer.order.orderer.company_name}
                            image={offer.order.orderer.profile_picture_file}
                        />
                    ))}
                {doingOffersData?.length > 0 &&
                    offerStatus.id === "1" &&
                    doingOffersData?.map(offer => (
                        <OrderCard
                            key={offer.id}
                            childId={offer.id}
                            borderPassage={offer.order.border_passage}
                            destination={offer.order.destination}
                            loadingLocation={offer.order.loading_location}
                            btnText={handleBtnText({
                                seen: offer?.seen,
                                orderAcception: offer?.orderer_acception,
                                freightAcception: offer?.freight_acception,
                            })}
                            product={offer.order.product}
                            weight={offer.order.weight}
                            loadingDate={offer.order.loading_date}
                            seen={offer.seen}
                            companyName={offer.order.orderer.company_name}
                            image={offer.order.orderer.profile_picture_file}
                        />
                    ))}
            </div>
        );
    }
    return (
        <div className={classes.Offer}>
            <Scroller>
                <FilterOrders
                    filterOrders={onChangeOfferStatus}
                    ordersStatus={offerStatus}
                />
                {finalOrders}
            </Scroller>
        </div>
    );
};

export default Offers;

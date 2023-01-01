import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Scroller from "src/components/scroller/Scroller";
import OrderCard from "src/components/UI/cards/order-card/OrderCard";
import useRequest from "src/hooks/useRequest";
import classes from "./Offers.module.scss";
import { Toaster, toast } from "react-hot-toast";
import FilterOrders from "src/components/container/filter-orders/FilterOrders";

const Offers = () => {
    const [offerStatus, setOfferStatus] = useState({
        name: "isLoading",
        id: "0",
        title: "در انتظار",
    });
    const {
        sendRequest: fetchOfferHandler,
        error: hasErrorOffers,
        data: offersData,
    } = useRequest();

    const { accessToken } = useSelector(state => state.user);

    const onChangeOfferStatus = status => {
        setOfferStatus(status);
        // send request to fetch new data
    };

    useEffect(() => {
        if (accessToken) {
            fetchOfferHandler({
                url: `/freight/orders/nonaccepted_offers/`,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
        }
    }, []);
    useEffect(() => {
        if (hasErrorOffers) {
            toast.error(hasErrorOffers);
        }
    }, [hasErrorOffers]);

    console.log("offersData", offersData);

    return (
        <div className={classes.Offer}>
            {hasErrorOffers && (
                <Toaster position="top-center" reverseOrder={false} />
            )}

            <Scroller>
                <FilterOrders
                    filterOrders={onChangeOfferStatus}
                    ordersStatus={offerStatus}
                />
                <div className={classes.orderCards}>
                    {offersData?.map(offer => (
                        <OrderCard
                            key={offer.id}
                            orderId={offer.id}
                            borderPassage={offer.order.border_passage}
                            destination={offer.order.destination}
                            loadingLocation={offer.order.loading_location}
                            btnText={
                                offer.seen
                                    ? "قیمت پیشنهادی شما دیده شد"
                                    : "هنوز قیمت پیشنهادی شما دیده نشده"
                            }
                            product={offer.order.product}
                            weight={offer.order.weight}
                            loadingDate={offer.order.loading_date}
                            seen={offer.seen}
                            companyName={offer.order.orderer.company_name}
                            image={offer.order.orderer.profile_picture_file}
                        />
                    ))}
                </div>
            </Scroller>
        </div>
    );
};

export default Offers;

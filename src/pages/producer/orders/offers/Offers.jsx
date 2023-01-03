import Scroller from "src/components/scroller/Scroller";
import Layout from "src/layouts/Layout";
import classes from "./Offers.module.scss";
import OfferCard from "src/components/UI/cards/offer-card/OfferCard";
import SingleOrder from "src/components/single-order/SingleOrder";
import useRequest from "src/hooks/useRequest";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Notification from "src/components/notification/Notification";

const Offers = () => {
    const { accessToken } = useSelector(state => state.user);
    const { orderId } = useParams();
    const {
        sendRequest: fetchOffersHandler,
        error: hasErrorOffers,
        data: offersData,
    } = useRequest();
    const {
        sendRequest: fetchOrderItems,
        error: hasErrorOrderItems,
        data: orderItems,
    } = useRequest();

    useEffect(() => {
        if (accessToken) {
            fetchOrderItems({
                url: `producer/orders/${orderId}/`,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
            fetchOffersHandler({
                url: `producer/orders/${orderId}/offers/`,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
        }
    }, []);

    const {
        border_passage,
        destination,
        loading_location,
        product,
        weight,
        loading_date,
    } = orderItems ?? {};
    return (
        <Layout isLogin={true}>
            {(hasErrorOffers || hasErrorOrderItems) && (
                <Notification message={hasErrorOffers || hasErrorOrderItems} />
            )}

            <div className={classes.Offers}>
                <Scroller>
                    {orderItems && (
                        <SingleOrder
                            top="50px"
                            borderPassage={border_passage}
                            destination={destination}
                            loadingLocation={loading_location}
                            product={product}
                            weight={weight}
                            loadingDate={loading_date}
                        />
                    )}
                    <div className={classes.OfferCards}>
                        {offersData?.map(offer => (
                            <OfferCard
                                key={offer.id}
                                offerId={offer.id}
                                offerPrice={offer.price}
                                prepayment={offer.prepayment_amount}
                                prepaymentPercentage={
                                    offer.prepayment_percentage
                                }
                                companyName={offer.freight.company_name}
                                image={offer.freight.profile_picture_file}
                            />
                        ))}
                    </div>
                </Scroller>
            </div>
        </Layout>
    );
};

export default Offers;

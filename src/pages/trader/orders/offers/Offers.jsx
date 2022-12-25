import Scroller from "src/components/scroller/Scroller";
import Layout from "src/layouts/Layout";
import classes from "./Offers.module.scss";
import OfferCard from "src/components/UI/cards/offer-card/OfferCard";
import SingleOrder from "src/components/single-order/SingleOrder";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import useRequest from "src/hooks/useRequest";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

// const DUMMY_OFFERS = [
//     {
//         id: "o1",
//         offerPrice: "500000000",
//         prepayment: "1000000000",
//         prepaymentpercentage: "20%",
//         companyName: "شرکت حمل ونقل کاسپین",
//     },
//     {
//         id: "o2",
//         offerPrice: "400000000",
//         prepayment: "900000000",
//         prepaymentpercentage: "20%",
//         companyName: "شرکت حمل ونقل خلیج فارس",
//     },
// ];
const Offers = () => {
    const { accessToken } = useSelector(state => state.user);
    const { orderId } = useParams();
    const {
        sendRequest: fetchOffersHandler,
        error: hasErrorOffers,
        data: offersData,
    } = useRequest();
    useEffect(() => {
        if (accessToken && !hasErrorOffers) {
            fetchOffersHandler({
                url: `trader/orders/${orderId}/offers/`,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
        }
        if (hasErrorOffers) {
            toast.error(hasErrorOffers);
        }
    }, [hasErrorOffers]);

    console.log({ offersData });
    return (
        <Layout isLogin={true}>
            <Toaster position="top-center" reverseOrder={false} />

            <div className={classes.Offers}>
                <Scroller>
                    <SingleOrder
                        top="50px"
                        borderPassage=" رازی "
                        destination=" استانبول"
                        loadingLocation=" خوزستان"
                        product="اپوکسی رزین مایع"
                        weight="13 تن"
                    />
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

import Scroller from "src/components/scroller/Scroller";
import Layout from "src/layouts/Layout";
import classes from "./Offers.module.scss";
import OfferCard from "src/components/UI/cards/offer-card/OfferCard";
import SingleOrder from "src/components/single-order/SingleOrder";

const DUMMY_OFFERS = [
    {
        id: "o1",
        offerPrice: "500000000",
        prepayment: "1000000000",
        prepaymentpercentage: "20%",
        companyName: "شرکت حمل ونقل کاسپین",
    },
    {
        id: "o2",
        offerPrice: "400000000",
        prepayment: "900000000",
        prepaymentpercentage: "20%",
        companyName: "شرکت حمل ونقل خلیج فارس",
    },
];
const Offers = () => {
    return (
        <Layout isLogin={true}>
            <div className={classes.Offers}>
                <Scroller>
                    <SingleOrder
                        top="55px"
                        borderPassage=" رازی "
                        destination=" استانبول"
                        loadingLocation=" خوزستان"
                        product="اپوکسی رزین مایع"
                        weight="13 تن"
                    />
                    <div className={classes.OfferCards}>
                        {DUMMY_OFFERS.map(offer => (
                            <OfferCard
                                key={offer.id}
                                offerPrice={offer.offerPrice}
                                prepayment={offer.prepayment}
                                prepaymentpercentage={
                                    offer.prepaymentpercentage
                                }
                                offerId={offer.id}
                                companyName={offer.companyName}
                                
                            />
                        ))}
                    </div>
                </Scroller>
            </div>
        </Layout>
    );
};

export default Offers;

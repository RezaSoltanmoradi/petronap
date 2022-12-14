import Scroller from "src/components/scroller/Scroller";
import SingleOrder from "src/components/single-order/SingleOrder";
import DetailCard from "src/components/UI/cards/detail-card/DetailCard";
import Layout from "src/layouts/Layout";
import classes from "./Detail.module.scss";
const Detail = () => {
    return (
        <Layout isLogin={true}>
            <div className={classes.Detail}>
                <Scroller>
                    <SingleOrder
                        top="55px"
                        borderPassage=" رازی "
                        destination=" استانبول"
                        loadingLocation=" خوزستان"
                        product="اپوکسی رزین مایع"
                        weight="13 تن"
                    />
                    <div className={classes.DetailCard}>
                        <DetailCard
                            offerPrice={50000000}
                            prepayment={10000000}
                            prepaymentpercentage="20%"
                            detailId="d1"
                            companyName="شرکت حمل ونقل خلیج فارس"
                        />
                    </div>
                </Scroller>
            </div>
        </Layout>
    );
};

export default Detail;

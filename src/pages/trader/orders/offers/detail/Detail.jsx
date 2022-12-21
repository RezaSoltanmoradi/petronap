import Scroller from "src/components/scroller/Scroller";
import SingleOrder from "src/components/single-order/SingleOrder";
import Layout from "src/layouts/Layout";
import classes from "./Detail.module.scss";
const DUMMY_DETAIL = {
    detailId: "d1",
    prepayment: 10000000,
    prepaymentpercentage: "20%",
    offerPrice: 50000000,
    companyName: "شرکت حمل ونقل خلیج فارس",
    about: `دارای ۴۰۰ دستگاه کشنده ملی  
    دارای ۶۰۰دستگاه انواع یدک تریلی 
    همکاری با بیش از ۵۰۰۰ ناوگان تجاری خود مالک 
    ۳۱ شعبه در سراسر کشور 
    بیش از ۸۰ نمایندگی فعال`,
};
const Detail = () => {
    const {
        about,
        companyName,
        detailId,
        offerPrice,
        prepayment,
        prepaymentpercentage,
    } = DUMMY_DETAIL;
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
                    <div className={classes.DetailContainer}>
                        <section className={classes.DetailCard}>
                            <div className={classes.titleContainer}>
                                <div className={classes.ImageContainer}>
                                    <img alt="" src="" />
                                </div>
                                <h5 className={classes.title}>{companyName}</h5>
                            </div>
                            <div className={classes.fildset}>
                                <div className={classes.border} />
                                <div className={classes.legend} />
                                <p className={classes.innerLegend}>قیمت</p>
                            </div>
                            <div className={classes.PriceContainer}>
                                <div className={classes.label}>
                                    <div className="icon icon-sm i-offer mx-1" />
                                    قیمت پیشنهادی
                                </div>
                                <div className={classes.price}>
                                    {offerPrice} تومان
                                </div>
                            </div>
                            <div className={classes.PriceContainer}>
                                <div className={classes.label}>
                                    <div className="icon icon-sm i-payment mx-1" />
                                    پیش پرداخت
                                </div>
                                <div className={classes.price}>
                                    {prepaymentpercentage}
                                    <span className={classes.innerPrice}>
                                        ({prepayment} تومان)
                                    </span>
                                </div>
                            </div>
                            {about && (
                                <>
                                    <div className={classes.fildset}>
                                        <div className={classes.border} />
                                        <div className={classes.legend1}>
                                            <p className={classes.innerLegend1}>
                                                درباره شرکت
                                            </p>
                                        </div>
                                    </div>
                                    <div className={classes.AboutContainer}>
                                        <p className={classes.About}>{about}</p>
                                    </div>
                                </>
                            )}
                            {/* <div className={classes.Button}>
                <Button
                    clicked={() => navigate(`${detailId}`)}
                    btnStyle={{
                        width: "296px",
                        height: "24px",
                        fontSize: "16px",
                    }}
                >
                    مشاهده بیشتر
                </Button>
            </div> */}
                        </section>
                    </div>
                </Scroller>
            </div>
        </Layout>
    );
};

export default Detail;

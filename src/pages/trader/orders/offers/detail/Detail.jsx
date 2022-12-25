import Scroller from "src/components/scroller/Scroller";
import SingleOrder from "src/components/single-order/SingleOrder";
import Layout from "src/layouts/Layout";
import classes from "./Detail.module.scss";
import classNames from "classnames";
import Button from "src/components/UI/button/Button";
import { useEffect, useState } from "react";
import ModalCard from "src/components/modal/Modal";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import useRequest from "src/hooks/useRequest";
import { Toaster, toast } from "react-hot-toast";

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
    phone: "09125689545",
    email: "reza@gmail.com",
};
const Detail = () => {
    const {
        about,
        companyName,
        detailId,
        offerPrice,
        prepayment,
        prepaymentpercentage,
        phone,
        email,
    } = DUMMY_DETAIL;
    const [show, setShow] = useState(false);
    const { accessToken } = useSelector(state => state.user);
    const { orderId, offerId } = useParams();
    const {
        sendRequest: fetchSingleOffer,
        error: hasErrorSingleOffer,
        data: singleOfferData,
    } = useRequest();
    useEffect(() => {
        if (accessToken && hasErrorSingleOffer) {
            fetchSingleOffer({
                url: `trader/orders/${orderId}/offers/${offerId}/`,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
        }
        if (hasErrorSingleOffer) {
            toast.error(hasErrorSingleOffer);
        }
    }, [hasErrorSingleOffer]);

    console.log({ singleOfferData });
    const confirmButtonHandler = () => {
        setShow(false);
    };
    return (
        <Layout isLogin={true}>
            <Toaster position="top-center" reverseOrder={false} />

            <div className={classes.Detail}>
                <Scroller>
                    <SingleOrder
                        top="50px"
                        borderPassage=" رازی "
                        destination=" استانبول"
                        loadingLocation=" خوزستان"
                        product="اپوکسی رزین مایع"
                        weight="13 تن"
                    />
                    <div className={classes.DetailContainer}>
                        <section
                            className={classNames({
                                [classes.DetailCard]: true,
                                [classes.DetailCardHasNotAbout]: !about,
                                [classes.DetailCardHasAbout]: about,
                            })}
                        >
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
                        </section>
                        <div className={classes.contract}>
                            <h4 className={classes.contractTitle}>
                                {" "}
                                متن قرار داد
                            </h4>
                            <div>
                                <Button
                                    clicked={() => {}}
                                    btnStyle={{
                                        width: "106px",
                                        height: "24px",
                                        fontSize: "16px",
                                        padding: "2px 29px",
                                    }}
                                >
                                    مشاهده
                                </Button>
                            </div>
                        </div>

                        <div className={classes.contactUsContainer}>
                            <div className={classes.contactUs}>
                                <span>تماس تلفنی با</span>
                                <span> {phone}</span>
                            </div>
                            {/* <div className={classes.contactUs}>
                                <span>ارسال پیامک به </span>
                                <span> {phone}</span>
                            </div> */}
                            <div className={classes.contactUs}>
                                <span>ارسال ایمیل به </span>
                                <span> {email}</span>
                            </div>
                        </div>
                        <div className={classes.Buttons}>
                            <Button
                                clicked={() => {}}
                                btnStyle={{
                                    width: "148px",
                                    height: "40px",
                                    fontSize: "16px",
                                    padding: "2px 29px",
                                }}
                            >
                                رد پیشنهاد
                            </Button>
                            <Button
                                clicked={() => setShow(true)}
                                btnStyle={{
                                    width: "148px",
                                    height: "40px",
                                    fontSize: "16px",
                                    padding: "2px 29px",
                                }}
                            >
                                قبول پیشنهاد
                            </Button>
                        </div>
                        <ModalCard
                            show={show}
                            cancel={() => setShow(false)}
                            confirm={confirmButtonHandler}
                            content="ایا توافق شما با این شرکت نهایی شد؟"
                            height={300}
                            confirmText="بله"
                            cancelText="خیر"
                        />
                    </div>
                </Scroller>
            </div>
        </Layout>
    );
};

export default Detail;

import Scroller from "src/components/scroller/Scroller";
import SingleOrder from "src/components/single-order/SingleOrder";
import Layout from "src/layouts/Layout";
import classes from "./Detail.module.scss";
import classNames from "classnames";
import Button from "src/components/UI/button/Button";
import { useEffect, useState } from "react";
import ModalCard from "src/components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import useRequest from "src/hooks/useRequest";
import { imageHandler } from "src/helper/baseUrls";
import { viewTime } from "src/helper/utils";
import { showUploadModal } from "src/store/uploadFile-slice";
import Notification from "src/components/notification/Notification";

const Detail = () => {
    const [show, setShow] = useState(false);
    const { accessToken } = useSelector(state => state.user);
    const { orderId, offerId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        sendRequest: fetchSingleOffer,
        error: hasErrorSingleOffer,
        data: singleOfferData,
    } = useRequest();
    const { sendRequest: sendConfirmOffer, error: hasErrorConfirmOffer } =
        useRequest();
    const { sendRequest: sendOrderView, error: hasErrorSendOrderView } =
        useRequest();

    useEffect(() => {
        if (accessToken) {
            fetchSingleOffer({
                url: `trader/orders/${orderId}/offers/${offerId}/`,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            }).then(() => {
                setTimeout(() => {
                    sendOrderView({
                        method: "PUT",
                        url: `orders/orders/${offerId}/`,
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    });
                }, viewTime);
            });
        }
    }, []);

    const { offer_items: offerItems, order_items: orderItems } =
        singleOfferData ?? {};
    const { freight, deal_draft } = offerItems ?? {};

    const confirmOffer = () => {
        setShow(false);

        sendConfirmOffer({
            url: `trader/orders/${orderId}/offers/${offerId}/offer_acception/`,
            method: "PUT",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
            data: {
                orderer_acception: true,
            },
        }).then(data => {
            if (data.orderer_acception) {
                navigate(`/trader/orders/${orderId}/offers`);
            }
        });
    };
    const rejectedOffer = () => {
        navigate(`/trader/orders/${orderId}/offers`);
    };

    const sendUserToMail = () => {
        if (!freight) return;
        else {
            window.open(
                `mailto:${freight?.agent_email}?subject=subject&body=body`
            );
        }
    };
    const sendUserToCotact = () => {
        if (!freight) return;
        else if (window.matchMedia("(max-width: 767px)").matches) {
            window.open(`tel:${freight?.agent_phone}`);
        } else return;
    };
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
            {(hasErrorSingleOffer ||
                hasErrorConfirmOffer ||
                hasErrorSendOrderView) && (
                <Notification
                    message={
                        hasErrorSingleOffer ||
                        hasErrorConfirmOffer ||
                        hasErrorSendOrderView
                    }
                />
            )}
            <div className={classes.Detail}>
                <Scroller>
                    {singleOfferData && (
                        <>
                            <SingleOrder
                                top="50px"
                                borderPassage={border_passage}
                                destination={destination}
                                loadingLocation={loading_location}
                                product={product}
                                weight={weight}
                                loadingDate={loading_date}
                            />
                            <div className={classes.DetailContainer}>
                                <section
                                    className={classNames({
                                        [classes.DetailCard]: true,
                                        [classes.DetailCardHasNotAbout]:
                                            !freight?.about,
                                        [classes.DetailCardHasAbout]:
                                            freight?.about,
                                    })}
                                >
                                    <div className={classes.titleContainer}>
                                        {freight?.profile_picture_file ? (
                                            <div
                                                className={
                                                    classes.ImageContainer
                                                }
                                            >
                                                <img
                                                    alt=""
                                                    src={imageHandler(
                                                        freight?.profile_picture_file
                                                    )}
                                                />
                                            </div>
                                        ) : (
                                            <div className="icon icon-lg i-user-circle"></div>
                                        )}

                                        <h5 className={classes.title}>
                                            {freight?.company_name}
                                        </h5>
                                    </div>
                                    <div className={classes.fildset}>
                                        <div className={classes.border} />
                                        <div className={classes.legend} />
                                        <p className={classes.innerLegend}>
                                            قیمت
                                        </p>
                                    </div>
                                    <div className={classes.PriceContainer}>
                                        <div className={classes.label}>
                                            <div className="icon icon-sm i-offer mx-1" />
                                            قیمت پیشنهادی
                                        </div>
                                        <div className={classes.price}>
                                            {offerItems?.price.toLocaleString(
                                                3
                                            )}{" "}
                                            تومان
                                        </div>
                                    </div>
                                    <div className={classes.PriceContainer}>
                                        <div className={classes.label}>
                                            <div className="icon icon-sm i-payment mx-1" />
                                            پیش پرداخت
                                        </div>
                                        <div className={classes.price}>
                                            %{" "}
                                            {offerItems?.prepayment_percentage}
                                            <span
                                                className={classes.innerPrice}
                                            >
                                                (
                                                {offerItems?.prepayment_amount.toLocaleString(
                                                    3
                                                )}{" "}
                                                تومان)
                                            </span>
                                        </div>
                                    </div>
                                    {freight?.about && (
                                        <>
                                            <div className={classes.fildset}>
                                                <div
                                                    className={classes.border}
                                                />
                                                <div
                                                    className={classes.legend1}
                                                >
                                                    <p
                                                        className={
                                                            classes.innerLegend1
                                                        }
                                                    >
                                                        درباره شرکت
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    classes.AboutContainer
                                                }
                                            >
                                                <p className={classes.About}>
                                                    {freight?.about}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </section>
                                <div className={classes.contract}>
                                    <h4 className={classes.contractTitle}>
                                        {" "}
                                        پیش نویس قرارداد
                                    </h4>
                                    <div>
                                        <Button
                                            clicked={() => {
                                                dispatch(
                                                    showUploadModal({
                                                        title: "  پیش نویس قرارداد ",
                                                        view: true,
                                                        acceptType: "*",
                                                        fileId: deal_draft?.bill_file,
                                                        fileType: "document",
                                                    })
                                                );
                                            }}
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
                                    <div
                                        className={classes.contactUs}
                                        onClick={sendUserToCotact}
                                    >
                                        <span>تماس تلفنی با</span>
                                        <span> {freight?.agent_phone}</span>
                                    </div>
                                    {/* <div className={classes.contactUs}>
                                <span>ارسال پیامک به </span>
                                <span> {phone}</span>
                            </div> */}
                                    <div
                                        className={classes.contactUs}
                                        onClick={sendUserToMail}
                                    >
                                        <span>ارسال ایمیل به </span>
                                        <span> {freight?.agent_email}</span>
                                    </div>
                                </div>
                                <div className={classes.Buttons}>
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
                                    <Button
                                        clicked={rejectedOffer}
                                        btnStyle={{
                                            width: "148px",
                                            height: "40px",
                                            fontSize: "16px",
                                            padding: "2px 29px",
                                        }}
                                    >
                                        رد پیشنهاد
                                    </Button>
                                </div>
                                <ModalCard
                                    show={show}
                                    cancel={() => setShow(false)}
                                    confirm={confirmOffer}
                                    content="ایا توافق شما با این شرکت نهایی شد؟"
                                    confirmText="بله"
                                    cancelText="خیر"
                                    btnWidth="88px"
                                />
                            </div>
                        </>
                    )}
                </Scroller>
            </div>
        </Layout>
    );
};

export default Detail;

import Scroller from "src/components/scroller/Scroller";
import Layout from "src/layouts/Layout";
import classes from "./Detail.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Button from "src/components/UI/button/Button";
import ModalCard from "src/components/modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import useRequest from "src/hooks/useRequest";
import { imageHandler } from "src/helper/baseUrls";
import Input from "src/components/UI/input/Input";
import { Form } from "react-bootstrap";
import { validTextInput } from "src/helper/utils";
import useInput from "src/hooks/useInput";
import { resetUploader } from "src/store/uploadFile-slice";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import { persian_fa } from "react-date-object/locales/persian_fa";
import { gregorian } from "react-date-object/calendars/gregorian";
import FilterByPrice from "src/components/container/filter-by-precentage/FilterByPrecentage";
import Notification from "src/components/notification/Notification";

const Detail = () => {
    const [show, setShow] = useState(false);
    const { accessToken } = useSelector(state => state.user);
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [required, setRequired] = useState(false);
    const dispatch = useDispatch();
    const [precentage, setPrecentage] = useState(50);
    const [requiredError, setRequiredError] = useState(null);

    const { uploadFiles } = useSelector(state => state.upload);
    const contractFile = uploadFiles?.contractFile ?? "";
    const {
        hasError: hasErrorPrice,
        inputBlurHandler: onBlurPrice,
        isValid: validPrice,
        value: price,
        valueChangeHandler: onChangePrice,
        defaultValue: setDefaultPrice,
    } = useInput(validTextInput, 50);

    const realPrecentageValue = (precentage / 100) * price;

    const {
        sendRequest: fetchSingleOffer,
        error: hasErrorSingleOffer,
        data: singleOffer,
    } = useRequest();
    const { sendRequest: sendNewOffer, error: hasSendNewOfferError } =
        useRequest();

    useEffect(() => {
        if (accessToken) {
            fetchSingleOffer({
                url: `freight/offers/${orderId}/`,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
        }
    }, []);

    useEffect(() => {
        if (singleOffer) {
            setDefaultPrice(singleOffer.price);
            setPrecentage(singleOffer.prepayment_percentage);
        }
    }, [singleOffer]);

    const {
        deal_draft,
        seen,
        orderer_acception,
        order,
        prepayment_amount,
        prepayment_percentage,
        price: offerPrice,
        freight_acception,
    } = singleOffer ?? {};
    const {
        orderer,
        loading_date,
        weight,
        product,
        loading_location: loadingLocation,
        border_passage: borderPassage,
        destination,
        vehicle_type: vehicleType,
    } = order ?? {};

    const {
        about,
        company_name: companyName,
        profile_picture_file: image,
    } = orderer ?? "";

    const convertLoadingDate = new DateObject({
        calendar: gregorian,
        date: loading_date,
    })
        .convert(persian, persian_fa)
        .format();
    let formIsValid = false;

    const formValidation =
        (contractFile || deal_draft?.bill_file) && (validPrice || offerPrice);

    if (formValidation) {
        formIsValid = true;
    }
    const formSubmitionHandler = event => {
        event.preventDefault();

        if (!formIsValid) {
            setRequired(true);
            setRequiredError("لطفا فیلدهای ضروری را وارد کنید");

            return;
        }
        setRequiredError(null);

        setShow(true);
    };
    const confirmOfferHandler = () => {
        setShow(false);

        if (price || offerPrice) {
            sendNewOffer({
                url: `freight/orders/${order?.id}/updae_offer/${orderId}/`,
                method: "POST",
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
                data: {
                    price: price ?? offerPrice,
                    prepayment_percentage: precentage ?? prepayment_percentage,
                },
            }).then(data => {
                if (data.price) {
                    dispatch(resetUploader());
                    setShow(false);
                    navigate(`/freight/offers`);
                }
            });
        }
    };
    const confirmOrderHandler = () => {
        if (price || offerPrice) {
            sendNewOffer({
                url: `freight/orders/${order?.id}/offers/${orderId}/offer_confirmation/`,
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
                data: {
                    price: price ?? offerPrice,
                    prepayment_percentage: precentage ?? prepayment_percentage,
                },
            }).then(data => {
                if (data.price) {
                    setShow(false);
                    navigate(`/freight/offers`);
                }
            });
        }
    };
    const rejectedOrderHandler = () => {
        navigate("/freight/offers/");
    };
    return (
        <Layout isLogin={true}>
            <div className={classes.Detail}>
                {(hasErrorSingleOffer ||
                    hasSendNewOfferError ||
                    requiredError) && (
                    <Notification
                        message={
                            hasErrorSingleOffer ||
                            hasSendNewOfferError ||
                            requiredError
                        }
                    />
                )}
                {singleOffer && (
                    <Scroller>
                        <div className={classes.DetailContainer}>
                            <section
                                className={classNames({
                                    [classes.OrderCard]: true,
                                    [classes.hasAbout]: about,
                                    [classes.hasNotAbout]: !about,
                                })}
                                // onClick={cardDetailHandler}
                            >
                                {(companyName || image) && (
                                    <div className={classes.titleContainer}>
                                        {image ? (
                                            <div
                                                className={
                                                    classes.ImageContainer
                                                }
                                            >
                                                <img
                                                    alt=""
                                                    src={imageHandler(image)}
                                                />
                                            </div>
                                        ) : (
                                            <div className="icon icon-lg i-user-circle"></div>
                                        )}
                                        <h5 className={classes.title}>
                                            {companyName}
                                        </h5>
                                    </div>
                                )}
                                <div className={classes.fildset}>
                                    <div className={classes.border} />
                                    <div className={classes.legend} />
                                    <p className={classes.innerLegend}>
                                        جزئیات بار
                                    </p>
                                </div>
                                <div className={classes.OrderContainer}>
                                    <div className={classes.ProductDetail}>
                                        <div className={classes.text}>
                                            <span className="icon icon-sm i-fillCircle mx-1" />
                                            مبدا:
                                            {loadingLocation}
                                        </div>
                                        <div className={classes.text}>
                                            <span className="icon icon-sm i-direction mx-1" />
                                            گذرگاه مرزی:
                                            {borderPassage}
                                        </div>
                                        <div className={classes.text}>
                                            <span className="icon icon-sm i-circle mx-1" />
                                            مقصد:
                                            {destination}
                                        </div>
                                        <div className={classes.text}>
                                            <span className="icon icon-sm i-vehicle mx-1" />
                                            نوع ناوگان:
                                            {vehicleType}
                                        </div>
                                    </div>
                                    <div className={classes.Product}>
                                        <div className={classes.text}>
                                            <span className="icon icon-sm i-box mx-1" />
                                            {product}
                                        </div>
                                        <div className={classes.text}>
                                            <span className="icon icon-sm i-weight mx-1" />
                                            {weight} تن
                                        </div>
                                        <div className={classes.text}>
                                            <span className="icon icon-sm i-calender-sm mx-1" />
                                            {convertLoadingDate}
                                        </div>
                                    </div>
                                </div>
                                <p className={classes.description}>
                                    هزینه ی انبارداری بر عهده معامله گر می باشد
                                </p>
                                {about && (
                                    <>
                                        <div className={classes.fildset}>
                                            <div className={classes.border} />
                                            <div className={classes.legend} />
                                            <p className={classes.innerLegend}>
                                                درباره شرکت
                                            </p>
                                        </div>
                                        <div className={classes.AboutContainer}>
                                            <p className={classes.About}>
                                                {about}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </section>

                            <Form
                                className={classes.Form}
                                onSubmit={e => e.preventDefault()}
                            >
                                <Input
                                    width="328px"
                                    elementType="select-file"
                                    inputIsValid={deal_draft.bill_file}
                                    inputType="text"
                                    view={true}
                                    required={required}
                                    fileId={deal_draft?.bill_file}
                                    value={
                                        deal_draft?.bill_file
                                            ? "پیش نویس قرار داد"
                                            : ""
                                    }
                                    placeholder="پیش نویس قرار داد"
                                    label={
                                        deal_draft?.bill_file
                                            ? ""
                                            : "پیش نویس قرار داد"
                                    }
                                >
                                    <span className={classes.innerIcon}>
                                        {deal_draft?.bill_file ? (
                                            <div className="icon icon-md i-completed" />
                                        ) : (
                                            <div className="icon icon-md i-plus" />
                                        )}
                                    </span>
                                </Input>
                                {seen && !orderer_acception && (
                                    <Input
                                        width="328px"
                                        elementType="input"
                                        blurInput={onBlurPrice}
                                        changeInput={onChangePrice}
                                        inputIsValid={validPrice}
                                        isTouched={hasErrorPrice}
                                        inputType="number"
                                        placeholder="قیمت پیشنهادی (تومان) "
                                        label="قیمت پیشنهادی (تومان) "
                                        value={price}
                                        isLogin={false}
                                        required={required}
                                    />
                                )}
                                {seen && !orderer_acception && (
                                    <div className={classes.offerPriceBox}>
                                        <div className={classes.prepayment}>
                                            <p>پیش پرداخت</p>
                                            <div className={classes.price}>
                                                <p>
                                                    {realPrecentageValue.toLocaleString(
                                                        3
                                                    )}
                                                </p>
                                                <span className="mx-1">از</span>
                                                <p>
                                                    {Number(
                                                        price
                                                    ).toLocaleString(3)}
                                                </p>
                                            </div>
                                        </div>
                                        <FilterByPrice
                                            FilterByPrecentage={setPrecentage}
                                            precentage={precentage}
                                            maxValue={100}
                                        />
                                    </div>
                                )}
                                {seen && !orderer_acception && (
                                    <div className={classes.BottomSection}>
                                        <Button
                                            disabled={false}
                                            clicked={formSubmitionHandler}
                                            btnStyle={{
                                                padding: "2px 50px",
                                                height: "40px",
                                                fontWeight: "400",
                                                fontSize: "16px",
                                            }}
                                        >
                                            تغییر قیمت و ارسال
                                        </Button>
                                    </div>
                                )}
                                {(!seen || orderer_acception) && (
                                    <div
                                        className={classes.staticPriceContainer}
                                    >
                                        <div className={classes.staticTitle}>
                                            قیمت پیشنهادی
                                        </div>
                                        <div className={classes.staticPrice}>
                                            <p className="m-0">
                                                {offerPrice.toLocaleString(3)}
                                            </p>
                                            <p className="m-0 mx-1">تومان</p>
                                        </div>
                                    </div>
                                )}
                                {(!seen || orderer_acception) && (
                                    <div
                                        className={classes.staticPriceContainer}
                                    >
                                        <div className={classes.staticTitle}>
                                            پیش پرداخت
                                        </div>
                                        <div className={classes.staticPrice}>
                                            {prepayment_percentage}%
                                            <span
                                                className={classes.innerPrice}
                                            >
                                                (
                                                {prepayment_amount.toLocaleString(
                                                    3
                                                )}{" "}
                                                تومان)
                                            </span>
                                        </div>
                                    </div>
                                )}
                                {seen &&
                                    orderer_acception &&
                                    !freight_acception && (
                                        <div className={classes.BottomSection}>
                                            <Button
                                                disabled={false}
                                                clicked={formSubmitionHandler}
                                                btnStyle={{
                                                    padding: "2px 30px",
                                                    height: "40px",
                                                    fontWeight: "400",
                                                    fontSize: "16px",
                                                    width: "118px",
                                                }}
                                            >
                                                قبول بار
                                            </Button>
                                            <Button
                                                disabled={false}
                                                clicked={rejectedOrderHandler}
                                                btnStyle={{
                                                    padding: "2px 30px",
                                                    height: "40px",
                                                    fontWeight: "400",
                                                    fontSize: "16px",
                                                    width: "118px",
                                                }}
                                            >
                                                رد بار
                                            </Button>
                                        </div>
                                    )}
                            </Form>
                            {seen && orderer_acception ? (
                                <ModalCard
                                    show={show}
                                    cancel={() => setShow(false)}
                                    confirm={confirmOrderHandler}
                                    content={`
                                    آیا از قبول تحویل بار ${weight} تن 
                                    ${product}
                                    از: شرکت ${companyName}
                                    از: مبدا ${loadingLocation}
                                    به مقصد: ${destination}
                                    گذرگاه مرزی: ${borderPassage}
                                    اطمینان کامل را دارید؟
                                 `}
                                    height={160}
                                    confirmText="بله "
                                    cancelText="خیر "
                                    btnWidth={100}
                                />
                            ) : (
                                <ModalCard
                                    show={show}
                                    cancel={() => setShow(false)}
                                    confirm={confirmOfferHandler}
                                    content={`پیشنهاد قیمت ${Number(
                                        price
                                    ).toLocaleString(3)}
                                    تومان با ${precentage}%
                                    پیش پرداخت 
                                    برای حمل ${weight} تن 
                                    ${product}
                                    از مبدا: ${loadingLocation} به مقصد: ${destination}
                                    `}
                                    height={120}
                                    confirmText="تایید و ارسال"
                                    cancelText="عدم تایید"
                                />
                            )}
                        </div>
                    </Scroller>
                )}
            </div>
        </Layout>
    );
};

export default Detail;

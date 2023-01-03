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
    } = useInput(validTextInput, 50);

    const {
        sendRequest: fetchSingleOrder,
        error: hasErrorSingleOrder,
        data: singleOrder,
    } = useRequest();
    const { sendRequest: sendNewOffer, error: hasSendNewOfferError } =
        useRequest();
    const realPrecentageValue = (precentage / 100) * price;
    const validPriceValue = Number(price).toLocaleString(3);

    useEffect(() => {
        if (accessToken) {
            fetchSingleOrder({
                url: `freight/orders/${orderId}/`,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
        }
    }, []);

    const {
        border_passage: borderPassage,
        destination,
        loading_location: loadingLocation,
        product,
        weight,
        loading_date,
        vehicle_type: vehicleType,
        orderer,
    } = singleOrder ?? {};
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

    const formValidation = contractFile && validPrice;

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
        if (price) {
            sendNewOffer({
                url: `freight/orders/${orderId}/create_offer/`,
                method: "POST",
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
                data: {
                    price: price,
                    prepayment_percentage: precentage,
                    deal_draft_file: contractFile,
                },
            }).then(data => {
                if (data.price) {
                    dispatch(resetUploader());
                    navigate(`/freight/orders`);
                }
            });
        }
    };

    return (
        <Layout isLogin={true}>
            <div className={classes.Detail}>
                {(hasErrorSingleOrder ||
                    hasSendNewOfferError ||
                    requiredError) && (
                    <Notification
                        message={
                            hasErrorSingleOrder ||
                            hasSendNewOfferError ||
                            requiredError
                        }
                    />
                )}
                {singleOrder && (
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
                                    inputIsValid={contractFile}
                                    inputType="text"
                                    fileName="contractFile"
                                    required={required}
                                    value={
                                        contractFile ? "پیش نویس قرار داد" : ""
                                    }
                                    placeholder="پیش نویس قرار داد"
                                    label={
                                        contractFile ? "" : "پیش نویس قرار داد"
                                    }
                                >
                                    <span className={classes.innerIcon}>
                                        {contractFile ? (
                                            <div className="icon icon-md i-completed" />
                                        ) : (
                                            <div className="icon icon-md i-plus" />
                                        )}
                                    </span>
                                </Input>
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
                                    value={price.toLocaleString(3)}
                                    isLogin={false}
                                    required={required}
                                />
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
                                            <p>{validPriceValue}</p>
                                        </div>
                                    </div>
                                    <FilterByPrice
                                        FilterByPrecentage={setPrecentage}
                                        precentage={precentage}
                                        maxValue={100}
                                    />
                                </div>
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
                                        تایید و ارسال قیمت
                                    </Button>
                                </div>
                            </Form>
                            <ModalCard
                                show={show}
                                cancel={() => setShow(false)}
                                confirm={confirmOfferHandler}
                                content={`پیشنهاد قیمت ${validPriceValue}
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
                        </div>
                    </Scroller>
                )}
            </div>
        </Layout>
    );
};

export default Detail;

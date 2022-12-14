import classes from "./NewOrder.module.scss";
import Select from "src/components/select/Select";
import Button from "src/components/UI/button/Button";
import Scroller from "src/components/scroller/Scroller";
import { useDispatch, useSelector } from "react-redux";
import { getContractType } from "src/store/order-slice";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Input from "src/components/UI/input/Input";
import useInput from "src/hooks/useInput";
import Alert from "src/components/alert/Alert";
import { useNavigate, useParams } from "react-router";
import Layout from "src/layouts/Layout";

const OrderDetail = () => {
    const [hasOrderType, setHasOrderType] = useState(false);
    const [startDate, setStartDate] = useState();
    const [isCompleted, setIsCompleted] = useState(false);
    const { contractType } = useSelector(state => state.order);
    const { orderId } = useParams();
    const navigate = useNavigate();

    const {
        hasError: hasErrorProduct,
        inputBlurHandler: onBlurProduct,
        isValid: validProduct,
        value: product,
        valueChangeHandler: onChangeProduct,
    } = useInput();
    const {
        hasError: hasErrorWeight,
        inputBlurHandler: onBlurWeight,
        isValid: validWeight,
        value: weight,
        valueChangeHandler: onChangeWeight,
    } = useInput();
    const {
        hasError: hasErrorVehicleType,
        inputBlurHandler: onBlurVehicleType,
        isValid: validVehicleType,
        value: vehicleType,
        valueChangeHandler: onChangeVehicleType,
    } = useInput();
    const {
        hasError: hasErrorLoadingLocation,
        inputBlurHandler: onBlurLoadingLocation,
        isValid: validLoadingLocation,
        value: loadingLocation,
        valueChangeHandler: onChangeLoadingLocation,
    } = useInput();
    const {
        hasError: hasErrorDestination,
        inputBlurHandler: onBlurDestination,
        isValid: validDestination,
        value: destination,
        valueChangeHandler: onChangeDestination,
    } = useInput();
    const {
        hasError: hasErrorBorderPassage,
        inputBlurHandler: onBlurBorderPassage,
        isValid: validBorderPassage,
        value: borderPassage,
        valueChangeHandler: onChangeBorderPassage,
    } = useInput();
    const {
        hasError: hasErrorDescription,
        inputBlurHandler: onBlurDescription,
        isValid: validDescription,
        value: description,
        valueChangeHandler: onChangeDescription,
    } = useInput();
    const {
        hasError: hasErrorPerformFile,
        inputBlurHandler: onBlurPerformFile,
        isValid: validPerformFile,
        value: performFile,
        valueChangeHandler: onChangePerformFile,
    } = useInput();

    const dispatch = useDispatch();
    const onChangeOrderType = value => {
        dispatch(getContractType(value));
    };
    const onConfirmStepOne = () => {
        if (!contractType) {
            return;
        } else if (contractType) {
            setHasOrderType(true);
        }
    };
    let formIsValid = false;
    const formValidation =
        validProduct &&
        validWeight &&
        validVehicleType &&
        validLoadingLocation &&
        validDestination &&
        validBorderPassage &&
        validDescription &&
        validPerformFile;
    if (formValidation) {
        formIsValid = true;
    }
    const formSubmitionHandler = event => {
        event.preventDefault();
        console.log(formIsValid);
        if (!formIsValid) {
            return;
        }
        setIsCompleted(true);
        // send request to database
    };
    useEffect(() => {
        if (orderId !== "new") {
            // send requst to chech if there is order id
            // if there was a orderId navigate to offers
            navigate("/producer/orders");
        }
    }, []);
    if (isCompleted) {
        return (
            <Layout isLogin={true}>
                <Alert
                    confirmed={() => navigate({ pathname: "/producer/orders" })}
                    height="278px"
                    width="270px"
                    description="سفارش شما با موفقیت ثبت گردید. پیشنهادات شرکت های حمل و نقل برای سفارش شما از طریق اعلان به شما اطلاع داده خواهد شد. شما میتوانید پیشنهادات شرکت های حمل و نقل را در قسمت سفارش ها و سپس بخش پیشنهادات مشاهده کنید."
                />
            </Layout>
        );
    }
    return (
        <Layout isLogin={true}>
            <div className={classes.Order}>
                <Scroller>
                    {!hasOrderType && (
                        <>
                            <p className={classes.title}>
                                لطفا نوع سفارش خود را انتخاب کنید
                            </p>
                            <Select
                                options={[
                                    { value: "FCA", id: "o1", disable: false },
                                    { value: "CPT", id: "o2", disable: false },
                                    { value: "FOB", id: "o3", disable: true },
                                    { value: "CFR", id: "o4", disable: true },
                                ]}
                                selected={contractType}
                                setSelected={onChangeOrderType}
                                top="80px"
                            />
                            <div className={classes.Button}>
                                <Button
                                    disabled={!contractType}
                                    clicked={onConfirmStepOne}
                                    btnStyle={{
                                        fontSize: "20px",
                                        padding: "15px 50px",
                                        height: "45px",
                                        fontWeight: "400",
                                    }}
                                >
                                    ثبت سفارش
                                </Button>
                            </div>
                        </>
                    )}
                    {hasOrderType && (
                        <Form
                            onSubmit={formSubmitionHandler}
                            className={classes.Form}
                        >
                            <Input
                                elementType="select"
                                inputType="select"
                                placeholder="نوع قرار داد"
                                isLogin={false}
                                errorMessage="نوع قرار داد"
                            >
                                <div className={classes.innerIcon}>
                                    <Button
                                        clicked={() => setHasOrderType(false)}
                                        btnStyle={{
                                            height: "24px",
                                            width: "154px",
                                        }}
                                    >
                                        {contractType}
                                    </Button>
                                </div>
                            </Input>
                            <Input
                                inputType="text"
                                elementType="input"
                                value={product}
                                placeholder="نوع کالا"
                                changeInput={onChangeProduct}
                                blurInput={onBlurProduct}
                                errorMessage="نوع کالا"
                                inputIsValid={validProduct}
                                label="نام کالا"
                                isTouched={hasErrorProduct}
                            />
                            <Input
                                inputType="text"
                                elementType="input"
                                placeholder="وزن"
                                errorMessage="وزن را وارد کنید"
                                label="وزن "
                                value={weight}
                                inputIsValid={validWeight}
                                changeInput={onChangeWeight}
                                blurInput={onBlurWeight}
                                isTouched={hasErrorWeight}
                            />
                            <Input
                                inputType="text"
                                elementType="input"
                                placeholder="نوع ناوگان"
                                errorMessage="نوع ناوگان را وارد کنید"
                                label="نوع ناوگان "
                                value={vehicleType}
                                inputIsValid={validVehicleType}
                                changeInput={onChangeVehicleType}
                                blurInput={onBlurVehicleType}
                                isTouched={hasErrorVehicleType}
                            />
                            <Input
                                inputType="text"
                                elementType="input"
                                placeholder="محل بارگیری "
                                errorMessage=" محل بارگیری را وارد کنید"
                                label="محل بارگیری "
                                value={loadingLocation}
                                inputIsValid={validLoadingLocation}
                                changeInput={onChangeLoadingLocation}
                                blurInput={onBlurLoadingLocation}
                                isTouched={hasErrorLoadingLocation}
                            />
                            <Input
                                inputType="text"
                                elementType="input"
                                placeholder="محل تخلیه "
                                errorMessage=" محل تخلیه را وارد کنید"
                                label="محل تخلیه "
                                value={destination}
                                inputIsValid={validDestination}
                                changeInput={onChangeDestination}
                                blurInput={onBlurDestination}
                                isTouched={hasErrorDestination}
                            />
                            <Input
                                inputType="date"
                                elementType="datepicker"
                                value={startDate}
                                placeholder="تاریخ بارگیری"
                                changeInput={date => setStartDate(date)}
                                errorMessage="تاریخ بارگیری"
                                inputIsValid={true}
                            />
                            <Input
                                inputType="text"
                                elementType="input"
                                placeholder="گذرگاه مرزی "
                                errorMessage=" گذرگاه مرزی را وارد کنید"
                                label="گذرگاه مرزی "
                                value={borderPassage}
                                inputIsValid={validBorderPassage}
                                changeInput={onChangeBorderPassage}
                                blurInput={onBlurBorderPassage}
                                isTouched={hasErrorBorderPassage}
                            />
                            <Input
                                inputType="text"
                                elementType="textarea"
                                placeholder="توضیحات (اختیاری)"
                                errorMessage=" توضیحات را وارد کنید"
                                label="توضیحات"
                                value={description}
                                inputIsValid={validDescription}
                                changeInput={onChangeDescription}
                                blurInput={onBlurDescription}
                                isTouched={hasErrorDescription}
                            />
                            <Input
                                elementType="inputgroup"
                                blurInput={onBlurPerformFile}
                                changeInput={onChangePerformFile}
                                inputIsValid={validPerformFile}
                                isTouched={hasErrorPerformFile}
                                inputType="text"
                                placeholder="فایل پرفورما"
                                value={performFile}
                                label="فایل پرفورما"
                                isLogin={false}
                                errorMessage="فایل پرفورما را وارد کنید "
                            >
                                <span className={classes.innerIcon}>
                                    {performFile ? (
                                        <div className="icon icon-md i-completed" />
                                    ) : (
                                        <div className="icon icon-md i-plus-active" />
                                    )}
                                </span>
                            </Input>
                            <div className={classes.Button}>
                                <Button
                                    // disabled={!contractType}
                                    clicked={formSubmitionHandler}
                                    btnStyle={{
                                        fontSize: "20px",
                                        padding: "15px 50px",
                                        height: "45px",
                                        fontWeight: "400",
                                    }}
                                >
                                    تایید
                                </Button>
                            </div>
                        </Form>
                    )}
                </Scroller>
            </div>
        </Layout>
    );
};

export default OrderDetail;

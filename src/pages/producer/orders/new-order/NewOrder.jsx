import classes from "./NewOrder.module.scss";
import Select from "../../../../components/select/Select";
import Button from "../../../../components/UI/button/Button";
import Scroller from "../../../../components/scroller/Scroller";
import { useDispatch, useSelector } from "react-redux";
import { getContractType } from "../../../../store/order-slice";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Input from "../../../../components/UI/input/Input";
import useInput from "../../../../hooks/useInput";
import Alert from "src/components/alert/Alert";
import { useNavigate } from "react-router";
import Layout from "src/layouts/Layout";
import useRequest from "src/hooks/useRequest";
import { validTextInput } from "src/helper/utils";
import persian from "react-date-object/calendars/persian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian from "react-date-object/calendars/gregorian";
import { DateObject } from "react-multi-date-picker";
import { Toaster, toast } from "react-hot-toast";

const NewOrder = () => {
    const [hasOrderType, setHasOrderType] = useState(false);
    const [startDate, setStartDate] = useState();
    const [isCompleted, setIsCompleted] = useState(false);
    const { contractType } = useSelector(state => state.order);
    const [required, setRequired] = useState(false);
    const { accessToken } = useSelector(state => state.user);
    const navigate = useNavigate();

    const { uploadFiles } = useSelector(state => state.upload);
    const performFile = uploadFiles?.performFile ?? "";
    const dispatch = useDispatch();

    const { sendRequest: sendNewOrder, error: newOrderError } = useRequest();

    const {
        hasError: hasErrorProduct,
        inputBlurHandler: onBlurProduct,
        isValid: validProduct,
        value: product,
        valueChangeHandler: onChangeProduct,
    } = useInput(validTextInput, 200);
    const {
        hasError: hasErrorWeight,
        inputBlurHandler: onBlurWeight,
        isValid: validWeight,
        value: weight,
        valueChangeHandler: onChangeWeight,
    } = useInput(validTextInput);
    const {
        hasError: hasErrorVehicleType,
        inputBlurHandler: onBlurVehicleType,
        isValid: validVehicleType,
        value: vehicleType,
        valueChangeHandler: onChangeVehicleType,
    } = useInput(validTextInput, 200);
    const {
        hasError: hasErrorLoadingLocation,
        inputBlurHandler: onBlurLoadingLocation,
        isValid: validLoadingLocation,
        value: loadingLocation,
        valueChangeHandler: onChangeLoadingLocation,
    } = useInput(validTextInput, 200);
    const {
        hasError: hasErrorDestination,
        inputBlurHandler: onBlurDestination,
        isValid: validDestination,
        value: destination,
        valueChangeHandler: onChangeDestination,
    } = useInput(validTextInput, 200);
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

    const onChangeContractType = value => {
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
        startDate &&
        performFile;

    if (formValidation) {
        formIsValid = true;
    }
    const formSubmitionHandler = event => {
        event.preventDefault();
        if (!formIsValid) {
            setRequired(true);
            toast.error("لطفا فیلدهای ضروری را وارد کنید");

            return;
        }

        const loadingDate = new DateObject({
            calendar: persian,
            date: startDate,
        })
            .convert(gregorian, gregorian_en)
            .format();

        sendNewOrder({
            url: `producer/orders/`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
            data: {
                contract_type: contractType?.id,
                product: product,
                weight: weight,
                vehicle_type: vehicleType,
                loading_location: loadingLocation,
                destination: destination,
                loading_date: loadingDate,
                border_passage: borderPassage,
                description: description,
                proforma_file: performFile,
            },
        }).then(data => {
            if (data) {
                setIsCompleted(true);
            }
        });
    };
    const confirmOrderHandler = () => {
        dispatch(getContractType(null));
        navigate({ pathname: "/producer/orders" });
    };
    useEffect(() => {
        if (newOrderError) {
            toast.error(newOrderError);
        }
    }, [newOrderError]);

    if (isCompleted) {
        return (
            <Layout isLogin={true}>
                <Alert
                    confirmed={confirmOrderHandler}
                    height="278px"
                    width="270px"
                    description="سفارش شما با موفقیت ثبت گردید. پیشنهادات شرکت های حمل و نقل برای سفارش شما از طریق اعلان به شما اطلاع داده خواهد شد. شما میتوانید پیشنهادات شرکت های حمل و نقل را در قسمت سفارش ها و سپس بخش پیشنهادات مشاهده کنید."
                />
            </Layout>
        );
    }
    return (
        <Layout isLogin={true}>
            <Toaster position="top-center" reverseOrder={false} />
            <div className={classes.Order}>
                <Scroller>
                    {!hasOrderType && (
                        <>
                            <p className={classes.title}>
                                لطفا نوع سفارش خود را انتخاب کنید
                            </p>
                            <Select
                                options={[
                                    { value: "FCA", id: "0", disable: true },
                                    { value: "CPT", id: "1", disable: false },
                                    { value: "FOB", id: "2", disable: true },
                                    { value: "CFR", id: "3", disable: true },
                                ]}
                                selected={contractType}
                                setSelected={onChangeContractType}
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
                            className={classes.Form}
                            onSubmit={e => e.preventDefault()}
                        >
                            <Input
                                elementType="select"
                                inputType="select"
                                placeholder="نوع قرار داد"
                                isLogin={false}
                                inputIsValid={contractType}
                            >
                                <div className={classes.innerIcon}>
                                    <Button
                                        clicked={() => setHasOrderType(false)}
                                        btnStyle={{
                                            height: "24px",
                                            width: "154px",
                                        }}
                                    >
                                        {contractType?.value}
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
                                inputIsValid={validProduct}
                                label="نام کالا"
                                isTouched={hasErrorProduct}
                                required={required}
                            />
                            <Input
                                inputType="text"
                                elementType="input"
                                placeholder="وزن"
                                label="وزن "
                                value={weight}
                                inputIsValid={validWeight}
                                changeInput={onChangeWeight}
                                blurInput={onBlurWeight}
                                isTouched={hasErrorWeight}
                                required={required}
                            />
                            <Input
                                inputType="text"
                                elementType="input"
                                placeholder="نوع ناوگان"
                                label="نوع ناوگان "
                                value={vehicleType}
                                inputIsValid={validVehicleType}
                                changeInput={onChangeVehicleType}
                                blurInput={onBlurVehicleType}
                                isTouched={hasErrorVehicleType}
                                required={required}
                            />
                            <Input
                                inputType="text"
                                elementType="input"
                                placeholder="محل بارگیری "
                                label="محل بارگیری "
                                value={loadingLocation}
                                inputIsValid={validLoadingLocation}
                                changeInput={onChangeLoadingLocation}
                                blurInput={onBlurLoadingLocation}
                                isTouched={hasErrorLoadingLocation}
                                required={required}
                            />
                            <Input
                                inputType="text"
                                elementType="input"
                                placeholder="محل تخلیه "
                                label="محل تخلیه "
                                value={destination}
                                inputIsValid={validDestination}
                                changeInput={onChangeDestination}
                                blurInput={onBlurDestination}
                                isTouched={hasErrorDestination}
                                required={required}
                            />
                            <Input
                                inputType="date"
                                elementType="datepicker"
                                value={startDate}
                                placeholder="تاریخ بارگیری"
                                label="تاریخ بارگیری"
                                changeInput={date => setStartDate(date)}
                                inputIsValid={startDate}
                                required={required}
                            >
                                <div className={classes.innerIcon}>
                                    <div className="icon icon-md i-calender" />
                                </div>
                            </Input>
                            <Input
                                inputType="text"
                                elementType="input"
                                placeholder="گذرگاه مرزی "
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
                                placeholder="توضیحات"
                                label="توضیحات"
                                value={description}
                                inputIsValid={validDescription}
                                changeInput={onChangeDescription}
                                blurInput={onBlurDescription}
                                isTouched={hasErrorDescription}
                            />
                            <Input
                                elementType="select-file"
                                inputIsValid={performFile}
                                inputType="text"
                                placeholder="فایل پرفورما"
                                value={performFile ? "فایل پرفورما" : ""}
                                label={performFile ? "" : "فایل پرفورما"}
                                fileName="performFile"
                                required={required}
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
                                    disabled={!contractType}
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

export default NewOrder;

import classes from "./NewOrder.module.scss";
import Select from "../../../../components/select/Select";
import Button from "../../../../components/UI/button/Button";
import Scroller from "../../../../components/scroller/Scroller";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
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
import Notification from "src/components/notification/Notification";
import { ORDERS_NATIONALITY } from "src/helper/types";
import Switch from "src/components/switch/Switch";
import { resetUploader } from "src/store/uploadFile-slice";

const NewOrder = () => {
    const [hasOrderType, setHasOrderType] = useState(false);
    const [startDate, setStartDate] = useState();
    const [isCompleted, setIsCompleted] = useState(false);
    const [required, setRequired] = useState(false);
    const { accessToken } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [requiredError, setRequiredError] = useState(null);
    const [contractType, setContractType] = useState(null);
    const [nationality, setNationality] = useState(ORDERS_NATIONALITY[0]);
    const dispatch = useDispatch();
    const { uploadFiles } = useSelector(state => state.upload);
    const performFile = uploadFiles?.performFile ?? "";

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
            setRequiredError("???????? ?????????????? ?????????? ???? ???????? ????????");
            return;
        }
        setRequiredError(null);

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
                contract_type: contractType ? contractType?.id : "1",
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

    const onChangeContractType = value => {
        setContractType(value);
    };
    const onConfirmStepOne = () => {
        if (!contractType && nationality.id === "1") {
            return;
        } else {
            setHasOrderType(true);
        }
    };
    const confirmOrderHandler = () => {
        setContractType(null);
        dispatch(resetUploader());
        navigate({ pathname: "/producer/orders" });
    };

    const onChangeNationality = companyType => {
        const findNationality = ORDERS_NATIONALITY.find(
            n => n.title === companyType
        );

        setContractType({
            value: "CPT",
            id: "3",
        });

        setNationality(findNationality);
        if (nationality.id === "1") {
            setContractType(null);
        }
    };
    if (isCompleted) {
        return (
            <Layout isLogin={true}>
                <Alert
                    confirmed={confirmOrderHandler}
                    height="278px"
                    width="270px"
                    description="?????????? ?????? ???? ???????????? ?????? ??????????. ?????????????????? ???????? ?????? ?????? ?? ?????? ???????? ?????????? ?????? ???? ???????? ?????????? ???? ?????? ?????????? ???????? ?????????? ????. ?????? ???????????????? ?????????????????? ???????? ?????? ?????? ?? ?????? ???? ???? ???????? ?????????? ???? ?? ?????? ?????? ?????????????????? ???????????? ????????."
                />
            </Layout>
        );
    }
    return (
        <Layout isLogin={true}>
            {(newOrderError || requiredError) && (
                <Notification message={newOrderError || requiredError} />
            )}

            <div className={classes.Order}>
                <Scroller>
                    {!hasOrderType && (
                        <>
                            <p className={classes.title}>
                                ???????? ?????? ?????????? ?????? ???? ???????????? ????????
                            </p>
                            <Switch
                                changeTitle={onChangeNationality}
                                option={nationality.title}
                                options={ORDERS_NATIONALITY}
                                switchStyles={{
                                    top: "80px",
                                    width: "280px",
                                }}
                            />
                            {nationality.id === "1" && (
                                <Select
                                    options={[
                                        {
                                            value: "CPT",
                                            id: "3",
                                            disable: false,
                                        },
                                    ]}
                                    selected={contractType}
                                    setSelected={onChangeContractType}
                                    top="160px"
                                />
                            )}
                            <div className={classes.Button}>
                                <Button
                                    disabled={
                                        nationality.id === "1"
                                            ? !contractType
                                            : false
                                    }
                                    clicked={onConfirmStepOne}
                                    btnStyle={{
                                        fontSize: "20px",
                                        padding: "15px 50px",
                                        height: "45px",
                                        fontWeight: "400",
                                    }}
                                >
                                    ?????? ??????????
                                </Button>
                            </div>
                        </>
                    )}
                    {hasOrderType && (
                        <Form
                            className={classes.Form}
                            onSubmit={e => e.preventDefault()}
                        >
                            {contractType && (
                                <Input
                                    elementType="select"
                                    inputType="select"
                                    placeholder="?????? ???????? ??????"
                                    isLogin={false}
                                    inputIsValid={contractType}
                                >
                                    <div className={classes.innerIcon}>
                                        <Button
                                            clicked={() =>
                                                setHasOrderType(false)
                                            }
                                            btnStyle={{
                                                height: "24px",
                                                width: "154px",
                                            }}
                                        >
                                            {contractType?.value}
                                        </Button>
                                    </div>
                                </Input>
                            )}
                            <Input
                                inputType="text"
                                elementType="input"
                                value={product}
                                placeholder="?????? ????????"
                                changeInput={onChangeProduct}
                                blurInput={onBlurProduct}
                                inputIsValid={validProduct}
                                label="?????? ????????"
                                isTouched={hasErrorProduct}
                                required={required}
                            />
                            <Input
                                inputType="number"
                                elementType="input"
                                placeholder="??????"
                                label="?????? "
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
                                placeholder="?????? ????????????"
                                label="?????? ???????????? "
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
                                placeholder="?????? ?????????????? "
                                label="?????? ?????????????? "
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
                                placeholder="?????? ?????????? "
                                label="?????? ?????????? "
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
                                placeholder="?????????? ??????????????"
                                label="?????????? ??????????????"
                                changeInput={date => setStartDate(date)}
                                inputIsValid={startDate}
                                required={required}
                            >
                                <div className={classes.innerIcon}>
                                    <div className="icon icon-md i-calender" />
                                </div>
                            </Input>
                            {contractType && (
                                <Input
                                    inputType="text"
                                    elementType="input"
                                    placeholder="???????????? ???????? "
                                    label="???????????? ???????? "
                                    value={borderPassage}
                                    inputIsValid={validBorderPassage}
                                    changeInput={onChangeBorderPassage}
                                    blurInput={onBlurBorderPassage}
                                    isTouched={hasErrorBorderPassage}
                                />
                            )}
                            <Input
                                inputType="text"
                                elementType="textarea"
                                placeholder="??????????????"
                                label="??????????????"
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
                                placeholder="???????? ??????????????"
                                value={performFile ? "???????? ??????????????" : ""}
                                label={performFile ? "" : "???????? ??????????????"}
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
                                    disabled={false}
                                    clicked={formSubmitionHandler}
                                    btnStyle={{
                                        fontSize: "20px",
                                        padding: "15px 50px",
                                        height: "45px",
                                        fontWeight: "400",
                                    }}
                                >
                                    ??????????
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

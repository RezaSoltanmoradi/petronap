import { memo, useEffect } from "react";
import classes from "./otp.module.scss";
import Form from "react-bootstrap/Form";
import useTimer from "../../../hooks/useTimer";
import { validUserCode } from "../../../helper/utils";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../../components/UI/button/Button";
import Input from "../../../components/UI/input/Input";
import useInput from "../../../hooks/useInput";
import useRequest from "src/hooks/useRequest";
import { useSelector, useDispatch } from "react-redux";
import {
    getLoginStaus,
    getOldRole,
    getOtpData,
    getRole,
} from "src/store/user-slice";
import { ROLES } from "src/helper/types";
import { Toaster, toast } from "react-hot-toast";

const Otp = () => {
    const { onClickReset, timer } = useTimer();
    const navigate = useNavigate();
    const { requestId, receiver, password } = useSelector(
        state => state.user.otp
    );
    const dispatch = useDispatch();

    const {
        hasError: passwordHasError,
        inputBlurHandler: passwordBlurHandler,
        isValid: passwordIsValid,
        value: passwordValue,
        valueChangeHandler: passwordChangeHandler,
    } = useInput(validUserCode, 4);

    const { sendRequest: sendOtpRequestId, error: sendOtpError } = useRequest();
    const { sendRequest: getPasswrodAgain, error: getOtpError } = useRequest();

    let formIsValid = false;
    if (passwordIsValid) {
        formIsValid = true;
    }

    const formSubmitionHandler = ({ event, sendPasswordAgain }) => {
        event.preventDefault();
        if (!receiver) {
            navigate("/login");
            toast.error(
                "لطفا اول شماره تلفن همراه خود را برای دریافت و تایید کد وارد کنید."
            );
        }
        if (sendPasswordAgain) {
            onClickReset();
            dispatch(
                getOtpData({
                    requestId: null,
                    receiver: "",
                    password: null,
                })
            );
            getPasswrodAgain({
                url: `users/otp/?receiver=${receiver}&channel=Phone`,
            }).then(data => {
                if (data && receiver) {
                    dispatch(
                        getOtpData({
                            requestId: data?.request_id,
                            receiver: receiver,
                            password: data?.password,
                        })
                    );
                }
            });
        } else {
            if (!formIsValid) {
                return;
            }
            sendOtpRequestId({
                url: `users/otp/`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    request_id: requestId,
                    receiver: receiver,
                    // password: passwordValue,
                    password: password,
                }),
            }).then(data => {
                if (data) {
                    dispatch(
                        getLoginStaus({
                            accessToken: data.token,
                            refreshToken: data.refresh,
                            userId: data.user_id,
                        })
                    );
                    if (data.created || data.user_role === "0") {
                        navigate(`/roles`);
                    } else if (!data.created && data.user_role !== "0") {
                        dispatch(getOldRole(data.user_role));
                        dispatch(getRole(data.user_role));

                        const findRole = ROLES.find(
                            role => role.id === data.user_role
                        );

                        if (findRole.name === "freight") {
                            navigate(`/${findRole.name}/orders`);
                        } else {
                            navigate(`/${findRole.name}/orders/new`);
                        }
                    }
                } else {
                    toast.error("پسورد وارد شده صحیح نمیباشد");
                }
            });
        }
    };
    useEffect(() => {
        if (sendOtpError || getOtpError) {
            toast.error(sendOtpError || getOtpError);
        }
    }, [sendOtpError, getOtpError]);
    return (
        <div className={classes.Container}>
            <Toaster position="top-center" reverseOrder={false} />
            <Form className={classes.Form} onSubmit={e => e.preventDefault()}>
                <Form.Group
                    className={classes.FormGroup}
                    controlId="exampleForm.ControlInput1"
                >
                    <Form.Label className={classes.label}>
                        لطفا کد دریافت شده را وارد کنید
                    </Form.Label>
                    <Input
                        elementType="inputGroup"
                        blurInput={passwordBlurHandler}
                        changeInput={passwordChangeHandler}
                        inputIsValid={passwordIsValid}
                        inputType="number"
                        staticValue={timer}
                        isTouched={passwordHasError}
                        label="کد چهار رقمی"
                        placeholder="کد چهار رقمی"
                        value={passwordValue}
                        isLogin={false}
                    />

                    <div className="d-flex justify-content-between">
                        <NavLink to="/login" className={classes.changePhone}>
                            تغییر شماره همراه
                        </NavLink>
                        <NavLink
                            to="#"
                            className={classes.sendAgain}
                            onClick={event =>
                                formSubmitionHandler({
                                    event,
                                    sendPasswordAgain: true,
                                })
                            }
                        >
                            ارسال مجدد
                        </NavLink>
                    </div>
                </Form.Group>
                <div className={classes.BottomSection}>
                    <div className={classes.rule}></div>

                    <Button
                        disabled={formIsValid ? false : true}
                        clicked={event =>
                            formSubmitionHandler({
                                event,
                                sendPasswordAgain: false,
                            })
                        }
                        btnStyle={{
                            padding: "2px 50px",
                            height: "45px",
                            fontWeight: "400",
                            fontSize: "16px",
                        }}
                    >
                        تایید و ادامه
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default memo(Otp);

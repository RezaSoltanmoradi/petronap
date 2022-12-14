import { memo, useEffect, useState } from "react";
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
import Notification from "src/components/notification/Notification";

const Otp = () => {
    const { onClickReset, timer } = useTimer();
    const navigate = useNavigate();
    const [requiredError, setRequiredError] = useState(null);
    const { requestId, receiver } = useSelector(state => state.user.otp);
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
            setRequiredError("لطفا ابتدا شماره همراه خود را وارد کنید!");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
            return;
        }

        if (sendPasswordAgain) {
            onClickReset();
            dispatch(
                getOtpData({
                    requestId: null,
                    receiver: "",
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
                        })
                    );
                } else if (!data) {
                    setRequiredError(
                        "لطفا ابتدا شماره همراه خود را وارد کنید!"
                    );
                    setTimeout(() => {
                        navigate("/login");
                    }, 3000);
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
                    password: passwordValue,
                }),
            }).then(data => {
                if (data) {
                    console.log("data", data);
                    dispatch(
                        getLoginStaus({
                            accessToken: data.token,
                            refreshToken: data.refresh,
                        })
                    );
                    dispatch(
                        getOtpData({
                            companyName: data.company_name,
                            profilePicture: data.profile_picture_file,
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
                    setRequiredError(
                        " پسورد وارد شده صحیح نمیباشد لطفا مجدد شماره همراه خود را وارد کنید!"
                    );
                    setTimeout(() => {
                        navigate("/login");
                    }, 3000);
                }
            });
        }
    };
    useEffect(() => {
        onClickReset();
    }, []);

    return (
        <div className={classes.Container}>
            {(requiredError || getOtpError || sendOtpError) && (
                <Notification
                    message={requiredError || getOtpError || sendOtpError}
                />
            )}
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

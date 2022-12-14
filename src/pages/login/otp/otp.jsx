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
import { getLoginStaus, getRole } from "src/store/user-slice";

const Otp = () => {
    const { onClickReset, timer } = useTimer();
    const navigate = useNavigate();
    const { requestId, receiver, password } = useSelector(
        state => state.user.otp
    );
    const { role } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const {
        hasError: passwordHasError,
        inputBlurHandler: passwordBlurHandler,
        isValid: passwordIsValid,
        value: passwordValue,
        valueChangeHandler: passwordChangeHandler,
    } = useInput(validUserCode, 4);

    const { sendRequest: sendOtpRequestId, error } = useRequest();

    let formIsValid = false;
    if (passwordIsValid) {
        formIsValid = true;
    }

    const formSubmitionHandler = event => {
        event.preventDefault();
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

                if ((!data.created && +data.user_role === 0) || data.created) {
                    navigate({ pathname: "/login/user-type" });
                } else if (!data.created && data.user_role > 0) {
                    dispatch(getRole(data.user_role));
                    navigate(`/${role}`);
                }
            }
        });
    };

    useEffect(() => {
        //send request to database
        onClickReset();
        if (error) {
            alert(error);
        }
    }, [error]);
    const sendPasswordAgain = () => {
        //send request to database
        onClickReset();
    };
    return (
        <div className={classes.Container}>
            <Form onSubmit={formSubmitionHandler} className={classes.Form}>
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
                            onClick={sendPasswordAgain}
                        >
                            ارسال مجدد
                        </NavLink>
                    </div>
                </Form.Group>
                <div className={classes.BottomSection}>
                    <div className={classes.rule}></div>

                    <Button
                        disabled={formIsValid ? false : true}
                        clicked={formSubmitionHandler}
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

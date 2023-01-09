import classes from "./Login.module.scss";
import Form from "react-bootstrap/Form";
import { validPhone } from "../../helper/utils";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Button from "../../components/UI/button/Button";
import Input from "../../components/UI/input/Input";
import useInput from "../../hooks/useInput";
import Layout from "../../layouts/Layout";
import useRequest from "src/hooks/useRequest";
import { getOtpData } from "src/store/user-slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Notification from "src/components/notification/Notification";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        hasError: phoneHasError,
        inputBlurHandler: phoneBlurHandler,
        isValid: phoneIsValid,
        value: phoneValue,
        valueChangeHandler: phoneChangeHandler,
    } = useInput(validPhone, 10);

    const { sendRequest: getPasswordHandler, error: getOtpError } =
        useRequest();

    let formIsValid = false;
    if (phoneIsValid) {
        formIsValid = true;
    }
    const formSubmitionHandler = event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        } else {
            getPasswordHandler({
                url: `users/otp/?receiver=98${phoneValue}&channel=Phone`,
            }).then(data => {
                console.log("password: ", data?.password);
                if (data) {
                    dispatch(
                        getOtpData({
                            requestId: data?.request_id,
                            receiver: `98${phoneValue}`,
                        })
                    );
                    navigate({ pathname: "otp" });
                }
            });
        }
    };
    useEffect(() => {
        dispatch(
            getOtpData({
                requestId: null,
                receiver: "",
            })
        );
    }, [dispatch]);
    return (
        <Layout isLogin={false}>
            {getOtpError && <Notification message={getOtpError} />}

            <div className={classes.Container}>
                <Form
                    className={classes.Form}
                    onSubmit={e => e.preventDefault()}
                >
                    <Form.Group
                        className={classes.FormGroup}
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label className={classes.label}>
                            لطفا شماره همراه خود را وارد کنید.
                        </Form.Label>
                        <Input
                            elementType="inputGroup"
                            blurInput={phoneBlurHandler}
                            changeInput={phoneChangeHandler}
                            inputIsValid={phoneIsValid}
                            inputType="number"
                            staticValue="98+"
                            label="شماره همراه"
                            placeholder="شماره همراه"
                            value={phoneValue}
                            isLogin={true}
                            isTouched={phoneHasError}
                        />
                    </Form.Group>
                    <div className={classes.BottomSection}>
                        <Form.Label className={classes.rule}>
                            <p className={classes.content}>
                                <span className="icon icon-sm i-info mx-1" />
                                استفاده از پترونپ به معنی
                                <span className={classes.boldContent}>
                                    پذیرش قوانین و مقررات
                                </span>
                                آن است.
                            </p>
                        </Form.Label>

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
                            تایید و دریافت کد
                        </Button>

                        <NavLink
                            to="password"
                            className={classes.loginByPassword}
                        >
                            ورود با کلمه عبور
                        </NavLink>
                    </div>
                </Form>
            </div>
        </Layout>
    );
};

export default Login;

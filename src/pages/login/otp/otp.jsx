import { useEffect } from "react";
import classes from "./otp.module.scss";
import Form from "react-bootstrap/Form";
import useTimer from "../../../hooks/useTimer";
import { validUserCode } from "../../../helper/utils";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../../components/UI/button/Button";
import Input from "../../../components/UI/input/Input";
import useInput from "../../../hooks/useInput";

const Otp = () => {
    const { onClickReset, timer } = useTimer();
    const navigate = useNavigate();
    const {
        hasError: passwordHasError,
        inputBlurHandler: passwordBlurHandler,
        isValid: passwordIsValid,
        value: passwordValue,
        valueChangeHandler: passwordChangeHandler,
    } = useInput(validUserCode, 4);

    let formIsValid = false;
    if (passwordIsValid) {
        formIsValid = true;
    }

    const formSubmitionHandler = event => {
        if (!formIsValid) {
            return;
        }
        // send request to database
        // if this user is exist go to /profile or order
        // if is not exist :
        navigate({ pathname: "/login/user-type" });
    };
    useEffect(() => {
        //send request to database
        onClickReset();
    }, []);
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

export default Otp;

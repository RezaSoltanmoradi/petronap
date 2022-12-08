import Image from "../../../components/profileImage/Image";
import classes from "./Profile.module.scss";
import { validTextInput, validEmail } from "../../../helper/utils";
import useInput from "../../../hooks/useInput";
import Form from "react-bootstrap/Form";
import Input from "../../../components/UI/input/Input";
import Button from "../../../components/UI/button/Button";
import { useState } from "react";
import Alert from "../../../components/alert/Alert";
import Scroller from "../../../components/scroller/Scroller";

const Profile = () => {
    // const navigate = useNavigate();
    const [isCompleted, setIsCompleted] = useState(false);

    const {
        hasError: hasErrorCompanyName,
        inputBlurHandler: onBlurCompanyName,
        isValid: validCompanyName,
        value: companyName,
        valueChangeHandler: onChangeCompanyName,
    } = useInput(validTextInput);
    const {
        hasError: hasErrorCompanyNationalId,
        inputBlurHandler: onBlurCompanyNationalId,
        isValid: validCompanyNationalId,
        value: companyNationalId,
        valueChangeHandler: onChangeCompanyNationalId,
    } = useInput(validTextInput);
    const {
        hasError: hasErrorRegister,
        inputBlurHandler: onBlurRegister,
        isValid: validRegister,
        value: register,
        valueChangeHandler: onChangeRegister,
    } = useInput(validTextInput);
    const {
        hasError: hasErrorCompanyPhone,
        inputBlurHandler: onBlurCompanyPhone,
        isValid: validCompanyPhone,
        value: companyPhone,
        valueChangeHandler: onChangeCompanyPhone,
    } = useInput();
    const {
        hasError: hasErrorCompanyFax,
        inputBlurHandler: onBlurCompanyFax,
        isValid: validCompanyFax,
        value: companyFax,
        valueChangeHandler: onChangeCompanyFax,
    } = useInput();
    const {
        hasError: hasErrorEmailAddress,
        inputBlurHandler: onBlurEmailAddress,
        isValid: validEmailAddress,
        value: emailAddress,
        valueChangeHandler: onChangeEmailAddress,
    } = useInput(validEmail);
    const {
        hasError: hasErrorCompanyAddress,
        inputBlurHandler: onBlurCompanyAddress,
        isValid: validCompanyAddress,
        value: companyAddress,
        valueChangeHandler: onChangeCompanyAddress,
    } = useInput(validTextInput);
    const {
        hasError: hasErrorCeoName,
        inputBlurHandler: onBlurCeoName,
        isValid: validCeoName,
        value: ceoName,
        valueChangeHandler: onChangeCeoName,
    } = useInput(validTextInput);
    const {
        hasError: hasErrorAgentName,
        inputBlurHandler: onBlurAgentName,
        isValid: validAgentName,
        value: agentName,
        valueChangeHandler: onChangeAgentName,
    } = useInput(validTextInput);
    const {
        hasError: hasErrorAgentPhone,
        inputBlurHandler: onBlurAgentPhone,
        isValid: validAgentPhone,
        value: agentPhone,
        valueChangeHandler: onChangeAgentPhone,
    } = useInput();
    const {
        hasError: hasErrorAgentEmail,
        inputBlurHandler: onBlurAgentEmail,
        isValid: validAgentEmail,
        value: agentEmail,
        valueChangeHandler: onChangeAgentEmail,
    } = useInput(validEmail);
    const {
        hasError: hasErrorLicense,
        inputBlurHandler: onBlurLicense,
        isValid: validLicense,
        value: license,
        valueChangeHandler: onChangeLicense,
    } = useInput(validTextInput);
    const {
        hasError: hasErrorCompanyDoc,
        inputBlurHandler: onBlurCompanyDoc,
        isValid: validCompanyDoc,
        value: companyDoc,
        valueChangeHandler: onChangeCompanyDoc,
    } = useInput();
    const {
        hasError: hasErrorAbout,
        inputBlurHandler: onBlurAbout,
        isValid: validAbout,
        value: About,
        valueChangeHandler: onChangeAbout,
    } = useInput(validTextInput);
    const {
        hasError: hasErrorPassword,
        inputBlurHandler: onBlurPassword,
        isValid: validPassword,
        value: password,
        valueChangeHandler: onChangePassword,
    } = useInput(validTextInput);

    let formIsValid = false;
    const formValidation =
        validCompanyName &&
        validCompanyNationalId &&
        validRegister &&
        validCompanyPhone &&
        validCompanyFax &&
        validEmailAddress &&
        validCompanyAddress &&
        validCeoName &&
        validAgentName &&
        validAgentPhone &&
        validAgentEmail &&
        validLicense &&
        validCompanyDoc &&
        validAbout &&
        validPassword;

    if (formValidation) {
        formIsValid = true;
    }

    const formSubmitionHandler = event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        setIsCompleted(true);
        // send request to database
        // navigate({ pathname: "/login/otp" });
    };
    if (isCompleted) {
        return (
            <Alert
                confirmed={() => {}}
                height="209px"
                width="270px"
                title="تبریک!"
                description="اطلاعات کاربری شما با موفقیت ثبت گردید. صحت این اطلاعات تا 24 ساعت آینده بررسی و نتیجه به شما از طریق پیامک اعلام میشود."
            />
        );
    }
    return (
        <div className={classes.container}>
            <Scroller>
                <div className={classes.imageContainer}>
                    <Image />
                </div>
                <Form onSubmit={formSubmitionHandler} className={classes.Form}>
                    <Input
                        elementType="input"
                        blurInput={onBlurCompanyName}
                        changeInput={onChangeCompanyName}
                        inputIsValid={validCompanyName}
                        isTouched={hasErrorCompanyName}
                        inputType="text"
                        placeholder="نام شرکت"
                        value={companyName}
                        label="نام شرکت"
                        errorMessage="لطفا نام شرکت را وارد کنید"
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurCompanyNationalId}
                        changeInput={onChangeCompanyNationalId}
                        inputIsValid={validCompanyNationalId}
                        isTouched={hasErrorCompanyNationalId}
                        inputType="text"
                        placeholder="شناسه ملی"
                        value={companyNationalId}
                        label="شناسه ملی"
                        errorMessage="لطفا شناسه ملی را وارد کنید"
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurRegister}
                        changeInput={onChangeRegister}
                        inputIsValid={validRegister}
                        isTouched={hasErrorRegister}
                        inputType="text"
                        placeholder="شماره ثبت"
                        value={register}
                        label="شماره ثبت"
                        errorMessage="لطفا شماره ثبت را وارد کنید"
                    />
                    <Input
                        elementType="inputgroup"
                        blurInput={onBlurCompanyPhone}
                        changeInput={onChangeCompanyPhone}
                        inputIsValid={validCompanyPhone}
                        isTouched={hasErrorCompanyPhone}
                        inputType="number"
                        placeholder="شماره تلفن"
                        value={companyPhone}
                        label="شماره تلفن"
                        isLogin={false}
                        errorMessage="لطفا شماره تلفن  را وارد کنید"
                    >
                        <span className={classes.innerIcon}>
                            {companyPhone ? (
                                <div className="icon icon-md i-completed" />
                            ) : (
                                <div className="icon icon-md i-plus" />
                            )}
                        </span>
                    </Input>
                    <Input
                        elementType="input"
                        blurInput={onBlurCompanyFax}
                        changeInput={onChangeCompanyFax}
                        inputIsValid={validCompanyFax}
                        isTouched={hasErrorCompanyFax}
                        inputType="number"
                        placeholder="شماره فکس"
                        value={companyFax}
                        label="شماره فکس"
                        isLogin={false}
                        errorMessage="لطفا شماره فکس  را وارد کنید"
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurEmailAddress}
                        changeInput={onChangeEmailAddress}
                        inputIsValid={validEmailAddress}
                        isTouched={hasErrorEmailAddress}
                        inputType="text"
                        placeholder="نشانی اینترنتی"
                        value={emailAddress}
                        label="نشانی اینترنتی"
                        errorMessage="لطفا نشانی اینترنتی  را وارد کنید"
                    />
                    <Input
                        elementType="textarea"
                        blurInput={onBlurCompanyAddress}
                        changeInput={onChangeCompanyAddress}
                        inputIsValid={validCompanyAddress}
                        isTouched={hasErrorCompanyAddress}
                        inputType="text"
                        placeholder="آدرس"
                        value={companyAddress}
                        label="آدرس"
                        errorMessage="لطفا آدرس  را وارد کنید"
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurCeoName}
                        changeInput={onChangeCeoName}
                        inputIsValid={validCeoName}
                        isTouched={hasErrorCeoName}
                        inputType="text"
                        placeholder="نام و نام خانوادگی مدیر عامل"
                        value={ceoName}
                        label="نام و نام خانوادگی مدیر عامل"
                        errorMessage="لطفا نام و نام خانوادگی مدیر عامل را وارد کنید"
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurAgentName}
                        changeInput={onChangeAgentName}
                        inputIsValid={validAgentName}
                        isTouched={hasErrorAgentName}
                        inputType="text"
                        placeholder="نام و نام خانوادگی نماینده لجستیک"
                        value={agentName}
                        label="نام و نام خانوادگی نماینده لجستیک"
                        errorMessage="لطفا نام و نام خانوادگی  نماینده لجستیک  را وارد کنید"
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurAgentPhone}
                        changeInput={onChangeAgentPhone}
                        inputIsValid={validAgentPhone}
                        isTouched={hasErrorAgentPhone}
                        inputType="number"
                        placeholder="شماره همراه نماینده "
                        value={agentPhone}
                        label="شماره همراه نماینده"
                        isLogin={false}
                        errorMessage="لطفا شماره همراه نماینده را وارد کنید"
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurAgentEmail}
                        changeInput={onChangeAgentEmail}
                        inputIsValid={validAgentEmail}
                        isTouched={hasErrorAgentEmail}
                        inputType="text"
                        placeholder="ایمیل نماینده لجستیک "
                        value={agentEmail}
                        label=" ایمیل نماینده لجستیک"
                        errorMessage="لطفا ایمیل  نماینده لجستیک را وارد کنید"
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurLicense}
                        changeInput={onChangeLicense}
                        inputIsValid={validLicense}
                        isTouched={hasErrorLicense}
                        inputType="text"
                        placeholder="فایل اساس نامه شرکت "
                        value={license}
                        errorMessage="لطفا فایل اساس نامه شرکت را وارد کنید"
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurCompanyDoc}
                        changeInput={onChangeCompanyDoc}
                        inputIsValid={validCompanyDoc}
                        isTouched={hasErrorCompanyDoc}
                        inputType="text"
                        placeholder="فایل ثبت شرکت "
                        value={companyDoc}
                        errorMessage="لطفا فایل ثبت شرکت را وارد کنید"
                    />
                    <Input
                        elementType="textarea"
                        blurInput={onBlurAbout}
                        changeInput={onChangeAbout}
                        inputIsValid={validAbout}
                        isTouched={hasErrorAbout}
                        inputType="text"
                        placeholder="درباره شرکت "
                        value={About}
                        label="درباره شرکت"
                        errorMessage="لطفا درباره شرکت چیزی بنویسید"
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurPassword}
                        changeInput={onChangePassword}
                        inputIsValid={validPassword}
                        isTouched={hasErrorPassword}
                        inputType="text"
                        placeholder="کلمه عبور "
                        value={password}
                        label="کلمه عبور"
                        errorMessage="لطفا کلمه عبور را وارد کنید"
                    />
                    <div className={classes.BottomSection}>
                        <Button
                            disabled={!formIsValid}
                            clicked={formSubmitionHandler}
                            btnStyle={{
                                padding: "2px 50px",
                                height: "40px",
                                fontWeight: "400",
                                fontSize: "16px",
                            }}
                        >
                            تایید
                        </Button>
                    </div>
                </Form>
            </Scroller>
        </div>
    );
};

export default Profile;

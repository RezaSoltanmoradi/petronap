import Image from "../../../components/profileImage/Image";
import classes from "./Profile.module.scss";
import {
    validTextInput,
    validEmail,
    validConfirmPassword,
} from "../../../helper/utils";
import useInput from "../../../hooks/useInput";
import Form from "react-bootstrap/Form";
import Input from "../../../components/UI/input/Input";
import Button from "../../../components/UI/button/Button";
import { useState } from "react";
import Alert from "../../../components/alert/Alert";
import Switch from "../../../components/switch/Switch";
import Scroller from "../../../components/scroller/Scroller";
import { useDispatch, useSelector } from "react-redux";
import { getNationality } from "src/store/user-slice";
import { NATIONALIT_CHOICES } from "src/helper/types";
import useRequest from "src/hooks/useRequest";

const Profile = () => {
    // const navigate = useNavigate();
    const [isCompleted, setIsCompleted] = useState(false);
    const { nationality, otp, type, role, accessToken ,userId} = useSelector(
        state => state.user
    );
    const { receiver: mobile } = otp;
    const dispatch = useDispatch();

    const {
        sendRequest: sendProfileData,
        data: profileData,
        error,
    } = useRequest();

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
        hasError: hasErrorCompanyId,
        inputBlurHandler: onBlurCompanyId,
        isValid: validCompanyId,
        value: companyId,
        valueChangeHandler: onChangeCompanyId,
    } = useInput(validTextInput);

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
    } = useInput();
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
        value: about,
        valueChangeHandler: onChangeAbout,
    } = useInput(validTextInput);
    const {
        hasError: hasErrorPassword,
        inputBlurHandler: onBlurPassword,
        isValid: validPassword,
        value: password,
        valueChangeHandler: onChangePassword,
    } = useInput();
    const {
        hasError: hasErrorConfirmPassword,
        inputBlurHandler: onBlurConfirmPassword,
        value: confirmPassword,
        valueChangeHandler: onChangeConfirmPassword,
    } = useInput();

    const validConfirmPasswordHandler = validConfirmPassword(
        password,
        confirmPassword
    );
    let formIsValid = false;
    const formValidation =
        validCompanyName &&
        validCompanyNationalId &&
        validCompanyId &&
        mobile &&
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
        validPassword &&
        validConfirmPasswordHandler;

    if (formValidation) {
        formIsValid = true;
    }
    const formSubmitionHandler = event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }

        sendProfileData({
            url: `trader/profile/${userId}`,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
            data: JSON.stringify({
                password: password,
                type: type.id,
                role: role.id,
                company_name: companyName,
                company_origin: nationality.id,
                company_id: companyId,
                company_national_id: companyNationalId,
                company_phone: "09195416561",
                email: "reza@gmail.com",
                mobile: mobile,
                company_fax: companyFax,
                url: emailAddress,
                company_address: companyAddress,
                ceo_name: ceoName,
                agent_name: agentName,
                agent_phone: agentPhone,
                agent_email: agentEmail,
                about: about,
                license: license,
                company_doc: companyDoc,
            }),
        }).then(data => {
            // console.log("data1", data);
            if (data) {
                setIsCompleted(true);
            }
        });
        // send request to database
    };
    console.log("profileData", profileData);
    console.log("error", error);
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
    const onChangeNationality = companyType => {
        const findNationality = NATIONALIT_CHOICES.find(
            n => n.title === companyType
        );
        dispatch(getNationality(findNationality));
    };
    return (
        <div className={classes.container}>
            <Scroller>
                <div className={classes.imageContainer}>
                    <Image />
                </div>
                <Switch
                    changeTitle={onChangeNationality}
                    option={nationality.title}
                    options={NATIONALIT_CHOICES}
                    top="100px"
                    width="280px"
                />
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
                        blurInput={onBlurCompanyId}
                        changeInput={onChangeCompanyId}
                        inputIsValid={validCompanyId}
                        isTouched={hasErrorCompanyId}
                        inputType="text"
                        placeholder="شماره ثبت"
                        value={companyId}
                        label="شماره ثبت"
                        errorMessage="لطفا شماره ثبت را وارد کنید"
                    />
                    <Input
                        elementType="select"
                        inputType="number"
                        placeholder="شماره تلفن"
                        value={mobile}
                        inputIsValid={mobile}
                        label="شماره تلفن"
                        isLogin={false}
                        errorMessage="لطفا شماره تلفن  را وارد کنید"
                    >
                        <span className={classes.innerIcon}>
                            {mobile ? (
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
                        placeholder="نام و نام خانوادگی نماینده "
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
                    >
                        <div className={classes.innerIcon}>
                            {license ? (
                                <div className="icon icon-md i-completed" />
                            ) : (
                                <div className="icon icon-md i-plus" />
                            )}
                        </div>
                    </Input>
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
                    >
                        <div className={classes.innerIcon}>
                            {companyDoc ? (
                                <div className="icon icon-md i-completed" />
                            ) : (
                                <div className="icon icon-md i-plus" />
                            )}
                        </div>
                    </Input>
                    <Input
                        elementType="textarea"
                        blurInput={onBlurAbout}
                        changeInput={onChangeAbout}
                        inputIsValid={validAbout}
                        isTouched={hasErrorAbout}
                        inputType="text"
                        placeholder="درباره شرکت "
                        value={about}
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
                    <Input
                        elementType="input"
                        blurInput={onBlurConfirmPassword}
                        changeInput={onChangeConfirmPassword}
                        inputIsValid={validConfirmPasswordHandler}
                        isTouched={hasErrorConfirmPassword}
                        inputType="text"
                        placeholder=" تکرار کلمه عبور "
                        value={confirmPassword}
                        label="تکرار کلمه عبور"
                        errorMessage="تکرار کلمه ی عبور صحیح نمیباشد"
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

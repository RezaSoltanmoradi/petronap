import Image from "../../../components/profileImage/Image";
import classes from "./Profile.module.scss";

import Form from "react-bootstrap/Form";
import Input from "../../../components/UI/input/Input";
import { useEffect, useState } from "react";
import Scroller from "../../../components/scroller/Scroller";
import { useSelector } from "react-redux";
import useRequest from "src/hooks/useRequest";
import Notification from "src/components/notification/Notification";

const ViewProfile = () => {
    const { accessToken } = useSelector(state => state.user);
    const {
        sendRequest: getProfileData,
        error: profileError,
        data: profileData,
    } = useRequest();

    const [formData, setFormData] = useState({
        companyName: "",
        companyPhone: "",
        companyNationalId: "",
        companyId: "",
        companyFax: "",
        Url: "",
        emailAddress: "",
        companyAddress: "",
        ceoName: "",
        agentName: "",
        agentPhone: "",
        agentEmail: "",
        about: "",
        companyDocFile: "",
        licenseFile: "",
        profilePicture: "",
        mobile: "",
    });
    useEffect(() => {
        if (accessToken) {
            getProfileData({
                url: `producer/profile/`,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
        }
    }, []);

    useEffect(() => {
        if (profileData) {
            console.log("profile", profileData);
            setFormData({
                companyName: profileData.company_name,
                companyAddress: profileData.company_address,
                Url: profileData.url,
                about: profileData.about,
                agentEmail: profileData.agent_email,
                agentName: profileData.agent_name,
                agentPhone: profileData.agent_phone,
                ceoName: profileData.ceo_name,
                companyDocFile: profileData.company_doc_file,
                companyFax: profileData.company_fax,
                companyId: profileData.company_id,
                companyNationalId: profileData.company_national_id,
                companyPhone: profileData.company_phone,
                emailAddress: profileData.company_address,
                licenseFile: profileData.license_file,
                profilePicture: profileData.profile_picture_file,
                mobile: profileData.mobile,
            });
        }
    }, [profileData]);
    const {
        companyName,
        companyAddress,
        Url,
        about,
        agentEmail,
        agentName,
        agentPhone,
        ceoName,
        companyDocFile,
        companyFax,
        companyId,
        companyNationalId,
        companyPhone,
        emailAddress,
        licenseFile,
        profilePicture,
        mobile,
    } = formData;
    return (
        <div className={classes.container}>
            {profileError && <Notification message={profileError} />}
            <Scroller>
                <div className={classes.imageContainer}>
                    <Image view={true} image={profilePicture} />
                </div>
                <Form
                    className={classes.Form}
                    onSubmit={e => e.preventDefault()}
                >
                    <Input
                        elementType="select"
                        inputType="text"
                        placeholder="?????? ????????"
                        value={companyName}
                        inputIsValid={companyName}
                        label="?????? ????????"
                    />
                    <Input
                        elementType="select"
                        inputType="number"
                        placeholder="?????????? ??????"
                        value={companyNationalId}
                        inputIsValid={companyNationalId}
                        label="?????????? ??????"
                    />
                    <Input
                        elementType="select"
                        inputType="number"
                        placeholder="?????????? ??????"
                        value={companyId}
                        inputIsValid={companyId}
                        label="?????????? ??????"
                    />
                    <Input
                        elementType="select"
                        inputType="number"
                        placeholder="?????????? ??????????"
                        value={mobile}
                        inputIsValid={mobile}
                        label="?????????? ??????????"
                        isLogin={false}
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
                        elementType="select"
                        inputType="number"
                        placeholder="?????????? ????????"
                        value={companyPhone}
                        inputIsValid={companyPhone}
                        label="?????????? ????????"
                        isLogin={false}
                    />
                    <Input
                        elementType="select"
                        inputType="number"
                        placeholder="?????????? ??????"
                        value={companyFax}
                        inputIsValid={companyFax}
                        label="?????????? ??????"
                        isLogin={false}
                    />
                    <Input
                        elementType="select"
                        inputType="text"
                        placeholder="?????????? ????????????????"
                        value={Url}
                        inputIsValid={Url}
                        label="?????????? ????????????????"
                    />
                    <Input
                        elementType="select"
                        inputType="text"
                        placeholder="?????????? ????????"
                        value={emailAddress}
                        inputIsValid={emailAddress}
                        label="?????????? ????????"
                    />
                    <Input
                        elementType="textarea-readonly"
                        inputType="text"
                        placeholder="????????"
                        value={companyAddress}
                        inputIsValid={companyAddress}
                        label="????????"
                    />
                    <Input
                        elementType="select"
                        inputType="text"
                        placeholder="?????? ?? ?????? ???????????????? ???????? ????????"
                        value={ceoName}
                        inputIsValid={ceoName}
                        label="?????? ?? ?????? ???????????????? ???????? ????????"
                    />
                    <Input
                        elementType="select"
                        inputType="text"
                        placeholder="?????? ?? ?????? ???????????????? ?????????????? ????????????"
                        value={agentName}
                        inputIsValid={agentName}
                        label="?????? ?? ?????? ???????????????? ?????????????? ????????????"
                    />
                    <Input
                        elementType="select"
                        inputType="number"
                        placeholder="?????????? ?????????? ?????????????? "
                        value={agentPhone}
                        inputIsValid={agentPhone}
                        label="?????????? ?????????? ??????????????"
                        isLogin={false}
                    />
                    <Input
                        elementType="select"
                        inputType="text"
                        placeholder="?????????? ?????????????? ???????????? "
                        value={agentEmail}
                        inputIsValid={agentEmail}
                        label=" ?????????? ?????????????? ????????????"
                    />
                    <Input
                        elementType="select"
                        inputIsValid={licenseFile}
                        inputType="text"
                        value={licenseFile ? "???????? ???????? ???????? ???????? " : ""}
                        label={licenseFile ? "" : "???????? ???????? ???????? ???????? "}
                        placeholder="???????? ???????? ???????? ???????? "
                    >
                        <div className={classes.innerIcon}>
                            {licenseFile ? (
                                <div className="icon icon-md i-completed" />
                            ) : (
                                <div className="icon icon-md i-plus" />
                            )}
                        </div>
                    </Input>
                    <Input
                        elementType="select"
                        inputIsValid={companyDocFile}
                        inputType="text"
                        placeholder="???????? ?????? ????????"
                        label={companyDocFile ? "" : "???????? ?????? ????????"}
                        value={companyDocFile ? "???????? ?????? ????????" : ""}
                    >
                        <span className={classes.innerIcon}>
                            {companyDocFile ? (
                                <div className="icon icon-md i-completed" />
                            ) : (
                                <div className="icon icon-md i-plus" />
                            )}
                        </span>
                    </Input>
                    <Input
                        elementType="textarea-readonly"
                        inputType="text"
                        placeholder="???????????? ???????? "
                        value={about}
                        inputIsValid={about}
                        label="???????????? ????????"
                    />
                </Form>
            </Scroller>
        </div>
    );
};

export default ViewProfile;

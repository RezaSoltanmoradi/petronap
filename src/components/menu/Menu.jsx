import classes from "./Menu.module.scss";
import Backdrop from "../UI/Backdrop/Backdrop";
import { imageHandler } from "src/helper/baseUrls";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Logout from "../logout/Logout";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
const Menu = ({ show, setShow }) => {
    const [animation, setAnimation] = useState(false);
    const { otp, oldRole } = useSelector(state => state.user);
    const { profilePicture, companyName } = otp;
    const navigate = useNavigate();
    const { traderId, producerId, freightId } = useParams();
    useEffect(() => {
        if (!show) {
            setTimeout(() => {
                setAnimation(false);
            }, 300);
        } else {
            setAnimation(true);
        }
    }, [show]);
    const profileInfoHandler = () => {
        setShow(false);
        navigate(`/${oldRole.name}/view-profile`);
    };
    const changePasswordHandler = () => {
        setShow(false);
        navigate(`/${oldRole.name}/change-password`);
    };
    const activeProfile = [traderId, producerId, freightId].find(
        p => p === "view-profile"
    );
    const activePassword = [traderId, producerId, freightId].find(
        p => p === "change-password"
    );
    return (
        <>
            {show && (
                <Backdrop closeModal={() => setShow(false)} showModal={show} />
            )}
            {animation && (
                <div className={classes.Menu}>
                    <div
                        className={classNames({
                            [classes.MenuContainer]: true,
                            [classes.openMenu]: show,
                            [classes.closeMenu]: !show,
                        })}
                    >
                        <div className={classes.titleContainer}>
                            {profilePicture ? (
                                <div className={classes.ImageContainer}>
                                    <img
                                        alt=""
                                        src={imageHandler(profilePicture)}
                                    />
                                </div>
                            ) : (
                                <div className="icon icon-lg i-user-circle" />
                            )}
                            <h5 className={classes.title}>
                                {!companyName ? "" : companyName}
                            </h5>
                        </div>
                        <ul className={classes.MenuItems}>
                            {oldRole.id !== "0" && (
                                <>
                                    <li
                                        className={classNames({
                                            [classes.Item]: true,
                                            [classes.Active]: activeProfile,
                                        })}
                                        onClick={profileInfoHandler}
                                    >
                                        {activeProfile ? (
                                            <span className="icon icon-sm i-user-info-active mx-1" />
                                        ) : (
                                            <span className="icon icon-sm i-user-info mx-1" />
                                        )}
                                        اطلاعات کاربری
                                    </li>
                                    <li
                                        className={classNames({
                                            [classes.Item]: true,
                                            [classes.Active]: activePassword,
                                        })}
                                        onClick={changePasswordHandler}
                                    >
                                        {activePassword ? (
                                            <span className="icon icon-sm i-password-active mx-1" />
                                        ) : (
                                            <span className="icon icon-sm i-password mx-1" />
                                        )}
                                        ویرایش کلمه عبور
                                    </li>
                                </>
                            )}
                            <li
                                className={classes.Item}
                                onClick={() => Logout()}
                            >
                                <span className="icon icon-sm i-logout mx-1" />
                                خروج
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default Menu;

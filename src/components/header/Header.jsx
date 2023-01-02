import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import classes from "./Header.module.scss";

import { imageHandler } from "src/helper/baseUrls";
import { showUploadModal } from "src/store/uploadFile-slice";
import Menu from "../menu/Menu";
import { useState } from "react";

const Header = () => {
    const { traderId, freightId, producerId, orderId, offerId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const { uploadFiles } = useSelector(state => state.upload);
    const profilePictureFile = uploadFiles?.profilePictureFile ?? "";
    const { profilePicture } = useSelector(state => state.user.otp);

    const validOffers = location.pathname.includes("offers");
    const validOrders =
        (traderId === "orders" || producerId === "orders") && !validOffers;

    const validProfile =
        (traderId === "profile" ||
            freightId === "profile" ||
            producerId === "profile") &&
        !validOffers;

    let title;
    if (validProfile) {
        title = "پروفایل";
    } else if (
        orderId === "new" &&
        (traderId === "orders" || producerId === "orders")
    ) {
        title = "ثبت سفارش";
    } else if (validOrders || freightId === "offers") {
        title = "فعالیت های اخیر";
    } else if (freightId === "orders" && !orderId) {
        title = "بارهای موجود";
    } else if (freightId === "orders" && orderId) {
        title = "جزئیات بار";
    } else if ((!producerId || !traderId || !freightId) && validProfile) {
        title = "پترونپ";
    } else if (validOffers && !offerId) {
        title = "پیشنهادات";
    } else if (typeof offerId !== "undefined") {
        title = "جزئیات پیشنهاد";
    }

    const backRouteHandler = () => {
        navigate(-1);
        dispatch(showUploadModal());
    };
    return (
        <>
            <header className={classes.Header}>
                {!profilePictureFile && !profilePicture ? (
                    <span
                        className="icon i-user-circle icon-lg"
                        onClick={() => {
                            setShowMenu(true);
                        }}
                    />
                ) : (
                    <img
                        onClick={() => {
                            setShowMenu(true);
                        }}
                        className={classes.Image}
                        alt=""
                        src={imageHandler(
                            !profilePictureFile
                                ? profilePicture
                                : profilePictureFile
                        )}
                    />
                )}
                <p className={classes.title}>{title}</p>
                <span
                    className="icon i-back icon-md"
                    onClick={backRouteHandler}
                />
            </header>
            <Menu show={showMenu} setShow={setShowMenu} />
        </>
    );
};

export default Header;

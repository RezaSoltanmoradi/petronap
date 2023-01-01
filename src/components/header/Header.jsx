import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import classes from "./Header.module.scss";
import { logout } from "src/store/user-slice";
import { imageHandler } from "src/helper/baseUrls";
import { resetUploader, showUploadModal } from "src/store/uploadFile-slice";

const Header = () => {
    const { traderId, freightId, producerId, orderId, offerId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { oldRole, role } = useSelector(state => state.user);
    const { uploadFiles } = useSelector(state => state.upload);
    const profilePictureFile = uploadFiles?.profilePictureFile ?? "";

    const validOffers = location.pathname.includes("offers");
    const validOrders =
        (traderId === "orders" ||
            producerId === "orders") &&
        !validOffers;
   
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
    } else if (validOrders ||( freightId==='offers')) {
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
    const changeRouteHandler = () => {
        // if (oldRole.id === "0") {
        //     navigate(`/${role.name}/profile`);
        // } else {
        //     return;
        // }
        dispatch(logout());
        dispatch(resetUploader());
    };
    const backRouteHandler = () => {
        navigate(-1);
        dispatch(showUploadModal());
    };
    return (
        <header className={classes.Header}>
            {!profilePictureFile ? (
                <span
                    className="icon i-user-circle icon-lg"
                    onClick={changeRouteHandler}
                />
            ) : (
                <img
                    className={classes.Image}
                    alt=""
                    src={imageHandler(profilePictureFile)}
                />
            )}
            <p className={classes.title}>{title}</p>
            <span className="icon i-back icon-md" onClick={backRouteHandler} />
        </header>
    );
};

export default Header;

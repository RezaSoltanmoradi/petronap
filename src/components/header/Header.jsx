import { useNavigate, useParams } from "react-router";
import classes from "./Header.module.scss";

const Header = () => {
    const { traderId, freightId, producerId, orderId } = useParams();
    const navigate = useNavigate();

    let title;
    if (
        traderId === "profile" ||
        freightId === "profile" ||
        producerId === "profile"
    ) {
        title = "پروفایل";
    } else if (
        orderId === "new" &&
        (traderId === "orders" ||
            freightId === "orders" ||
            producerId === "orders")
    ) {
        title = "ثبت سفارش";
    } else if (
        traderId === "orders" ||
        freightId === "orders" ||
        producerId === "orders"
    ) {
        title = "سفارشات";
    }
    return (
        <header className={classes.Header}>
            <span
                className="icon i-user-circle icon-lg"
                onClick={() => navigate("/trader/profile")}
            />
            <p className={classes.title}>{title}</p>
            <span
                className="icon i-back icon-md"
                onClick={() => navigate(-1)}
            />
        </header>
    );
};

export default Header;

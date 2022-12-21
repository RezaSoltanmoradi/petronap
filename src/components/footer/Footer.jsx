import classNames from "classnames";
import { useSelector } from "react-redux";
import classes from "./Footer.module.scss";
import { useNavigate, useParams } from "react-router";

const Footer = () => {
    const { role, oldRole } = useSelector(state => state.user);
    const navigate = useNavigate();
    const { orderId, traderId, producerId, freightId } = useParams();

    const newOrderPathHandler = () => {
        if (oldRole.id === "0") return;
        navigate({ pathname: `/${oldRole.name}/orders/new` });
    };
    const recentActivityHandlre = () => {
        if (oldRole.id === "0") return;
        navigate({ pathname: `/${oldRole.name}/orders` });
    };
    const newBarPathHandler = () => {
        if (oldRole.id === "0") return;
        console.log("go to new bar");
    };
    if (
        role.name === "producer" ||
        oldRole.name === "producer" ||
        role.name === "trader" ||
        oldRole.name === "trader"
    ) {
        return (
            <footer
                className={classNames({
                    [classes.Footer]: true,
                })}
            >
                <span
                    className={classes.orderIcon}
                    onClick={newOrderPathHandler}
                >
                    <span
                        className={classNames({
                            "icon icon-md i-plus": true,
                            "icon icon-md i-plus-active":
                                orderId === "new" &&
                                (traderId === "orders" ||
                                    producerId === "orders"),
                        })}
                    />
                    <p>ثبت سفارش</p>
                </span>
                <span
                    className={classes.hoursIcon}
                    onClick={recentActivityHandlre}
                >
                    <span
                        className={classNames({
                            "icon icon-md i-hours ": true,
                            "icon icon-md i-hours-active ":
                                (traderId === "orders" ||
                                    producerId === "orders") &&
                                orderId !== "new",
                        })}
                    />
                    <p>فعالیت های اخیر</p>
                </span>
            </footer>
        );
    } else if (role.name === "freight" || oldRole.name === "freight") {
        return (
            <footer
                className={classNames({
                    [classes.Footer]: true,
                })}
            >
                <span className={classes.orderIcon} onClick={newBarPathHandler}>
                    <span
                        className={classNames({
                            "icon icon-md i-bar-active": orderId === "new",
                            "icon icon-md i-bar": orderId !== "new",
                        })}
                    />
                    <p>بارهای موجود</p>
                </span>
                <span
                    className={classes.hoursIcon}
                    onClick={recentActivityHandlre}
                >
                    <span
                        className={classNames({
                            "icon icon-md i-hours ": true,
                            "icon icon-md i-hours-active ":
                                freightId === "orders" && orderId !== "new",
                        })}
                    />
                    <p>فعالیت های اخیر</p>
                </span>
            </footer>
        );
    }
};

export default Footer;

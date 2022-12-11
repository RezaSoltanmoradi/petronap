import classNames from "classnames";
import { useSelector } from "react-redux";
import classes from "./Footer.module.scss";
import { useNavigate, useParams } from "react-router";
const Footer = () => {
    const { role } = useSelector(state => state.user);
    const navigate = useNavigate();
    const { orderId, traderId } = useParams();
    console.log("orderId", orderId);
    console.log("traderId", traderId);
    if (role.name === "producer" || role.name === "trader") {
        return (
            <footer
                className={classNames({
                    [classes.Footer]: true,
                })}
            >
                <span
                    className={classes.orderIcon}
                    onClick={() => navigate({ pathname: `/trader/orders/new` })}
                >
                    <span
                        className={classNames({
                            "icon icon-md i-plus": traderId === "orders",
                            "icon icon-md i-plus-active":
                                orderId === "new" && traderId === "orders",
                        })}
                    />
                    <p>ثبت سفارش</p>
                </span>
                <span
                    className={classes.hoursIcon}
                    onClick={() =>
                        navigate({
                            pathname: "/trader/orders",
                        })
                    }
                >
                    <span
                        className={classNames({
                            "icon icon-md i-hours ": traderId === "orders",
                            "icon icon-md i-hours-active ":
                                traderId === "orders" && !orderId,
                        })}
                    />
                    <p>فعالیت های اخیر</p>
                </span>
            </footer>
        );
    } else if (role.name === "freight") {
        return (
            <footer
                className={classNames({
                    [classes.Footer]: true,
                })}
            >
                <span
                    className={classes.orderIcon}
                    onClick={() =>
                        navigate({ pathname: `/${role.name}/order` })
                    }
                >
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
                    onClick={() =>
                        navigate({ pathname: `/${role.name}/offers` })
                    }
                >
                    <span className="icon icon-md i-hours " />
                    <p>فعالیت های اخیر</p>
                </span>
            </footer>
        );
    }
};

export default Footer;

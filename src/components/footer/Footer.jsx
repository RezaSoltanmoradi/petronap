import classNames from "classnames";
import { useSelector } from "react-redux";
import classes from "./Footer.module.scss";
import { useNavigate, useParams } from "react-router";
const Footer = () => {
    const { role } = useSelector(state => state.user);
    const navigate = useNavigate();
    const { traderId, freightId, producerId } = useParams();
    if (role.name === "producer" || role.name === "trader") {
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
                            "icon icon-md i-plus-active":
                                traderId === "order" || producerId === "order",
                            "icon icon-md i-plus":
                                traderId !== "order" || producerId !== "order",
                        })}
                    />
                    <p>ثبت سفارش</p>
                </span>
                <span className={classes.hoursIcon}>
                    <span className="icon icon-md i-hours " />
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
                            "icon icon-md i-bar-active": freightId === "order",
                            "icon icon-md i-bar": freightId !== "order",
                        })}
                    />
                    <p>بارهای موجود</p>
                </span>
                <span className={classes.hoursIcon}>
                    <span className="icon icon-md i-hours " />
                    <p>فعالیت های اخیر</p>
                </span>
            </footer>
        );
    }
};

export default Footer;

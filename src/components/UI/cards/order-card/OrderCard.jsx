import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Button from "../../button/Button";
import persian from "react-date-object/calendars/persian";
import { persian_fa } from "react-date-object/locales/persian_fa";
import { gregorian } from "react-date-object/calendars/gregorian";
import classes from "./OrderCard.module.scss";
import { DateObject } from "react-multi-date-picker";
import { imageHandler } from "src/helper/baseUrls";
import classNames from "classnames";

const OrderCard = ({
    loadingLocation,
    destination,
    borderPassage,
    product,
    weight,
    orderId,
    loadingDate,
    btnText,
    companyName,
    image,
}) => {
    const navigate = useNavigate();
    const { oldRole } = useSelector(state => state.user);
    const convertDate = new DateObject({
        calendar: gregorian,
        date: loadingDate,
    })
        .convert(persian, persian_fa)
        .format();
    const cardDetailHandler = () => {
        console.log("oldrole", oldRole);
        if (oldRole.id === "2") {
            navigate(`/${oldRole.name}/orders/${orderId}`);
        } else {
            navigate(`/${oldRole.name}/orders/${orderId}/offers`);
        }
    };
    return (
        <section
            className={classNames({
                [classes.OrderCard]: true,
                [classes.hasNoTitle]: !companyName || !image,
                [classes.hasTitle]: image || companyName,
            })}
            onClick={cardDetailHandler}
        >
            {(companyName || image) && (
                <div className={classes.titleContainer}>
                    {image ? (
                        <div className={classes.ImageContainer}>
                            <img alt="" src={imageHandler(image)} />
                        </div>
                    ) : (
                        <div className="icon icon-lg i-user-circle"></div>
                    )}
                    <h5 className={classes.title}>{companyName}</h5>
                </div>
            )}
            <div className={classes.OrderContainer}>
                <div className={classes.ProductDetail}>
                    <div className={classes.text}>
                        <span className="icon icon-sm i-fillCircle mx-1" />
                        مبدا:
                        {loadingLocation}
                    </div>
                    <div className={classes.text}>
                        <span className="icon icon-sm i-direction mx-1" />
                        گذرگاه مرزی:
                        {borderPassage}
                    </div>
                    <div className={classes.text}>
                        <span className="icon icon-sm i-circle mx-1" />
                        مقصد:
                        {destination}
                    </div>
                </div>
                <div className={classes.Product}>
                    <div className={classes.text}>
                        <span className="icon icon-sm i-box mx-1" />
                        {product}
                    </div>
                    <div className={classes.text}>
                        <span className="icon icon-sm i-weight mx-1" />
                        {weight} تن
                    </div>
                    <div className={classes.text}>
                        <span className="icon icon-sm i-calender-sm mx-1" />
                        {convertDate}
                    </div>
                </div>
            </div>
            <div className={classes.Button}>
                <Button
                    btnStyle={{
                        width: "309px",
                        height: "24px",
                        fontSize: "16px",
                    }}
                >
                    {btnText}
                </Button>
            </div>
        </section>
    );
};

export default OrderCard;

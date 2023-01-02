import { DateObject } from "react-multi-date-picker";
import classes from "./SingleOrder.module.scss";
import persian from "react-date-object/calendars/persian";
import { persian_fa } from "react-date-object/locales/persian_fa";
import { gregorian } from "react-date-object/calendars/gregorian";

const SingleOrder = ({
    loadingLocation,
    destination,
    borderPassage,
    product,
    weight,
    loadingDate,
    top,
}) => {
    const convertDate = new DateObject({
        calendar: gregorian,
        date: loadingDate,
    })
        .convert(persian, persian_fa)
        .format();

    return (
        <section className={classes.SingleOrder} style={{ top }}>
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
        </section>
    );
};

export default SingleOrder;

import classes from "./SingleOrder.module.scss";
const SingleOrder = ({
    loadingLocation,
    destination,
    borderPassage,
    product,
    weight,
    top,
}) => {
    return (
        <section className={classes.SingleOrder} style={{top}}>
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
                        {weight}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SingleOrder;

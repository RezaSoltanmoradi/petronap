import Button from "../../button/Button";
import classes from "./OrderCard.module.scss";
const OrderCard = ({
    loadingLocation,
    destination,
    borderPassage,
    product,
    weight,
    offersNumber,
}) => {
    
    return (
        <section
            className={classes.OrderCard}
            onClick={() => console.log("hi card")}
        >
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
            <div className={classes.Button}>
                <Button
                    btnStyle={{
                        width: "118px",
                        height: "24px",
                        fontSize: "16px",
                    }}
                >
                    {offersNumber} پیشنهاد
                </Button>
            </div>
        </section>
    );
};

export default OrderCard;

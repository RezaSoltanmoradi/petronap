import classes from "./OfferCard.module.scss";
import Button from "./../../button/Button";
import { useNavigate } from "react-router";
import { imageHandler } from "src/helper/baseUrls";
const OfferCard = ({
    offerId,
    prepayment,
    prepaymentPercentage,
    offerPrice,
    companyName,
    image,
}) => {
    const navigate = useNavigate();
    return (
        <section className={classes.OfferCard}>
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
            <div className={classes.PriceContainer}>
                <div className={classes.label}>
                    <div className="icon icon-sm i-offer mx-1" />
                    قیمت پیشنهادی
                </div>
                <div className={classes.price}>
                    {offerPrice.toLocaleString(3)} تومان
                </div>
            </div>
            <div className={classes.PriceContainer}>
                <div className={classes.label}>
                    <div className="icon icon-sm i-payment mx-1" />
                    پیش پرداخت
                </div>
                <div className={classes.price}>
                    {prepaymentPercentage}%
                    <span className={classes.innerPrice}>
                        ({prepayment.toLocaleString(3)} تومان)
                    </span>
                </div>
            </div>
            <div className={classes.Button}>
                <Button
                    clicked={() => navigate(`${offerId}`)}
                    btnStyle={{
                        width: "296px",
                        height: "24px",
                        fontSize: "16px",
                    }}
                >
                    مشاهده بیشتر
                </Button>
            </div>
        </section>
    );
};

export default OfferCard;

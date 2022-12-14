import classes from "./DetailCard.module.scss";
import Button from "./../../button/Button";
import { useNavigate } from "react-router";
const DetailCard = ({
    detailId,
    prepayment,
    prepaymentpercentage,
    offerPrice,
    companyName,
    about,
}) => {
    const navigate = useNavigate();
    return (
        <section className={classes.DetailCard}>
            <div className={classes.titleContainer}>
                <div className={classes.ImageContainer}>
                    <img alt="" src="" />
                </div>
                <h5 className={classes.title}>{companyName}</h5>
            </div>
            <div className={classes.fildset}>
                <div className={classes.border} />
                <p className={classes.label}>قیمت</p>
            </div>
            <div className={classes.PriceContainer}>
                <div className={classes.label}>
                    <div className="icon icon-sm i-offer mx-1" />
                    قیمت پیشنهادی
                </div>
                <div className={classes.price}>{offerPrice} تومان</div>
            </div>
            <div className={classes.PriceContainer}>
                <div className={classes.label}>
                    <div className="icon icon-sm i-payment mx-1" />
                    پیش پرداخت
                </div>
                <div className={classes.price}>
                    {prepaymentpercentage}
                    <span className={classes.innerPrice}>
                        ({prepayment} تومان)
                    </span>
                </div>
            </div>
            <div className={classes.Button}>
                <Button
                    clicked={() => navigate(`${detailId}`)}
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

export default DetailCard;

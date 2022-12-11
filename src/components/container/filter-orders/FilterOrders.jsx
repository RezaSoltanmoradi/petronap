import classes from "./FilterOrders.module.scss";
import { ORDERS_STATUS_CHOICES } from "src/helper/types";
import classNames from "classnames";

const FilterOrders = ({ ordersStatus, filterOrders }) => {
    return (
        <div className={classes.FilterOrders}>
            {ORDERS_STATUS_CHOICES.map(status => (
                <div
                    key={status.id}
                    onClick={() => filterOrders(status)}
                    className={classNames({
                        [classes.status]: true,
                        [classes.ActiveStatus]: status.id === ordersStatus.id,
                        [classes.notActiveStatus]: status.id !== ordersStatus.id,
                    })}
                >
                    {status.title}
                </div>
            ))}
        </div>
    );
};

export default FilterOrders;

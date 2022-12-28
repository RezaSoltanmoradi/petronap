import classes from "./FilterOrdersDate.module.scss";
import classNames from "classnames";
import persian from "react-date-object/calendars/persian";
import { persian_fa } from "react-date-object/locales/persian_fa";
import { gregorian } from "react-date-object/calendars/gregorian";
import { DateObject } from "react-multi-date-picker";
import { getDay } from "src/helper/utils";

const FilterOrdersDate = ({ ordersStatus, filterOrdersDate }) => {
    const date = new Date();

    const yesterday = new DateObject({
        calendar: gregorian,
        date: date,
    }).convert(persian, persian_fa);

    const today = new DateObject({
        calendar: gregorian,
        date: date,
    }).convert(persian, persian_fa);

    const convertDate = today.format();

    const tomarow = new DateObject({
        calendar: gregorian,
        date: date,
    }).convert(persian, persian_fa);
    const dates = [
        {
            date: yesterday.add(-1, "day").format(),
            title: `${getDay(yesterday.format("dddd"))}`,
            id: "0",
        },
        {
            date: today.format(),
            title: `${getDay(today.format("dddd"))}${convertDate}`,
            id: "1",
        },
        {
            date: tomarow.add(1, "day").format(),
            title: `${getDay(tomarow.format("dddd"))}`,
            id: "2",
        },
    ];
    const changeOrderDate = date => {
        filterOrdersDate(date);
    };
    return (
        <div className={classes.FilterOrders}>
            {dates.map(status => (
                <div
                    key={status.id}
                    onClick={() => changeOrderDate(status.date)}
                    className={classNames({
                        [classes.status]: true,
                        [classes.ActiveStatus]: status.date === ordersStatus,
                        [classes.notActiveStatus]: status.date !== ordersStatus,
                    })}
                >
                    {status.title}
                </div>
            ))}
        </div>
    );
};

export default FilterOrdersDate;

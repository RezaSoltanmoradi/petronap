import classes from "./FilterOrigin.module.scss";
import { ORDERS_NATIONALITY } from "src/helper/types";
import classNames from "classnames";

const FilterOrigin = ({ originStatus, filterOrigin }) => {
    return (
        <div className={classes.FilterOrigin}>
            {ORDERS_NATIONALITY.map(status => (
                <div
                    key={status.id}
                    onClick={() => filterOrigin(status)}
                    className={classNames({
                        [classes.status]: true,
                        [classes.ActiveStatus]: status.id === originStatus.id,
                        [classes.notActiveStatus]:
                            status.id !== originStatus.id,
                    })}
                >
                    {status.title}
                </div>
            ))}
        </div>
    );
};

export default FilterOrigin;

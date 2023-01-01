import "./FilterByPrecentage.scss";

const FilterByPrice = ({ FilterByPrecentage, precentage, maxValue }) => {
    const MAX = 100;
    const getBackgroundSize = () => {
        return {
            backgroundSize: `${(precentage * 100) / MAX}% 100%`,
        };
    };
    const onChangeRange = e => {
        if (e.target.value < maxValue) {
            FilterByPrecentage(e.target.value);
        } else {
            FilterByPrecentage(maxValue);
        }
    };
    return (
        <>
            <div className="logoContainer">
                <p className="logo" style={{ left: `${precentage - 17}%` }}>
                    {precentage} %
                </p>
            </div>
            <div className="container">
                <input
                    type="range"
                    min="0"
                    max={MAX}
                    onChange={onChangeRange}
                    style={getBackgroundSize()}
                    className="input-range"
                    value={precentage}
                />
            </div>
        </>
    );
};

export default FilterByPrice;

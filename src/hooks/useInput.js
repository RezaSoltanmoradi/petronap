import { useReducer } from "react";
const types = {
    input: "INPUT",
    blur: " BLUR",
};
const defaultState = {
    value: "",
    isTouched: false,
};
const inputStateReducer = (state, action) => {
    switch (action.type) {
        case types.input:
            return {
                value: action.value,
                isTouched: state.isTouched,
            };
        case types.blur:
            return {
                value: state.value,
                isTouched: true,
            };
        default:
            return {
                defaultState,
            };
    }
};
const useInput = (validateValue, maxLength) => {
    const [inputState, dispatchInputState] = useReducer(
        inputStateReducer,
        defaultState
    );
    let valueIsValid = false;
    if (!validateValue) {
        valueIsValid = true;
    } else if (validateValue) {
        valueIsValid = validateValue(inputState.value);
    }
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = event => {
        if (event.target.value.length > maxLength) {
            return;
        }
        dispatchInputState({
            type: types.input,
            value: event.target.value,
        });
    };
    const setDefaultInputValue = value => {
        dispatchInputState({
            type: types.input,
            value: value,
        });
    };
    const inputBlurHandler = () => {
        dispatchInputState({ type: types.blur });
    };

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        defaultValue: setDefaultInputValue,
    };
};
export default useInput;

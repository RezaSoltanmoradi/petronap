export const validPassword = value => value.length >= 4;
export const validUserCode = value => value.length === 4;

export const validPhone = value => {
    let regex;
    if (value.length === 11) {
        regex = new RegExp(/^(0)\d{10}$/);
    } else if (value.length === 10) {
        regex = new RegExp(/^(9)\d{9}$/);
    }
    return regex?.test(value);
};
export const validUserName = function (value) {
    let regex;
    if (value.length === 11) {
        regex = new RegExp(/^(0)\d{10}$/);
    } else if (value.length === 10) {
        regex = new RegExp(/^(9)\d{9}$/);
    }
    const validPhone = regex?.test(value);

    var validEmail =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const validInput = value.match(validEmail) || validPhone;
    return validInput;
};

export const validEmail = value => {
    var validEmail =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return value.match(validEmail);
};
export const validTextInput = value => value.length >= 4;

export const validConfirmPassword = (password, confirmPassword) => {
    let value;
    if (password) {
        value = password === confirmPassword;
    } else {
        value = true;
    }
    return value;
};
export const errorMessageConfig = error => {
    let message;

    switch (error) {
        case 0:
            message = "دسترسی شما به شبکه قطع شد!";
            break;
        case 400:
            message = "خطای اطلاعات وارد شده!";
            break;
        case 401:
            message = " شما احراز هویت نشدید, لطفا مجدد وارد شوید!";
            break;
        case 403:
            message =
                "احراز هویت شما مشکل دارد, لطفا خارج شده و دوباره وارد شوید!";
            break;
        case 404:
            message = "چیزی پیدا نشد!";
            break;
        case 405:
            message =
                "درخواست شمااشتباه میباشد, لطفا درخواست خود را تغییر دهید!";
            break;
        case 422:
            message = "مشکل پردازش فرایند رخ داده است!";
            break;
        case 500:
            message = " سرور با مشکلی روبه رو شد !";
            break;
        case 503:
            message = " سرور با مشکلی روبه رو شد !";
            break;

        default:
            message = error;
    }
    return message;
};

export const validPassword = value => value.length >= 4;
export const validUserCode = value => value.length === 4;

export const validPhone = value => {
    let regex;
    if (value.length === 11) {
        regex = new RegExp(/^(09)\d{9}$/);
    } else if (value.length === 10) {
        regex = new RegExp(/^(9)\d{9}$/);
    } else if (value.length === 12) {
        regex = new RegExp(/^(989)\d{9}$/);
    }
    return regex?.test(value);
};
export const validUserName = function (value) {
    let regex;
    if (value.length === 11) {
        regex = new RegExp(/^(09)\d{9}$/);
    } else if (value.length === 10) {
        regex = new RegExp(/^(9)\d{9}$/);
    } else if (value.length === 12) {
        regex = new RegExp(/^(989)\d{9}$/);
    }
    const validPhone = regex?.test(value);

    var validEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validInput = value.match(validEmail) || validPhone;
    return validInput;
};

export const validEmail = value => {
    var validEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return value.match(validEmail);
};
export const validTextInput = value => value.length > 0;

export const validConfirmPassword = (password, confirmPassword) => {
    let value;
    if (password) {
        value = password === confirmPassword;
    } else if (!password && confirmPassword) {
        value = false;
    } else {
        value = true;
    }
    return value;
};
export const getDay = day => {
    let days = {
        Saturday: "شنبه",
        Sunday: "یکشنبه",
        Monday: "دوشنبه",
        Tuesday: "سه شنبه",
        Wednesday: "چهارشنبه",
        Thursday: "پنجشنبه",
        Friday: "جمعه",
    };
    return days[day];
};

export const viewTime = 3000;

export const errorMessageConfig = (error, logout) => {
    let message;

    switch (error) {
        case 0:
            message = "دسترسی شما به شبکه قطع شد!";
            break;
        case 400:
            message = "خطای اطلاعات وارد شده!";
            break;
        case 401:
            // eslint-disable-next-line no-lone-blocks
            {
                message = " شما احراز هویت نشدید, لطفا مجدد وارد شوید!";
                setTimeout(() => {
                    logout();
                }, 500);
            }
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
        case 415:
            message = "مشکل پردازش فرایند رخ داده است!";
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

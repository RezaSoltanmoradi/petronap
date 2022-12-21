export const NATIONALIT_CHOICES = [
    {
        id: "0",
        title: "شرکت ایرانی",
        name: "iranian",
    },
    {
        id: "1",
        title: "نماینده شرکت خارجی",
        name: "foreign",
    },
];
export const ROLE_CHOICES = [
    { name: "trader", id: "1", title: "بازرگان" },
    { name: "freight", id: "2", title: " حمل و نقل" },
];
export const ROLES = [
    { name: "unknown", id: "0", title: "ناشناس" },
    { name: "trader", id: "1", title: "بازرگان" },
    { name: "freight", id: "2", title: " حمل و نقل" },
    { name: "producer", id: "3", title: "تولید کننده " },
];
export const TYPE_CHOICES = [
    { name: "individual person", id: "1", title: "حقیقی" },
    { name: "legal", id: "2", title: "حقوقی" },
];
export const ORDERS_STATUS_CHOICES = [
    { name: "isLoading", id: "0", title: "در انتظار" },
    { name: "isDoing", id: "1", title: "در حال انجام" },
    { name: "isCompleted", id: "2", title: "اتمام یافته" },
];
export const RESPONSIBLE_STORE_COST = [
    { name: "mySelf", id: "1", title: "خودم" },
    { name: "freight", id: "2", title: "شرکت حمل و نقل" },
];
export const RESPONSIBLE_DEMURRAGE_COST = [
    { name: "mySlef", id: "1", title: "خودم" },
    { name: "producer", id: "2", title: "شرکت تولید کننده" },
];

export const DUMMY_HOME_ICONS = [
    {
        icon: "icon-illustration icon-xl i-order-online ",
        path: "order",
        title: "ثبت سفارش انلاین",
        id: "i2",
    },
    {
        icon: "icon-illustration icon-xl i-interview",
        path: "online",
        title: "برگزاری انلاین مناقصه",
        id: "i4",
    },
    {
        icon: "icon-illustration  icon-xl i-order-manage",
        path: "info",
        title: "مدیریت بار",
        id: "i1",
    },
    {
        icon: "icon-illustration icon-xl i-different-choice ",
        path: "different",
        title: "تنوع در انتخاب",
        id: "i3",
    },
    {
        icon: "icon-illustration icon-xl i-sub-online",
        path: "submit-info",
        title: "ثبت انلاین اطلاعات ",
        id: "i6",
    },
    {
        icon: "icon-illustration icon-xl i-pay-online",
        path: "Checkout",
        title: "تسویه حساب انلاین",
        id: "i5",
    },
];

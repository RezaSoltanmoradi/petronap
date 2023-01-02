import { initStore } from "./../../store/index";
import { logout } from "src/store/user-slice";
import { resetUploader } from "src/store/uploadFile-slice";
import { resetContractType } from "src/store/order-slice";

const Logout = () => {
    initStore.dispatch(logout());
    initStore.dispatch(resetUploader());
    initStore.dispatch(resetContractType());
};

export default Logout;

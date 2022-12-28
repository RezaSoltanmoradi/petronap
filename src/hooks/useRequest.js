import { useCallback, useState } from "react";
import { errorMessageConfig } from "src/helper/utils";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "src/store/user-slice";
import { resetUploader } from "src/store/uploadFile-slice";
import { BASE_URL } from "src/helper/baseUrls";

const useRequest = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
        dispatch(resetUploader());
    };
    const sendRequest = useCallback(async requestConfig => {
        setIsLoading(true);
        setError(null);
        setData(null);
        console.log("requestConfig:", requestConfig);
        const request = await axios({
            method: requestConfig.method ?? "GET",
            url: BASE_URL + requestConfig.url,
            data: requestConfig.data ?? null,
            headers: requestConfig.headers ?? {},
        })
            .then(response => {
                setIsLoading(false);
                const { data, status } = response;
                if (data?.errors) {
                    setError(data?.errors.join(","));
                } else if (!data) {
                    setError(errorMessageConfig(status));
                } else {
                    setData(data);
                }
                setError(null);
                return data;
            })
            .catch(error => {
                setError(
                    errorMessageConfig(
                        error.request.status ||
                            "مشکلی در سرور رخ داده است لطفا مجدد تلاش کنید!",
                        logoutHandler
                    )
                );
                setIsLoading(false);
            });
        setIsLoading(false);
        return request;
    }, []);
    return {
        sendRequest,
        data,
        isLoading,
        error,
    };
};

export default useRequest;

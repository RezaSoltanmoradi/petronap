import { useCallback, useState } from "react";
import { errorMessageConfig } from "src/helper/utils";
import axios from "axios";

export const baseUrl = process.env.REACT_APP_API_URL;

const useRequest = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const sendRequest = useCallback(async requestConfig => {
        setIsLoading(true);
        setError(null);
        setData(null);
        const request = await axios({
            method: requestConfig.method ?? "GET",
            url: baseUrl + requestConfig.url,
            data: requestConfig.data ?? null,
            headers: requestConfig.headers ?? {},
        })
            .then(response => {
                setIsLoading(false);
                const { data, status } = response;
                console.log("response", response);
                if (data?.errors) {
                    setError(data?.errors.join(","));
                } else if (!data) {
                    setError(errorMessageConfig(status));
                } else {
                    setData(data);
                }
                return data;
            })
            .catch(error => {
                console.log("error", error);
                setIsLoading(false);
                setError(
                    errorMessageConfig(
                        // error.request.status ||
                        "مشکلی در سرور رخ داده است لطفا مجدد تلاش کنید!"
                    )
                );
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

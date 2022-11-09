import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateTokenModel } from "../features/reducers/tokenReducer";

const useAxios = () => {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState(new AbortController());

    const axiosFetch = async (params: any) => {
        const {
            axiosInstance,
            method,
            url,
            requestConfig = {}
        } = params

        const tokenState = useSelector<StateTokenModel, StateTokenModel>(state => state);

        if (tokenState.token !== null) {
            requestConfig.headers = {
                ...requestConfig.headers,
                "Authorization": `Bearer ${tokenState.token}`
            }
        };

        try {
            setLoading(true);
            const ctrl = new AbortController;
            setController(ctrl);
            const res = await axiosInstance[method?.toLowerCase()](url, {
                ...requestConfig,
                signal: ctrl.signal
            })
            console.log(res);
            setResponse(res);
        } catch (err) {
            const axiosError = err as Error | AxiosError;
            if (axiosError instanceof AxiosError) {
                setError(axiosError.message);
            }
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        return controller && controller.abort();
    }, [controller]);

    return [response, error, loading, axiosFetch];

};

export default useAxios;
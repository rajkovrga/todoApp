import axiosQuote from "../api/axiosQuote";
import { RANDOM_QUOTE_ROUTE } from "../api/routes";

export const getQuote = () => {
    return axiosQuote.get(RANDOM_QUOTE_ROUTE)
}
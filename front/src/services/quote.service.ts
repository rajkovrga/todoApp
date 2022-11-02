import axios from "axios";
import { GET_RANDOM_QUOTE_ROUTE } from "../api/routes";
import { QuoteModel } from "../models";

export const getQuote = async () => {
    return await axios.get<QuoteModel>(GET_RANDOM_QUOTE_ROUTE);
}
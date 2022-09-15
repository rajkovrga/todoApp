import axios, { AxiosResponse } from "axios";
import { QuoteModel } from "models";

export default class QuoteService {

    getQuote()
    {
        return axios.get<QuoteModel>('https://api.quotable.io/random');
    }
}
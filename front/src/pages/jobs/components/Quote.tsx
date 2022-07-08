import { Component } from "react";
import QuoteService from "services/quote.service";
import calendarItem from '../../../assets/icons/icon-calendar.svg';
import plusItem from '../../../assets/icons/icon-plus.svg';
import { useState, useEffect } from "react";
import { QuoteModel } from "models";
import { useParams } from "react-router";
import moment from "moment";

const Quote = () => {

    const quoteService = new QuoteService;

    const [quote, setQuote] = useState<QuoteModel>();
    const { date } = useParams();

    useEffect(() => {
        quoteService.getQuote().then((response) => {
        setQuote(response.data);
      })
      .catch(r => {
        console.log(r)
      })
    }, []);

    return (
        <header className="header">
            <div className="wrap">
                <span className="btn-job-icon">
                    <img className="icon icon-plus js-modal-init" src={plusItem} alt="Add New Item" />
                </span>
                <div className="header-blockquote">
                    <h1 className="header-quote">{quote?.content}</h1>
                    <div className="header-cite"> {quote?.author} - Author</div>
                </div>
            </div>
            <div className="header-inner">
                <div className="wrap">
                    <div className="date-wrap">
                        <img className="icon" src={calendarItem} alt="Calendar" />
                        <time>{moment(date, 'DD-MM-YYYY').format('DD / MM / YYYY')}</time>
                    </div>
                </div>
            </div>
        </header>
    );

}
export default Quote;
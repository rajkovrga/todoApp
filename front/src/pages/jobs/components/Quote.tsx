import QuoteService from "services/quote.service";
import calendarItem from '../../../assets/icons/icon-calendar.svg';
import plusItem from '../../../assets/icons/icon-plus.svg';
import { useState, useEffect, useContext } from "react";
import { QuoteModel } from "models";
import { useParams } from "react-router";
import moment from "moment";
import DateProvider, { DateContext } from "context/DateProvider";

const Quote = () => {

    const quoteService = new QuoteService;

    const [quote, setQuote] = useState<QuoteModel>();
    const {contextDate} = useContext(DateContext);

    useEffect(() => {
        quoteService.getQuote().then((response) => {
        setQuote(response.data);
      })
      .catch(r => {
        alert(r)
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
                        <time>{moment(contextDate.date, 'DD-MM-YYYY').format('DD / MM / YYYY')}</time>
                    </div>
                </div>
            </div>
        </header>
    );

}

export default Quote;
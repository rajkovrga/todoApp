import QuoteService from "services/quote.service";
import calendarItem from '../../../assets/icons/icon-calendar.svg';
import plusItem from '../../../assets/icons/icon-plus.svg';
import { useState, useEffect, useContext, CSSProperties } from "react";
import { QuoteModel } from "models";
import moment from "moment";
import { DateContext } from "context/DateProvider";
import { ClipLoader, DotLoader, PacmanLoader, RingLoader } from "react-spinners";

const Quote = () => {

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "white",
      };

    const quoteService = new QuoteService;
    const [quote, setQuote] = useState<QuoteModel>();
    const [contextDate, setDate] = useContext(DateContext);
    const [isVisible, setVisibility] = useState(false);

    useEffect(() => {
        quoteService.getQuote().then((response) => {
        setQuote(response.data);

        setVisibility(true);
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
                    
                    { isVisible ?
                        <div className="header-blockquote">
                            <h1 className="header-quote">{quote?.content}</h1>
                            <div className="header-cite"> {quote?.author} - Author</div>
                        </div>
                        :
                        <DotLoader cssOverride={override} size={150}/>
                    }
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
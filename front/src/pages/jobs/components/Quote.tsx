import calendarItem from '../../../assets/icons/icon-calendar.svg';
import plusItem from '../../../assets/icons/icon-plus.svg';
import { useState, useEffect, useContext } from "react";
import moment from "moment";
import { DateContext } from '../../../context/DateProvider';
import { QuoteModel } from '../../../models';
import { getQuote } from '../../../services/quote.service';
import Loading from '../../../components/Loading';

const Quote = () => {
    const [quote, setQuote] = useState<QuoteModel>();
    const [contextDate] = useContext(DateContext);
    const [isVisible, setVisibility] = useState(false);

    useEffect(() => {

        const action = async () => {
            const response = await getQuote();
            setQuote(response.data);
        }
        try {
            action();
            setVisibility(true);
        }
        catch (err: any) {
            console.log(err);
        }
    }, []);

    return (
        <header className="header">
            <div className="wrap">
                <span className="btn-job-icon">
                    <img className="icon icon-plus js-modal-init" src={plusItem} alt="Add New Item" />
                </span>

                {isVisible ?
                    <div className="header-blockquote">
                        <h1 className="header-quote">{quote?.content}</h1>
                        <div className="header-cite"> {quote?.author} - Author</div>
                    </div>
                    :
                    <Loading />
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
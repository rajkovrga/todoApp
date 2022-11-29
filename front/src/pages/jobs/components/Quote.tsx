import calendarItem from '../../../assets/icons/icon-calendar.svg';
import { useState, useEffect, useContext } from "react";
import moment from "moment";
import { DateJobContext } from '../../../context/DateJobProvider';
import { QuoteModel } from '../../../models';
import { getQuote } from '../../../services/quote.service';
import Loading from '../../../components/Loading';
import { AddJobModal } from './AddJobModal';

const Quote = () => {
    const [quote, setQuote] = useState<QuoteModel>();
    const contextDate = useContext(DateJobContext);
    const [isVisible, setVisibility] = useState(false);

    useEffect(() => {
        const action = async () => {
            const response = await getQuote();
            setQuote(response.data);
        }
        try {
            action();
        }
        catch (err: any) {
            console.log(err);
        }
        finally {
            setVisibility(true);

        }
    }, []);

    return (
        <header className="header">
            <div className="wrap">
                <AddJobModal />

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
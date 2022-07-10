import JobList from "./components/JobList";
import Quote from "./components/Quote";
import PropTypes from 'prop-types';
import { useLocation, useNavigate, useParams } from "react-router";
import DateProvider, { DateContext } from "context/DateProvider";
import { useContext } from "react";


const Jobs = () => {

    const url = useLocation();
    const navigate = useNavigate();
    const  { date } = useParams();
    const {contextDate, setDate} = useContext(DateContext);

    setDate({
        ...contextDate,
        date
    });

    if(!/[//](\d{1,2})-(\d{1,2})-(\d{4})$/.test(url.pathname))
    {
      return navigate('/'); 
    }


    return (
        <div>
            <DateProvider>
                <Quote />
                <JobList />
            </DateProvider>
        </div>
    );
}

Jobs.propTypes = {
    date: PropTypes.instanceOf(Date)
}

export default Jobs;
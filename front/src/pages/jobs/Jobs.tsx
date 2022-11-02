import JobList from "./components/JobList";
import Quote from "./components/Quote";
import PropTypes from 'prop-types';
import { useLocation, useNavigate, useParams } from "react-router";
import { useContext, useEffect } from "react";
import { DateContext } from "../../context/DateProvider";


const Jobs = () => {

    const url = useLocation();
    const navigate = useNavigate();
    const { date } = useParams();
    const [ contextDate, setDate ] = useContext(DateContext);


    useEffect(() => {
        setDate({
            ...contextDate,
            date
        });
    }, []);

    if (!/[//](\d{1,2})-(\d{1,2})-(\d{4})$/.test(url.pathname)) {
        return navigate('/404');
    }

    return (
            <div>
                <Quote />
                <JobList />
            </div>
    );
}

Jobs.propTypes = {
    date: PropTypes.instanceOf(Date)
}

export default Jobs;
import JobList from "./components/JobList";
import Quote from "./components/Quote";
import PropTypes from 'prop-types';
import { useLocation, useNavigate, useParams } from "react-router";
import { useContext, useEffect } from "react";
import { DateJobContext } from "../../context/DateJobProvider";
import store from "../../store/store";

const Jobs = () => {
    const url = useLocation();
    const navigate = useNavigate();
    const { date } = useParams();
    const { addDate } = useContext(DateJobContext);

    useEffect(() => {
        if(date !== '') {
            addDate(date ?? '');
        }
    }, [date, addDate]);

    const state = store.getState();

    if(state.token.token === '') {
        navigate('/login');
    }

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
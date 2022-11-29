import { useContext, useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import { DateJobContext } from '../../../context/DateJobProvider';
import { getJobsData } from '../../../services/jobs.service';
import JobItem from './JobItem';

const JobList = () => {
        const contextDate = useContext(DateJobContext);
        const [isVisible, setVisibility] = useState(false);

        useEffect(() => {
                const getJobsItems = async () => {
                        try {
                                const result = await getJobsData();
                                contextDate.addJobs(result.data);
                        }
                        catch (err: any) {
                                console.log(err);
                        }
                        finally {
                                setVisibility(true);
                        }
                };
                getJobsItems();
        });

        return <div className='job-list pt-3'>
                {isVisible ? contextDate.jobs.map(x => <JobItem data={x} key={x.id} />) : <Loading />}
        </div>;
}

export default JobList;
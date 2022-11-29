import React, { useState } from "react";
import { JobReturnModel } from "../models";

export interface DefModel {
    date: string;
    jobs: JobReturnModel[];
    addDate: (date: string) => void;
    addJobs: (jobs: JobReturnModel[]) => void;
    addNewJob: (job: JobReturnModel) => void;
    resolve: (id: string) => void;
}

const defaultData: DefModel = {
    date: '',
    jobs: [],
    addDate: (date) => {},
    addJobs: (jobs) => {},
    addNewJob: (job) => {},
    resolve: (id) => {}
};

export const DateJobContext = React.createContext(defaultData);

const DateJobProvider = ({children}: any) => {
    const [date, setContextDate] = useState('');
    const [jobs, setJobs] = useState<JobReturnModel[]>([]);

    const addDate = (date: string) => {
        setContextDate(date);
    };

    const addJobs = (items: JobReturnModel[]) => {
        setJobs(items.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
                return 1;
            }
            if (a.createdAt > b.createdAt) {
                return -1;
            }
            return 0;
        }));
    };

    const addNewJob = (job: JobReturnModel) => {
        setJobs([
            ...jobs,
            job
        ]);
    };

    const resolve = (id: string) => {
        const items = jobs.filter(x => x.id !== id);
        setJobs(items);
    };

    return <DateJobContext.Provider value={{date, jobs, addDate, addJobs, addNewJob, resolve}}>{children}</DateJobContext.Provider>;
}

export default DateJobProvider;
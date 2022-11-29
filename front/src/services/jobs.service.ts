import axiosInstance from "../api/axios/axiosInstance";
import { CREATE_JOB_ROUTE, EDIT_JOB_ROUTE, GET_ALL_JOB_ROUTE, RESOLVE_JOB_ROUTE } from "../api/routes";
import { JobModel, JobReturnModel } from "../models";

export const getJobsData = async () => {
    return await axiosInstance.get<JobReturnModel[]>(GET_ALL_JOB_ROUTE);
};

export const editJob = async (data: JobModel, id: string) => {
    return await axiosInstance.put(EDIT_JOB_ROUTE + id, data);
};

export const resolveJob = async (id: string) => {
    return await axiosInstance.put(RESOLVE_JOB_ROUTE + id);
};

export const addJob = async (data: JobModel) => {
    return await axiosInstance.post<JobReturnModel>(CREATE_JOB_ROUTE, data);
};
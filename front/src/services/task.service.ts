import axiosInstance from "../api/axios/axiosInstance";
import { CREATE_JOB_ROUTE, EDIT_JOB_ROUTE, GET_ALL_JOB_ROUTE, RESEND_VERIFY_ROUTE, RESOLVE_JOB_ROUTE } from "../api/routes";
import { JobModel } from "../models";

export const getTasks = async () => {
    return await axiosInstance.get(GET_ALL_JOB_ROUTE);
};

export const editTask = async (data: JobModel, id: number) => {
    return await axiosInstance.put(EDIT_JOB_ROUTE + id, data);
};

export const resolveTask = async (id: number) => {
    return await axiosInstance.put(RESOLVE_JOB_ROUTE + id);
};

export const addTask = async (data: JobModel) => {
    return await axiosInstance.put(CREATE_JOB_ROUTE, data);
};
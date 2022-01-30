import http from "./http-service";
import { appConfig } from "../config/app-config";
import StorageService from "./storage-service";
import Utils from "../helpers/utils";

const httpInstance = http.create();
httpInstance.defaults.baseURL = appConfig.baseUrl;
httpInstance.interceptors.request.use(async (config) => {
    const user = await StorageService.getItem('user');

    config.headers = {...config.headers, authorization: `Bearer ${user.token}`};

    return config;
});

const getSummary = async (start = new Date('jan 1 2020'), end = new Date()) => {
    try {
        start = start.getTime();
        end = end.getTime();
        const response = await httpInstance.get(`admin/businesses_bank?f=${start}&t=${end}`);
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const getBusinesses = async (query = {}) => {
    try {
        const response = await httpInstance.get("/admin/businesses_registrations", {params: query});
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const getUsers = async (query = {}) => {
    try {
        const response = await httpInstance.get("/admin/users", {params: query});
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const patchBusiness = async (data, id) => {
    try {
        delete data.names;
        const response = await httpInstance.patch(`/add-details/${id}`, data);
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const createUser = async (data) => {
    try {
        const response = await httpInstance.post(`/admin/create`, data);
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const patchUser = async (data, id) => {
    try {
        const response = await httpInstance.patch(`/admin/update-user/${id}`, data);
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const setBusinessStatus = async (data, id) => {
    try {
        const response = await httpInstance.post(`/admin/add-status/${id}`, data);
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const getBusinessProgress = async (id) => {
    try {
        const response = await httpInstance.get(`/admin/get-business-progress/${id}`);
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const AdminService = {
    getSummary: getSummary,
    getBusinesses: getBusinesses,
    getUsers: getUsers,
    createUser: createUser,
    patchUser: patchUser,
    getBusinessProgress: getBusinessProgress,
    setBusinessStatus: setBusinessStatus
};

export default AdminService;

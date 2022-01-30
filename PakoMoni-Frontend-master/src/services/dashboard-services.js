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

const getBusiness = async (id) => {
    try {
        const response = await httpInstance.get(`/get-business/${id}`);
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const createBusiness = async (data) => {
    try {
        const response = await httpInstance.post("/add-name", data);
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const patchBusiness = async (data, id) => {
    try {
        const response = await httpInstance.patch(`/add-details/${id}`, data);
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const createBank = async (data) => {
    try {
        const response = await httpInstance.post("/add-bank", data);
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const uploadFile = async (file) => {
    try {
        const data = new FormData();
        data.append('file', file);
        httpInstance.headers.FormData()
        const response = await httpInstance.post("/upload", data);
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const DashboardService = {
    createBusiness: createBusiness,
    patchBusiness: patchBusiness,
    createBank: createBank,
    getBusiness: getBusiness,
    uploadFile: uploadFile
};

export default DashboardService;

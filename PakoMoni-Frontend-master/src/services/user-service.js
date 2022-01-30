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

const patchUser = async (data) => {
    try {
        const response = await httpInstance.patch("/update-user", data);
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const getUser = async (id) => {
    try {
        const response = await httpInstance.get(`user/${id}`);
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const userService = {
    patchUser: patchUser,
    getUser: getUser
};

export default userService;

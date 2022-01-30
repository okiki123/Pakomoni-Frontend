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

const verifyPayment = async (reference) => {
    try {
        const response = await httpInstance.post(`/verify/transaction`, {reference});
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const PaymentService = {
    verifyPayment: verifyPayment
};

export default PaymentService;

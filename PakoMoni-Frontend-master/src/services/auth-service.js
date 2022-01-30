import http from "./http-service";
import { appConfig } from "../config/app-config";
import storageService from "./storage-service.js";
import Utils from "../helpers/utils";

const httpInstance = http.create();
httpInstance.defaults.baseURL = appConfig.baseUrl;

const signUp = async (data) => {
    try {
        const response = await httpInstance.post("/signup", data);
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const login = async (data, admin = false) => {
    try {
        const url = admin ? '/admin/login' : 'login';
        const response = await httpInstance.post(url, data);
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const forgotPassword = async (data) => {
    try {
        const response = await httpInstance.post("/forgot-password", data);
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const resetPassword = async (data) => {
    const token = sessionStorage.getItem('user_password_token');
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    try {
        const response = await httpInstance.post("/reset-password", data, config);
        sessionStorage.removeItem('user_password_token');
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const verify = async (data) => {
    try {
        const response = await httpInstance.post("/verify", data);
        return Promise.resolve(response);
    } catch (e) {
        const errorMessage = Utils.handleError(e);
        return Promise.reject(errorMessage);
    }
}

const logout = async () => {
    await storageService.removeItem('user');
    return true;
}

const AuthService = {
    signUp: signUp,
    login: login,
    verify: verify,
    logout: logout,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword
};

export default AuthService;



import axios from "axios";

export const server = axios.create({
    baseURL: 'http://192.168.1.10:9900/'
})

export const HOST = "http://192.168.1.10:9900/";
export const REGISTER = "api/auth/register";
export const LOGIN = "api/auth/login";
export const LOGOUT = "api/auth/logout";
export const ME = "api/auth/me";







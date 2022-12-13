import axios from "axios";

export const server = axios.create({
    baseURL: 'http://192.168.1.10:9900/'
})

export const HOST = "http://192.168.1.10:9900/";
export const REGISTER = "minor/auth/register";
export const LOGIN = "minor/auth/login";
export const LOGOUT = "minor/auth/logout";
export const VERIFY = "minor/verify";







import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
export const baseURL = process.env.REACT_APP_PUBLIC_ENDPOINT;

const getToken = () => {
  if(typeof window !== "undefined") {
    return localStorage.getItem("token") || "";
  }
  return "";
}

const headers = () => {
  let token = getToken();

  return {
    "Content-Type": "application/json;charset=UTF-8",
    "Authorization": `Bearer ${token}`,
    "X-Custom-Header": "foobar",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    "Access-Control-Allow-Methods": "GET",

  };
};

const api = axios.create({
  baseURL: baseURL,
  timeout: 500000,
  headers: headers(),
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
    if(localStorage.getItem("token") !== null) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      window.location.replace("/login");
    }
      // window.location.reload();
    }
    return Promise.reject(error);
  }
);

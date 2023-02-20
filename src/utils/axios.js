import axios from "axios";

const requestHandler = (request) => request;
const responseHandler = (response) => response;
const requestErrorHandler = (error) => Promise.reject(error);
const responseErrorHandler = (error) => Promise.reject(error);

export const apiClient = axios.create({
  headers: {
    
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use(
  // (config) => configHandler(config),
  (request) => requestHandler(request),
  (error) => requestErrorHandler(error)
);

apiClient.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => responseErrorHandler(error)
);

export const errorHandler = (reason) => {
  if (axios.isCancel(reason)) return "Request Cancelled";
  if (reason.code === "ECONNABORTED") return "A timeout occurred";
  if (reason.response?.status === 404) return "Resource Not Found";
  if (reason.response?.status === 400 || reason.response?.status === 500)
    return reason.response.data.error_message;

  return "An unexpected error has occurred";
};
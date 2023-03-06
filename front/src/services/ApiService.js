/* eslint-disable arrow-body-style */
import axios from 'axios';

const axiosService = axios.create();

export const get = (url, options = {}) => {
  return axiosService.get(url, { ...options });
};

export const post = (url, options = {}) => {
  const { body = {}, ...rest } = options;
  return axiosService.post(url, body, rest);
};

export const put = (url, options = {}) => {
  const { body = {}, ...rest } = options;
  return axiosService.put(url, body, rest);
};

export const patch = (url, body) => {
  return axiosService.patch(url, body);
};

export const del = (url) => {
  return axiosService.delete(url);
};

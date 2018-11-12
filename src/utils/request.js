import axios from 'axios';
import createHistory from 'history/createHashHistory';

const statusText = {
  301: '资源被永久转移到其它URL',
  401: '请求要求身份验证',
  403: '访问被禁止',
  404: '请求的资源不存在',
  500: '服务器错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时'
};

const instance = axios.create({
  baseURL: '/api',
  timeout: 8000,
  responseType: 'json',
  withCredentials: true,
  headers: {
      'Content-Type': 'application/json'
  }
});

// 请求拦截器
instance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  // 请求超时
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const status = error.response.status;
  const errorText = statusText[status] || error.response.statusText;
  const history = createHistory();

  // errorText

  if (status === 403) {
    history.push('/exception/403');
  } else if (status <= 504 && status >= 500) {
    history.push('/exception/500');
  } else if (status >= 404 && status < 422) {
    history.push('/exception/404');
  }
  return Promise.reject(error);
});

export default instance;

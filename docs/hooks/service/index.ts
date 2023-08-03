import axios from 'axios';

const userInfo = {
  token: sessionStorage.getItem('token'),
};

const site = {
  test: 'https://60b2643d62ab150017ae21de.mockapi.io/',
  prod: 'https://prod.myapi.io/',
  staging: 'https://staging.myapi.io/',
};

const logout = () => {
  sessionStorage.clear();
  location.href = location.origin + location.pathname + '#/' + 'login';
};

// 创建axios实例
const service = axios.create({
  baseURL: site.test,
  // 根据环境配置不同baseUrl
  timeout: 60 * 1000,
  withCredentials: false,
});

// 定义一个请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers!['token'] = userInfo?.token ?? '';
    return config;
  },
  (error) => {
    // notification.error({
    //   message: '请求发送失败',
    //   description: '发送请求给服务端失败，请检查电脑网络，再重试',
    // });
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    /* 可以在这里处理请求成功的逻辑 */
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      // .. 处理请求失败的逻辑
    }
    return Promise.reject(error);
  },
);

export default service
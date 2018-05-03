/**
 * 全局配置文件
 */
let baseURL;
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:8080/api';
} else {
  baseURL = '/api';
}

export default { baseURL };

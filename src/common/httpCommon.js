import Axios from 'axios';

const axiosBaseURL = Axios.create({
    baseURL:"http://127.0.0.1:8000/api/v1",
    withCredentials:true
});

axiosBaseURL.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 403) {
      window.location.href = '/login';
    }
  });

export default axiosBaseURL
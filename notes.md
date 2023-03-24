import Axios from 'axios';
const axiosBaseURL = Axios.create({
    baseURL:'api_base_url'
});
export default axiosBaseURL


axiosBaseURL.get('/programs/') 


remember to install django-cors-headers
and set allowed Origins


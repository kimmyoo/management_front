import Axios from 'axios';
const axiosBaseURL = Axios.create({
    baseURL:'api_base_url'
});
export default axiosBaseURL


axiosBaseURL.get('/programs/') 


remember to install django-cors-headers
and set allowed Origins





Using Promise.all to wait for a handful of delays will resolve after all the delays have finished, but remember they execute at the same time:
Example #1
const data = await Promise.all([res(3000), res(2000), res(1000)])
//                              ^^^^^^^^^  ^^^^^^^^^  ^^^^^^^^^
//                               delay 1    delay 2    delay 3
//
// ms ------1---------2---------3
// =============================O delay 1
// ===================O           delay 2
// =========O                     delay 3
//
// =============================O Promise.all


Promise.all will resolve with the data from the inner promises after 3 seconds.
But, Promise.all has a "fail fast" behavior:
Example #2
const data = await Promise.all([res(3000), res(2000), rej(1000)])
//                              ^^^^^^^^^  ^^^^^^^^^  ^^^^^^^^^
//                               delay 1    delay 2    delay 3
//
// ms ------1---------2---------3
// =============================O delay 1
// ===================O           delay 2
// =========X                     delay 3
//
// =========X                     Promise.all
If you use async-await instead, you will have to wait for each promise to resolve sequentially, which may not be as efficient






django values()  vs values_list

The values() method returns a QuerySet containing dictionaries:
<QuerySet [{'comment_id': 1}, {'comment_id': 2}]>
The values_list() method returns a QuerySet containing tuples:
<QuerySet [(1,), (2,)]>
If you are using values_list() with a single field, you can use flat=True to return a QuerySet of single values instead of 1-tuples:
<QuerySet [1, 2]>
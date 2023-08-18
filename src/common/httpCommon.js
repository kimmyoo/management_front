import Axios from 'axios';

const axiosBaseURL = Axios.create({
    // baseURL: "http://127.0.0.1:8000/api/v1",
    baseURL: "https://abcschoolmanagement.pythonanywhere.com/api/v1",
    withCredentials: true
});


// interceptor checks before each request to api 
// make sure the user is authenticated
// otherwise redirect use to /login

axiosBaseURL.interceptors.response.use(
    response => { return response },
    error => {
        if (!error.response) {
            console.log("check network connection")
            window.location.href = '/login';
        }
        // if i added these two lines
        // netlify won't let me go to dashboard..weird. 
        if (error.response.status === 403) {
            setTimeout(() => {
                window.location.href = '/login'
            }, 2000)
        }
        // reject it for now and let default .catch to handle error
        return Promise.reject(error);
    }
);

export default axiosBaseURL

// Django REST Framework returns status code 403 under a couple of relevant circumstances:

// When you don't have the required permission level (e.g. making an API request as an unauthenticated user when DEFAULT_PERMISSION_CLASSES is ('rest_framework.permissions.IsAuthenticated',).
// When you doing an unsafe request type (POST, PUT, PATCH or DELETE - a request that should have side effects), you are using rest_framework.authentication.SessionAuthentication and you've not included your CSRFToken in the requeset.
// When you are doing an unsafe request type and the CSRFToken you've included is no longer valid.



// The problem is your interceptor is simply returning error (effectively swallowing it),
// but it needs to be a Promise for the .then/.catch chaining. That is, the interceptor needs to return the result in Promise.resolve or Promise.reject:

// axios.interceptors.response.use(response => {
//   return response;
// }, (error) => {
//   let requiresAuth = /*...*/
//   if (error.response.status === 401 && requiresAuth) {
//       //...

//       // ignore error?
//       return Promise.resolve();
//   }
//   return Promise.reject(error);
// });
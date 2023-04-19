// login form validation function
// return true or false 

const validateLoginForm = (formData, setErrorsFunc) => {
        const errors = {}
        if(!formData.username.trim()){
            errors.username = "Required"
        }
        if(!formData.password.trim()){
            errors.password = "Required"
        }
        setErrorsFunc(errors)
        return Object.keys(errors).length === 0
}

export default validateLoginForm
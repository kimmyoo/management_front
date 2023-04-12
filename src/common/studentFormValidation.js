    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const preValidate = (studentObj, setErrorsFunc) => {
        const errors = {}
        const yr = new Date().getFullYear()
        if(!studentObj.studentID.trim() ){
            errors.studentID = "Required"
        }
        if(!studentObj.fName.trim() ){
            errors.fName = "Required"
        }
        if(!studentObj.lName.trim()){
            errors.lName = "Required"
        }
        if(!studentObj.gender.trim()){
            errors.gender = "Required"
        }
        if(!studentObj.last4Digits.trim()){
            errors.last4Digits = "Required"
        }else if (studentObj.last4Digits.length > 4){
            errors.last4Digits = 'last FOUR digits'
        }

        if(!studentObj.dob.trim()){
            errors.dob = "Required"
        }else if ( yr - Number(studentObj.dob.slice(0,4)) < 15){
            errors.dob = "age is less than 16"
        }

        if(studentObj.email && !validateEmail(studentObj.email)){
            errors.email = "Invalid email"
        }
        setErrorsFunc(errors)
        return Object.keys(errors).length === 0
    }

export {validateEmail, preValidate}
// import {nanoid }from 'nanoid'
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axiosBaseURL from "../../common/httpCommon";
import handleBackendError from '../../common/handleBackendError';
import BackendError from '../../components/BackendError';


const EnrollToClass = ({ onClose, clss, licID }) => {
    const navigate = useNavigate()
    const[formData, setFormData] = useState({
        lName: '',
        fName: '',
        dob:'',
        last4Digits: '',
        gender:'',
        phone:'',
        address:'',
        email: '',
        accountInfo:'',
        note:'',
        classes: [clss.id]
    })

    const [formErrors, setFormErrors] = useState({})

    const [studentID, setStudentID] = useState('')

    useEffect(() => {
            const id = formData.lName.slice(0,2) + 
            formData.fName.slice(0,2) +
            formData.dob.slice(0, 4) +
            formData.last4Digits
            setStudentID(id.toLowerCase())
    }, [formData])

    const handleInputChange = (e) => {
        const {name, value } = e.target
        if ((name==='phone' || name==='last4Digits') && isNaN(value)){
            return
        }
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const preValidate = () => {
        const errors = {}
        const yr = new Date().getFullYear()
        if(!formData.lName.trim() || !formData.fName.trim() ){
            errors.lName = "last and first names are required"
        }
        if(!formData.gender.trim()){
            errors.gender = "gender is required"
        }

        if(!formData.dob.trim() || !formData.last4Digits.trim()){
            errors.dob = "DOB and last 4 digits of SSN are required"
        }else if ( yr - Number(formData.dob.slice(0,4)) < 15){
            errors.dob = "16 yrs old at least"
        }else if (formData.last4Digits.length > 4){
            errors.last4Digits = 'only the ending 4 digits'
        }

        if(formData.email && !validateEmail(formData.email)){
            errors.email = "invalid email"
        }
        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if(!preValidate()) return
        const studentObject = formData
        studentObject.studentID = studentID
        // console.log(studentObject)
        axiosBaseURL.post('/students/', studentObject)
            .then(response =>{
                console.log("form submission was successful.")
                onClose()
                navigate(`/dash/classes/${licID}/${clss.id}`)
            })
            .catch(error => {
                console.error("error", error)
                const errorDetails = handleBackendError(error)
                setFormErrors({
                    ...formErrors,
                    backendErrors: errorDetails
                })
            })
        // closing the modal which triggers useEffect in parent component
        // to reload data
    }

    const content = (
        <div className='modal'>
            <div className='modal-background'/>

            <div className='modal-content'>
                <h2>Enroll New Student to { clss.code }</h2>
                <button className="modal-close" onClick={onClose}>×</button>
                {/* <div className='form-wrapper'> */}
                    <div className='form-container'>
                        <form onSubmit={handleSubmit}>
                            <label>Last Name, First Name</label>
                            {formErrors.lName && <span className="error">{formErrors.lName}</span>}
                            <div className = "half-length">
                                <input 
                                    name="lName" 
                                    placeholder="Last name" 
                                    type="text"
                                    value={formData.lName}
                                    onChange={handleInputChange}
                                />
                                <input 
                                    name="fName"
                                    placeholder="First name" 
                                    type="text"
                                    value={formData.fName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <label> DOB, last 4 digits of SSN</label>
                            {formErrors.dob && <span className="error">{formErrors.dob}</span>}
                            {formErrors.last4Digits && <span className="error">{formErrors.last4Digits}</span>}
                            <div className = "half-length">
                                <input  
                                    name="dob"  
                                    placeholder="dob" 
                                    type="date" 
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                />
                                <input 
                                    name="last4Digits" 
                                    placeholder="last 4 digits of ssn or '0000'" 
                                    type="text"
                                    value={formData.last4Digits}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <label>Student ID and Gender</label>
                            {formErrors.gender && <span className="error">{formErrors.gender}</span>}
                            <div className = "half-length">
                                <input  name="generatedID" placeholder="Student ID #" type="text" value={studentID} disabled="disabled" readOnly />
                                <select name="gender" 
                                        value={formData.gender} 
                                        placeholder="" 
                                        type="text"
                                        onChange={handleInputChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="f">Female</option>
                                    <option value="m">Male</option>
                                    <option value="u">Unspecified</option>
                                </select>
                            </div>

                            <label>Phone Number and email</label>
                            <div className = "half-length">
                                <input 
                                    name="phone"  
                                    placeholder='xxx-xxx-xxxx'
                                    type="text"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                                <input 
                                    name="email"
                                    placeholder='E-mail' 
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <label>Address</label>
                            <input 
                                name="address" 
                                type="text"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                            <label>Account info</label>
                            <input 
                                name="accountInfo"
                                type="text"
                                value={formData.accountInfo}
                                onChange={handleInputChange}
                            />
                            <label>Note</label>
                            <input 
                                name="note"
                                type="text"
                                value={formData.note}
                                onChange={handleInputChange}
                            />
                            <BackendError errors={formErrors.backendErrors} />
                            <p><button type="submit" onClick={handleSubmit}>Submit</button></p>
                        </form>
                    </div>
                {/* </div> */}
            </div>
        </div>
    )

    return (
        content
    )
}

export default EnrollToClass
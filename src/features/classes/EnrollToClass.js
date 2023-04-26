// import {nanoid }from 'nanoid'
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axiosBaseURL from "../../common/httpCommon";
import handleBackendError from '../../common/handleBackendError';
// import BackendError from '../../components/BackendError';
import EnrollmentForm from '../../components/EnrollmentForm';
import { preValidate } from '../../common/studentFormValidation';

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

    const handleSubmit = (e) => {
        e.preventDefault()
        const studentObject = formData
        studentObject.studentID = studentID
        if(!preValidate(formData, setFormErrors)) return
        axiosBaseURL.post('/students/', studentObject)
            .then(response =>{
                console.log("form submission was successful.", response.data)
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
                <h3>Enroll a student to { clss.code }</h3>
                <button className="modal-close" onClick={onClose}>×</button>
                    <EnrollmentForm 
                        formData={formData} 
                        formErrors={formErrors}
                        handleInputChange={handleInputChange}
                        studentID = {studentID}
                        handleSubmit = {handleSubmit}
                    />
            </div>
        </div>
    )

    return (
        content
    )
}

export default EnrollToClass
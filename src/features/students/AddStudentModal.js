// this component only add a student instance
// no class instance is associated with the student instance pageYOffset. 
import { useEffect, useState } from 'react';
import axiosBaseURL from "../../common/httpCommon";
import handleBackendError from '../../common/handleBackendError';
import { preValidate } from '../../common/studentFormValidation';
import EnrollmentForm from '../../components/EnrollmentForm';
import React from 'react';

const AddStudentModal = ({ onClose }) => {

    const [formData, setFormData] = useState({
        lName: '',
        fName: '',
        dob: '',
        last4Digits: '',
        gender: '',
        phone: '',
        address: '',
        email: '',
        accountInfo: '',
        note: '',
        classes: []
    })

    const [formErrors, setFormErrors] = useState({})
    const [studentID, setStudentID] = useState('')

    useEffect(() => {
        const id = formData.lName.slice(0, 2) +
            formData.fName.slice(0, 2) +
            formData.dob.slice(0, 4) +
            formData.last4Digits
        setStudentID(id.toLowerCase())
    }, [formData])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if ((name === 'phone' || name === 'last4Digits') && isNaN(value)) {
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
        if (!preValidate(studentObject, setFormErrors)) return
        axiosBaseURL.post('/students/', studentObject)
            .then(response => {
                console.log("form submission was successful.")
                onClose() // triggers parent component reload
            })
            .catch(error => {
                console.error("error", error)
                const errorDetails = handleBackendError(error)
                setFormErrors({
                    ...formErrors,
                    backendErrors: errorDetails
                })
            })
    }

    const content = (
        <div className='modal'>
            <div className='modal-background' />
            <div className='modal-content'>
                <h3>Register a New Student</h3>
                <button className="modal-close" onClick={onClose}>×</button>
                <EnrollmentForm
                    formData={formData}
                    formErrors={formErrors}
                    handleInputChange={handleInputChange}
                    studentID={studentID}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    )

    return (
        content
    )
}

export default AddStudentModal
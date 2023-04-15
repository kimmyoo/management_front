import React from 'react'
import { useState } from 'react'
import { preValidate } from '../../common/studentFormValidation'
import axiosBaseURL from '../../common/httpCommon'
import handleBackendError from '../../common/handleBackendError'
import {useNavigate} from 'react-router-dom'
import disableEnterSubmit from '../../common/disableEnterSubmit'
import DeleteButton from '../../components/DeleteButton'


const EditStudentModal = ({stdt, onClose}) => {
    const navigate = useNavigate()
    const [student, setStudent] = useState(stdt)
    const [formErrors, setFormErrors] = useState({})

    const handleInputChange = (e) => {
        const {name, value} = e.target
        if ((name==='phone' || name==='last4Digits') && isNaN(value)){
            return
        }
        setStudent({
            ...student, 
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!preValidate(student, setFormErrors)) return

        axiosBaseURL.put(`/student/detail/${student.id}`, student)
            .then(response=>{
                onClose()
            })
            .catch(error=>{
                console.error("error", error)
                const errorDetails = handleBackendError(error)
                setFormErrors({
                    ...formErrors,
                    backendErrors: errorDetails
                })
            })
    }

    const handleDelete = (e) => {
      axiosBaseURL.delete(`/student/detail/${student.id}`)
            .then(response=>{
                navigate("/dash/students")
                navigate(0)
            })
            .catch(error=>{
                console.error(error)
            })
    }

    const content = (
        <div className='modal'>
            <div className='modal-background'/>
            <div className= 'modal-content'>
            <form onKeyDown={disableEnterSubmit}>
                <h3>Edit Student</h3>
                <button className="modal-close" onClick={onClose}>×</button>
                <div className="table">
                    <div className="row">
                        <div className="cell heading">Last Name:</div>
                        <div className="cell">
                            <input 
                                name="lName" 
                                type="text" 
                                value={student.lName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="cell"><span className='error'>{formErrors.lName}</span></div>
                    </div>
                    <div className="row">
                        <div className="cell heading">First Name:</div>
                        <div className="cell">
                            <input 
                                name="fName" 
                                type="text" 
                                value={student.fName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="cell"><span className='error'>{formErrors.fName}</span></div>
                    </div>
                    <div className="row">
                        <div className="cell heading">DOB:</div>
                        <div className="cell">
                            <input 
                                name="dob"
                                type="date"
                                value={student.dob}
                                onChange={handleInputChange}
                                />
                        </div>
                        <div className="cell"><span className='error'>{formErrors.dob}</span></div>
                    </div>
                    <div className="row">
                        <div className="cell heading">SSN:</div>
                        <div className="cell">
                            <input
                                name="last4Digits"
                                type="text"
                                value={student.last4Digits}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="cell"><span className='error'>{formErrors.last4Digits}</span></div>
                    </div>
                    <div className="row">
                        <div className="cell heading">Student ID:</div>
                        <div className="cell">
                            <input 
                                name="studentID" 
                                type="text" 
                                value={student.studentID}
                                onChange={handleInputChange}
                                />
                        </div>
                        <div className="error cell">{formErrors.studentID}</div>
                    </div>
                    <div className="row">
                        <div className="cell heading">Gender:</div>
                        <div className="cell">
                            <select 
                                name="gender" 
                                value={student.gender}
                                onChange={handleInputChange}
                            >
                                <option value="f">Female</option>
                                <option value="m">Male</option>
                                <option value="u">unspecified</option>
                            </select>
                        </div>
                        <div className="cell"><span className='error'>{formErrors.gender}</span></div>
                    </div>

                    <div className="row">
                        <div className="cell heading">Phone Number:</div>
                        <div className="cell">
                            <input
                                name="phone"
                                type="text"
                                value={student.phone||''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="cell heading">E-mail:</div>
                        <div className="cell">
                            <input
                                name="email"
                                type="text"
                                value={student.email||''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="cell"><span className='error'>{formErrors.email}</span></div>
                    </div>
                    <div className="row">
                        <div className="cell heading">Address:</div>
                        <div className="cell">
                            <input
                                name="address"
                                type="text"
                                value={student.address||''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="cell heading">Account Info:</div>
                        <div className="cell">
                            <input
                                name="accountInfo"
                                type="text"
                                value={student.accountInfo||''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="cell heading">Notes:</div>
                        <div className="cell">
                            <input
                                name="note"
                                type="text"
                                value={student.note||''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="cell heading">
                            <DeleteButton onDelete={handleDelete}/>
                        </div>
                        <div className="cell">
                            
                        </div>
                    </div>
                    {
                        formErrors.backendErrors &&
                        <div className="row">
                            <div className='cell heading error'>Backend Error</div>
                            <div className='cell'>
                                <p className='error'>{formErrors.backendErrors}</p>
                            </div>
                        </div>
                    }

                </div>
                <button className="button-paper functional" onClick={handleSubmit}>submit</button>
            </form>
            </div>
        </div>
    )
  
    return (
        content
  )
}

export default EditStudentModal
import React from 'react'
import BackendError from './BackendError'

const EnrollmentForm = ({
    formData, 
    formErrors,
    handleInputChange, 
    handleSubmit, 
    studentID
}) => {
    const content = (
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
                        placeholder='phone#'
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
                <p><button className="button-paper functional" type="submit" onClick={handleSubmit}>Submit</button></p>
            </form>
        </div>

    )

    return (
        content
    )
}

export default EnrollmentForm
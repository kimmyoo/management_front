import { nanoid } from 'nanoid'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosBaseURL from "../../common/httpCommon";
import React from 'react';


const AddProgram = () => {
    const navigate = useNavigate()

    const [program, setProgram] = useState({
        programName: '',
        programCode: '',
        length: '',
        cost: '',
        // changed expiresAt to null to avoid empty string 
        //in database date field
        expiresAt: null,
        licenses: [],
        isActive: true
    });

    const [formErrors, setFormErrors] = useState({});

    // handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!preValidate()) {
            return
        }

        // form data is now prevalidated
        let errorDetails = [] // for holding backend errors
        axiosBaseURL.post('/programs/', program)
            .then(response => {
                console.log('Form data submission successful:', response.data)
                navigate("/dash/programs")
            })
            .catch(error => {
                console.error('form submission error:', error.response.data)
                const errorObject = error.response.data // get the error Object return from backend
                for (const property in errorObject) {
                    errorDetails.push(<span>{property}:{errorObject[property]}</span>)
                }
                setFormErrors({ ...formErrors, backendErrors: errorDetails })
            });
    };

    // form data validation before submission
    const preValidate = () => {
        let errors = {};
        // program.programName and programCode
        if (!program.programName.trim()) {
            errors.programName = 'Program name is required'
        }
        if (!program.programCode.trim()) {
            errors.programCode = 'Program code is required'
        }
        // program.length and cost
        if (!program.length.trim()) {
            errors.length = "Contact hours is required"
        } else if (isNaN(program.length)) {
            errors.length = 'Program Length must be a number'
        } else if (program.length < 1) {
            errors.length = 'program length must be greater than 0'
        }
        if (!program.cost.trim()) {
            errors.cost = "Tuition is required"
        } else if (isNaN(program.cost)) {
            errors.cost = 'Tuition must be a number'
        } else if (program.cost < 0) {
            errors.cost = 'Tuition must be greater than 0'
        }

        setFormErrors(errors)
        // return true if there is no error, otherwise false
        return Object.keys(errors).length === 0
    };

    const handleInputChange = (e) => {
        // preValidate()
        const { name, value } = e.target;
        setProgram({
            ...program,
            [name]: value
        });

    };

    const handleRadioChange = (e) => {
        setProgram({
            ...program,
            isActive: e.target.value === "true" ? true : false
        })
    }

    // define content to be rendered
    const content = (
        <div className='form-wrapper'>
            <h2>Add a New Program</h2>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label>
                        Program Name(*):
                        {formErrors.programName && <span className="error">{formErrors.programName}</span>}
                        <input
                            name="programName" type="text"
                            value={program.programName}
                            onChange={handleInputChange}
                        />

                    </label>
                    <label>
                        Program Code(*):
                        {formErrors.programName && <span className="error">{formErrors.programCode}</span>}
                        <input
                            name="programCode" type="text"
                            value={program.programCode}
                            onChange={handleInputChange}
                        />

                    </label>
                    <label>
                        Contact Hours(*):
                        {formErrors.length && <span className="error">{formErrors.length}</span>}
                        <input
                            name="length" type="text"
                            value={program.length}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Tuition(*):
                        {formErrors.cost && <span className="error">{formErrors.cost}</span>}
                        <input
                            name="cost"
                            type="text"
                            value={program.cost}
                            onChange={handleInputChange}
                            placeholder="$"
                        />

                    </label>
                    <label>
                        Curriculum Expires on(optional):
                        <input
                            name='expiresAt'
                            type="text"
                            value={program.expiresAt || ''}
                            onChange={handleInputChange}
                            placeholder="Format: YYYY-MM-DD"
                        />
                        {formErrors.cost && <p>{formErrors.expiresAt}</p>}
                    </label>
                    <label>Is Program Active? </label>
                    <div>
                        <label>
                            <input
                                id='active-yes'
                                name='isActive'
                                type="radio"
                                value="true"
                                checked={program.isActive === true}
                                onChange={handleRadioChange}
                            />
                            Active
                        </label>
                        <label>
                            <input
                                id='active-yes'
                                name='isActive'
                                type="radio"
                                value="false"
                                checked={program.isActive === false}
                                onChange={handleRadioChange}
                            />
                            Inactive
                        </label>
                    </div>
                    {formErrors.backendErrors &&
                        <div className="error">
                            {formErrors.backendErrors.map(error => (<p key={nanoid()}>{error}</p>))}
                        </div>}
                    <p><button className="button-paper functional" type="submit" onClick={handleSubmit}>Submit</button></p>
                </form>
            </div>
            <p><Link to="/dash/programs">Back</Link></p>
        </div>
    )


    return (
        content
    )
}

export default AddProgram
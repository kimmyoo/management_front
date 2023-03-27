import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosBaseURL from '../../common/httpCommon'
import { nanoid } from 'nanoid'

const AddInstructorLicense = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const instructor = location.state // state prop passed via Link
    // states
    const [programs, setPrograms] = useState([])
    const [selectedOption, setSelectedOption] = useState('default')
    const [formErrors, setFormErrors] = useState({})
    const [license, setLicense] = useState({
      licNum: '',
      instructor: instructor.id,
      program: null,
    });
    
    useEffect(() => {
        axiosBaseURL
            .get('/programs/')
            .then((response) => {
                setPrograms(response.data)
            })
            .catch((err) => {
                console.error("error:", err)
            })
    },[])


    const handleSelectChange = (e) => {
        const programId = e.target.value
        setSelectedOption(programId)
        // find corresponding program object
        const foundProgram = programs.find(program => Number(program.id) === Number(programId))
        setLicense({...license, program: foundProgram ? foundProgram.id : null})
    }


    const handleInputChange = (e) => {
        const licenseNum = e.target.value
        setLicense({
            ...license,
            licNum: licenseNum
        })
    }

    const preValidate = () => {
        let errors = {};
        // only instructor.name is required
        if (!license.licNum.trim()){
          errors.licNum = 'License Number is required'
        }
        // select value cannot be default
        if (selectedOption === 'default'){
            errors.program = 'Select at least one program for license'
        }

        setFormErrors(errors)
        // return true if there is no error, otherwise false
        return Object.keys(errors).length === 0
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!preValidate()) return

        let errorDetails = [] // for holding backend errors
        axiosBaseURL.post('/licenses/', license)
            .then(response => {
                console.log()
                console.log('Form data submission successful:', response.data)
                navigate("/dash/instructors")
            })
            .catch(error=>{
                console.error('form submission error:', error.response.data)
                const errorObject = error.response.data // get the error Object return from backend
                for (const property in errorObject){
                errorDetails.push(<span>{property}:{errorObject[property]}</span>)
                }
                setFormErrors({...formErrors, backendErrors: errorDetails})
            });
    }


    const content = (
        <div className='form-wrapper'>
            <h2>Add Teacher License for {instructor.name}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Instructor License Number(*):
                    {formErrors.licNum && <p className="error">{formErrors.licNum}</p>}
                </label>
                <input
                    name="name"
                    type="text"
                    
                    placeholder="License#"
                    onChange={handleInputChange}
                />
                <label>
                    License Type: 
                    {formErrors.program && <p className="error">{formErrors.program}</p>}
                </label>
                <p><select name="programs" id="programs" value={selectedOption} onChange = {handleSelectChange} >
                    <option value="default">Select A Program</option>
                    {   //populate programs into option tags
                        programs.map(program => (
                            <option 
                                key={nanoid()}
                                value={program.id}
                            >
                                {program.programName}
                            </option>
                        ))
                    }
                </select>
                </p>
                {
                formErrors.backendErrors&&
                <div className="error">
                    {formErrors.backendErrors.map(error => (<p key={nanoid()}>{error}</p>))}
                </div>
                }
                <p><button type="submit" onClick={handleSubmit}>Submit</button></p>
            </form>
        </div>
    )

    return (
        content
    )
}

export default AddInstructorLicense
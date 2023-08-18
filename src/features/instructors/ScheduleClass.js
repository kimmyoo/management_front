import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { nanoid } from 'nanoid';
import axiosBaseURL from '../../common/httpCommon'
import handleBackendError from '../../common/handleBackendError'
import BackendError from '../../components/BackendError'

const ScheduleClass = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const instructor = location.state
    const [programs, setPrograms] = useState([])
    const [selectedProgram, setSelectedProgram] = useState(null)

    // state for holding form data
    const [formData, setFormData] = useState({
        'code': '',
        'begin': null,
        'end': null,
        'intBegin': null,
        'intEnd': null,
        'note': '',
        'intSite': '',
    })

    // state for holding selected options
    const [selectedOptions, setSelectedOptions] = useState({
        'license': '',
        'status': '',
        'schedule': ''
    })
    // state for form errors (holding validation and backend errors)
    const [formErrors, setFormErrors] = useState({})

    const setSelectFields = useCallback(() => {
        if (selectedOptions.license !== '') {
            const licenseId = Number(selectedOptions.license)
            const chosenLicense = instructor.licenses.find(license => { return license.id === licenseId })
            const programId = chosenLicense.program
            setSelectedProgram(programId)
        } else {
            setSelectedProgram(null)
        }
    }, [instructor, selectedOptions])

    useEffect(() => {
        axiosBaseURL
            .get('/programs/')
            .then((response) => {
                setPrograms(response.data)
            })
            .catch((error) => {
                console.error('error:', error)
            })
        setSelectFields()
        setFormErrors({})
    }, [selectedOptions, setSelectFields])

    const handleSelectChange = (e) => {
        const { name, value } = e.target
        setSelectedOptions({
            ...selectedOptions,
            [name]: value
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value.trim()
        });
    };

    // returns a bool val
    const preValidate = () => {
        let errors = {}
        if (!formData.code.trim()) {
            errors.code = "(required)"
        }
        if (!formData.begin) {
            errors.begin = "(required)"
        }
        if (!formData.end) {
            errors.end = "(required)"
        }
        if (!selectedOptions.license) {
            errors.license = "(required)"
        }
        if (!selectedOptions.status) {
            errors.status = "(required)"
        }
        if (!selectedOptions.schedule) {
            errors.schedule = "(required)"
        }
        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!preValidate()) {
            return
        }
        const classObject = { ...formData, ...selectedOptions }
        classObject['program'] = selectedProgram
        // console.log(classObject)
        axiosBaseURL.post('/classes/', classObject)
            .then(response => {
                console.log('form submission is successful', response.data)
                navigate("/dash/classes")
            })
            .catch(error => {
                console.error('form submission error:', error.response.data)
                const errorDetails = handleBackendError(error)
                setFormErrors({
                    ...formErrors,
                    backendErrors: errorDetails
                })
            })
    }

    const content = (
        <div className='form-wrapper'>
            <h3>Schedule a class for {instructor.name}</h3>
            {// if the instructor has at least one license
                instructor.licenses.length > 0 ?
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            {/* select program and license */}
                            <label>Select Program and license(*) </label>
                            {formErrors.license && <span className="error">{formErrors.license}</span>}
                            <select
                                name="license"
                                value={selectedOptions.license}
                                onChange={handleSelectChange}
                            >
                                <option value="">Choose Program and License</option>
                                {instructor.licenses.map(license => (
                                    <option key={nanoid()} value={license.id}>
                                        {programs.length > 0 ? programs.find(program => { return program.id === license.program }).programName : 'no'}
                                        ___{license.licNum}
                                    </option>
                                ))
                                }
                            </select>

                            <label>Class code(*)</label>
                            {formErrors.code && <span className="error">{formErrors.code}</span>}
                            <input type="text" name='code' value={formData.code} onChange={handleInputChange} />
                            <label>Class Status(*)</label>
                            {formErrors.status && <span className="error">{formErrors.status}</span>}
                            <p><select name="status" onChange={handleSelectChange}>
                                <option value="">Choose Status</option>
                                <option value="opn">open</option>
                                <option value="ogg">ongoing</option>
                                <option value="cld">closed</option>
                            </select></p>

                            <label>Schedule(*)</label>
                            {formErrors.schedule && <span className="error">{formErrors.schedule}</span>}
                            <p><select name="schedule" value={selectedOptions.schedule} onChange={handleSelectChange}>
                                <option value="">Select Schedule</option>
                                <optgroup label="Weekdays">
                                    <option value="wkd_day">Weekday Daytime</option>
                                    <option value="wkd_eve">Weekday Evening</option>
                                </optgroup>
                                <optgroup label="Weekend" >
                                    <option value="wknd_day">Weekend Daytime</option>
                                    <option value="wknd_eve">Weekend Evening</option>
                                    <option value="sat_day">Sat Daytime</option>
                                    <option value="sat_eve">Sat Evening</option>
                                    <option value="sun_day">Sun Daytime</option>
                                    <option value="sun_eve">Sun Evening</option>
                                </optgroup>
                            </select></p>
                            <div>
                                <label>Class starts on(*)</label>
                                {formErrors.begin && <span className="error">{formErrors.begin}</span>}
                                <p><input type="date" name="begin" onChange={handleInputChange} /></p>
                                <label>Class ends on(*)</label>
                                {formErrors.end && <span className="error">{formErrors.end}</span>}
                                <p><input type="date" name="end" onChange={handleInputChange} /></p>
                                <label>Internship starts on</label>
                                <p><input type="date" name="intBegin" onChange={handleInputChange} /></p>
                                <label>Internship ends on</label>
                                <p><input type="date" name="intEnd" onChange={handleInputChange} /></p>
                                <label>Internship Site</label>
                                <input type="text" name='intSite' onChange={handleInputChange} />
                                <label>Note</label>
                                <input type="text" name='note' onChange={handleInputChange} />
                            </div>
                            {/* backend error display component */}
                            <BackendError errors={formErrors.backendErrors} />
                            <p><button className="button-paper functional" type="submit" onClick={handleSubmit}>Submit</button></p>
                        </form>
                    </div>
                    :  // no instructor has no license yet
                    <div>
                        <h3>this teacaher has no license yet, please add a license and come back</h3>
                    </div>
            }
            <Link to="/dash/instructors">Back</Link>
        </div>
    )

    return (
        content
    )
}

export default ScheduleClass
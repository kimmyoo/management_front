import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosBaseURL from '../../common/httpCommon'
import { nanoid } from 'nanoid'
import handleBackendError from '../../common/handleBackendError'
import BackendError from '../../components/BackendError'



const EditClassModal = ({onClose, cls, license}) => {
    const navigate = useNavigate()
    const [clss, setClass] = useState(cls)
    // licenses refers to licenses of a specific program
    // not all licenses instances.
    const [licenses, setLicenses] = useState([])
    const [formErrors, setFormErrors] = useState({})

    useEffect(() => {
        axiosBaseURL.get(`/licenses/program/${license.program}`)
            .then(response=>{
                setLicenses(response.data)
            })
            .catch(error=>{
                console.error("error:", error)
            })
    }, [license])


    const handleInputChange = (e) => {
        const {name, value} = e.target
        if(name==='license'){
            setClass({
                ...clss, 
                [name]:Number(value)
            })
        }else{
            setClass({
            ...clss, 
            [name]:value
            })
        }
    }

    const preValidate = () => {
        let errors = {}
        if (!clss.code.trim()){
            errors.code = "(required)"
        }
        if (!clss.begin){
            errors.begin = "required"
        }
        if (!clss.end){
            errors.end = "required"
        }
        if (!clss.license){
            errors.license = "required"
        }
        if (!clss.status){
            errors.status = "required"
        }
        if (!clss.schedule){
            errors.schedule = "required"
        }
        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!preValidate()){
            return
        }
        

        // console.log(classObject)
        axiosBaseURL.put(`/class/detail/${clss.id}`, clss)
            .then(response => {
                console.log('form submission is successful', response.data)
                onClose()
                // here remember to change the license to current license#
                navigate(`/dash/classes/${clss.license}/${clss.id}`)
            })
            .catch(error=>{
                console.error('error',error.response.data)
                const errorDetails = handleBackendError(error)
                setFormErrors({
                    ...formErrors,
                    backendErrors: errorDetails
                })
            })
    }

    const content = (
        <div className='modal'>
            <div className='modal-background'/>
            <div className= 'modal-content'>
                <form>
                <h3>Edit Class: {cls.code}</h3>
                <button className="modal-close" onClick={onClose}>×</button>
                <div className="table">
                    <div className="row">
                        <div className="cell heading">class code</div>
                        <div className="cell">
                            <input 
                                name="code" type="text" 
                                value={clss.code} onChange={handleInputChange}
                            />
                        </div>
                        <div className="cell">
                            {formErrors.code && <span className="error">{formErrors.code}</span>}
                        </div>       
                    </div>
                    <div className="row">
                        <div className="cell heading">Schedule</div>
                        <div className="cell">
                            <select 
                                name="schedule" 
                                value={clss.schedule}
                                onChange={handleInputChange}
                            >
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
                            </select>
                        </div>
                        <div className="cell">{formErrors.schedule && <span className="error">{formErrors.schedule}</span>}</div>       
                    </div>
                    <div className="row">
                        <div className="cell heading">Begin</div>
                        <div className="cell">
                            <input 
                                name="begin" type="date" 
                                value={clss.begin} onChange={handleInputChange}
                            />
                        </div>
                        <div className="cell">{formErrors.begin && <span className="error">{formErrors.begin}</span>}</div>       
                    </div>
                    <div className="row">
                        <div className="cell heading">End</div>
                        <div className="cell">
                            <input 
                                name="end" type="date" 
                                value={clss.end} onChange={handleInputChange}
                            />
                        </div>
                        <div className="cell">{formErrors.end && <span className="error">{formErrors.end}</span>}</div>       
                    </div>
                    <div className="row">
                        <div className="cell heading">Status</div>
                        <div className="cell">
                            <select name="status" value={clss.status}  onChange={handleInputChange}>
                                <option value="opn">open</option>
                                <option value="ogg">ongoing</option>
                                <option value="cld">closed</option>
                            </select>
                        </div>
                        <div className="cell">{formErrors.status && <span className="error">{formErrors.status}</span>}</div>       
                    </div>
                    <div className="row">
                        <div className="cell heading">Intership Begin</div>
                        <div className="cell">
                            <input 
                                name="intBegin" type="date" 
                                value={clss.intBegin||""} onChange={handleInputChange}
                            />
                        </div>
                        <div className="cell"></div>       
                    </div>
                    <div className="row">
                        <div className="cell heading">Internship End</div>
                        <div className="cell">
                            <input 
                                name="intEnd" type="date" 
                                value={clss.intEnd ||""} onChange={handleInputChange}
                            />
                        </div>
                        <div className="cell"></div>       
                    </div>

                    <div className="row">
                        <div className="cell heading">Internship Site</div>
                        <div className="cell">
                            <input 
                                name="intSite" type="text" 
                                value={clss.intSite||""} onChange={handleInputChange}
                            />
                        </div>
                        <div className="cell"></div>       
                    </div>
                    <div className="row">
                        <div className="cell heading">Note</div>
                        <div className="cell">
                            <input 
                                name="note" type="text" 
                                value={clss.note||""} onChange={handleInputChange}
                            />
                        </div>
                        <div className="cell"></div>       
                    </div>
                    <div className="row">
                        <div className="cell heading">Instructor-License</div>
                        <div className="cell">
                            <select name="license" value={clss.license} onChange={handleInputChange}>
                                {
                                    licenses.map(lic =>{
                                        return <option key = {nanoid()} value={lic.id}>{lic.instructor_repr}-{lic.licNum}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="cell">{formErrors.license && <span className="error">{formErrors.license}</span>}</div>       
                    </div>
                </div>
                <BackendError errors={formErrors.backendErrors} />
                <button className='button-paper functional' onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
    return (
        content
    )
}

export default EditClassModal
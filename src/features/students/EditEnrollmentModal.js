import React from 'react'
import { useState } from 'react'
import axiosBaseURL from '../../common/httpCommon'
import handleBackendError from '../../common/handleBackendError'
import { nanoid } from 'nanoid'
import {useNavigate} from 'react-router-dom'
import disableEnterSubmit from '../../common/disableEnterSubmit'

const EditEnrollmentModal = ({onClose, stdt, classesTaken}) => {
    const navigate = useNavigate()
    const student = stdt
    const [classes, setClasses] = useState(classesTaken)
    const [formErrors, setFormErrors] = useState({})
    const [code, setCode] = useState('')


    const handleInputChange = (e) => {
        setCode (e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let studentObj = {...student}
        // enroll to a class
        if (code){
            studentObj.classes=code
        }else{ // unenroll from classes
            // for saving updated ids of updated classes.
            let classCodes = []
            classes.forEach(clss =>{
                classCodes.push(clss.id)
            })
            studentObj.classes = classCodes
      }

      axiosBaseURL.put(`/student/detail/${student.id}`, studentObj)
          .then(response=>{
            //   console.log(response.data)
              onClose()
              navigate(`/dash/students/detail/${student.id}`)
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

    const handleDelButtonClick = (classID) => {
        // filter and replace the original state.
        const updatedClasses = classes.filter((clss)=> clss.id !== classID)
        setClasses(updatedClasses)
    }


    const content = (
        <div className='modal'>
            <div className='modal-background'/>
            <div className= 'modal-content'>
            <form>
                <h3>Edit Enrollment</h3>
                <button className="modal-close" onClick={onClose}>×</button>
                <div className="table">
                    <div className="row">
                        <div className="cell heading">Enroll to:</div>
                        <div className="cell">
                            <input
                                name=""
                                type="text"
                                value={code}
                                onKeyDown={disableEnterSubmit}
                                onChange={handleInputChange}
                                
                            />
                        </div>
                        <div className="cell"><button className="button-paper functional" onClick={handleSubmit} >confirm</button></div>
                    </div>
                    <div className="row">
                        <div className="cell heading warn">Unenroll from:</div>
                        <div className="cell">
                        {classes.map((clss)=>{
                          return(
                            <button
                                type="button"
                                key={nanoid()}
                                onClick={()=>handleDelButtonClick(clss.id)}
                            >
                                {clss.code}&ensp;
                            </button>
                          )
                        })}
                        </div>
                        <div className="cell"><button className="button-paper functional" type="button" onClick={handleSubmit}>confirm</button></div>
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
            </form>
            </div>
        </div>
    )
  
    return (
        content
    )
}

export default EditEnrollmentModal
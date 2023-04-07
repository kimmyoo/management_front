import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import axiosBaseURL from "../../common/httpCommon";
import { nanoid } from 'nanoid';

const EditInstructor = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [instructor, setInstructor] = useState(location.state)
    const [formErrors, setFormErrors] = useState({});


    // handleSubmit
    const handleSubmit = (event) => {
      event.preventDefault();

      if (!preValidate()){
        return 
      }

      // form data is now prevalidated
      let errorDetails = [] // for holding backend errors
      axiosBaseURL.put(`/instructors/detail/${instructor.id}`, instructor)
        .then(response => {
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
    };

    // form data validation before submission
    const preValidate = () => {
        let errors = {};
        // only instructor.name is required
        if (!instructor.name.trim()){
          errors.name = 'Instructor name is required'
        }
        if (!instructor.tel.trim()){
          errors.tel = 'Provide at least a phone number'
        }

        setFormErrors(errors)
        // return true if there is no error, otherwise false
        return Object.keys(errors).length === 0
    };

    const handleInputChange = (e) => {
        // preValidate()
        const {name, value} = e.target;
        setInstructor({
          ...instructor,
          [name]: value
        });
    };



    // define content to be rendered
    const content = (
      <div className='form-wrapper'>
        <h2>Edit Instructor, {instructor.name}</h2>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label>
              Instructor Name(*):
              {formErrors.name && <span className="error">{formErrors.name}</span>}
              <input
                name="name"
                type="text"
                value={instructor.name}
                placeholder="Last Name, First Name"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Phone Number(*):
              {formErrors.tel && <span className="error">{formErrors.tel}</span>}
              <input
                name="tel"
                type="text"
                value={instructor.tel}
                placeholder="888-888-8888"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email(optional):
              {formErrors.email && <p className="error">{formErrors.email}</p>}
              <input
                name="email"
                type="text"
                value={instructor.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Address(optional):
              {formErrors.address && <p className="error">{formErrors.address}</p>}
              <input
                name="address"
                type="text"
                value={instructor.address}
                onChange={handleInputChange}
              />
            </label>
            {formErrors.backendErrors&&
              <div className="error">
                {formErrors.backendErrors.map(error => (<p key={nanoid()}>{error}</p>))}
              </div>}
            <p><button type="submit" onClick={handleSubmit}>Submit</button></p>
          </form>
        </div>
        <p><Link to="/dash/instructors">Back to Instructors</Link></p>
      </div>
    )
    return (
        content
    )
}

export default EditInstructor
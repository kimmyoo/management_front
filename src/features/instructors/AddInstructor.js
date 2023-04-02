import React from 'react'
import {nanoid }from 'nanoid'
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axiosBaseURL from "../../common/httpCommon";


const AddInstructor = () => {
    const navigate = useNavigate()

    const [instructor, setInstructor] = useState({
      name:'',
      tel:'',
      email:'',
      address:'',
      // when creating the default array of licenses is empty
      licenses:[]
    });

    const [formErrors, setFormErrors] = useState({});

    // handleSubmit
    const handleSubmit = (event) => {
      event.preventDefault();

      if (!preValidate()){
        return  
      }

      // form data is now prevalidated
      let errorDetails = [] // for holding backend errors
      axiosBaseURL.post('/instructors/', instructor)
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
          [name]: value.trim()
        })
    };


    // define content to be rendered
    const content = (
      <div className='form-wrapper'>
        <h2>Add a New Instructor</h2>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label>
              Instructor Name(*):
              {formErrors.name && <p className="error">{formErrors.name}</p>}
            </label>
              <input
                name="name"
                type="text"
                // value={instructor.name} // deleting this makes it uncontrolled 
                placeholder="Last Name, First Name"
                onChange={handleInputChange}
              />
            
            <label>
              Phone Number(*):
              {formErrors.tel && <p className="error">{formErrors.tel}</p>}
            </label>
              <input
                name="tel"
                type="text"
                value={instructor.tel}
                placeholder="888-888-8888"
                onChange={handleInputChange}
              />
            
            <label>
              Email(optional):
              {formErrors.email && <p className="error">{formErrors.email}</p>}
            </label>
              <input
                name="email"
                type="text"
                value={instructor.email}
                onChange={handleInputChange}
              />
            
            <label>
              Address(optional):
              {formErrors.address && <p className="error">{formErrors.address}</p>}
            </label>
              <input
                name="address"
                type="text"
                value={instructor.address}
                onChange={handleInputChange}
              />
            
            {
              formErrors.backendErrors&&
              <div className="error">
                {formErrors.backendErrors.map(error => (<p key={nanoid()}>{error}</p>))}
              </div>
            }

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

export default AddInstructor
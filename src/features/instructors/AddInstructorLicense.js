import React from 'react'
import { useLocation } from 'react-router-dom'

const AddInstructorLicense = () => {
    const location = useLocation()
    const instructor = location.state

    return (
        <div>Add Teacher License for {instructor.name}</div>
    )
}

export default AddInstructorLicense
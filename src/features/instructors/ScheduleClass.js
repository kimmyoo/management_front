import React from 'react'
import { useLocation } from 'react-router-dom'


const ScheduleClass = () => {

    const location = useLocation()
    const instructor = location.state
    console.log(instructor)

    return (
    <div>Schedule a class for {instructor.name}</div>
    )
    }

export default ScheduleClass
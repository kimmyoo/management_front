import axiosBaseURL from '../../common/httpCommon';
import { useState, useEffect } from 'react';
import InstructorsDisplay from './InstructorsDisplay';
import React from 'react';


const InstructorList = () => {
    const [instructors, setInstructors] = useState([])
    const [programs, setPrograms] = useState([])

    useEffect(() => {
        // fetching programs and instructors
        Promise.all([
            axiosBaseURL.get('/programs/'),
            axiosBaseURL.get('/instructors/')
        ])
            .then(response => {
                setPrograms(response[0].data)
                setInstructors(response[1].data)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    return (
        <InstructorsDisplay instructors={instructors} programs={programs} />
    );

}

export default InstructorList
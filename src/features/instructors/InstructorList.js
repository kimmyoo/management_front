import axiosBaseURL from '../../common/httpCommon';
import { useState, useEffect } from 'react';

const InstructorList = () => {

    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [instructors, setInstructors]  = useState([])

    useEffect(() => {
        axiosBaseURL.get('/instructors')
        .then(response => {
            setInstructors(response.data)
        })
        .catch(error=>{
            console.error(error)
        })
    }, [])

    const handleClick = (instructor) => {
        setSelectedInstructor(instructor);
    }

    const content = (
        <div>
            <h2>Instructors</h2>
            <ul>
                {instructors.map(instructor => (
                <li key={instructor.id}>
                    <button onClick={() => handleClick(instructor)}>{instructor.name}</button>
                </li>
                ))}
            </ul>

            {selectedInstructor && (
                <div>
                    <h3>{selectedInstructor.name}</h3>
                    <p>Phone: <a href={`tel:${selectedInstructor.tel}`}>{selectedInstructor.tel}</a></p>
                    <p>email: <a href={`mailto:${selectedInstructor.email}`}>Send Email</a></p>
                    <p>Address: {selectedInstructor.address}</p>
                </div>
            )}
        </div>
    )

    return (
        content
    );

}

export default InstructorList
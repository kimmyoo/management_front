import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';




const InstructorsDisplay = ({instructors, programs}) => {
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [displayInstructors, setDisplayInstructors] =useState([])
    const [selectedOption, setSelectedOption] = useState('default')
    
    useEffect(() => {
        let filteredInstructors
        const programId = selectedOption
        filteredInstructors = instructors.filter(instructor => {
            // if the instructor does have at least one license
            if (instructor.licenses.length > 0){
                // array.some() returns boolean val
                return instructor.licenses.some((license) => Number(license.program) === Number(programId))
            }
            return false // if no license, don't add him/her to filteredInstructors
        })
        // check to see current selected option and set state accordingly
        if (selectedOption === 'default'){
            setDisplayInstructors(instructors)
        }else{
            setDisplayInstructors(filteredInstructors)
        }
        
    }, [instructors, selectedOption])

    const handleClick = (instructor) => {
        setSelectedInstructor(instructor);
    }

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value)
        console.log(selectedOption)
    }

    const content = (
        <div className="instructor-list-container">
            <div className='instructor-left'>
            <h2>Instructors</h2> 
            <Link to="add">Add a New Instructor</Link>
            <p><label htmlFor="programFilter">Filter by Program</label></p>
            <select name="programs" id="programs" value={selectedOption} onChange = {handleSelectChange} >
                <option value="default">All Instructors</option>
                {
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
            <ul>
                {
                    displayInstructors.length !== 0? displayInstructors.map(instructor => (
                    <li key={nanoid()}>
                        <button className="button-paper" onClick={() => handleClick(instructor)}>{instructor.name}</button>
                    </li>
                    )):<li>Nothing to display</li>
                }
            </ul>
            </div>

            <div className='instructor-right'>
            {selectedInstructor && (
                <div>
                    <h3>Instructor: {selectedInstructor.name}</h3>
                    {/* passing state props through Link */}
                    <Link to="edit" state={selectedInstructor}>Edit Instructor</Link>&emsp;
                    <Link to="add-license" state={selectedInstructor}>Add License</Link>&emsp;
                    <Link to="schedule" state={selectedInstructor}>Schedule Class</Link>
                    <p>Phone: {selectedInstructor.tel}</p>
                    {/* <p>E-mail: <a href={`mailto:${selectedInstructor.email}`}>{selectedInstructor.email}</a></p> */}
                    <p>E-mail: {selectedInstructor.email}</p>
                    <p>Address: {selectedInstructor.address}</p>

                    {/* displays license only if she/he has a license */}
                    {selectedInstructor.licenses.length!==0 && 
                        <div> Program and license: {
                            selectedInstructor.licenses.map(license => (
                                <p key={nanoid()}>
                                    {/* filter to find out corresponding program object and use programName in span*/} 
                                    {programs.find(program => {return program.id === license.program}).programName}__
                                    ({license.licNum})
                                </p>
                            ))
                            }
                        </div>}
                </div>
            )}
            {!selectedInstructor&& <h3>Click on Teacher buttons to view, edit the instructor</h3> }
            </div>
        </div>
    )

    return (
        content
    )
}

export default InstructorsDisplay
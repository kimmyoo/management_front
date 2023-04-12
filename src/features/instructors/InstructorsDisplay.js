import React from 'react'
import { useState, useEffect, useCallback} from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';



const InstructorsDisplay = ({instructors, programs}) => {
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [displayInstructors, setDisplayInstructors] =useState([])
    const [selectedOption, setSelectedOption] = useState('default')


    const filterInstructorsByProgram = useCallback(() => {
        const programId = selectedOption
        // console.log(programId)
        const res = instructors.filter(instructor => {
            // if the instructor does have at least one license
            if (instructor.licenses.length > 0){
                // array.some() returns boolean val
                return instructor.licenses.some((license) => Number(license.program) === Number(programId))
            }
            return false // if no license, don't add him/her to filteredInstructors
        })
        return res
    }, [instructors, selectedOption])


    useEffect(() => {
        let filteredInstructors
        filteredInstructors = filterInstructorsByProgram()
        // check to see current selected option and set state accordingly
        if (selectedOption === 'default'){
            setDisplayInstructors(instructors)
        }else{
            setDisplayInstructors(filteredInstructors)
        }
    }, [instructors, selectedOption, filterInstructorsByProgram])

    // select a specific instructor
    const handleClick = (instructor) => {
        setSelectedInstructor(instructor);
    }

    // select an option
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value)
    }

    // define content to render
    const content = (
        <div className="instructor-list-container">
            <div className='instructor-left'>
            <h3>Instructors</h3>
            
            <div className='table-link'><Link to="add">Add a New Instructor</Link></div>
            <p>
            <div className="half-length" >
            <select name="programs" id="programs" value={selectedOption} onChange = {handleSelectChange} >
                <option value="default">All Programs</option>
                {   //populate programs into option tags
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
            </div>
            </p>
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
                <>
                    <h3>Instructor: {selectedInstructor.name}</h3>
                    {/* passing state props through Link */}
                    <Link to="edit" state={selectedInstructor}>Edit</Link>&emsp;
                    <Link to="add-license" state={selectedInstructor}>Add License</Link>&emsp;
                    <Link to="schedule" state={selectedInstructor}>Schedule Class</Link>
                    <p>Phone: {selectedInstructor.tel}</p>
                    {/* <p>E-mail: <a href={`mailto:${selectedInstructor.email}`}>{selectedInstructor.email}</a></p> */}
                    <p>E-mail: {selectedInstructor.email}</p>
                    <p>Address: {selectedInstructor.address}</p>

                    {/* displays license only if she/he has a license */}
                    {selectedInstructor.licenses.length!==0 && 
                        <div> Program and license: 
                            {
                                selectedInstructor.licenses.map(license => (
                                    <p key={nanoid()}>
                                        {/* filter to find out corresponding program object and use programName in span*/} 
                                        {programs.find(program => {return program.id === license.program}).programName}__
                                        ({license.licNum})
                                    </p>
                                ))
                            }
                        </div>
                    }
                </>
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
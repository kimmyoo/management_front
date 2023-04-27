import React from 'react'
import { useState, useEffect, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserPlus, faUserPen, faAdd, faCalendarPlus } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from '../../components/DashLayout';

const InstructorsDisplay = ({ instructors, programs }) => {
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [displayInstructors, setDisplayInstructors] = useState([])
    const [selectedOption, setSelectedOption] = useState('default')
    const user = useContext(UserContext)

    const filterInstructorsByProgram = useCallback(() => {
        const programId = selectedOption
        const res = instructors.filter(instructor => {
            // if the instructor does have at least one license
            if (instructor.licenses.length > 0) {
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
        if (selectedOption === 'default') {
            setDisplayInstructors(instructors)
        } else {
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
        <div className="content-wrapper">
            <div className='search-wrapper'>
                <h3>Instructors</h3>
                {
                    user?.is_superuser
                    &&
                    <p className='right-side'>
                        {/* add instructor Link */}
                        <Link to="add"><FontAwesomeIcon icon={faUserPlus} />Add</Link>
                    </p>
                }
                <div className="half-length" >
                    <select name="programs" id="programs" value={selectedOption} onChange={handleSelectChange} >
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

                <ul>
                    {
                        displayInstructors.length !== 0 ? displayInstructors.map(instructor => (
                            <li key={nanoid()}>
                                <button className="button-paper instructor" onClick={() => handleClick(instructor)}>{instructor.name}</button>
                            </li>
                        )) : <li>Nothing to display</li>
                    }
                </ul>
            </div>

            <div className='result-wrapper'>
                {selectedInstructor && (
                    <>
                        <h3>{selectedInstructor.name.toUpperCase()}</h3>
                        {/* passing state props through Link */}
                        {
                            user?.is_superuser &&
                            <p>
                                <Link to="edit" state={selectedInstructor}><FontAwesomeIcon icon={faUserPen} />Edit</Link>&emsp;
                                <Link to="add-license" state={selectedInstructor}><FontAwesomeIcon icon={faAdd} />Add Lic</Link>&emsp;
                                <Link to="schedule" state={selectedInstructor}><FontAwesomeIcon icon={faCalendarPlus} />Schedule</Link>
                            </p>
                        }
                        <p>Phone: {selectedInstructor.tel}</p>

                        {/* <p>E-mail: <a href={`mailto:${selectedInstructor.email}`}>{selectedInstructor.email}</a></p> */}
                        <p>E-mail: {selectedInstructor.email}</p>
                        <p>Address: {selectedInstructor.address}</p>

                        {/* displays license only if she/he has a license */}
                        {selectedInstructor.licenses.length !== 0
                            ?
                            <div> Program and license:
                                {
                                    selectedInstructor.licenses.map(license => (
                                        <p key={nanoid()}>
                                            {/* filter to find out corresponding program object and use programName in span*/}
                                            {programs.find(program => { return program.id === license.program }).programName}__
                                            ({license.licNum})
                                        </p>
                                    ))
                                }
                            </div>
                            :
                            <p className='warn'>
                                this instructor has no license yet.
                            </p>
                        }
                    </>
                )}
                {!selectedInstructor && <h3>Click on Teacher buttons to view or edit the instructor</h3>}
            </div>
        </div>
    )

    return (
        content
    )
}

export default InstructorsDisplay
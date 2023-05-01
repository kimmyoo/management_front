import ProgramFolder from "../../components/ProgramFolder"
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import axiosBaseURL from "../../common/httpCommon";
import { UserContext } from "../../components/DashLayout";
import React from 'react';


const ProgramList = () => {
    // initilize programs to an empty array
    const [programs, setPrograms] = useState([]);
    const user = useContext(UserContext)
    // fetching data
    useEffect(() => {
        axiosBaseURL.get('/programs/')
            .then(response => {
                setPrograms(response.data)
            })
            .catch(error => {
                console.error('error:', error)
            });
    }, [])

    // create folder divs using fetched data
    const folders = programs.map((program) =>
        <ProgramFolder key={program.id} program={program} />
    )

    // generate content to render
    const content = (
        <div className="content-wrapper">
            <h3>Program Overview</h3>
            {
                user?.is_superuser
                &&
                <div className="right-side">
                    <p>
                        <Link to="/dash/programs/add">
                            <button className="button-paper functional">Add New Program</button>
                        </Link>
                    </p>
                </div>
            }
            <div className='all-programs-wrapper'>
                {folders.length > 0 ? folders : <p>No Data passed in</p>}
            </div>
        </div>
    )

    return (
        content
    )
}

export default ProgramList
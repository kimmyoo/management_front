import ProgramFolder from "../../components/ProgramFolder"
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import axiosBaseURL from "../../common/httpCommon";


const ProgramList = () => {
    // initilize programs to an empty array
    const [programs, setPrograms] = useState([]);
    
    // fetching data
    useEffect(() => {
        axiosBaseURL.get('/programs/')
            .then(response => {
                setPrograms(response.data)
            })
            .catch(error=>{
                console.error('error:', error)
            });
    }, [])

    // create folder divs using fetched data
    const folders = programs.map((program) =>
        <ProgramFolder key = {program.id} program={program} />
    )

    // generate content to render
    const content = (
        <div className="content-wrapper">
            <h2>Program Overview</h2>
            <div className="nav subnav">
                 <p>
                    <Link to="/dash/programs/add">Add New Program</Link>
                 </p>
            </div>
            <div className='all-programs-wrapper'>   
                {folders}
            </div>
        </div>
    )

    return (
        content
    )
}

export default ProgramList
import React from 'react'
import ProgramFolder from '../../components/ProgramFolder'

import programData from '../../data/programData.json'
import tenClassesData from '../../data/tenClassesData.json'

const AllProgramList = () => {

    const programs = programData.map((program) =>
        {   
            // create a new array to hold ten class for a specific program
            const classArray = []
            for (let i = 0; i < tenClassesData.length; i++){
                if (tenClassesData[i].program === program.programName)
                classArray.push(tenClassesData[i].classCode)
            }
            return <ProgramFolder key = {program.id} program={program} programClassList={classArray} />
        } 
    )

    const content = (
        <div className='content-wrapper'>
            <h2>Select a Program Folder</h2>
            <div className='all-programs-wrapper'>   
                {programs}
            </div>
        </div>
    )

    return (
        content
    )
}

export default AllProgramList
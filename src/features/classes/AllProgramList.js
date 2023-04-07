import { useState, useEffect } from 'react'
import ProgramFolder from '../../components/ProgramFolder'
import axiosBaseURL from '../../common/httpCommon'
import { nanoid } from 'nanoid';


const AllProgramList = () => {

    useEffect(() => {
        // fetching programs and instructors
        Promise.all([
            axiosBaseURL.get('/programs/'),
            axiosBaseURL.get('/tenclasses/in/allprograms/')
        ])
        .then(response => {
            setPrograms(response[0].data)
            setClassList(response[1].data)
        })
        .catch(error=>{
            console.error(error)
        })
    }, [])

    const [programs, setPrograms] = useState([])
    const [classList, setClassList] = useState([])


    const content = (
        <div className='content-wrapper'>
            <h2>Select a Program Folder</h2>
            <div className='all-programs-wrapper'>
                {programs.map(program => {
                    const classesOfThisProgram = classList.filter(clss =>
                        {return Number(clss.program) === Number(program.id)}
                    )
                    return <ProgramFolder key={nanoid()} program={program} programClassList={classesOfThisProgram}/>
                    
                })}
            </div>
        </div>
    )

    return (
        content
    )
}

export default AllProgramList
import { nanoid } from "nanoid"
import { Link } from "react-router-dom"



const ProgramFolder = ({program, programClassList}) => {

    let classes
    let programInfo
    // check to see if programClassList is passed to props
    if (programClassList){
        classes = programClassList.map(clss=>
            <li key={nanoid()} >
                <Link 
                    to={`${clss.license}/${clss.id}`}
                    // state={clss}
                ><button className="button-paper">{clss.code}</button></Link>
            </li>
        )
    }else{
        programInfo = (
            <>  
                <p>Program Code: {program.programCode}</p>
                <p>Length:{`${program.length} hrs`}</p>
                <p>Cost: {`$ ${program.cost}`}</p>
                <p>isActive:{program.isActive? "Yes" : "No"}</p>
                <p>Expires on: {program.expiresAt}</p>
                {/* <p>{program.licenses.map(license => (
                    <p>{license.licNum}</p>
                ))}</p> */}
                <p>Edit</p>
            </>
        )
    }

    const content = (
        <div className="program-folder">
            <div className="program-folder-ear">{program.programName}</div>
            {programClassList && <ul>{classes}</ul>}
            {programInfo}
        </div>
    )

    return (
        content
    )
}

export default ProgramFolder
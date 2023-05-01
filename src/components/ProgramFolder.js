import { nanoid } from "nanoid"
import { Link } from "react-router-dom"
import React from 'react';



const ProgramFolder = ({ program, programClassList }) => {

    let classes
    let programInfo
    // check to see if programClassList is passed to props
    if (programClassList) {
        classes = programClassList.map(clss =>
            <li key={nanoid()} >
                <Link
                    to={`${clss.license}/${clss.id}`}
                >
                    <button className={
                        `button-paper ${clss.status === "opn"
                            ? "open" : clss.status === "ogg"
                                ? "ongoing" : "closed"}`
                    }>{clss.code}
                    </button>
                </Link>
            </li>
        )
    } else {
        programInfo = (
            <>
                <p>Program Code: {program.programCode}</p>
                <p>Length:{`${program.length} hrs`}</p>
                <p>Cost: {`$ ${program.cost}`}</p>
                <p>Status:{program.isActive ? "Active" : "Inactive"}</p>
                <p>Expires on: {program.expiresAt}</p>
                {/* <p>{program.licenses.map(license => (
                    <p>{license.licNum}</p>
                ))}</p> */}
            </>
        )
    }

    const content = (
        <div className="program-folder">
            <div className="program-folder-ear"><Link to={`/dash/classes/in/program/${program.id}`}>{program.programName}</Link></div>
            {programClassList && <ul>{classes}</ul>}
            {programInfo}
        </div>
    )

    return (
        content
    )
}

export default ProgramFolder
const ProgramFolder = ({program, programClassList}) => {

    let classes
    let programInfo
    // check to see if programClassList is passed to props
    if (programClassList){
        classes = programClassList.map((clss, index)=>
            <li key={index}><button className="button-paper">{clss}</button></li>
        )
    }else{
        programInfo = (
            <>  
                <p>Program Code: {program.programCode}</p>
                <p>Program Name:{program.programName}</p>
                <p>Length:{`${program.length} hrs`}</p>
                <p>Cost: {`$ ${program.cost}`}</p>
                <p>isActive:{program.isActive? "Yes" : "No"}</p>
                <p>Expires on: {program.expiresAt}</p>
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
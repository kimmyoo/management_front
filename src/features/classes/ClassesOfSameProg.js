import { useState, useEffect } from "react"
import axiosBaseURL from "../../common/httpCommon"
import { useParams } from "react-router-dom"
import ClassRow from "../../components/ClassRow"
import { nanoid } from "nanoid"

const ClassesOfSameProg = () => {
    const {programID} = useParams()
    const [classes, setClasses] = useState([])

    useEffect(() => {
        axiosBaseURL.get(`/classes/in/program/${programID}`)
        .then(response=>{
            // console.log("successfully obtain classes data")
            setClasses(response.data)
        })
        .catch(error=>{
            console.error(error)
        })
    },[programID])

    const content = (
        <div className="content-wrapper">
            <h3>All classes of selected program</h3>
            <div className="table">
                <div className="row">
                    <div className="cell heading">class code</div>
                    <div className="cell heading">Begin</div>
                    <div className="cell heading">End</div>
                    <div className="cell heading">Schedule</div>
                    <div className="cell heading">license#</div>
                </div>
                {
                    classes.map(clss=>{
                        return <ClassRow key={nanoid()} clss={clss}/>
                    })
                }
            </div>
        </div>
    )

    return (
        content
    )
}

export default ClassesOfSameProg
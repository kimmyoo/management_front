import { useEffect, useState} from "react"
import axiosBaseURL from "../../common/httpCommon"
import StudentAvatar from "../../components/StudentAvatar"
import { nanoid } from "nanoid"
import AddStudentModal from "./AddStudentModal"


const RecentStudents = () => {
    const [students, setStudents] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        axiosBaseURL.get('/students/')
          .then(response => {
            setStudents(response.data)
          })
          .catch(error=>{
            console.error(error)
          })
    },[showModal])



    // modal controls 
    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const content = (
      <div className="content-wrapper">
        <h3>Recently Updated Students and student with no class association</h3>
        <p className="right-side"><button className="button-paper functional" onClick={handleOpenModal}>Register</button></p>
        {
          students.map((student) => {
            return(
                <StudentAvatar key={nanoid()} student={student}/>
            )
          })
        }
        {
          showModal&&<AddStudentModal onClose={handleCloseModal}/>
        }
      
      </div>
    )


    return (
      content
    )
}

export default RecentStudents
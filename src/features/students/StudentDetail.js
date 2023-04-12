import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosBaseURL from '../../common/httpCommon'
import StudentProfile from '../../components/StudentProfile'
// import { Link } from 'react-router-dom'
import EditStudentModal from './EditStudentModal'
import EditEnrollmentModal from './EditEnrollmentModal'

const StudentDetail = () => {
    const {stdtID} = useParams()
    const [student, setStudent] = useState({})
    const [classesTaken, setClassesTaken] = useState([])
    const [showEditModal, setShowEditModal] = useState(false)
    const [showEnrollModal, setShowEnrollModal] = useState(false)

    useEffect(() => {
        Promise.all([
            axiosBaseURL.get(`student/detail/${stdtID}`),
            axiosBaseURL.get(`classes/takenby/student/${stdtID}`)
        ])
        .then(response=>{
            setStudent(response[0].data)
            setClassesTaken(response[1].data)
            console.log("student and classes taken obtained successfully")
        })
        .catch(error=>{
            console.error(error, error)
        })
    },[stdtID, showEditModal, showEnrollModal])

    // modal controls 
    const handleOpenEditModal = () => {
        setShowEditModal(true)
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false)
    }

    const handleOpenEnrollModal = () => {
        setShowEnrollModal(true)
    }

    const handleCloseEnrollModal = () => {
        setShowEnrollModal(false)
    }


    const content = (
        <div className='content-wrapper'>
            <h3>Student Profile Page</h3>
            <div className='table-link'>
                <button onClick={handleOpenEditModal}>Edit Student</button>&emsp;
                <button onClick={handleOpenEnrollModal}>Edit Enrollment</button>
            </div>
            <StudentProfile student={student} classes={classesTaken}/>
            {
                showEditModal
                &&<EditStudentModal onClose={handleCloseEditModal} stdt={student} />
            }
            {
                showEnrollModal
                &&
                <EditEnrollmentModal
                    onClose={handleCloseEnrollModal} 
                    stdt={student}
                    classesTaken={classesTaken}
                />
            }
        </div>
    )

    return (
        content
    )
}

export default StudentDetail
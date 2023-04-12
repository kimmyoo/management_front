import { useEffect, useState} from "react"
import axiosBaseURL from "../../common/httpCommon"
import StudentAvatar from "../../components/StudentAvatar"
import { nanoid } from "nanoid"


const RecentStudents = () => {

  const [students, setStudents] = useState([])

  useEffect(() => {
      axiosBaseURL.get('/students/')
        .then(response => {
          setStudents(response.data)
        })
  },[])

  const content = (
    <div className="content-wrapper">
      <h3>Recently Updated Students and student with no class association</h3>
      {
        students.map((student) => {
          return(
          
              <StudentAvatar key={nanoid()} student={student}/>

          )
        })
      }
    
    </div>
  )


  return (
    content
  )
}

export default RecentStudents
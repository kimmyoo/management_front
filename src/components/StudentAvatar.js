import React from 'react'
import { Link } from 'react-router-dom'


const StudentAvatar = ({student}) => {
  return (
    <div className={`avatar ${student.gender==='f'? "female" : "male"} ${student.classes.length===0 ? "hasNoClass":"hasClass"}`} >
        <p>
            <Link to={`/dash/students/detail/${student.id}`}>
              {student.studentID}
            </Link>
        </p>
        <p>{student.lName.toUpperCase()}, {student.fName}</p>
        <p>{student.phone}</p>
    </div>
  )
}

export default StudentAvatar
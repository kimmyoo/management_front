import React from 'react'
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'


const StudentProfile = ({student, classes}) => {
  return (
        <div className="table">
            <div className="row">
              <div className="cell heading">Student ID:</div>
              <div className="cell">{student.studentID}</div>
            </div>
            <div className="row">
              <div className="cell heading">Name:</div>
              <div className="cell">{student.lName}, {student.fName}</div>
            </div>
            <div className="row">
              <div className="cell heading">DOB:</div>
              <div className="cell">{student.dob}</div>
            </div>
            <div className="row">
              <div className="cell heading">Gender:</div>
              <div className="cell">{student.gender}</div>
            </div>
            <div className="row">
              <div className="cell heading">SSN:</div>
              <div className="cell">{student.last4Digits}</div>
            </div>
            <div className="row">
              <div className="cell heading">Phone Num:</div>
              <div className="cell">{student.phone}</div>
            </div>
            <div className="row">
              <div className="cell heading">Email:</div>
              <div className="cell">{student.email}</div>
            </div>
            <div className="row">
              <div className="cell heading">Address:</div>
              <div className="cell">{student.address}</div>
            </div>
            <div className="row">
              <div className="cell heading">Account Info:</div>
              <div className="cell">{student.accountInfo}</div>
            </div>
            <div className="row">
              <div className="cell heading">Notes:</div>
              <div className="cell">{student.note}</div>
            </div>
            <div className="row">
              <div className="cell heading">classes taken:</div>
              <div className="cell">
                  {classes.map((clss)=>{
                    return(
                      <span key={nanoid()}>
                        <Link
                          to={`/dash/classes/${clss.license}/${clss.id}`}
                        >
                        {clss.code}&ensp;
                        </Link>
                      </span>
                    )
                  })}
              </div>
            </div>
            <div className="row">
              <div className="cell heading">created at:</div>
              <div className="cell">{student.createdAt}</div>
            </div>
            <div className="row">
              <div className="cell heading">updated at:</div>
              <div className="cell">{student.updatedAt}</div>
            </div>
        </div>
  )
}

export default StudentProfile
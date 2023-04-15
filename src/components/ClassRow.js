import React from 'react'
import { Link } from 'react-router-dom'

const ClassRow = ({clss}) => {
  return (
    <div className="row">
        <div className='cell'>
                <Link 
                    to={`/dash/classes/${clss.license}/${clss.id}`}
                >
                    <button className={
                        `button-paper ${clss.status==="opn"
                        ?"open": clss.status==="ogg"
                        ?"ongoing":"closed"}`
                        }>{clss.code}
                    </button>
                </Link>
        </div>
        <div className='cell'>{clss.begin}</div>
        <div className='cell'>{clss.end}</div>
        <div className='cell'>{clss.schedule}</div>
        <div className='cell'>{clss.licNum_repr}</div>
    </div>
  )
}

export default ClassRow
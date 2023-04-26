import { useState, useEffect, useMemo, useContext} from 'react'
import { useParams, Link} from 'react-router-dom'
import { useTable } from 'react-table'
import { STUDENT_LIST_HEADER } from '../../common/tableheaders'
import axiosBaseURL from '../../common/httpCommon'
import EnrollToClass from './EnrollToClass'
import EditClassModal from './EditClassModal'
import { UserContext } from '../../components/DashLayout'


const ClassDetail = () => {
    // states and context data
    const user = useContext(UserContext)
    const {licID, clssID } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [clss, setClss] = useState({})
    const [students, setStudets] = useState([])
    const [license, setLicense] = useState({})
    const [showEnrollModal, setShowEnrollModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    
    // for react tables
    const columns = useMemo(()=>STUDENT_LIST_HEADER, [])
    const data = useMemo(()=>students, [students])
    const tableIntance = useTable({
        columns: columns,
        data: data
    })
    const { 
        getTableProps, 
        getTableBodyProps,
        headerGroups, 
        rows,
        prepareRow
    } = tableIntance

    // getting data and set states. 
    useEffect(() => {
        Promise.all([
            axiosBaseURL.get(`/class/detail/${clssID}`),
            axiosBaseURL.get(`/students/in/class/${clssID}/`),
            axiosBaseURL.get(`/licenses/${licID}`)
        ])
        .then(response => {
            setClss(response[0].data)
            setStudets(response[1].data)
            setLicense(response[2].data)
            setIsLoading(false)
        })
        .catch(error=>{
            console.error('failed to retrieve data:', error.response)
        })
    }, [showEnrollModal, showEditModal, clssID, licID])

    // modal controls 
    const handleOpenEnrollModal = () => {
        setShowEnrollModal(true)
    }
    const handleCloseEnrollModal = () => {
        setShowEnrollModal(false)
    }
    const handleOpenEditModal = () => {
        setShowEditModal(true)
    }
    const handleCloseEditModal = () => {
        setShowEditModal(false)
    }

    const content = (
        <div className='content-wrapper'>
            <h3>PROGRAM: {license.program_repr} ---{clss.code} Class Detail</h3>
            <div className='right-side'>
                <button className='button-paper functional' onClick={handleOpenEnrollModal}>Enroll Student</button>&emsp;
                {user?.is_superuser&&<button className='button-paper functional' onClick={handleOpenEditModal}>Edit Class</button>}
            </div>
            <p className='class-info'>
                {isLoading ? "loading..." :
                `${students.length} Student(s) Enrolled`}&emsp;
                From: {clss.begin} to {clss.end}&emsp; 
                Schedule: {clss.schedule}&emsp; 
                Status: {clss.status}&emsp; 
                instructor: {license.instructor_repr}
            </p>
            <div className='table-wrapper'>
            {
                students.length > 0
                ?
                <table {...(getTableProps())}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {
                            rows.map(row => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {
                                            row.cells.map((cell) => {
                                                if (cell.column.Header === 'ID')
                                                    {return <td {...cell.getCellProps()}> <Link to={`/dash/students/detail/${row.original.id}`}>{cell.render('Cell')}</Link> </td>}
                                                else 
                                                    return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                                            })
                                        }
                                    </tr>
                                )})
                        }
                    </tbody>
                </table>
                :<h3>No student enrolled yet; nothing to display</h3>
            }
            </div>

            {/* enroll student modal component */}
            {
                showEnrollModal&&<EnrollToClass onClose={handleCloseEnrollModal} clss={clss} licID={license.id}/>
            }
            {
                showEditModal&&<EditClassModal onClose={handleCloseEditModal} cls={clss} license={license}/>
            }
        </div>
    )

    return (
        content
    )
}

export default ClassDetail
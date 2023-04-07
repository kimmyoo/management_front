import { useState, useEffect, useMemo} from 'react'
import { useParams, Link} from 'react-router-dom'
import { useTable } from 'react-table'
import { STUDENT_LIST_HEADER } from '../../common/tableheaders';
import axiosBaseURL from '../../common/httpCommon'
import EnrollToClass from './EnrollToClass';

const ClassDetail = () => {
    // states
    const {licID, clssID } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [clss, setClss] = useState({})
    const [students, setStudets] = useState([])
    const [license, setLicense] = useState({})
    const [showModal, setShowModal] = useState(false);
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
    }, [showModal, clssID, licID])

    // modal controls 
    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const content = (
        <div className='content-wrapper'>
            <h2>{license.program_repr} {clss.code} Class Detail</h2>
            <div className='table-link'>
                <button  onClick={handleOpenModal}>Enroll Student</button>&emsp;
                <Link to="edit" >Edit Class</Link>
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
                showModal&&<EnrollToClass onClose={handleCloseModal} clss={clss} licID={license.id}/>
            }
        </div>
    )

    return (
        content
    )
}

export default ClassDetail
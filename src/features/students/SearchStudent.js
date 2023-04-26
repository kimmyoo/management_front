import React from 'react'
import { useState, useEffect} from 'react'
import axiosBaseURL from '../../common/httpCommon'
import StudentAvatar from '../../components/StudentAvatar'
import { nanoid } from 'nanoid'


const SearchStudent = () => {
    const [propToSearch, setPropToSearch] = useState('')
    const [searchRes, setSearchRes] = useState([])
    const [term, setTerm] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)
    const [debouncedTerm, setDebouncedTerm] = useState(term);

    const isValidDate= (dateString)=>{
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        if(!dateString.match(regEx)) return false;  // Invalid format
        var d = new Date(dateString);
        var dNum = d.getTime();
        if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0,10) === dateString;
    }

    // update 'term' value after 1 second from the last update of 'debouncedTerm'
    useEffect(() => {
        const timer = setTimeout(() => setTerm(debouncedTerm), 1000);
        return () => clearTimeout(timer);
    }, [debouncedTerm])


    useEffect(() => {
        // perform search
        const onSearchSubmit = term => {
            axiosBaseURL.post(
                '/students/search/', 
                {'prop': propToSearch, 'term': term.trim()}
            )
            .then(response=>{
                setSearchRes(response.data)
            })
            .catch(error=>{
                console.error(error)
            })
        }
        // clear search res
        const clearSearchRes = () => setSearchRes([])
        
        // validation
        const validate = () => {
            let flag = false
            if (propToSearch===""){
                flag = false
                setErrorMsg("Select a search field")
            }
            else if(propToSearch==="dob" && !isValidDate(term)){
                flag = false
                setErrorMsg("DOB format: YYYY-MM-DD")
            }
            else if(propToSearch==="last4Digits" && isNaN(term)){
                flag = false
                setErrorMsg("Must be numbers")
            }else{
                setErrorMsg(null)
                flag = true
            }

            return flag
        }

        if(term !== "" && validate()){
            onSearchSubmit(term);
        }else{
            clearSearchRes()
        }
    }, [term, propToSearch])

    const handleSelectChange = (e) => {
        setPropToSearch(e.target.value)
    }

    const content = (
        <div className='content-wrapper'>
            <h3>Search Student</h3>
            <div className='search-wrapper'>
                <select name="property"  onChange={handleSelectChange}>
                    <option value="">Select Search field</option>
                    <option value="last4Digits">last 4 digits of ssn</option>
                    <option value="dob">DOB</option>
                    <option value="lName">Last Name</option>
                    <option value="fName">First Name</option>
                    <option value="note">Note</option>
                </select>
                <input 
                    type='text' 
                    placeholder="Search..."
                    onChange={e=>setDebouncedTerm(e.target.value)}
                    value={debouncedTerm}
                />
                <p className='error'>{errorMsg}</p>
                <p className='warn'>Search Tips:</p>
                <ol className='warn'>
                    <li>Space matters</li>
                </ol>
            </div>

            <div className='result-wrapper'>
                <p>{searchRes.length} result(s) Found {searchRes.length> 0 ? <span>&#128512;</span> :<span>&#128529;</span>}</p>
                {
                    searchRes.length > 0 
                    ? searchRes.map(student=>{
                        return <StudentAvatar key={nanoid()} student={student}/>
                    })
                    :<p>Your search result returned NOTHING </p>
                }
            </div>
        </div>
    )
    return (
        content
    )
}

export default SearchStudent








// useEffect(() => {
//     const timer = setTimeout(() => setTerm(debouncedTerm), 1000);
//     return () => clearTimeout(timer);
// }, [debouncedTerm])


// When the input is changed we update a state variable called debounceTerm.
// Each time debounceTerm changes, a useEffect hook schedule a timer to update the value ofterm after 1 second.
// If another update of debounceTerm occurs in less than 1 second, the previous timer is canceled (using the cleanup function of useEffect) and a new one is scheduled.
// When the timer fires up and updates term, a new search is submitted.
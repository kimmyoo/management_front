import React, { useState } from 'react'
import axiosBaseURL from '../../common/httpCommon'
import ImportResultDisplay from './ImportResultDisplay'
import { Link } from 'react-router-dom'

function ImportPage() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [error, setError] = useState(null)
    const [result, setResult] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData()
        formData.append('file', selectedFile)

        axiosBaseURL.post('/students/import/', formData)
            .then(response => {
                console.log(response.data)
                setResult(response.data)
                setIsLoading(false)
            })
            .catch(error => {
                setError(error.response.data.error)
                console.error(error)
            });
    };

    const onSubmit = (e) => {
        e.preventDefault()
        if (!selectedFile) {
            setError("Please Select a CSV File")
        } else {
            setError(null)
            handleSubmit(e)
        }
    }

    const content = (
        <div className='content-wrapper'>
            <h3>Upload students with a csv file</h3>
            <div className='search-wrapper'>
                <p className='right-side'>
                    <Link
                        to="/files/template.csv"
                        download="CSV-Template-File"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Download Template
                    </Link>
                </p>
                <form>
                    <input type="file" onChange={handleFileInput} />
                    <p>
                        <button type="submit" onClick={onSubmit}>Upload</button>
                        {isLoading && <span className="warn">uploading...don't refresh page</span>}
                        {error && <span className='error'>{error}</span>}
                    </p>
                </form>
            </div>

            <div className='result-wrapper'>
                <ImportResultDisplay result={result} />
            </div>

        </div>
    )

    return (
        content
    );
}

export default ImportPage;
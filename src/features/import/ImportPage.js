import React, { useState } from 'react'
import axiosBaseURL from '../../common/httpCommon'
import ImportResultDisplay from './ImportResultDisplay'

function ImportPage() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [error, setError] = useState(null)
    const [result, setResult] = useState(null)
    const [isUploading, setIsUploading] = useState(false)

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsUploading(true)
        const formData = new FormData()
        formData.append('file', selectedFile)

        axiosBaseURL.post('/students/import/', formData)
            .then(response => {
                console.log(response.data)
                setResult(response.data)
                setIsUploading(false)
            })
            .catch(error => {
                setError(error.response.data.error)
                console.error(error)
                setIsUploading(false)
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
            <h3>Upload students in batch</h3>
            <form>
                <input type="file" onChange={handleFileInput} />
                <p>
                    <button type="submit" onClick={onSubmit}>Upload</button>
                    {error && <span className='error'>{error}</span>}
                    {isUploading && <span className='warn'>uploading, don't refresh page.</span>}
                </p>
            </form>
            <ImportResultDisplay result={result} />
        </div>
    )

    return (
        content
    );
}

export default ImportPage;
import React from 'react'
import { nanoid } from 'nanoid'

const BackendError = ({ errors }) => {
    const content = (
        errors&&<div className="error">
            {errors.map(error => (<p key={nanoid()}>{error}</p>))}
        </div>
    )
    return (
        content
    )
}

export default BackendError
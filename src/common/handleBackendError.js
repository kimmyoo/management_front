import { nanoid } from "nanoid"
import React from 'react';


const handleBackendError = (error) => {

    let errorDetails = []
    // console.error('form submission error:', error.response.data)
    let errorObject

    if (error.response) {
        errorObject = error.response.data // get the error Object return from backend
    } else {
        errorObject = { "network": "check network connection" }
    }

    for (const property in errorObject) {
        errorDetails.push(<span key={nanoid()}>{property}:{errorObject[property]}</span>)
    }

    return errorDetails

}

export default handleBackendError
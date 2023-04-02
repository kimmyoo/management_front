const handleBackendError = (error) => {

    let errorDetails = []
    console.error('form submission error:', error.response.data)
    const errorObject = error.response.data // get the error Object return from backend
    for (const property in errorObject){
        errorDetails.push(<span>{property}:{errorObject[property]}</span>)
    }

    return errorDetails

}

export default handleBackendError
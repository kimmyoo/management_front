const disableEnterSubmit = (e) => {
    // Prevent form submission when hitting Enter key
    if (e.key === "Enter") {
    e.preventDefault();
    }
}

export default disableEnterSubmit

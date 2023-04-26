import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import handleBackendError from '../../common/handleBackendError'
import BackendError from '../../components/BackendError'
import validateLoginForm from "../../common/loginFormValidation";

const Login = () => {
    const navigate = useNavigate()

    const [formData, setFormdata] = useState({
        "username": "",
        "password": ""
    })

    const [formErrors, setFormErrors] = useState({})

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormdata({
            ...formData, 
            [name]: value.trim()
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateLoginForm(formData, setFormErrors)) return
        setFormErrors({})
        // const BASE_URL = "http://127.0.0.1:8000/api/v1"
        const BASE_URL = "https://abcschoolmanagement.pythonanywhere.com/api/v1"
        // here i don't use pre-configured axios 
        // because i need to request to reach to catch error block
        // so the backend error can be returned, set and displayed. 
        await axios.post(
                `${BASE_URL}/login`, 
                {formData}, 
                {withCredentials:true}
            )
            .then(response=>{
                // console.log(response.data.jwt);
                navigate('/dash');
            })
            .catch(error=>{
                console.error("error:", error)
                const errorDetails = handleBackendError(error)
                setFormErrors({
                    ...formErrors,
                    backendErrors: errorDetails
                })
            })
            
    }
    
    const content = (
        <div className="login-form-wrapper">
            <header>
                <h2>System login</h2>
            </header>
            <form>
                <p>
                    <label>Username:</label>
                    {formErrors.username && <span className="error">{formErrors.username}</span>}
                    <input
                        name="username"
                        type="text" 
                        placeholder="Username"  
                        required
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </p>
                <p>
                    <label>Password:</label>
                    {formErrors.password && <span className="error">{formErrors.password}</span>}
                    <input
                        autoComplete="on"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </p>
                <BackendError errors={formErrors.backendErrors} />
                <button className="button-paper right-side" onClick={handleSubmit}>Submit</button>
                <p className="warn">Authorized Personnel only</p>
            </form>
        </div>
    )

    return (
        content
    )
}
export default Login




// const response = await fetch('http://127.0.0.1:8000/api/v1/login', {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     credentials: 'include',
//     body: JSON.stringify({
//         username,
//         password
//     })
// })

// const content = await response.json();
// console.log(content)
// navigate('/dash');
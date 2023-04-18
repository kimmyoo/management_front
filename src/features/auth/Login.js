import { useState } from "react"
import axiosBaseURL from "../../common/httpCommon";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axiosBaseURL.post('/login',
                {username, password},
                {withCredentials:true}
            )
            .then(response=>{
                console.log(response.data.jwt);
                navigate('/dash');
            })
            .catch(error=>{
                console.error("error:", error)
            })
        
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
    }
    

    const content = (
        <div className="login-form-wrapper">
            <h3>User Login</h3>
            <form>
                <p>
                    <label>Username:</label>
                    <input
                        type="text" 
                        placeholder="Username"  
                        required
                        onChange={e=>setUsername(e.target.value)}
                    />
                </p>
                <p>
                    <label>Password:</label>
                    <input
                    autoComplete="on"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={e=>setPassword(e.target.value)}
                    />
                </p>
                <button className="button-paper right-side" onClick={handleSubmit}>Submit</button>
                <p>Authorized Personnel only</p>
            </form>
        </div>
    )

    return (
        content
    )
}
export default Login
import React, { useState } from "react"
import useLogin from "../hooks/useLogin"
import styles from "../styles/login.module.css"
import InputBox from "../../styledcomponents/inputBox"
import LoadingSpinner from "../../styledcomponents/loadingSpinner"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import Navbar from "../../styledcomponents/navbar"

const Login = () => {
    const {handleLogin, loading, error} = useLogin()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (field:string, value: string) => {
        setFormData({...formData, [field]: value})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const success = await handleLogin(formData)
        if (success) {
            Cookies.set("access_token", success.access)
            Cookies.set("refresh_token", success.refresh)
            navigate("/dashboard")
        }
    }

    return (
        <>
        < Navbar />
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.heading}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <InputBox 
                        id="email" 
                        title="Email" 
                        type="text" 
                        name="email" 
                        placeHolder="Enter Email" 
                        onChange={(val) => handleChange("email", val)} 
                    />
                    <div className={styles.passwordcontainer}>
                        <InputBox 
                            id="password" 
                            title="Password" 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            placeHolder="Enter Password" 
                            onChange={(val) => handleChange("password", val)} 
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.passwordbutton}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <button 
                        className={styles.Button}
                        type="submit" 
                        disabled={loading}
                    >
                        Login
                    </button>
                    {loading && < LoadingSpinner/>}
                </form>
                <p className={styles.bottom}>Don't have an account?<a className={styles.link} href="/register/">Signup</a></p>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
        </>
    )
}

export default Login
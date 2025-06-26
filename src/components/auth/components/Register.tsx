import React, { useState } from "react"
import useRegister from "../hooks/useRegister"
import styles from "../styles/register.module.css"
import InputBox from "../../styledcomponents/inputBox"
import { useNavigate } from "react-router-dom"
import Navbar from "../../styledcomponents/navbar"

const Register = () => {
    const {handleRegister, loading, error} = useRegister()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        firstname: "",
        lastname: "",
        is_manager: false,
        password: "",
        password2: "",
    })

    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (field: string, value: string | boolean) => {
        setFormData( {...formData, [field]: value })
    } 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const success = await handleRegister(formData)
        if (success) {
            navigate("/login")
        }
    }

    return (
        <>
        < Navbar />
        <div className={styles.container}>
            <div className ={styles.card}>
                <h2 className={styles.heading}>SignUp</h2>
                <form onSubmit={handleSubmit}>
                    <InputBox
                        id="username"
                        title="Username"
                        type="text"
                        name="username"
                        placeHolder="Enter a unique username"
                        onChange={(val) => handleChange("username", val)}
                    />

                    <InputBox 
                        id="email"
                        title="Email"
                        type="email"
                        name="email"
                        placeHolder="Enter your Email"
                        onChange={(val) => handleChange("email", val)}
                    />

                    <InputBox
                        id="firstname"
                        title="First Name"
                        type="text"
                        name="firstname"
                        placeHolder="Enter first name"
                        onChange={(val) => handleChange("firstname", val)}
                        />
                        <InputBox
                        id="lastname"
                        title="Last Name"
                        type="text"
                        name="lastname"
                        placeHolder="Enter last name"
                        onChange={(val) => handleChange("lastname", val)}
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
                            {showPassword ? "Hide": "Show"}
                        </button>
                    </div>
                    <InputBox
                        id="password2"
                        title="Confirm Password"
                        type="password"
                        name="password2"
                        placeHolder="Re-enter password"
                        onChange={(val) => handleChange("password2", val)}
                    />
                    <div className={styles.checkboxContainer}>
                    <input
                        type="checkbox"
                        id="is_manager"
                        checked={formData.is_manager}
                        onChange={(e) => handleChange("is_manager", e.target.checked)}
                    />
                    <label htmlFor="is_manager" className={styles.checkboxLabel}>
                        Register as Manager
                    </label>
                    </div>
                    <button 
                        type="submit"
                        className={styles.Button}
                        disabled={loading}
                    >
                        Signup
                    </button>
                </form>
                <span className={styles.bottom}>Already have an account? <a className={styles.link} href="/login/">SignIn</a></span>
                {error ? <p className={styles.error}>{error}</p>: <p className={styles.error}> </p> }
            </div>
        </div>
        </>
    )
}

export default Register
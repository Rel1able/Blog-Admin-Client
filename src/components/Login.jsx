import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import Auth from "./AuthContext";
import Header from "./Header";
import styles from "../styles/login.module.css";
export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser, setToken } = useContext(Auth.Context);

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch("https://blog-api-rrvr.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        const data = await response.json();
                console.log(data);
        const userData = data.user;
        const token = data.token;
        console.log(token);
        setUser(userData);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        
        if (userData) {
            navigate("/");
        }
    }
    return (
        <>
            <Header />
            <div className={styles.container}>
                <h1>{user && "User exists"}</h1>
                <h1>Please Log in</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-div">
                        <label htmlFor="username" id="username">Username</label>
                        <input value={username} onChange={e => setUsername(e.target.value)} type="text" name="username" id="username"/>
                    </div>
                    <div className="input-div">
                        <label htmlFor="password" id="password">Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password"/>
                    </div>
                    <button className="btn" type="submit">Log in</button>
                </form>
            </div>
            
        </>
    )
}
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import Auth from "./AuthContext";
export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(Auth.Context);

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
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
        if (userData) {
            navigate("/");
        }
    }
    return (
        <>
            <h1>{user && "User exists"}</h1>
            <h1>Log in page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" id="username">Username</label>
                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" name="username" id="username"/>
                </div>
                <div>
                    <label htmlFor="password" id="password">Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password"/>
                </div>
                <button type="submit">Log in</button>
            </form>
        </>
    )
}
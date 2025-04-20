import { Link } from "react-router-dom";
import Auth from "./AuthContext";
import { useContext } from "react";
import styles from "../styles/header.module.css";
export default function Header() {

    const { user, setUser,setToken } = useContext(Auth.Context);

    function handleLogout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser("");
        setToken("");
    }

    return (
        <header className={styles.container}>
            <Link className="btn" to="/">Home</Link>
            

            
            <Link className="btn" to="/posts">Posts</Link>
            <Link className="btn" to="/posts/published">Published posts</Link>
            <Link className="btn" to="/posts/unpublished">Unpublished posts</Link>
             {user ? <button className="btn" onClick={handleLogout}>Log out</button> : <Link className="btn" to="/login">Log in</Link>}
        </header>
    )
}
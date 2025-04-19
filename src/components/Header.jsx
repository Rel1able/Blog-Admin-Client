import { Link } from "react-router-dom";
import Auth from "./AuthContext";
import { useContext } from "react";
export default function Header() {

    const { user, setUser,setToken } = useContext(Auth.Context);

    function handleLogout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser("");
        setToken("");
    }

    return (
        <>
            <Link to="/">Home</Link>
            
            {user ? <button onClick={handleLogout}>Log out</button> : <Link to="/login">Log in</Link>}
            
            <Link to="/posts">Posts</Link>
            <Link to="/posts/published">Published posts</Link>
            <Link to="/posts/unpublished">Unpublished posts</Link>
        </>
    )
}
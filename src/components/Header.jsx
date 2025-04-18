import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/login">Log in</Link>
            <Link to="/posts">Posts</Link>
            
        </>
    )
}
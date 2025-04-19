import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header"

export default function UnpublishedPosts() {
    const [unpublishedPosts, setUnpublishedPosts] = useState([]);

    useEffect(() => {
        async function getUnpublishedPosts() {
            const res = await fetch("https://blog-api-rrvr.onrender.com/posts/unpublished")
            const resData = await res.json();
            setUnpublishedPosts(resData);
            console.log(resData);
        }
        getUnpublishedPosts()
    }, [])

    return (
        <>
            <Header />
            <h1>Unpublished posts</h1>
            <ul>
                {unpublishedPosts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}
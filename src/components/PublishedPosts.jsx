import Header from "./Header"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PublishedPosts() {
    const [publishedPosts, setPublishedPosts] = useState([]);

    useEffect(() => {
        async function getPublishedPosts() {
            const res = await fetch("https://blog-api-rrvr.onrender.com/posts/published");
            const resData = await res.json();
            setPublishedPosts(resData);
            console.log(resData);
        }
        getPublishedPosts();
    }, [])

    return (
        <>
            <Header />
            <h1>Published Posts</h1>
            {publishedPosts.map((post) => (
                <li key={post.id}>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    Author: {post.user.username}
                </li>
            ))}
        </>
        
    )
}
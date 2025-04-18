import { useState, useEffect, useContext } from "react";
import Header from "./Header";
import Auth from "./AuthContext";

export default function Posts() {
    const { token } = useContext(Auth.Context);
    console.log("Your token is", token)
    const [posts, setPosts] = useState([]);
    async function getPosts() {
         const res = await fetch("https://blog-api-rrvr.onrender.com/posts");
        const resData = await res.json();
        console.log("posts", resData)
         setPosts(resData);
    }

    useEffect(() => {
        getPosts();
    }, [])

    async function handleDelete(postId) {
        await fetch(`https://blog-api-rrvr.onrender.com/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
        console.log("Post was deleted");
        getPosts()
    }
    
    return (
        <>
            <Header/>
            <h1>All posts</h1>
            {posts.length > 0 ? <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        {post.title}
                        <button onClick={() => handleDelete(post.id)}>Delete post</button>
                    </li>
                ))}
            </ul> : <h1>Loading...</h1>}
            
        </>
    )
}
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Auth from "./AuthContext";
import styles from "../styles/posts.module.css";

export default function Posts() {
    const { token} = useContext(Auth.Context);
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
        <div className={styles.container}>
            <Header />
            <div>
                 <Link className="btn" to="/create-post">Create Post</Link>
            </div>
           
            <h1>All posts</h1>
            {posts.length > 0 ? <ul className={styles.postsList}>
                {posts.map((post) => (

                    <li className={styles.postCard} key={post.id}>
                        <Link className={styles.title} to={`/posts/${post.id}`}>{post.title}</Link>
                        <button className="btn" onClick={() => handleDelete(post.id)}>Delete post</button>
                        <Link className="btn" to={`/editPost/${post.id}`}>Edit Post</Link>
                        <p>Author: {post.user.username}</p>
                    </li>
                ))}
            </ul> : <h1>Loading...</h1>}
            
        </div>
    )
}
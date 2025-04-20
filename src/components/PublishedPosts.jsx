import Header from "./Header"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import convertDate from "../utils/convertDate";
import styles from "../styles/posts.module.css";

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
        <div className={styles.container}>
            <Header />
            <h1>Published Posts</h1>
            <ul className={styles.postsList}>
                {publishedPosts.map((post) => (
                <li className={styles.postCard} key={post.id}>
                    <Link className={styles.title} to={`/posts/${post.id}`}>{post.title}</Link>
                    Author: {post.user.username}
                    <p>{convertDate(post.createdAt)}</p>
                </li>
            ))}
            </ul>
            
        </div>
        
    )
}
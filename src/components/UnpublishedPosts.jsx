import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header"
import convertDate from "../utils/convertDate";
import styles from "../styles/posts.module.css";
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
        <div className={styles.container}>
            <Header />
            <h1>Unpublished posts</h1>
            <ul className={styles.postsList}>
                {unpublishedPosts.map((post) => (
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
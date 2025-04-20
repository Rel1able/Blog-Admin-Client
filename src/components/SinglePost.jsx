import { useParams, Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments"
import Header from "./Header";
import Auth from "./AuthContext";
import convertDate from "../utils/convertDate";
import styles from "../styles/singlePost.module.css";
export default function SinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState([]);
    const navigate = useNavigate();

    const { token } = useContext(Auth.Context);

    useEffect(() => {
        async function getPost(id) {
            const res = await fetch(`https://blog-api-rrvr.onrender.com/posts/${id}`);
            const resData = await res.json();
            setPost(resData);
        }
        getPost(id);
    }, [])

    async function handlePublish() {
        await fetch(`https://blog-api-rrvr.onrender.com/posts/${id}/publish`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
        navigate("/posts/published");
    }

    async function handleUnpublish() {
        await fetch(`https://blog-api-rrvr.onrender.com/posts/${id}/unpublish`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
        navigate("/posts/unpublished");
    }

    console.log(id);
    return (
        <div className={styles.container}>
            <Header/>
            <h1 className={styles.status}>{post.published ? "The post in published" : "The post is unpublished"}</h1>
            <button className="btn" onClick={handlePublish}>Publish</button>
            <button className="btn" onClick={handleUnpublish}>Unpublish</button>
            <Link className="btn" to={`/editPost/${post.id}`}>Edit Post</Link>
            <div className={styles.post}>
                <h1>{post.title}</h1>
                <p>{post.text}</p>
                <p>{convertDate(post.createdAt)}</p>
            </div>

            <Comments postId={id} />
        </div>
    )
}
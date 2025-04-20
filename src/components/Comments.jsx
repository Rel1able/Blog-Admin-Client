import { useState, useEffect, useContext } from "react";
import Auth from "./AuthContext";
import styles from "../styles/singlePost.module.css";

export default function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const { token } = useContext(Auth.Context);
    async function getComments() {
            const comments = await fetch(`https://blog-api-rrvr.onrender.com/posts/${postId}/comments`);
            const commentsData = await comments.json();
            setComments(commentsData);
        }
    useEffect(() => {
        
        getComments();
    }, [])
   
    function convertDate(date) {
        return new Date(date).toLocaleDateString("en-GB").split("/").join(".");
    }

    async function handleDelete(commentId) {
        await fetch(`https://blog-api-rrvr.onrender.com/posts/${postId}/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
        getComments()
    }
    
    return (
        <>
            <h1>Commments</h1>
            <ul>
                {
                    comments.map((comment) => (
                        <li className={styles.comment} key={comment.id}>
                            <p className={styles.commentAuthor}>{comment.user.username}</p>
                            <p>{comment.text}</p>
                            <p>{convertDate(comment.createdAt)}</p>
                            <button className="btn" onClick={() => handleDelete(comment.id)}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </>

    )
}
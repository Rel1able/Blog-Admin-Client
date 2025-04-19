import { useState, useEffect, useContext } from "react";
import Auth from "./AuthContext";

export default function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const { token } = useContext(Auth.Context);
    async function getComments() {
            const comments = await fetch(`https://blog-api-rrvr.onrender.com/posts/${postId}/comments`);
            const commentsData = await comments.json();
            setComments(commentsData);
            console.log(commentsData);
        }
    useEffect(() => {
        
        getComments();
    }, [])
   
    function convertDate(date) {
        return new Date(date).toLocaleDateString("en-GB").split("/").join(".");
    }

    async function handleDelete(commentId) {
        const res = await fetch(`https://blog-api-rrvr.onrender.com/posts/${postId}/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
        const resData = await res.json();
        console.log(resData);
        getComments()
    }
    
    return (
        <>
            <h1>Commments</h1>
            <ul>
                {
                    comments.map((comment) => (
                        <li key={comment.id}>
                            <p>{comment.user.username}</p>
                            <p>{comment.text}</p>
                            <p>{convertDate(comment.createdAt)}</p>
                            <button onClick={() => handleDelete(comment.id)}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </>

    )
}
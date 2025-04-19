import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments"
import Header from "./Header";
import Auth from "./AuthContext";
export default function SinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState([]);
    const navigate = useNavigate();

    const { token } = useContext(Auth.Context);

    function convertDate(date) {
        return new Date(date).toLocaleDateString("en-GB").split("/").join(".")
    }
    useEffect(() => {
        async function getPost(id) {
            const res = await fetch(`https://blog-api-rrvr.onrender.com/posts/${id}`);
            const resData = await res.json();
            console.log(resData);
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
        <>
            <Header/>
            <h1>Single Post</h1>
            <button onClick={handlePublish}>Publish</button>
            <button onClick={handleUnpublish}>Unpublish</button>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
            <p>{convertDate(post.createdAt)}</p>
            <Comments postId={id} />
        </>
    )
}
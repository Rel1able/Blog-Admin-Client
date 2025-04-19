import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import Comments from "./Comments"
import Header from "./Header";
export default function SinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState([]);

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
    console.log(id);
    return (
        <>
            <Header/>
            <h1>Single Post</h1>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
            <p>{convertDate(post.createdAt)}</p>
            <Comments postId={id} />
        </>
    )
}
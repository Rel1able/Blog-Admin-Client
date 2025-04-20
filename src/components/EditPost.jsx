import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Auth from "./AuthContext";

export default function EditPost() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    const { token} = useContext(Auth.Context);

    useEffect(() => {
        async function getPostById(id) {
            const post = await fetch(`https://blog-api-rrvr.onrender.com/posts/${id}`)
            const postData = await post.json();
            setTitle(postData.title);
            setText(postData.text);
        }
        getPostById(id);
    }, [])
    

    async function handleSubmit(e) {
        e.preventDefault();
        await fetch(`https://blog-api-rrvr.onrender.com/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({id, title, text}),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
        navigate("/posts");
    }
    return (
        <div className="container">
            <Header/>
            <h1>Edit Post</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-div">
                    <label htmlFor="title">Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" id="title"/>
                </div>
                <div className="input-div">
                    <label htmlFor="text">Text</label>
                    <textarea value={text} onChange={e => setText(e.target.value)} id="text" rows="22" cols="22">
                    </textarea>
                </div>
                <button className="btn" type="submit">Update</button>
            </form>
        </div>
    )
}
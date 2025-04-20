import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Auth from "./AuthContext";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const navigate = useNavigate();

    const { token, user  } = useContext(Auth.Context);

    async function handleSubmit(e) {
        e.preventDefault();
        await fetch("https://blog-api-rrvr.onrender.com/posts", {
            method: "POST",
            body: JSON.stringify({title, text, userId:user.id}),
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
            <h1>Create post</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-div">
                    <label htmlFor="title">Title</label>
                    <input onChange={e => setTitle(e.target.value)} type="text" id="title"/>
                </div>
                <div className="input-div">
                    <label htmlFor="text">Text</label>
                    <textarea onChange={e => setText(e.target.value)} id="text" rows="22" cols="22">
                    </textarea>
                </div>
                <button className="btn" type="submit">Create</button>
            </form>
        </div>
    )
}
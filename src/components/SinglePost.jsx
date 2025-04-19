import { useParams } from "react-router-dom"
import Comments from "./Comments"
export default function SinglePost() {
    const {id}= useParams();
    console.log(id);
    return (
        <>
            <h1>Single Post</h1>
            <Comments postId={id} />
        </>
    )
}
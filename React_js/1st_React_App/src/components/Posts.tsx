import axios from "axios";
import { useEffect, useState } from "react"

interface Posts {
    id: number,
    title: string,
    body: string
}

function Posts() {
    const [post, setPost] = useState<Posts[]>([]);

    async function ApiData() {

        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
            setPost(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { ApiData() }, []
    )


    return (
        <>
            <h1 style={{color:'#ff4757', fontWeight:'bold', fontStyle:'italic', textAlign:'center'}}>Axios API Fetching</h1>
            <hr />
            {post.map((data) => (
                <div className="card" style={{ margin: '30px' }}>
                    <div className="card-header">
                        Post id {data.id}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{data.title}</h5>
                        <p className="card-text">{data.body}</p>
                        <a href="#" className="btn btn-primary" style={{backgroundColor:'#ff4757'}}>See Post</a>
                    </div>
                </div>
            ))}
        </>
    )
}
export default Posts;
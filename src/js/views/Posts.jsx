import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

//2 y 3
export const GetPosts = () =>{

    const[posts, setPosts] = useState();
    

  const getPosts = async () => {
    // Verificamos si los datos están en el localStorage
    const postsLocalData = localStorage.getItem("postsLocal");
    if (postsLocalData) {
      const parsedPosts = JSON.parse(postsLocalData);
      setPosts(parsedPosts);
    } else {
        await fetchPostsFromAPI();
    }
};
      

  const fetchPostsFromAPI = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  
    if (response.ok) {
      const data = await response.json();
      setPosts(data);
      localStorage.setItem("postsLocal", JSON.stringify(data));
    } else {
      console.log("Error: ", response.status, response.statusText);
    }
  };
  

useEffect(()=>{
    getPosts();
},[])

return(
    <div className="container">
       <h1 className="text-primary text-center">Posts</h1>
            { !posts ? 
                <div className="spinner-border text-danger d-flex justify-content-center align-items-center" role="status">
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div> :  posts.map ( (post) =>
                <div className="card">
                    <div className="list-group">
                        <div key={post.id}> 
                            <h1>{post.id}. {post.title}</h1>
                            <p>{post.body}</p>
                        </div>
                    </div>
                </div>               
                )}
    </div>
)
}

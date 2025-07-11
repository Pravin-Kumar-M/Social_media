import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/posts')
            .then((res) => {
                console.log("Fetched posts:", res.data);
                setPosts(res.data);
            })
            .catch((err) => console.error('Error fetching posts:', err));
    }, []);

    return (
        <div>
            <Header />
            <div className="container mt-4">
                <h3 className="mb-4">All Posts</h3>
                {posts.length === 0 ? (
                    <p className="text-muted">No posts found.</p>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="card mb-3 p-3 shadow-sm">
                            <div className="d-flex align-items-center mb-2">
                                <img
                                    src={`http://localhost:5000/${post.profile_image}`}
                                    alt="User"
                                    className="rounded-circle me-2"
                                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                />
                                <strong>{post.name}</strong>
                            </div>
                            <p>{post.caption}</p>
                            {post.media_type.startsWith('image') ? (
                                <img
                                    src={`http://localhost:5000/${post.media_path}`}
                                    alt="Post"
                                    className="img-fluid rounded"
                                />
                            ) : (
                                <video controls className="w-100 rounded">
                                    <source
                                        src={`http://localhost:5000/${post.media_path}`}
                                        type={post.media_type}
                                    />
                                </video>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Posts;

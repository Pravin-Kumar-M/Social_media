// src/components/MainFeed.jsx
import React from 'react';
import './Header.css';
import axios from 'axios';

function MainFeed({ posts }) {

    const handleLike = async (postId) => {
        try {
            await axios.post(`http://localhost:5000/posts/${postId}/like`);
            // Optionally re-fetch posts or update state manually
        } catch (err) {
            console.error("Like error:", err);
        }
    };

    const handleComment = (postId) => {
        // You can open a modal or navigate to a comment page
        alert("Comment modal for post " + postId);
    };

    const handleShare = (postId) => {
        const shareUrl = `http://localhost:3000/posts/${postId}`;
        navigator.clipboard.writeText(shareUrl);
        alert("Post link copied to clipboard!");
    };

    const handleFeedback = (postId) => {
        alert(`Feedback modal for post ${postId}`);
    };

    const handleReport = (postId) => {
        alert(`Report submitted for post ${postId}`);
    };

    const handleNotInterested = (postId) => {
        alert(`Post ${postId} marked as not interested`);
    };



    return (
        <div className="main-feed">
            {posts.map((post) => (
                <div key={post.id} className="card mb-3 p-3 shadow-sm">

                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center">
                            <img
                                src={
                                    post.profile_image
                                        ? `http://localhost:5000/${post.profile_image}`
                                        : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                                }
                                alt="Profile"
                                className="rounded-circle me-2"
                                width="40"
                                height="40"
                            />
                            <strong>{post.name}</strong>
                        </div>

                        {/* Dots Menu */}
                        <div className="dropdown">
                            <i
                                className="bi bi-three-dots-vertical pointer"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            ></i>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <button className="dropdown-item text-dark" onClick={() => handleFeedback(post.id)}>
                                        Give Feedback
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item text-danger" onClick={() => handleReport(post.id)}>
                                        Report Post
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item text-muted" onClick={() => handleNotInterested(post.id)}>
                                        Not Interested
                                    </button>
                                </li>
                            </ul>

                        </div>
                    </div>

                    <p>{post.caption}</p>
                    <div key={post.id} className="card shadow-sm mb-4">
                        {/* Media */}
                        {post.media_type.startsWith("image") ? (
                            <img
                                src={`http://localhost:5000/${post.media_path}`}
                                alt="post"
                                className="img-fluid rounded-top"
                            />
                        ) : (
                            <video controls className="w-100 rounded-top">
                                <source src={`http://localhost:5000/${post.media_path}`} type={post.media_type} />
                            </video>
                        )}

                        {/* Caption */}
                        <div className="d-flex justify-content-around text-muted py-3 border-top">
                            {/* Like */}
                            <div className="d-flex align-items-center pointer" onClick={() => handleLike(post.id)}>
                                <i className="bi bi-heart me-2 text-danger fs-5"></i>
                                <small>{post.likes || 0}</small>
                            </div>

                            {/* Comment */}
                            <div className="d-flex align-items-center pointer" onClick={() => handleComment(post.id)}>
                                <i className="bi bi-chat-left-text me-2 text-primary fs-5"></i>
                                <small>{post.comment_count || 0}</small>
                            </div>

                            {/* Share */}
                            <div className="d-flex align-items-center pointer" onClick={() => handleShare(post.id)}>
                                <i className="bi bi-share me-2 text-success fs-5"></i>
                                <small>Share</small>
                            </div>
                        </div>

                    </div>

                </div>
            ))}

        </div>
    );
}

export default MainFeed;

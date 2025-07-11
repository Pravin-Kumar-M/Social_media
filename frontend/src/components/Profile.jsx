import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { toast } from 'react-toastify';
import './Header.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Profile() {
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);
    const [posts, setPosts] = useState([]);
    const [deletingPostId, setDeletingPostId] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    useEffect(() => {
        if (user?.user_id) {
            axios
                .get(`http://localhost:5000/user-posts/${user.user_id}`)
                .then((res) => {
                    setPosts(res.data);
                })
                .catch((err) => console.error('Post fetch error:', err));
        }
    }, [user]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profile_image', image);
        formData.append('user_id', user.user_id);

        try {
            const res = await axios.post('http://localhost:5000/update-profile-image', formData);
            const updatedUser = { ...user, profile_image: res.data.image };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            toast.success('Profile image updated!');
            setImage(null);
        } catch (err) {
            console.error('Upload error:', err.message);
            toast.error('Upload failed');
        }
    };

    const MySwal = withReactContent(Swal);

    const handleDeletePost = async (postId) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to recover this post!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'No, keep it',
            background: '#3c3c3c',
            color: '#fff',
            iconColor: '#ffcc00',
            confirmButtonColor: '#e63946',
            cancelButtonColor: '#30b879',
            customClass: {
                popup: 'rounded-4 shadow-lg',
                title: 'fw-bold',
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`http://localhost:5000/delete-post/${postId}`);
                    if (res.status === 200) {
                        setPosts((prev) => prev.filter(p => p.id !== postId));
                        MySwal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'Your post has been removed',
                            timer: 2000,
                            showConfirmButton: false,
                            background: '#1f1f1f',
                            color: '#fff',
                        });
                    }
                } catch (err) {
                    console.error(err);
                    MySwal.fire('Oops!', 'Something went wrong.', 'error');
                }
            }
        });
    };



    if (!user) return <p className="text-center mt-5">Loading profile...</p>;

    return (
        <>
            <Header />

            <div className="profile-wrapper">
                <img
                    className="profile-img"
                    src={
                        user?.profile_image
                            ? `http://localhost:5000/${user.profile_image}`
                            : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                    }
                    alt="Profile"
                />

                <label className="upload-label" htmlFor="profileUpload">
                    <i className="bi bi-camera-fill"></i> Update Profile
                    <input
                        type="file"
                        id="profileUpload"
                        className="upload-input"
                        onChange={handleImageChange}
                    />
                </label>

                {image && (
                    <button className="btn btn-sm btn-primary mt-2" onClick={handleUpload}>
                        Upload
                    </button>
                )}
            </div>

            <div className="container mt-5">
                <ul className="nav nav-tabs mb-3" id="profileTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            id="posts-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#posts"
                            type="button"
                            role="tab"
                        >
                            Uploaded Posts
                        </button>
                    </li>
                </ul>

                <div className="tab-content" id="profileTabsContent">
                    <div className="tab-pane fade show active" id="posts" role="tabpanel">
                        <h5 className="mb-3">Recent Posts</h5>
                        {posts.length === 0 ? (
                            <p className="text-muted">No posts yet.</p>
                        ) : (
                            <div className="masonry-grid">
                                {posts.map((post) => (
                                    <div key={post.id} className="masonry-item">
                                        <div className="card shadow-sm position-relative">
                                            {/* Hover Buttons */}
                                            <div className="hover-overlay">
                                                <button
                                                    className="hover-btn"
                                                    onClick={() =>
                                                        window.open(`http://localhost:5000/${post.media_path}`, '_blank')
                                                    }
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="hover-btn text-danger"
                                                    onClick={() => handleDeletePost(post.id)}
                                                    disabled={deletingPostId === post.id}
                                                >
                                                    {deletingPostId === post.id ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </div>

                                            {/* Media */}
                                            {post.media_type.startsWith('image') ? (
                                                <img
                                                    src={`http://localhost:5000/${post.media_path}`}
                                                    className="card-img-top"
                                                    alt="Post"
                                                    style={{ width: "100%", display: "block" }}
                                                />
                                            ) : (
                                                <video controls className="w-100 rounded-top">
                                                    <source
                                                        src={`http://localhost:5000/${post.media_path}`}
                                                        type={post.media_type}
                                                    />
                                                </video>
                                            )}
                                            <div className="card-body">
                                                <p className="card-text">{post.caption}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;

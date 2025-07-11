import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import MainFeed from '../components/MainFeed';
import CreatePost from '../components/CreatePost';
import { toast } from 'react-toastify';

function Dashboard() {
    const [caption, setCaption] = useState('');
    const [media, setMedia] = useState(null);
    const [posts, setPosts] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/posts");
            setPosts(res.data);
        } catch (err) {
            toast.error("Failed to load posts.");
            console.error(err);
        }
    };
    // useEffect(() => {
    //     toast.success("Hi babe, this is working!");
    // }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!caption || !media) {
            toast.warn("Please enter a caption and select a media file.");
            return;
        }

        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("media", media);
        formData.append("user_id", user.user_id);

        try {
            await axios.post("http://localhost:5000/upload", formData);
            setCaption('');
            setMedia(null);
            toast.success("Post uploaded successfully!");

            fetchPosts(); // Refresh posts without reload
        } catch (err) {
            console.error("Upload Error:", err.message);
            toast.error("Something went wrong while uploading");
        }
    };

    return (
        <div>
            <Header />
            <div className="d-flex">
                <Sidebar />
                <div className="main-content p-4" style={{ marginLeft: '220px', marginRight: '260px', width: '100%' }}>
                    <CreatePost
                        user={user}
                        caption={caption}
                        setCaption={setCaption}
                        media={media}
                        setMedia={setMedia}
                        handleSubmit={handleSubmit}
                    />
                    <MainFeed posts={posts} />
                </div>
                <RightSidebar />
            </div>
        </div>
    );
}

export default Dashboard;

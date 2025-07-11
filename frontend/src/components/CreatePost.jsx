import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { FaImage, FaRegSmile, FaUserTag } from 'react-icons/fa';


function CreatePost({ user, caption, setCaption, media, setMedia, handleSubmit }) {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setMedia(file);
    };
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiClick = (emojiData) => {
        setCaption(caption + emojiData.emoji);
        setShowEmojiPicker(false);
    };


    return (
        <div className="card p-3 shadow-sm mb-4">
            <form onSubmit={handleSubmit}>
                {/* Top Row */}
                <div className="d-flex align-items-center mb-3">
                    <img
                        src={
                            user?.profile_image
                                ? `http://localhost:5000/${user.profile_image}`
                                : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                        }
                        alt="User"
                        className="rounded-circle"
                        width="50"
                        height="50"
                    />
                    <input
                        type="text"
                        className="form-control ms-3 rounded-pill bg-light"
                        placeholder="What's on your mind?"
                        value={caption}
                        onChange={e => setCaption(e.target.value)}
                        required
                    />
                </div>

                {/* Media Upload */}
                <div className="mb-3 position-relative">
                    <label htmlFor="media-upload" className="form-control d-flex align-items-center mb-0" style={{ cursor: 'pointer' }}>
                        <FaImage className="text-success me-2" />
                        <span className="text-muted">Choose photo or video...</span>
                        <input
                            type="file"
                            id="media-upload"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            required
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                opacity: 0,
                                cursor: 'pointer'
                            }}
                        />
                    </label>
                </div>

                {media && (
                    <div className="mb-3 position-relative">
                        {/* Centered Preview */}
                        <div className="d-flex justify-content-center">
                            {media.type.startsWith("image") ? (
                                <img
                                    src={URL.createObjectURL(media)}
                                    alt="Preview"
                                    className="img-fluid rounded"
                                    style={{
                                        maxHeight: '250px',
                                        maxWidth: '300px',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <video
                                    controls
                                    className="rounded"
                                    style={{
                                        maxHeight: '300px',
                                        maxWidth: '100%',
                                    }}
                                >
                                    <source src={URL.createObjectURL(media)} type={media.type} />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>

                        {/* Remove Button */}
                        <button
                            type="button"
                            className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                            onClick={() => setMedia(null)}
                            title="Remove media"
                        >
                            &times;
                        </button>
                    </div>
                )}

                {/* Action Row */}
                <div className="d-flex flex-wrap align-items-center gap-5 pt-3 border-top text-muted justify-content-evenly">

                    {/* Photo/Video */}
                    <a href="/profile" className="d-flex align-items-center text-decoration-none pointer text-dark">
                        <FaImage className="me-2 text-success" />
                        <span>Photo/Video</span>
                    </a>

                    {/* Tag */}
                    <div className="d-flex align-items-center pointer">
                        <FaUserTag className="text-primary me-2" />
                        <span>Tag</span>
                    </div>

                    {/* Feeling (with emoji picker) */}
                    <div className="position-relative">
                        <div
                            className="d-flex align-items-center" style={{ cursor: 'pointer' }}
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                            <FaRegSmile className="text-warning me-2" />
                            <span>Feeling</span>
                        </div>

                        {showEmojiPicker && (
                            <div className="position-absolute z-3 bg-white border rounded shadow p-2" style={{ top: '40px', left: 0 }}>
                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                            </div>
                        )}
                    </div>

                    {/* Post Button */}
                    <div className="ms-auto">
                        <button type="submit" className="btn btn-primary px-4 rounded-pill">
                            Post
                        </button>
                    </div>

                </div>

            </form>
        </div>
    );
}

export default CreatePost;

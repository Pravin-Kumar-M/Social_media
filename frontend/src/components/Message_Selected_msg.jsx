import React, { useState } from 'react';
import { FaReply, FaShare, FaCopy, FaHeart, FaTrash } from 'react-icons/fa';
import './Header.css';

function Message_Selected_msg({ selectedMsgId, actionMenuPos, messages, setMessages, setSelectedMsgId }) {
    const [showReactPicker, setShowReactPicker] = useState(false);

    const handleReaction = (emoji) => {
        const updatedMessages = messages.map(msg =>
            msg.id === selectedMsgId ? { ...msg, reaction: emoji } : msg
        );
        setMessages(updatedMessages);
        setShowReactPicker(false);
        setSelectedMsgId(null);
    };

    const emojiList = ['👍', '😄', '❤️', '😡', '😲'];

    if (!selectedMsgId) return null;

    return (
        <div
            className="message-action-menu"
            style={{
                top: `${actionMenuPos.y}px`,
                left: `${actionMenuPos.x - 100}px`,
                zIndex: 9999,
            }}
        >
            <ul className="list-unstyled mb-0">
                <li onClick={() => {
                    alert("Reply clicked");
                    setSelectedMsgId(null);
                }}>
                    <FaReply className="me-2 text-primary" /> Reply
                </li>

                <li onClick={() => {
                    alert("Forward clicked");
                    setSelectedMsgId(null);
                }}>
                    <FaShare className="me-2 text-info" /> Forward
                </li>

                <li onClick={() => {
                    const selectedMessage = messages.find(m => m.id === selectedMsgId);
                    if (selectedMessage) {
                        navigator.clipboard.writeText(selectedMessage.text);
                        alert("Copied!");
                    }
                    setSelectedMsgId(null);
                }}>
                    <FaCopy className="me-2 text-success" /> Copy
                </li>

                <li onClick={(e) => {
                    e.stopPropagation();
                    setShowReactPicker(!showReactPicker);
                }}>
                    <FaHeart className="me-2 text-danger" /> React
                </li>

                <li onClick={() => {
                    setMessages(messages.filter(m => m.id !== selectedMsgId));
                    setSelectedMsgId(null);
                }}>
                    <FaTrash className="me-2 text-danger" /> Delete
                </li>
            </ul>

            {/* Custom Emoji Picker */}
            {showReactPicker && (
                <div
                    className="emoji-picker-popup"
                    style={{
                        marginTop: '20px',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '8px',
                        padding: '10px',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                >
                    {emojiList.map((emoji, index) => (
                        <span
                            key={index}
                            style={{
                                fontSize: '20px',
                                cursor: 'pointer',
                                textAlign: 'center',
                                width: '30px',
                                height: '30px',
                                lineHeight: '30px',
                                borderRadius: '50%',
                                transition: 'background 0.2s',
                            }}
                            onClick={() => handleReaction(emoji)}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#f0f0f0'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            {emoji}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Message_Selected_msg;

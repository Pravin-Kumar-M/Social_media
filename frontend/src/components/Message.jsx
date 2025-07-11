import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiSmile, BsThreeDotsVertical } from 'react-icons/bs';
import { FaPaperPlane } from 'react-icons/fa';
import Header from './Header';
import './Header.css';
import { Message_Sidebar } from './Message_Sidebar';
import Message_Selected_msg from './Message_Selected_msg'; // 💡 this is your new file

function Message() {
    const [selectedMsgId, setSelectedMsgId] = useState(null);
    const [actionMenuPos, setActionMenuPos] = useState({ x: 0, y: 0 });

    const [messages, setMessages] = useState([
        { id: 1, text: "Hey babe 😘", sender: "other" },
        { id: 2, text: "Hi darling 💖", sender: "me" }
    ]);

    const [input, setInput] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const chatBoxRef = useRef(null);

    useEffect(() => {
        chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
    }, [messages]);

    const handleEmojiClick = (emojiData) => {
        setInput((prev) => prev + emojiData.emoji);
        setShowEmojiPicker(false);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim() === "") return;
        setMessages([...messages, { id: Date.now(), text: input, sender: "me" }]);
        setInput("");
    };

    useEffect(() => {
        const handleClickOutside = () => {
            if (selectedMsgId) setSelectedMsgId(null);
        };
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, [selectedMsgId]);

    return (
        <>
            <Header />
            <div className="container-fluid message-container">
                <div className="row h-100">
                    {/* Sidebar */}
                    <Message_Sidebar />

                    {/* Chat Area */}
                    <div className="col-md-9 d-flex flex-column justify-content-between p-3 chat-area bg-light rounded-end">
                        {/* Chat Messages */}
                        <div ref={chatBoxRef} className="flex-grow-1 overflow-auto chat-box p-3 rounded bg-white shadow-sm mb-3">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`d-flex mb-2 align-items-center ${msg.sender === "me" ? "justify-content-end" : "justify-content-start"}`}
                                >
                                    {msg.sender === "me" && (
                                        <div
                                            className="message-menu-icon-outside"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedMsgId(msg.id);
                                                setActionMenuPos({ x: e.pageX, y: e.pageY });
                                            }}
                                        >
                                            <BsThreeDotsVertical />
                                        </div>
                                    )}

                                    <div className="chat-bubble-wrapper position-relative d-inline-block">
                                        <div className={`chat-bubble ${msg.sender === "me" ? "me-bubble" : "other-bubble"}`}>
                                            {msg.text}
                                        </div>
                                        {msg.reaction && (
                                            <div className="reaction-emoji-outside">
                                                {msg.reaction}
                                            </div>
                                        )}
                                    </div>



                                </div>
                            ))}
                        </div>

                        {/* Action Menu Component (Moved!) */}
                        <Message_Selected_msg
                            selectedMsgId={selectedMsgId}
                            actionMenuPos={actionMenuPos}
                            messages={messages}
                            setMessages={setMessages}
                            setSelectedMsgId={setSelectedMsgId}
                        />

                        {/* Input Box */}
                        <form onSubmit={handleSend} className="d-flex align-items-center position-relative chat-input-form">
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Type something sweet..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />

                            <button
                                type="button"
                                className="btn btn-light emoji-btn me-2"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                title="Emoji"
                            >
                                <BsEmojiSmile size={20} />
                            </button>

                            <button type="submit" className="btn btn-primary d-flex align-items-center">
                                <FaPaperPlane className="me-1" />
                                Send
                            </button>

                            {showEmojiPicker && (
                                <div className="emoji-picker-popup">
                                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Message;

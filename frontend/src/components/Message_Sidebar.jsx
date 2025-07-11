import React from 'react'

export const Message_Sidebar = () => {
    return (
        <>
            <div className="col-md-3 border-end bg-white p-3 shadow-sm">
                <h5 className="mb-4 text-primary fw-bold">Chats</h5>
                <ul className="list-unstyled">
                    <li className="chat-user mb-3 d-flex align-items-center pointer">
                        <img src="https://i.pravatar.cc/40?img=1" className="rounded-circle me-2" alt="User" />
                        <span className="fw-bold">Your Wifey</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

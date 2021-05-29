import React from "react";
import  './Message.scss'

const Message = ({message, userId}) => {

    
    
    return (
        <div className={userId === message.id ? 'message user-message' : 'message'}>
            <div className="message__img">
                <img src={message.userAvatar} alt="avatar" />
            </div>
            <div className="message__username">{message.username}</div>
            <p className="message__text">{message.text}</p>
            <div className="message__date">{new Date().toLocaleDateString()}</div>
        </div>
    )
}

export default Message
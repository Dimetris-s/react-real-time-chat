import React from "react";
import  './Message.scss'

const Message = ({deleteMessage, message, userId}) => {

    
    
    
    return (
        <div className={userId === message.uid ? 'message user-message' : 'message'}>
            <div className="message__img">
                <img src={message.userAvatar} alt="avatar" />
            </div>
            <div className="message__username">{message.username}</div>
            <p className="message__text">{message.text}</p>
            <div className="message__date">{message.date}</div>
            <div onClick={() => deleteMessage(message.id)} className="message__delete">&times;</div>
        </div>
    )
}

export default Message
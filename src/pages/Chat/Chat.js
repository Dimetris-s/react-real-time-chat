import React from "react";
import  './Chat.scss'
import Container from '../../hoc/Container/Container'

const Chat = props => {
    return (
        <div className="Chat">
            <Container>
                <h1 className="Chat__title">Чат</h1>
                <div className="Chat__grid">
                    <div className="Chat__messages"></div>
                    <input type="text" placeholder="Введите ваше сообщение..." className="Chat__input" />
                    <button className="btn btn-send Chat__btn">Отправить</button>
                </div>  
            </Container>
        </div>
    )
}

export default Chat
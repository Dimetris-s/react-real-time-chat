import React, { useContext, useState } from "react";
import  './Chat.scss'
import Container from '../../hoc/Container/Container'
import { firebaseContext } from "../../context/firebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore"
import firebase from 'firebase/app'
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {v4} from 'uuid'

const Chat = props => {
    const [inputValue, setInputValue] = useState('')
    const {firestore, auth} = useContext(firebaseContext)
    const [user] = useAuthState(auth)
    const [messages, loading] = useCollectionData(firestore.collection('messages').orderBy('createdAt', 'desc'))

    const deleteMessage = async id => {
        await firestore.collection('messages').doc(id).delete()
    }

    const submitHandler = event => {
        event.preventDefault()
        sendMessage()
    }

    const sendMessage = async () => {
        const docRef = await firestore.collection('messages').add({
            uid: user.uid,
            username: user.displayName,
            userAvatar: user.photoURL,
            text: inputValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            date: `${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`,
            aid: v4()
        })
        await docRef.update({
            id: docRef.id                
        })

        setInputValue('')
    }
    return (
        <div className="Chat">
            <Container>
                {
                    loading 
                    ? <div className="Chat__messages">
                        <Loader/>
                      </div>
                    : <TransitionGroup  className="Chat__messages">
                            {messages.map((message) => (
                                <CSSTransition
                                    key={message.aid}
                                    timeout={500}
                                    classNames={'message'}
                                >
                                    <Message  deleteMessage={deleteMessage}  userId={user.uid} message={message}/>
                                </CSSTransition>

                            ))}
                      </TransitionGroup>
                }
                
                <form className="form Chat__form" onSubmit={submitHandler}>
                    <input onChange={e => setInputValue(e.target.value)} value={inputValue} type="text" placeholder="Введите ваше сообщение..." className="Chat__input" />
                    <button onClick={submitHandler} disabled={!inputValue.trim()} className="btn btn-send Chat__btn">Отправить</button>
                </form>
            </Container>
        </div>
    )
}

export default Chat
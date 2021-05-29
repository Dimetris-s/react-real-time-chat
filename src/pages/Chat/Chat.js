import React, { useContext, useState } from "react";
import  './Chat.scss'
import Container from '../../hoc/Container/Container'
import { firebaseContext } from "../../context/firebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore"
import firebase from 'firebase/app'
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";

const Chat = props => {
    const [inputValue, setInputValue] = useState('')
    const {firestore, auth} = useContext(firebaseContext)
    const [user] = useAuthState(auth)
    const [messages, loading] = useCollectionData(firestore.collection('messages').orderBy('createdAt', 'desc'))

    const deleteMessage = async id => {
        await firestore.collection('messages').doc(id).delete()
    }


    const sendMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            username: user.displayName,
            userAvatar: user.photoURL,
            text: inputValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            date: `${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`
        }).then(docRef => {   
            docRef.update({
                id: docRef.id                
            })
        })


        setInputValue('')
    }
    return (
        <div className="Chat">
            <Container>
                <div className="Chat__grid">
                    <div className="Chat__messages">
                        {
                            loading 
                            ? <Loader/>
                            : messages.map((message, index) => {
                                return <Message deleteMessage={deleteMessage} key={index} userId={user.uid} message={message}/>
                            })
                        }
                    </div>
                    <input onChange={e => setInputValue(e.target.value)} value={inputValue} type="text" placeholder="Введите ваше сообщение..." className="Chat__input" />
                    <button onClick={sendMessage} disabled={!inputValue.trim()} className="btn btn-send Chat__btn">Отправить</button>
                </div>  
            </Container>
        </div>
    )
}

export default Chat
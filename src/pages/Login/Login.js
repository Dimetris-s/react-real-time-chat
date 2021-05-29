import React, { useContext } from "react";
import {firebaseContext} from '../../context/firebaseContext'
import  './Login.scss'
import firebase from 'firebase/app'

const Login = props => {

    const {auth} = useContext(firebaseContext)

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        await auth.signInWithPopup(provider)
    }

    return (
        <div className="Login">
            <button onClick={login} className="btn-lg btn btn-success Login__btn">Login with Google</button>
        </div>
    )
}

export default Login
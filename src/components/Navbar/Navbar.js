import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { firebaseContext } from "../../context/firebaseContext";
import { LOGIN_ROUTE } from "../../utils/consts";
import  './Navbar.scss'

const Navbar = props => {
    const {auth} = useContext(firebaseContext)
    const [user, loading] = useAuthState(auth)

    const logout = () => {
        auth.signOut()
    }

    return (
        <div className="Navbar">
            {user ? user.displayName : "Navbar"}
            {
                loading 
                    ? null
                    : user 
                        ? <button onClick={logout} className="btn btn-primary Navbar__btn">Выйти</button>
                        : <Link to={LOGIN_ROUTE}>
                            <button className="btn btn-primary Navbar__btn">Войти</button>
                        </Link>
            }

        </div>
    )
}

export default Navbar
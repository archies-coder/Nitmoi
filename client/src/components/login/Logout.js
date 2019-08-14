import React from 'react'
import {AuthContext} from '../../context';

export const Logout = () => {
    // const {handleLogout} = useContext(AuthContext)
    return <AuthContext.Consumer>{context=>(
        <div>
        {logoutFromBrowser(context)}
            Login Again
        </div>
    )}</AuthContext.Consumer>
}

const logoutFromBrowser = (context) => {
    localStorage.clear();
    // context.handleLogout()
}
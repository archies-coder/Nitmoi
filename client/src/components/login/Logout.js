import React from 'react'

export const Logout = () => {
    logoutFromBrowser();
    return <div>Login Again</div>
}

const logoutFromBrowser = () => {
    localStorage.clear();
}
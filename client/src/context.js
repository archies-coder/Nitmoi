import React, { createContext, Component } from 'react'

export const AuthContext = createContext()
export class AuthProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuth: false,
            user: '',
            selectedForEdit: {},
            students: []
        }
    }

    componentDidMount = () => {
        // fetch('/auth', {
        //     method: 'GET',
        //     mode: 'cors',
        //     headers: {
        //         'content-type': 'application/json'
        //     }
        // }).then(res => {
        //     if (res.status === 200) {
        //         if (localStorage.token) {
        //             this.setState({ isAuth: true })
        //         }
        //     } else {
        //         this.setState({ isAuth: false })
        //     }
        //     return res;
        // }).catch(err => {
        //     throw new Error(err)
        // })

        if (localStorage.token) {
            this.setState({ isAuth: true })
        }
    }

    handleAuthSuccess = (name) => {
        if (localStorage.token) {
            this.setState({ isAuth: true, user: name })
        }
    }

    handleLogout = () => {
        this.setState({ isAuth: false })
        localStorage.clear()
        fetch('/api/logout', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed!");
            }
            return res;
        })
    }

    selectForEdit = (obj) => {
        this.setState({ selectedForEdit: obj })
    }

    handleIsAuthChange = () => {
        this.setState({ isAuth: false })
    }

    render() {
        return (
            <AuthContext.Provider value={{
                state: this.state,
                handleLogin: this.handleAuthSuccess,
                handleLogout: this.handleLogout,
                authChange: this.handleIsAuthChange,
                studentEdit: this.selectForEdit
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

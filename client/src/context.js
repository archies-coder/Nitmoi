import React,{ createContext, Component} from 'react'

export const AuthContext = createContext()
export class AuthProvider extends Component{
    constructor(props){
        super(props)
        this.state={
            isAuth: false,
            user: ''
        }
    }

    handleAuthSuccess = (name) => {
        if(localStorage.token){
            this.setState({isAuth: true, user: name})
        }
    }

    handleLogout = (e)=>{
        e.preventDefault();
        this.setState({isAuth:false})
        localStorage.clear()
    }
    
    render(){
        return (
            <AuthContext.Provider value={{
                state: this.state,
                handleLogin: this.handleAuthSuccess,
                handleLogout: this.handleLogout
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

// export {AuthContext,AuthProvider}
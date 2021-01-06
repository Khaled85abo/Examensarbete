import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'
import {useLocation} from 'react-router-dom'

export default function PrivateRoute ({component: Component,  ...rest}){
    const location = useLocation()
const{currentUser} = useAuth()
console.log(currentUser)
    return (
            
        <Route {...rest}
            render={props => {
             return   currentUser ? <Component {...props} {...rest}/> : <Redirect to={{pathname: '/login', state: {from: location}}}   />
            }}
        ></Route>
    )
}




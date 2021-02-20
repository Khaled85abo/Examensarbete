import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useReactContext} from '../contexts/ReactContext'

export default function PrivateRoute ({component: Component,  ...rest}){
const{currentUser} = useReactContext()
    return (
            
        <Route {...rest}
            render={props => {
             return   currentUser ? <Component {...props} {...rest}/> : <Redirect to="/login"   />
            }}
        ></Route>
    )
}




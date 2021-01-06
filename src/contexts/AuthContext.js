import React, {useContext, useState, useEffect} from 'react'
import {auth} from '../firebase'
import {commerce} from '../lib/commerce'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider ({children})  {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState({})
    const [order, setOrder] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
   
    const fetchCart = async () =>{
        setCart(await commerce.cart.retrieve())
    }

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email){
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }


    // ADDING PRODUCT FUNCTIONALITY TO REACT CONTEXT

 
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh()
        setCart(newCart)
    }

    const onCapturecheckout = async (checkoutTokenId, newOrder) => {
        try{
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
            setOrder(incomingOrder)
            refreshCart()
        } catch(error){
            setErrorMessage(error.data.error.message)
        }
    }

    useEffect(() =>{

        fetchCart()
       const unnsubscribe = auth.onAuthStateChanged(user => {
           setCurrentUser(user)
           setLoading(false)
        })
        return unnsubscribe

    },[])

    const value ={
        order,
        errorMessage,
        cart,
        currentUser,
        signup,
        login,
        logout, 
        resetPassword,
        updateEmail,
        updatePassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

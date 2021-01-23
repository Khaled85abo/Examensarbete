import React, {useState, useEffect} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {commerce} from './lib/commerce'
import {AuthProvider} from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import CopyRight from './components/CopyRight'
import {Products, Navbar, Cart, Checkout,  Login, ForgotPassword, UpdateProfile, Signup, ProductView, Confirmation} from './components'
import {useAuth} from './contexts/AuthContext'

const App = () => {

    // const [products, setProducts] = useState([])

    // const [cart, setCart] = useState({})
    // const [order, setOrder] = useState({})
    // const [errorMessage, setErrorMessage] = useState('')

    // const fetchProducts = async () => {
    //     const {data} = await commerce.products.list()

    //     setProducts(data)
    // }

    // const fetchCart = async () =>{
    //     setCart(await commerce.cart.retrieve())
    // }

    // const handleAddToCart = async (productId, quantity) => {
    //     const {cart} = await commerce.cart.add(productId, quantity)
    //     setCart(cart)
    // }

    // const handleUpdateCartQty = async (productId, quantity) => {
    //     const response = await commerce.cart.update(productId, {quantity})
    //     setCart(response.cart)
    // }

    // const handleRemoveFromCart = async (productId) => {
    //     const {cart} = await commerce.cart.remove(productId)
    //     setCart(cart)
    // }

    // const handleEmptyCart = async () => {
    //     const {cart} = await commerce.cart.empty()
    //     setCart(cart)
    // }

    // const refreshCart = async () => {
    //     const newCart = await commerce.cart.refresh()
    //     setCart(newCart)
    // }
    // const onCapturecheckout = async (checkoutTokenId, newOrder) => {
    //     try{
    //         const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
    //         setOrder(incomingOrder)
    //         refreshCart()
    //     } catch(error){
    //         setErrorMessage(error.data.error.message)
    //     }
    // }

    // useEffect(()=> {
    //     fetchProducts()
    //     fetchCart()
    // },[])

    
    return (
        <BrowserRouter> 
            <div>
                <AuthProvider>
                 <Navbar 
                //  totalItems={cart.total_items}
                  />
                    <Switch>

                        <PrivateRoute exact path='/update-profile' component={UpdateProfile} />
                        <Route exact path='/signup' component={Signup} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/forgot-password' component={ForgotPassword} />
                      

                        <Route exact path='/'>
                            <Products 
                            // products={products} 
                            // onAddToCart={handleAddToCart} 
                            />
                        </Route>
                    
                        <Route exact path='/cart'>
                            <Cart 
                            // cart={cart} 
                            // handleEmptyCart = {handleEmptyCart} 
                            // handleUpdateCartQty = {handleUpdateCartQty} 
                            // handleRemoveFromCart = {handleRemoveFromCart}
                            />
                        </Route>

                        <PrivateRoute exact path='/checkout' component={Checkout}   />

                        <Route exact path='/confirmation' component={Confirmation} />

                        <Route exact path='/:id'>
                            <ProductView 
                            // products={products} 
                            // onAddToCart={handleAddToCart}
                            />
                        </Route>
                           
                       
                    </Switch>
                    <CopyRight />
                </AuthProvider>
            </div>
        </BrowserRouter>
    )
}

export default App

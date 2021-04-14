import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { commerce } from "../lib/commerce";

const AuthContext = React.createContext();

export function useReactContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderError, setOrderError] = useState("");
  const [products, setProducts] = useState([]);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  // ADDING PRODUCT FUNCTIONALITY TO REACT CONTEXT

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setCart(response.cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const onCapturecheckout = async (checkoutTokenId, newOrder) => {
    console.log("inside capture checkout");
    console.log(newOrder);
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      localStorage.setItem("order_receipt", JSON.stringify(incomingOrder));
      console.log("successful order: ");
      console.log(incomingOrder);
      //   refreshCart();
    } catch (error) {
      setErrorMessage(error);
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();

    const unnsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified === false) {
        setCurrentUser(null);
        auth.signOut();
      } else {
        setCurrentUser(user);
        console.log(user);
      }
      setLoading(false);
    });
    return unnsubscribe;
    //    const unnsubscribe = auth.onAuthStateChanged(user => {
    //        setCurrentUser(user)
    //        console.log(user)
    //        setLoading(false)
    //     })
    //     return unnsubscribe
  }, []);

  // useEffect(()=> {
  //     fetchProducts()
  //     fetchCart()
  // },[])

  const value = {
    products,
    setOrder,
    order,
    orderError,
    setOrderError,
    setErrorMessage,
    setCurrentUser,
    errorMessage,
    setCart,
    cart,
    currentUser,
    loading,
    setLoading,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    onCapturecheckout,
    refreshCart,
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateCartQty,
    handleEmptyCart,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/ReactContext";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import {
  Products,
  Navbar,
  Cart,
  Checkout,
  Login,
  ForgotPassword,
  UpdateProfile,
  Signup,
  ProductView,
  Confirmation,
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <AuthProvider>
          <Navbar />
          <Switch>
            <PrivateRoute
              exact
              path="/update-profile"
              component={UpdateProfile}
            />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgot-password" component={ForgotPassword} />

            <Route exact path="/">
              <Products />
            </Route>

            <Route exact path="/cart">
              <Cart />
            </Route>

            <PrivateRoute exact path="/checkout" component={Checkout} />

            <Route exact path="/confirmation" component={Confirmation} />

            <Route exact path="/:id">
              <ProductView />
            </Route>
          </Switch>
          <Footer />
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;

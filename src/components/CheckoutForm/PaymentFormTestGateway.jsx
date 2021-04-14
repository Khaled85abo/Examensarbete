import { Typography, Button, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useReactContext } from "../../contexts/ReactContext";
import Review from "./Review";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { CircularProgress } from "@material-ui/core";
import { loadStripe } from "@stripe/stripe-js";
import { commerce } from "../../lib/commerce";

const PaymentForm = ({
  checkoutToken,
  nextStep,
  backStep,
  shippingData,
  loading,
  setLoading,
  setOrder,
  setOrderError,
}) => {
  const { setCart } = useReactContext();
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    const orderData = {
      line_items: checkoutToken.live.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
      },
      shipping: {
        name: shippingData.firstName + " " + shippingData.lastName,
        street: shippingData.address,
        town_city: shippingData.city,
        county_state: shippingData.shippingSubdivision,
        postal_zip_code: shippingData.zip,
        country: shippingData.shippingCountry,
      },
      fulfillment: {
        shipping_method: shippingData.shippingOption,
      },
      payment: {
        gateway: "test_gateway",
        card: {
          number: "4242424242424242",
          expiry_month: "02",
          expiry_year: "24",
          cvc: "123",
          postal_zip_code: "94107",
        },
      },
    };

    setLoading(true);
    try {
      console.log("before commerce.checkout");
      const incomingOrder = await commerce.checkout.capture(
        checkoutToken.id,
        orderData
      );
      console.log(incomingOrder);
      setOrder(incomingOrder);
      localStorage.setItem("order_receipt", JSON.stringify(incomingOrder));
      const emptyCart = await commerce.cart.refresh();
      setCart(emptyCart);
      setLoading(false);
      nextStep();
    } catch (error) {
      console.log("unsuccessful order");
      setOrderError(error);
      console.log(error);
      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} shippingData={shippingData} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Alert severity="info">
        Commerce js test gateway will be used when submitting!
      </Alert>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    `Pay ${checkoutToken.live.subtotal.formatted_with_symbol}`
                  )}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;

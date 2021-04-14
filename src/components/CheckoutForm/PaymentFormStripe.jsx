import { commerce } from "../../headlessCMS/commerce";

import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useReactContext } from "../../contexts/ReactContext";
import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({
  checkoutToken,
  nextStep,
  backStep,
  shippingData,
  setOrder,
  setLoading,
  setOrderError,
}) => {
  const { setCart } = useReactContext();

  // Payment details

  console.log(shippingData);

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    // const cardElement = elements.getElement(CardElement);
    // const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    // START
    const orderDetails = {
      line_items: checkoutToken.live.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
      },
      shipping: {
        name: shippingData.firstName + " " + shippingData.lastName,
        street: shippingData.address1,
        town_city: shippingData.city,
        county_state: shippingData.shippingSubdivision,
        postal_zip_code: shippingData.zip,
        country: shippingData.shippingCountry,
      },
      fulfillment: {
        shipping_method: shippingData.shippingOption,
      },
    };

    const card = elements.create("card");
    const paymentMethodResponse = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (paymentMethodResponse.error) {
      // There was some issue with the information that the customer entered into the payment details form.
      alert(paymentMethodResponse.error.message);
      setOrderError(paymentMethodResponse.error.message);
      return;
    }
    try {
      // Use a checkout token ID generated that was generated earlier, and any order details that may have been collected
      // on this page. Note that Commerce.js checkout tokens may already have all the information saved against them to
      // capture an order, so this extra detail may be optional.
      const order = await commerce.checkout.capture(checkoutToken.id, {
        ...orderDetails,
        // Include Stripe payment method ID:
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethodResponse.paymentMethod.id,
          },
        },
      });

      // If we get here, the order has been successfully captured and the order detail is part of the `order` variable
      console.log(order);
      return;
    } catch (response) {
      // We can check if the error is not related to additional payment steps being required
      if (
        response.statusCode !== 402 ||
        response.data.error.type !== "requires_verification"
      ) {
        // Handle the error as usual because it's not related to 3D secure payments
        console.log(response);
        return;
      }

      // Otherwise we need to continue with the 3DS process. We can use the Stripe SDK to show a modal to the customer.
      // Commerce.js provides us the "param" attribute that refers to a PaymentIntent that was created with Stripe by the
      // Chec API.
      const cardActionResult = await stripe.handleCardAction(
        response.data.error.param
      );

      if (cardActionResult.error) {
        // The customer failed to authenticate themselves with their bank and the transaction has been declined
        alert(cardActionResult.error.message);
        setOrderError(cardActionResult.error.message);
        return;
      }
      // Now we can try to capture the order again, this time passing the payment intent ID:
      try {
        const order = await commerce.checkout.capture(checkoutToken.id, {
          payment: {
            gateway: "stripe",
            stripe: {
              payment_intent_id: cardActionResult.paymentIntent.id,
            },
          },
        });

        // If we get here the order has been captured successfully and the order detail is available in the order variable
        console.log(order);
        setOrder(order);
        localStorage.setItem("order_receipt", JSON.stringify(order));
        console.log("successful order: ");
        const newCart = await commerce.cart.refresh();
        console.log("after refreshing cart function");
        setCart(newCart);
        nextStep();
      } catch (response) {
        // Just like above, we get here if the order failed to capture with Commrece.js
        console.log(response);
        setOrderError(response.message);
      }
    }

    // END
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} shippingData={shippingData} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
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

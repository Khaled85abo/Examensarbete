import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from "@material-ui/core";

import useStyles from "../checkoutStyels";
import AddressForm from "../AddresForm";
import PaymentForm from "../PaymentFormTestGateway";
import { commerce } from "../../../lib/commerce";
import { useReactContext } from "../../../contexts/ReactContext";

const steps = ["Shipping address", "Payment details"];
// const steps = [
//   "Customer information",
//   "Shipping details",
//   "Payment information",
// ];

const Checkout = () => {
  const { cart } = useReactContext();
  const [order, setOrder] = useState(null);
  const [orderError, setOrderError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCkeckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const checkStyles = useStyles();
  const history = useHistory();
  const generateToken = async () => {
    try {
      const token = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      });
      console.log("the generated token", token);
      setCkeckoutToken(token);
    } catch (error) {
      console.log(error);
      history.push("/");
    }
  };
  useEffect(() => {
    generateToken();
  }, []);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  let Confirmation = () =>
    order !== null ? (
      <>
        <div>
          <Typography variant="h5">
            Thank your {order.customer.firstname}, {order.customer.lastname} for
            your purchase.
          </Typography>
          <Typography variant="h6" component={Link} to="/confirmation">
            More Information!
          </Typography>
          <Divider className={checkStyles.divider} />
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    ) : orderError !== null ? (
      <>
        <div>
          <Typography variant="h5">
            Your puchase has been not been completed. {orderError}
          </Typography>
          <Divider className={checkStyles.divider} />
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    ) : (
      <div className={checkStyles.spinner}>
        <CircularProgress />
      </div>
    );

  // if(error){
  //     <>
  //         <Typography variant='h5'>Error: ${error}</Typography>
  //         <br />
  //         <Button
  //         component={Link}
  //         to='/'
  //         variant='outlined'
  //         type='button'>
  //             Back to Home
  //         </Button>
  //     </>
  // }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        nextStep={nextStep}
        loading={loading}
        setLoading={setLoading}
        setOrder={setOrder}
        setOrderError={setOrderError}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={checkStyles.toolbar} />
      <main className={checkStyles.layout}>
        <Paper className={checkStyles.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={checkStyles.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* {checkoutToken && <Form />} */}
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;

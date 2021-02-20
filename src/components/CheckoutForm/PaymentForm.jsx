import {useState} from 'react';
import { Typography, Button, Divider, TextField } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {useHistory} from 'react-router-dom'
import {useReactContext} from '../../contexts/ReactContext'
import Review from './Review';
import {commerce} from '../../lib/commerce'
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);



const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, }) => {

    const {setOrderError, setLoading, setCart, setOrder} = useReactContext()
    const history = useHistory()


    const dev = true


    // Payment details
    const [cardNum, setCardNum] = useState(dev ? '4242 4242 4242 4242' : '');
    const [expMonth, setExpMonth] = useState(dev ? '11' : '');
    const [expYear, setExpYear] = useState(dev ? '2023' : '');
    const [cvv, setCvv] = useState(dev ? '123' : '');
    const [billingPostalZipcode, setBillingPostalZipcode] = useState(
      dev ? '15142' : ''
    );

  console.log(shippingData)    
 

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    setLoading(true)

 
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: { 
          firstname: shippingData.firstName, 
          lastname: shippingData.lastName, 
          email: shippingData.email 
        },
        shipping: { 
          name: shippingData.firstName + ' ' + shippingData.lastName, 
          street: shippingData.address, 
          town_city: shippingData.city, 
          county_state: shippingData.shippingSubdivision, 
          postal_zip_code: shippingData.zip, 
          country: shippingData.shippingCountry 
        },
        fulfillment: { 
          shipping_method: shippingData.shippingOption 
        },
        payment: {
          gateway: 'test_gateway',
          card: {
            number: cardNum,
            expiry_month: expMonth,
            expiry_year: expYear,
            cvc: cvv,
            postal_zip_code: billingPostalZipcode,
          },
        },
      };
      // onCapturecheckout(checkoutToken.id, orderData);
      try{
        const incomingOrder = await commerce.checkout.capture(checkoutToken.id, orderData)
        setOrder(incomingOrder)
        localStorage.setItem('order_receipt', JSON.stringify(incomingOrder));
        console.log('successful order: ')
        console.log(incomingOrder)
        const newCart = await commerce.cart.refresh()
        console.log('after refreshing cart function')
        setCart(newCart)
        console.log('before next step function')

          history.push('/confirmation')

        } catch(error){
          console.log('unsuccessful order')
        setOrderError(error)
        console.log(error)
        nextStep();

    }
      // console.log('before initiating next step function')
      // nextStep();

  };

  return (
    <>
      <Review checkoutToken={checkoutToken} shippingData={shippingData} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
          <form onSubmit={(e) => handleSubmit(e)}>

          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cardNum"
              label="Card Number"
              name="cardNum"
              value={cardNum}
              onChange={(e) => setCardNum(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="expMonth"
              label="Expiry Month"
              name="expMonth"
              value={expMonth}
              onChange={(e) => setExpMonth(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="expYear"
              label="Expiry Year"
              name="expYear"
              value={expYear}
              onChange={(e) => setExpYear(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cvv"
              label="CVV"
              name="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="billingPostalZipcode"
              label="Postal/Zip Code"
              name="postalCode"
              value={billingPostalZipcode}
              onChange={(e) => setBillingPostalZipcode(e.target.value)}
            />
            <br /> <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={backStep}>Back</Button>
              <Button type="submit" variant="contained"  color="primary">
                Pay {checkoutToken.live.subtotal.formatted_with_symbol}
              </Button>
            </div>
          </form>

    </>
  );
};

export default PaymentForm;
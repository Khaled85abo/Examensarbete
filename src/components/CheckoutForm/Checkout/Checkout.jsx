import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@material-ui/core'
import useStyles from './styels'
import AddressForm from '../AddresForm'
import PaymentForm from '../PaymentForm'
import {commerce} from '../../../lib/commerce'
import {useAuth} from '../../../contexts/AuthContext'

const steps = ['Shipping address', 'Payment details']
const Checkout = () => {

    console.log('inside checkout')
    const {cart, order,  error, setPreviousRoute} = useAuth()

    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCkeckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const [isFinished, setIsFinished] = useState(false)
    const classes = useStyles()
    const history = useHistory()
    useEffect(()=>{
        console.log('insdie checkout useEffect')
        const generateToken = async() => {
            try{
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
                console.log('the generated token')
                console.log( token)
                setCkeckoutToken(token)
            } catch(error){
                console.log(error)
                history.push('/')
            }
        }


        generateToken()
  
    },[cart, history])

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        setShippingData(data)
        nextStep()
    }

    const timeout = () => {
        setTimeout(()=> {
           setIsFinished(true)
        }, 3000)
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'>
                    Your puchase has been completed, {order.customer.firstName}, {order.customer.lastName}
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant = 'subtitle2'>Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button   component={Link} to='/'     variant='outlined' type='button'>Back to Home</Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant='h5'>
                    Your puchase has been completed.
                </Typography>
                <Divider className={classes.divider} />
            </div>
            <br />
            <Button 
            component={Link} to='/'   variant='outlined' type='button'>Back to Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )

    if(error){
        <>
            <Typography variant='h5'>Error: ${error}</Typography>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
        </>
    }

    const Form = () => activeStep === 0 
    ?
    <AddressForm 
    checkoutToken={checkoutToken} 
    next={next}
    />
    : 
    <PaymentForm 
    shippingData={shippingData} 
    checkoutToken={checkoutToken} 
    backStep={backStep} 
    nextStep={nextStep} 
    // onCaptureCheckout={onCaptureCheckout}
    timeout={timeout}/>


    return (
        <>
        <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
              
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout

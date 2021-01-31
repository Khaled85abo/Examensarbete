import React, {useState, useEffect} from 'react'
import { useHistory} from 'react-router-dom'
import {Paper, Stepper, Step, StepLabel, Typography,  CssBaseline} from '@material-ui/core'
import {useGlobalStyles} from '../../../utils/styles'
import useStyles from './checkoutStyels'
import AddressForm from '../AddresForm'
import PaymentForm from '../PaymentForm'
import {commerce} from '../../../lib/commerce'
import {useAuth} from '../../../contexts/AuthContext'
import Loading from '../../Loading'

const steps = ['Shipping address', 'Payment details']
// const steps = ['Customer information', 'Shipping details', 'Payment information']

const Checkout = () => {

  
    const {cart, order,  orderError, setLoading, loading} = useAuth()

    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCkeckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const globalStyles = useGlobalStyles()
    const checkStyles = useStyles()
    const history = useHistory()

    console.log('inside checkout')
    console.log(activeStep)
    console.log(order)
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



    const nextStep = () =>  setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        setShippingData(data)
        nextStep()
    }

/*
    let Confirmation = () => 
        
    order.customer ? (
        <>
            <div>
                <Typography variant='h5'>
                    Your puchase has been completed, 
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant = 'subtitle2'>
                    Order ref: {order.customer_reference}
                </Typography>
            </div>
            <br />
            <Button   
            component={Link} to='/'     
            variant='outlined' 
            type='button'>
                Back to Home
            </Button>
        </>
    ) : orderError ?   (
        <>
            <div>
                <Typography variant='h5'>
                    Your puchase has been not been completed. {orderError}
                </Typography>
                <Divider className={classes.divider} />
            </div>
            <br />
            <Button 
            component={Link} 
            to='/'   
            variant='outlined' 
            type='button'>
                Back to Home
            </Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )

 */

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

    const Form = () => activeStep === 0 
    ? <AddressForm 
        checkoutToken={checkoutToken} 
        next={next}
        />
    : <PaymentForm 
        shippingData={shippingData} 
        checkoutToken={checkoutToken} 
        backStep={backStep} 
        nextStep={nextStep} 
        // onCaptureCheckout={onCaptureCheckout}
        />



        return (
            <>
            <CssBaseline />
                <div className={checkStyles.toolbar} />
                <main className={checkStyles.layout}>
                    <Paper className={checkStyles.paper}>
                        <Typography variant='h4' align='center'>Checkout</Typography>
                        <Stepper activeStep={activeStep} className={checkStyles.stepper}>
                            {steps.map((step) => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                  
                            {checkoutToken && <Form />}
                        {/* {activeStep === steps.length -1 &&   checkoutToken && <Form />} */}
               
                    
                    </Paper>
                </main>
            </>
        )
}

export default Checkout
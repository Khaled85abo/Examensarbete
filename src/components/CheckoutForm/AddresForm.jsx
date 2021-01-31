import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {InputLabel, Select, MenuItem, Button , Grid, Typography, CircularProgress} from '@material-ui/core'
import {useForm, FormProvider} from 'react-hook-form'
import FormInput from './CustomTextField'
import {commerce} from '../../lib/commerce'

const AddresForm = ({checkoutToken, next}) => {
    


    const [shippingCountries, setShippingCoutnries] = useState([])
    const [shippingCountry, setShippingCoutnry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')
    const [shippingPrice, setShippingPrice] = useState()
    const methods = useForm();


    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id:code, label:name}))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id:code, label:name}))
    const options = shippingOptions.map((sO) => ({id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}))

    const fetchShippingCountries = async (checkoutTokenId) => {
        // commerce.services.localeListShippingCountries(checkoutTokenId)
        // .then((response) => console.log(response));
        
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
        //const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
        setShippingCoutnries(countries)
        setShippingCoutnry(Object.keys(countries)[0])
        
    }

    const fetchSubdivsions = async (countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region})
        setShippingOptions(options)
        setShippingOption(options[0].id)

        setShippingPrice(options[0].price.raw)
        // console.log(shippingPrice)
        // console.log('inside fetching shipping options')

        // console.log(shippingOptions)
        // console.log(shippingOption)

    }

    useEffect(()=> {
        console.log('inside AddressForm useEffect')
        console.log(checkoutToken)
        fetchShippingCountries(checkoutToken.id)
     
    }, [])

    useEffect(() => {
        if(shippingCountry) fetchSubdivsions(shippingCountry)
    }, [shippingCountry])

    useEffect(()=> {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    }, [shippingSubdivision])

    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption, shippingPrice }))}>
                    <Grid container spacing={3}>

                        
                        <FormInput  name='firstName' label='First Name' />
                        <FormInput  name='lastName' label='Last Name' />
                        <FormInput  name='address' label='Address' />
                        <FormInput  name='email' label='Email' />
                        <FormInput  name='city' label='City' />
                        <FormInput name='zip' label='Postal Code' />


                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCoutnry(e.target.value)}>
                                {countries.map((country) => (
                                <MenuItem key={country.id} value={country.id}>
                                    {country.label}
                                </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivison</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                <MenuItem key={subdivision.id} value={subdivision.id}>
                                    {subdivision.label}
                                </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {options.map((option) => (
                                <MenuItem key={option.id} value={option.id} >
                                    {option.label}
                                </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid> 
                    <br />
                    <div style={{display: 'flex', jsutifyContent: 'space-between'}}>
                        <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
                        <Button type='submit' variant='contained' color='primary'>
                            {
                                shippingOption 
                                    ? 'Next' 
                                    : ( <CircularProgress color='secondary' /> )
                            }
                            
                            </Button>
                    </div>

                </form>
            </FormProvider>
        </>
    )
}

export default AddresForm

import React, {useState, useEffect} from 'react'
import {Typography, List, ListItem, ListItemText} from '@material-ui/core'

const Review = ({checkoutToken, shippingData}) => {
    const [totalPrice, setTotalPrice] = useState('')
    const [totalShippingCost, setTotalShippingCost] = useState()
    const totalShippingArray = []

    const countTotalPrice = () => {


        // const itemsPrices = []
        // checkoutToken.live.line_items.map(product => {
        //    itemsPrices.push(product.line_total.raw) 
        // })
        // const itemsPrice =   itemsPrices.reduce((a,b) => a + b , 0)




        const pricetotal = Number(checkoutToken.live.total.raw + totalShippingCost).toFixed(2)
        setTotalPrice(`${checkoutToken.live.currency.symbol}${pricetotal}`)
    }

    const calTotalShippingPrice = () => {
       setTotalShippingCost(totalShippingArray.reduce((a,b) => a + b, 0))
       console.log(totalShippingCost)
    }

    const calShippingPrice = (shippingPrice, quantity) => {
       const  totalshipping = shippingPrice * quantity
       totalShippingArray.push(totalshipping)
        const totalshipping2 = Number(totalshipping).toFixed(2)
       return `${checkoutToken.live.currency.symbol}${totalshipping2}`
    }

    useEffect(()=> {
        countTotalPrice()
        calTotalShippingPrice()
    },[])




    return (
        <>
            <Typography variant='h6' gutterBottom>Order summary</Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map((product) => (
                <div key={product.name}>

                    <ListItem style={{padding: '10px 0'}} >
                        <ListItemText  primary={product.name} secondary={`Quantity: ${product.quantity}`}  />
                        <Typography variant='body2'>{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>

                     <ListItem style={{padding: '10px 0'}} >
                    <ListItemText  secondary={`Shipping: `} />
                    <Typography variant='body2'>{calShippingPrice(shippingData.shippingPrice, product.quantity)}</Typography>
                    </ListItem>
            </div>
                ))}
                   {/* <ListItem style={{padding: '10px 0'}} >
                        <ListItemText>Shipping: </ListItemText>
                        <Typography variant='body2'>{symboledShippingPrice}</Typography>
                    </ListItem> */}
                    <hr />
                <ListItem style={{padding: '10px 0'}}>
                    <ListItemText secondary='Products Cost' />
                    <Typography variant='subtitle1' >
                        {checkoutToken.live.total.formatted_with_symbol}
                    </Typography>
                </ListItem>
                <ListItem style={{padding: '10px 0'}}>
                    <ListItemText secondary='Shipping Cost' />
                    <Typography variant='subtitle1'>
                        {`${checkoutToken.live.currency.symbol}${Number(totalShippingCost).toFixed(2)}`}
                    </Typography>
                </ListItem>
                <hr />
                <ListItem style={{padding: '10px 0'}}>
                    <ListItemText primary='total' />
                    <Typography variant='subtitle1' style={{fontWeight: '700'}}>
                        {totalPrice}
                    </Typography>
                </ListItem>
            </List>
        </>
    )
}

export default Review

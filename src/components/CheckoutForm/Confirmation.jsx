import { Alert } from '@material-ui/lab';
import {
  Card,
  Grid,
  List,
  ListItem,
  Grow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

import {useStyles} from '../../utils/styles'

function Confirmation() {
 
    const classes = useStyles();
    const order = JSON.parse(localStorage.getItem('order_receipt')) 
    console.log(order)



  return (


    <>
        <div className={classes.toolbar} />

      {!order ? (
        <Alert icon={false} severity="error">
          No order found.
        </Alert>
      ) : (
        <Grid container >


          <Typography  variant="h5" className={classes.confirmationHeader}>
            Your order id: {order.id}
          </Typography>
          
            <Grid container spacing={1}>
              <Grid item md={9}>

              {/* <Grow in={checked} {...(checked ? { timeout: 1000 } : {})}> */}
              <Grow in {...({ timeout: 1000 } )}>
                    <Card className={classes.p1}>
                        <Typography variant="h6" component="h6">
                            Customer details
                        </Typography>
                        <Typography>
                            {order.customer.firstname} {order.customer.lastname}
                        </Typography>
                        <Typography>{order.customer.email}</Typography>
                    </Card>
                </Grow>

                <Grow in{...( { timeout: 1500 } )}>
                    <Card className={[classes.p1, classes.mt1]}>
                    <Typography variant="h6" component="h6">
                        Shipping details
                    </Typography>
                    <Typography>{order.shipping.name}</Typography>
                    <Typography>{order.shipping.street}</Typography>
                    <Typography>
                        {order.shipping.town_city}, {order.shipping.county_state}{' '}
                        {order.shipping.postal_zip_code}
                    </Typography>
                    <Typography> {order.shipping.country}</Typography>
                    </Card>
                </Grow>

                {/* <Grow in={checked} {...(checked ? { timeout: 2500 } : {})}> */}
                <Grow in {...( { timeout: 2500 } )}>
                    <Card className={[classes.p1, classes.mt1]}>
                    <Typography variant="h6" component="h6">
                        Payment details
                    </Typography>
                    {order.transactions && order.transactions[0] ? (
                        <>
                        <Typography>
                            {order.transactions[0].gateway_name}
                        </Typography>
                        <Typography>
                            Card ending in {order.transactions[0].gateway_reference}
                        </Typography>
                        <Typography>
                            Transaction ID:{' '}
                            {order.transactions[0].gateway_transaction_id}
                        </Typography>
                        </>
                    ) : (
                        <Alert>No payment found</Alert>
                    )}
                    </Card>
                </Grow>

                {/* <Grow in={checked} {...(checked ? { timeout: 3000 } : {})}> */}
                <Grow in {...( { timeout: 3000 } )}>
                    <Card className={[classes.p1, classes.mt1]}>
                    <Typography variant="h6" component="h6">
                        Order Items
                    </Typography>
                    <TableContainer>
                        <Table aria-label="Orders">
                        <TableHead>
                            <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order.order.line_items.map((cartItem) => (
                            <TableRow key={cartItem.name}>
                                <TableCell component="th" scope="row">
                                {cartItem.name}
                                </TableCell>
                                <TableCell align="right">
                                {cartItem.quantity}
                                </TableCell>
                                <TableCell align="right">
                                {cartItem.price.formatted_with_symbol}
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    </Card>
                </Grow>

              </Grid>

              {/* <Grow in={checked} {...(checked ? { timeout: 3500 } : {})}> */}
              <Grow in {...( { timeout: 3500 } )}>
              <Grid item md={3} xs={12}>
                <Card>
                  <Typography variant="h6" component="h6" align='center'>
                    Order Summary
                  </Typography>
                  <List>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Subtotal</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography align="right">
                            {order.order.subtotal.formatted_with_symbol}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Tax</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography align="right">
                            {order.order.tax.amount.formatted_with_symbol}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Shipping</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography align="right">
                            {order.order.shipping.price.formatted_with_symbol}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Total</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography align="right">
                            {order.order.total_with_tax.formatted_with_symbol}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="h6">Total paid</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" align="right">
                            {order.order.total_paid.formatted_with_symbol}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                </Card>
              </Grid>
              </Grow>

            </Grid>

        </ Grid>
      )}
   </>
  
  

  
  );
}
export default Confirmation

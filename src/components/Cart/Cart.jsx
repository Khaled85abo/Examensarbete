import {Container, Typography, Button , Grid, Table, CardActions, TableCell,TableHead, TableRow, TableContainer, TableBody,MenuItem, Select}  from '@material-ui/core'
import {Link} from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'
import CartItem from './CartItem/CartItem'
import {useGlobalStyles} from '../../utils/styles'
import useStyles from './cartStyles'

const Cart = () => {

    const {cart, handleEmptyCart, currentUser} = useAuth()

    const globalStyles = useGlobalStyles()
    const cartStyles = useStyles()

    const EmptyCart = () =>  (
        <Typography variant='subtitle1'>
            Oops, Your Cart Is Empty,
            <Link to='/' className={globalStyles.link}> Add some products!</Link>
        </Typography>
        )

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                <Grid container>
                    <TableContainer>
                        <Table aria-label="Orders">
                            <TableHead>
                                <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.line_items.map((item) => (
                                    <CartItem item ={item} key={item.id}  />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                        {/* {cart.line_items.map((item) => (
                            <Grid item xs={12} sm={4} lg={3} key={item.id}>
                            <CartItem item ={item}  />
                            </Grid>
                        ))} */}
            </Grid>
                <div className={cartStyles.cardDetails} >
                    <Typography variant='h4'>
                        Subtotal: {cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <div>

                        <Button 
                        className={cartStyles.emptyButton} 
                        size='large' 
                        type='button' 
                        variant='contained' 
                        color='secondary' 
                        onClick={handleEmptyCart}>
                            Empty Cart
                        </Button>
                        <Button 
                        component={Link} 
                        to='/checkout' 
                        className={cartStyles.checkoutButton} 
                        size='large' type='button' variant='contained' color='primary'>
                        {
                        !currentUser 
                        ? ('Login to Ckechout') 
                        : ('Checkout')
                        }  
                        </Button>
                    </div>
                </div>
        </>
    )

    if(!cart.line_items) return <h1>Page is Loading...</h1> 
   
    return  (
        
        <Container>
            <div className={cartStyles.toolbar} />
            <Typography className={cartStyles.cartTitle} variant='h5' gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart
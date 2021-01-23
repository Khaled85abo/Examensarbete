import {Container, Typography, Button , Grid, Table, CardActions, TableCell,TableHead, TableRow, TableContainer, TableBody,MenuItem, Select}  from '@material-ui/core'
import useSyles from './styles'
import {useAuth} from '../../../contexts/AuthContext'
import {Link} from 'react-router-dom'
const CartItem = ({item}) => {

    const {handleRemoveFromCart, handleUpdateCartQty} = useAuth()
    const classes = useSyles()
    return (
        // <Card>
        //     <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
        //     <CardContent className={classes.cardContent}>
        //         <Typography variant='h4'> {item.name}</Typography>
        //         <Typography variant='h5'> {item.line_total.formatted_with_symbol}</Typography>
        //     </CardContent>
        //     <CardActions className={classes.cartActions}>
        //         <div className={classes.buttons}>
        //             <Button type='button' size='small' onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)} >-</Button>
        //             <Typography>{item.quantity}</Typography>
        //             <Button type='button' size='small' onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)} >+</Button>
        //         </div>
        //         <Button variant='contained' type='button ' color='secondary' onClick={ () => handleRemoveFromCart(item.id)}>Remove</Button>
        //     </CardActions>
        // </Card>
                                    
        <TableRow key={item.name}>
        <TableCell component="th" scope="row">
            <Link to={`/${item.product_id}`} >{item.name}</Link>
          
        </TableCell>
        <TableCell align="right">
        <Select
            labelId="quanitity-label"
            id="quanitity"
            onClick={(e) => handleUpdateCartQty(item.id, e.target.value)}
            value={item.quantity}
          >
            {[...Array(10).keys()].map((x) => (
              <MenuItem key={x + 1} value={x + 1}>
                {x + 1}
              </MenuItem>
            ))}
          </Select>


        </TableCell>
        <TableCell align="right">
          {item.price.formatted_with_symbol}
        </TableCell>

        <TableCell align="right">
          <Button
             onClick={ () => handleRemoveFromCart(item.id)}
            variant="contained"
            color="secondary"
          >
            x
          </Button>
        </TableCell>
      </TableRow>


    )
}

export default CartItem
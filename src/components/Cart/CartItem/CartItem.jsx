import { Button ,  TableCell, TableRow ,MenuItem, Select}  from '@material-ui/core'
import {useAuth} from '../../../contexts/AuthContext'
import {Link} from 'react-router-dom'
const CartItem = ({item}) => {

    const {handleRemoveFromCart, handleUpdateCartQty} = useAuth()
    return (
                                    
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
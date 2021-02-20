import { Button ,  TableCell, TableRow ,MenuItem, Select}  from '@material-ui/core'
import {useReactContext} from '../../../contexts/ReactContext'
import {Link} from 'react-router-dom'
import {useGlobalStyles} from '../../../utils/styles'

const CartItem = ({item}) => {

  const globalStyles = useGlobalStyles()

    const {handleRemoveFromCart, handleUpdateCartQty} = useReactContext()
    return (
                                    
        <TableRow key={item.name}>
        <TableCell component="th" scope="row">
            <Link className={globalStyles.link}  to={`/${item.product_id}`} >{item.name}</Link>
          
        </TableCell>
        <TableCell align="center">
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
        <TableCell align="center">
          {item.price.formatted_with_symbol}
        </TableCell>

        <TableCell align="center">
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
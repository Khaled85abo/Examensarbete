import {Link} from 'react-router-dom'
import {Card, CardMedia,  Typography, IconButton, CardContent}  from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'
import {useAuth} from '../../../contexts/AuthContext'

import {useGlobalStyles} from '../../../utils/styles'
import useStyles from './productStyles'


const Product = ({product}) => {

const {handleAddToCart} = useAuth()

    const globalStyles = useGlobalStyles()
    const productStyles = useStyles()
    return (
        <Card className={productStyles.root}>
            {/* Material-UI: either `image` or `src` property must be specified */}
            <div>
                <CardMedia component='img' className={productStyles.media} image={product.media.source} title={product.name} /> 
                <CardContent>
                    <div className={productStyles.cardContent}>
                        <Link to={`/${product.id}`} >
                                    <Typography variant='h6' gutterBottom>
                                        {product.name}
                                    </Typography>
                                    <Typography variant='h6' >
                                        {product.price.formatted_with_symbol}
                                    </Typography>
                        </Link>
                            {product.quantity > 0 && ( 
                            <IconButton aria-label='Add to Cart' onClick={() => handleAddToCart(product.id, 1)}>
                                <AddShoppingCart />
                            </IconButton>) }   
                    </div>
                    {/* <Typography variant='body2' color='textSecondary' dangerouslySetInnerHTML={{ __html: product.description}} /> */}
                </CardContent>
            </div>
            {/* <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label='Add to Cart' onClick={() => handleAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions> */}
        </Card>
    )
}

export default Product

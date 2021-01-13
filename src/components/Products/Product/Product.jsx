import React from 'react'
import {Link} from 'react-router-dom'
import {Card, CardMedia, CardActions, Typography, IconButton, CardContent}  from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'
import {useAuth} from '../../../contexts/AuthContext'

import useStyles from './styles'

const Product = ({product}) => {

const {handleAddToCart} = useAuth()

    const classes = useStyles()
    return (
        <Card className={classes.root}>
            {/* Material-UI: either `image` or `src` property must be specified */}
            <div>
                <CardMedia className={classes.media} image={product.media.source} title={product.name} />     
                <CardContent>


                    <div className={classes.cardContent}>


            <Link to={`/${product.id}`} >
                        <Typography variant='h6' gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant='h7' >
                            {product.price.formatted_with_symbol}
                        </Typography>
            </Link>


                <IconButton aria-label='Add to Cart' onClick={() => handleAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>

                        
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

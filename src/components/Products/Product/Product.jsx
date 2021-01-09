import React from 'react'
import {Link} from 'react-router-dom'
import {Card, CardMedia, CardActions, Typography, IconButton, CardContent}  from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'



import useStyles from './styles'

const Product = ({product, onAddToCart}) => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            {/* Material-UI: either `image` or `src` property must be specified */}
            <Link to={`/${product.id}`}>
                <CardMedia className={classes.media} image={product.media.source} title={product.name} />     
                <CardContent>
                    <div className={classes.cardContent}>
                        <Typography variant='h5' gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant='h5' >
                            {product.price.formatted_with_symbol}
                        </Typography>
                    </div>
                    <Typography variant='body2' color='textSecondary' dangerouslySetInnerHTML={{ __html: product.description}} />
                </CardContent>
            </Link>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label='Add to Cart' onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product

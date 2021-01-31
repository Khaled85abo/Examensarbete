import {Grid, Slide} from '@material-ui/core'
import Product from './Product/Product'
import {useAuth} from '../../contexts/AuthContext'
import {useGlobalStyles} from '../../utils/styles'
import useStyles from './productsStyles'

const Products = () => {
    const {products} = useAuth()
    const globalStyles = useGlobalStyles()
    const productsStyles = useStyles()
    return (

    <main className={productsStyles.content}>
        <div className={productsStyles.toolbar} />

        <Slide in direction='up'>
            <Grid container justify='center' spacing={4}>
                {products.map(product => (
                    <Grid item key={product.id} xs={12} sm={4} lg={3} >
                        <Product product={product} 
                        // onAddToCart={onAddToCart} 
                        />
                    </Grid>
                ))}
            </Grid>
        </Slide>
    </main>
    )
}

export default Products

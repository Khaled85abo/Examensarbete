import {Grid, Slide} from '@material-ui/core'
import Product from './Product/Product'
import {useReactContext} from '../../contexts/ReactContext'
import useStyles from './productsStyles'

const Products = () => {
    const {products} = useReactContext()
    const productsStyles = useStyles()
    return (

    <main className={productsStyles.content}>
        <div className={productsStyles.toolbar} />

        <Slide in direction='up'>
            <Grid container justify='center' spacing={1} >
                {products.map(product => (
                    <Grid item key={product.id} xs={12} sm={4} lg={2} className={productsStyles.center} >
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </Slide>
    </main>
    )
}

export default Products

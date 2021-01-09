import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import {useStyles} from './coolshopstyles'
import {
    Box,
    Button,
    Card,
    Grid,
    List,
    ListItem,
    MenuItem,
    Select,
    Slide,
    Typography,
  } from '@material-ui/core';
  import { Alert } from '@material-ui/lab';

const ProductView = ({products, onAddToCart }) => {
    const productId = useParams()
 
    const classes = useStyles()


    return (
        <div className={classes.content}>
            <div className={classes.toolbar}>
                {products.map((product) => (
                    product.id === productId.id && (
                   



                        <Slide key={product.name} direction="up" in={true}>
                        <Grid container spacing={1}>
                          <Grid item md={6}>
                            <img
                              src={product.media.source}
                              alt={product.name}
                              className={classes.largeImage}
                            />
                          </Grid>
                          <Grid item md={3} xs={12}>
                            <List>
                              <ListItem>
                                <Typography
                                  gutterBottom
                                  variant="h6"
                                  color="textPrimary"
                                  component="h1"
                                >
                                  {product.name}
                                </Typography>
                              </ListItem>
                              <ListItem>
                                <Box
                                  dangerouslySetInnerHTML={{ __html: product.description }}
                                ></Box>
                              </ListItem>
                            </List>
                          </Grid>
                          <Grid item md={3} xs={12}>
                            <Card>
                              <List>
                                <ListItem>
                                  <Grid container>
                                    <Grid item xs={6}>
                                      Price
                                    </Grid>
                                    <Grid item xs={6}>
                                      {product.price.formatted_with_symbol}
                                    </Grid>
                                  </Grid>
                                </ListItem>
                
                                <ListItem>
                                  <Grid alignItems="center" container>
                                    <Grid item xs={6}>
                                      Status
                                    </Grid>
                                    <Grid item xs={6}>
                                     <Button color='primary' onClick={() => onAddToCart(product.id, 1)}>Buy</Button>
                                     
                                      {/* {product.quantity > 0 ? (
                                        <Alert icon={false} severity="success">
                                          In Stock
                                        </Alert>
                                      ) : (
                                        <Alert icon={false} severity="error">
                                          Unavailable
                                        </Alert>
                                      )} */}


                                    </Grid>
                                  </Grid>
                                </ListItem>

                                      
                                {/* {product.quantity > 0 && (
                                  <>
                                    <ListItem>
                                      <Grid container justify="flex-end">
                                        <Grid item xs={6}>
                                          Quantity
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Select
                                            labelId="quanitity-label"
                                            id="quanitity"
                                            fullWidth
                                            onChange={(e) => setQuantity(e.target.value)}
                                            value={quantity}
                                          >
                                            {[...Array(product.quantity).keys()].map((x) => (
                                              <MenuItem key={x + 1} value={x + 1}>
                                                {x + 1}
                                              </MenuItem>
                                            ))}
                                          </Select>
                                        </Grid>
                                      </Grid>
                                    </ListItem>
                                    <ListItem>
                                      <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={() => onAddToCart(product.id, 1)}
                                      >
                                        Add to cart
                                      </Button>
                                    </ListItem>
                                  </>
                                )} */}


                                                 
                              </List>
                            </Card>
                          </Grid>
                        </Grid>
                      </Slide>






                    )
                 
                 
                    
                ))}
            </div>
        </div>
    )



}

export default ProductView

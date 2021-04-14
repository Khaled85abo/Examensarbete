import React, { useState, useEffect } from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const Review = ({ checkoutToken, shippingData }) => {
  const [totalShippingCost, setTotalShippingCost] = useState(0);
  const totalShippingArray = [];

  const calProductShippingPrice = (shippingPrice, quantity) => {
    const totalshipping = shippingPrice * quantity;
    totalShippingArray.push(totalshipping);
    // const totalshipping2 = totalshipping.toFixed(2)
    return `${checkoutToken.live.currency.symbol}${(
      shippingPrice * quantity
    ).toFixed(2)}`;
  };

  const calTotalShippingPrice = () => {
    setTotalShippingCost(totalShippingArray.reduce((a, b) => a + b, 0));
    console.log(totalShippingCost);
  };

  const totalPrice =
    Number(totalShippingCost) + Number(checkoutToken.live.total.raw);

  //  const totalPrice2 = totalShippingCost + checkoutToken.live.total.raw

  // const countTotalPrice = () => {
  // const pricetotalNumber = checkoutToken.live.total.raw + totalShippingCost
  // const pricetotal = pricetotalNumber.toFixed(2)
  // const setpricetotal = `${checkoutToken.live.currency.symbol}${pricetotal}`
  // setTotalPrice(totalShippingCost)
  // console.log(totalShippingCost)
  // setTotalPrice( Number(totalShippingCost) + Number(checkoutToken.live.total.raw))
  // }

  useEffect(() => {
    //    if  (totalShippingArray?.length > 0) {

    if (totalShippingArray.length > 0) {
      console.log("array has shipping prices");
      console.log(totalShippingArray);
      calTotalShippingPrice();
      // setTotalShippingCost(totalShippingArray.reduce((a,b) => a + b, 0))
    }
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {checkoutToken.live.line_items.map((product) => (
          <div key={product.name}>
            <ListItem style={{ padding: "10px 0" }}>
              <ListItemText
                primary={product.name}
                secondary={`Quantity: ${product.quantity}`}
              />
              <Typography variant="body2">
                {product.line_total.formatted_with_symbol}
              </Typography>
            </ListItem>

            <ListItem style={{ padding: "10px 0" }}>
              <ListItemText secondary={`Shipping: `} />
              <Typography variant="body2">
                {calProductShippingPrice(
                  shippingData.shippingPrice,
                  product.quantity
                )}
              </Typography>
            </ListItem>
          </div>
        ))}
        {/* <ListItem style={{padding: '10px 0'}} >
                        <ListItemText>Shipping: </ListItemText>
                        <Typography variant='body2'>{symboledShippingPrice}</Typography>
                    </ListItem> */}
        <hr />
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText secondary="Products Cost" />
          <Typography variant="subtitle1">
            {checkoutToken.live.total.formatted_with_symbol}
          </Typography>
        </ListItem>
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText secondary="Shipping Cost" />
          <Typography variant="subtitle1">
            {checkoutToken.live.currency.symbol +
              Number(totalShippingCost).toFixed(2)}
          </Typography>
        </ListItem>
        <hr />
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="total" />
          <Typography variant="subtitle1" style={{ fontWeight: "700" }}>
            {/* {totalPrice} */}
            {checkoutToken.live.currency.symbol + totalPrice.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;

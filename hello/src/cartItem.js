import React from "react";

const CartItem = (props) => {
  // eslint-disable-next-line jsx-a11y/alt-text

  const { price, title, qty } = props.product;
  const { product, onIncreaseQty, onDecreaseQty, onDeleteProduct } = props;

  return (
    <div className="cart-item">
      <div className="left-block">
        <img alt="img" style={styles.image} src={product.img} />
      </div>

      <div className="right-block">
        <div style={{ fontSize: 25 }}>{title}</div>
        <div style={{ color: "#777" }}>Rs : {price}</div>
        <div style={{ color: "#777" }}>Qty : {qty}</div>
        <div className="cart-item-actions">
          <img
            alt="increase"
            className="action-icons"
            src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
            onClick={() => onIncreaseQty(product)}
          />
          <img
            alt="decrease"
            className="action-icons"
            src="https://cdn-icons-png.flaticon.com/512/992/992683.png"
            //   onClick={() => this.props.onDecreaseQty(this.props.product)}
            onClick={() => onDecreaseQty(product)}
          />
          <img
            alt="delete"
            className="action-icons"
            src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
            onClick={() => onDeleteProduct(product.id)}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  image: {
    height: 110,
    width: 110,
    borderRadius: 4,
    backgroundColor: "#777",
  },
};

export default CartItem;

export default function Confirmed({cart, StartNewOrder}) {

  let totalPrice = 0
	for (let key in cart) {
		totalPrice += cart[key].quantity * cart[key].price
	}
  
  return (
    <div className="confirmed-modal" aria-labelledby="confirm-title">
      <div className="title-info">
        <img src="./assets/images/icon-order-confirmed.svg" alt="" aria-hidden="true"/>
        <h1 className="confirm-title" id="confirm-title">Order Confirmed</h1>
        <p className="confirm-msg">We hope you enjoy your food!</p>
      </div>
      <div className="confirmed-cart">
        {Object.entries(cart).map(([key, value]) =>
          <div className="cart-item" key={key}>
            <picture className="product-img-box">
              <source media="(max-width: 680px)" srcSet={value.image.mobile}/>
              <img className="product-img" src={value.image.desktop} alt={value.name} />
            </picture>
            <div className="price-container">
              <p className="name">{value.name}</p>
              <p className="item-price">
                <span className="quantity">{value.quantity}x</span>
                <span className="price">@ {value.price.toFixed(2)}</span>
              </p>
            </div>
            <p className="total-price">${(value.quantity * value.price).toFixed(2)}</p>
          </div>
        )}
          <p className="order-total">
            Order Total
            <span className="total">${totalPrice.toFixed(2)}</span>
          </p>
      </div>
        <button className="start-new-order-btn"
          onClick={StartNewOrder}>
          Start New Order
        </button>
    </div>
  )
}
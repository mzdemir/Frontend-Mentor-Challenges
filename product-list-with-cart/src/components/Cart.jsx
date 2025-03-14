export default function Cart({cart, setCart, confirmOrder}) {
	
	function removeFromCart(name) {
		setCart(prevCart => {
			const newCart = {...prevCart}
			delete newCart[name]
			return newCart
		})
	}

	let totalQuantity = 0;
	for (let key in cart) {
			totalQuantity += cart[key].quantity;
	}

	let totalPrice = 0
	for (let key in cart) {
		totalPrice += cart[key].quantity * cart[key].price
	}

	return (
		<section className="cart" aria-labelledby="cart-title">
			<h2 className="cart-title" aria-live="polite" id="cart-title">Your Cart({totalQuantity})</h2>
			{Object.keys(cart).length === 0 ? (
				<div className="empty-cart">
					<img src="./assets/images/illustration-empty-cart.svg" alt="" aria-hidden="true"/>
					<p className="empty-cart-msg">Your added items will appear here</p>
				</div>
			) : (
				<>
					{Object.entries(cart).map(([key, value]) => 
						<div className="added-cart-item" key={key}>
							<div className="added-item-info">
								<p className="name">{value.name}</p>
								<p className="item-price">
									<span className="quantity">{value.quantity}x</span>
									<span className="price">@ {value.price.toFixed(2)}</span>
									<span className="total-price">${(value.quantity * value.price).toFixed(2)}</span>
								</p>
							</div>
							<button 
								className="remove-btn"
								onClick={() => removeFromCart(value.name)}
								aria-label={`Remove ${value.name} from cart`}>
								<img src="./assets/images/icon-remove-item.svg" alt="" aria-hidden="true"/>
							</button>
						</div>
					)}
					<p className="order-total">
						Order Total
						<span className="total">${totalPrice.toFixed(2)}</span>
					</p>
					<div className="carbon">
						<img src="./assets/images/icon-carbon-neutral.svg" alt="" aria-hidden="true"/>
						<p>
							This is a <strong>carbon-neutral</strong> delivery
						</p>
					</div>
					<button 
						className="confirm-btn"
						onClick={confirmOrder} >
						Confirm Order
					</button>
				</>
			)}
		</section>
	)
}
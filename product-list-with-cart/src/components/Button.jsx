export default function Button({addToCart, item, cart, setCart}) {

	function decrease(name) {
		setCart(prevCart => {
			if (prevCart[name].quantity > 1) {
				return {...prevCart, 
					[name]: {...prevCart[name], quantity: prevCart[name].quantity - 1}}
			}	else {
				const newCart = { ...prevCart };
				delete newCart[name];
				return newCart;
		}})
	}

	function increase(name) {
		setCart(prevCart => {
			return {...prevCart, 
				[name]: {...prevCart[name], quantity: prevCart[name].quantity + 1}}
		})
	}

  return (
		<>
			{!cart[item.name] ? (
				<button 
				className="add-to-cart-btn"
				onClick={() => {addToCart(item)}}>
					<img src="./assets/images/icon-add-to-cart.svg" alt="" aria-hidden="true"/>
					<span>Add to Cart</span>
				</button>
			) : (
				<div className="active-btn-container">
					<button 
						className="decrease-btn"
						onClick={() => decrease(item.name)}
						aria-label="Decrease the amount">
						<img src="./assets/images/icon-decrement-quantity.svg" alt="Minus icon" />
					</button>
					<p className="quantity" aria-live="polite">{cart[item.name].quantity}</p>
					<button 
						className="increase-btn"
						onClick={() => increase(item.name)}
						aria-label="Increase the amount">
						<img src="./assets/images/icon-increment-quantity.svg" alt="Plus icon" />
					</button>
				</div>
			)}
		</>
  )
}
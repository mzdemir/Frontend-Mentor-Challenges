import { useState, useEffect } from "react";
import Cart from "./components/Cart"
import Button from "./components/Button";
import Confirmed from "./components/Confirmed";

export default function App() {
	const [data, setData] = useState([])
	const [cart, setCart] = useState([])
	const [isConfirmed, setIsConfirmed] = useState(false)

	useEffect(() => {
		fetch("/data.json")
			.then((response) => response.json())
			.then((data) => setData(data))	
	}, [])

	function AddToCart(item) {
		const itemInCart = cart[item.name]
		if (itemInCart) {
			setCart({...cart, [item.name]: {...item, quantity: itemInCart.quantity + 1}})
		} else {
			setCart({...cart, [item.name]: {...item, quantity: 1}})
		}
	}

	function ConfirmeOrder() {
		setIsConfirmed("true")
	}

	function StartNewOrder() {
		setCart([])
		setIsConfirmed("false")
	}
	return (
		<>
			<main className="product-container" aria-labelledby="title">
				<h1 className="title" id="title">Desserts</h1>
				<div className="desserts-box">
					{data.map((item) => (
						<div key={item.name} className="product-card">
							<figure className="product-img-box">
								<picture>
									<source media="(max-width: 30em)" srcSet={item.image.mobile}/>
									<img className="product-img" src={item.image.desktop} alt={item.name} />
								</picture>
								<Button addToCart={AddToCart} item={item} cart={cart} setCart={setCart}/>
							</figure>
							<p className="product-info">
								<span className="category">{item.category}</span>
								<span className="name">{item.name}</span>
								<span className="price">${item.price.toFixed(2)}</span>
							</p>
						</div>
					))}
				</div>
			</main>
			<Cart cart={cart} setCart={setCart} confirmOrder={ConfirmeOrder}/>
			{isConfirmed === "true" && (
				<div className="overlay" aria-live="polite">
					<Confirmed cart={cart} StartNewOrder={StartNewOrder}/>
				</div>
			)}
		</>
	)
}

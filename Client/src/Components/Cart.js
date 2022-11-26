import React from 'react'
import '../css/Cart.css'
import { Link } from "react-router-dom"
import { UseAuthContext } from "../hook/UseAuthContext";
import {Navigate,} from "react-router-dom";

function Cart({ cartItems, setCartItems }) {
     const {user} = UseAuthContext()


    // this  removes one items in cart 
    const removeToCart = (Product) => {
        let newCart = [...cartItems]; // what is in cart
        let itemInCart = newCart.find(
            (item) => Product.foodName === item.foodName // it finds where foodName equals to foodName
        );
        if (itemInCart.quantity === 1) { // if there is item in the cart
            setCartItems(cartItems.filter((item) => item.foodName !== Product.foodName))   // then filter trough the cartItems and if foodName is not equals to foodName 
        } else {  // then 
            setCartItems(cartItems.map((item) => item.foodName === Product.foodName ? { ...itemInCart, quantity: itemInCart.quantity - 1 } : item)) // it minus the quantity of items in cart
        }
    }

    // it clears all the items in cart
    const clear = () => {
        setCartItems([])
    }

    // when you click the increase button it will increase item in cart
    const addToCart = (product) => {
        let newCart = [...cartItems]; // what is in cart
        let itemInCart = newCart.find((item) => product.foodName === item.foodName); // it finds where foodName equals to foodName
        if (itemInCart) { // then if there is a much
            itemInCart.quantity++; // then increase the number of that item
        } else {
            itemInCart = { ...product, quantity: 1, }; // if there is no any much then added it to cart
            newCart.push(itemInCart);  // push the item in cart
        }
        setCartItems(newCart);
    };

    // it calculates the total price of each item
    const totalPrice = cartItems.reduce((price, item) => price + item.quantity * item.price, 0) // it adds the single price then it times it with the quantity 

    return (
        <div className='cart-container'>
            <div className='cart-container-grid'>
                <h3 className='header'>Add To Cart</h3>
                {cartItems.length === 0 && (<p className='error' >No item added to the cart</p>)}
                {cartItems.length >= 1 && (<button className='clear-button' onClick={clear}>clear</button>)}
                <div className='head-div'>
                    <p>Item</p>
                    <p>Quantity</p>
                    <p>Price</p>
                </div>
                {cartItems.map((item, id) => (
                    <div className="cart-grid" key={id}>
                        <div className="cart-div">
                            <div className="image"><img src={`http://localhost:5000/${item.image}`} width="100%" height="100%" alt="" /></div>
                            <div className="cart-info">
                                <p className="item-info">{item.foodName}</p>
                                <p className="item-info">{item.price}</p>
                            </div>
                        </div>

                        <div className="count">
                            <button className="items" onClick={() => addToCart(item)}>+</button>
                            <p className="quantity">{item.quantity}</p>
                            <button className="items" onClick={() => removeToCart(item)}>-</button>
                        </div>

                        <div className="price">
                            <p className="quantity">{item.price * item.quantity}</p>
                        </div>
                    </div>
                ))}
                <p className="total">TOTAL : Ksh {totalPrice}</p>
                {cartItems.length >= 1 && (user? <Link className='orderPage' to="/OrdersInfo">Order</Link> :<Navigate to= '/' />)}

            </div>
        </div>
    )
}

export default Cart
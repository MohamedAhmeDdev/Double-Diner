import React from 'react'
import '../css/Cart.css'

function Cart({ cartItems, setCartItems }) {

    const handleRemove = (Product) => {
        let newCart = [...cartItems];
        let itemInCart = newCart.find(
            (item) => Product.name === item.name
        );
        if (itemInCart.quantity === 1) {
            setCartItems(cartItems.filter((item) => item.name !== Product.name))
        } else {
            setCartItems(cartItems.map((item) => item.name === Product.name ? { ...itemInCart, quantity: itemInCart.quantity - 1 } : item))
        }
    }

    const clear = () => {
        setCartItems([])
    }

    const handleAddProduct = (product) => {
        let newCart = [...cartItems];
        let itemInCart = newCart.find(
            (item) => product.name === item.name
        );
        if (itemInCart) {
            itemInCart.quantity++;
        } else {
            itemInCart = {
                ...product,
                quantity: 1,
            };
            newCart.push(itemInCart);
        }
        setCartItems(newCart);
    };

    const totalPrice = cartItems.reduce((price, item) => price + item.quantity * item.price,
        0)
    return (
        <div className='cart-container'>
            <div className='cart-container-grid'>
                <h3 className='header'>Add To Cart</h3>
                {cartItems.length === 0 && (<p className='error' >No item added to the cart</p>)}
                {cartItems.length >= 1 && (<button className='clear-button' onClick={clear}>clear</button>)}
                {cartItems.map((item, id) => (
                    <div className="cart-grid" key={id}>
                        <div className="cart-div">
                            <div className="image"><img src={item.img} width="100%" height="100%" alt="" /></div>
                            <div className="cart-info">
                                <p className="item-info">grf</p>
                                <p className="item-info">yhm</p>
                            </div>
                        </div>

                        <div className="count">
                            <button className="items" onClick={() => handleAddProduct(item)}>+</button>
                            <p className="quantity">{item.quantity}</p>
                            <button className="items" onClick={() => handleRemove(item)}>-</button>
                        </div>

                        <div className="price">
                            <p className="quantity">{item.price * item.quantity}</p>
                        </div>
                    </div>
                ))}
                <p className="total">TOTAL : Ksh {totalPrice}</p>
            </div>
        </div>
    )
}

export default Cart
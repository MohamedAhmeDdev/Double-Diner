import React, { useEffect, useState } from 'react'
import axios from "axios"
import '../css/Meal.css'

function Juice({ cartItems, setCartItems }) {
    const [food, setFood] = useState([])

    const getMenu = async () => {
        const menu = await axios.get('http://localhost:8080/menu/getJuiceMenu')
        setFood(menu.data)
    }

    useEffect(() => {
        getMenu();
    }, []);


    const addToCart = (product) => {
        let newCart = [...cartItems];
        let itemInCart = newCart.find((item) => product.foodName === item.foodName);
        if (itemInCart) {
            itemInCart.quantity++;
        } else {
            itemInCart = { ...product, quantity: 1, }; newCart.push(itemInCart);
        }
        setCartItems(newCart);
    };


    return (
        <div className='meal-container'>
            <h3 className='product-header'>Juice</h3>
            <div className="container-grid">
                {food.map((productItem, id) => (
                    <div className='container-div' key={id}>
                        <div className="div" >
                            <div className="product-image"><img src={`http://localhost:8080/${productItem.image}`} width="100%" height="100%" alt="" /></div>
                            <div className="info">
                                <p className="food">{productItem.foodName}</p>
                                <p className="food">{productItem.price}</p>
                                <button className='add' onClick={() => addToCart(productItem)} >Add</button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Juice
import React, { useEffect, useState } from 'react'
import axios from "axios"
import '../css/Meal.css'

function Meal({ cartItems, setCartItems }) {
    const [food, setFood] = useState([])

    const getMenu = async () => {
        const menu = await axios.get('http://localhost:5000/menu/getMealMenu')
        setFood(menu.data)
    }

    useEffect(() => {
        getMenu();
    }, [food]);


    // when you you click the add button it adds the items in cart
    const addToCart = (product) => {
        let newCart = [...cartItems];  // what is in cart
        let itemInCart = newCart.find((item) => product.foodName === item.foodName); // it finds where foodName equals to foodName
        if (itemInCart) { // then if there is a much
            itemInCart.quantity++;  // then increase the number of that item
        } else {
            itemInCart = { ...product, quantity: 1, }; // if there is no any much then added it to cart
            newCart.push(itemInCart); // push the item in cart 
        }
        setCartItems(newCart);
    };


    return (
        <div className='meal-container'>
            <h3 className='product-header'>Meals</h3>
            <div className="container-grid">
                {food.map((productItem, id) => (
                    <div className='container-div' key={id}>
                        <div className="div" >
                            <div className="product-image"><img src={`http://localhost:5000/${productItem.image}`} width="100%" height="100%" alt="" /></div>
                            <div className="info">
                                <p className="food">{productItem.foodName}</p>
                                <p className="food">${productItem.price}</p>
                                <button className='add' onClick={() => addToCart(productItem)} >Add</button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}


export default Meal
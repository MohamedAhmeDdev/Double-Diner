import React, { useState } from 'react'
import '../css/Meal.css'

function Meal({ cartItems, setCartItems }) {
    const [data, setData] = useState([
        {
            name: " Baraka Mulumia",
            role: "Front End Lead",
            img: "https://avatars.githubusercontent.com/u/65751779?v=4",
            price: 90,
        },
        {
            name: "Mohammed Ahmedah",
            role: "Front End Intern",
            img: "https://avatars.githubusercontent.com/u/92859355?v=4",
            price: 500,
        },
        {
            name: "Jack Payne",
            role: "Api Designer",
            img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            price: 603,
        },
        {
            name: "Alicia Keys",
            role: "UI/UX Lead",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            price: 500,
        },

    ])

    const handleAddProduct = (product) => {
        let newCart = [...cartItems];
        let itemInCart = newCart.find((item) => product.name === item.name);
        if (itemInCart) {
            itemInCart.quantity++;
        } else {
            itemInCart = { ...product, quantity: 1, }; newCart.push(itemInCart);
        }
        setCartItems(newCart);
    };


    return (
        <div className='meal-container'>
            <h3 className='product-header'>Meals</h3>
            <div className="container-grid">
                {data.map((productItem, id) => (
                    <div className='container-div' key={id}>
                        <div className="div" >
                            <div className="product-image"><img src={productItem.img} width="100%" height="100%" alt="" /></div>
                            <div className="info">
                                <p className="food">{productItem.name}</p>
                                <p className="food">{productItem.price}</p>
                                <button className='add' onClick={() => handleAddProduct(productItem)} >Add</button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}


export default Meal
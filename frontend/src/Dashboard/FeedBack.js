import React, { useEffect, useState } from 'react'
import axios from "axios"
import '../css/FeedBack.css'
// date format
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function FeedBack() {
    const [FeedBack, setFeedBack] = useState([]);


    const deleteFeedBack = async (id) => {
        await axios.delete(`http://localhost:5000/feedBack/${id}`)
        getFeedBack();
    }

    const getFeedBack = async () => {
        const inventory = await axios.get('http://localhost:5000/feedBack')
        setFeedBack(inventory.data)
    }

    useEffect(() => {
        getFeedBack();
    }, [])


    return (
        <div className='feedBack-container'>
            <div className='feedBack-grid' >
                {FeedBack.map((item, id) => (
                    <div className='feedBack-div' key={id}>
                        <div className='feedback'>
                            <p>{item.feedback}</p>
                            <p>{item.email}</p>
                            <p>{formatDistanceToNow(new Date(item.createdAt),{addSuffix: true})}</p>
                            <button className='deleteFeedback' onClick={() => deleteFeedBack(item.id)} >Delete FeedBack</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeedBack


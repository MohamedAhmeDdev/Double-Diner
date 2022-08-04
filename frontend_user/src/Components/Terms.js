import React from 'react'
import '../css/Terms.css'

function Terms() {
  return (
    <div className='terms-container'>
        <div className='container-list'>
            <h3 className='terms-head'>Our Terms</h3>
        <ol>
            <b><li>Ordering</li></b>
            <ul className='ol-info'>
                <li>By placing an order through our mobile Application/Website, you enter into an agreement with Double Diner with respect to the processing of that order through our restaurant. This Agreement will remain in full force and effect while you use the Application/Website until termination. Even after your registration is terminated, certain sections of this Agreement will remain in effect</li>
                <li>Double Diner responsible for the preparation, quality and delivery of your order and in this regard, you hereby agree to take particular care when providing us with your details and warrant that these details are accurate and complete at the time of ordering</li>
                <li>You also warrant that the credit or debit card details that you provide are for your own credit or debit card and that you are the legal holder of the card and that you have sufficient funds to make the payment therefrom</li>
                <li> Please note that some of our Goods may not be suitable for certain age ranges/ Preferences/ Taste and Health status. Please make it sure, by carefully reading product descriptions, that the goods you order are suitable for the recipient</li>
            </ul>

            <b><li>Prices and Payment</li></b>
            <ul  className='ol-info'>
                <li>All prices listed on the Application/Website for our goods and services are updated however, in case the price listed is not current we will immediately contact you after placing the order and you can choose to opt-out of the order</li>
                <li> The total price for Goods or Services ordered, including delivery charges and other charges, will be displayed on the Application/Website when you place your order. Full payment must be made for all Goods dispatched and Services provided. Payment has to be made in cash or, if available on the Application/Website, by online payment, e.g. credit or mobile money or debit card</li>
            </ul>

            <b><li>Delivery</li></b>
            <ul  className='ol-info'>
                <li>We shall not be liable to you for any losses, liabilities, costs, damages, charges or expenses arising out of late delivery</li>
                <li>Please note that it might not be possible for us to deliver to some locations. If this is the case, we will inform you using the contact details that you provide to us when you make your order and arrange for cancellation of the order or opt for delivery to an alternative delivery address at your instruction</li>
                <li>All risk in your order shall pass to you upon delivery</li>
                <li> You must ensure that at the time of delivery of your order, there are adequate arrangements, including access where necessary to facilitate the delivery. We cannot be held liable for any damage, cost or expense incurred to such goods or premises where this arises as a result of a failure to provide adequate access or arrangements for delivery</li>
                <li>If the your order is not delivered within the estimated delivery time quoted by us, please contact the us through our telephone lines or check the Live tracking of your order available on Application/Website. Still, we will take no responsibility for late delivery</li>
            </ul>
        </ol>
        </div>
    </div>
  )
}

export default Terms
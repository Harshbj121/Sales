import React, { useState } from 'react';
import './Add-sales.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';// Import useNavigate hook for navigation
import Swal from 'sweetalert2';// Import SweetAlert2 for displaying alerts

const Addsales = () => {
    // State variables for managing form input and loading state
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setloading] = useState(false);// Loading state to manage spinner
    const navigate = useNavigate();// useNavigate hook for navigation

    // Function to handle form submission
    const addSale = async (event) => {
        event.preventDefault();
        try {
            setloading(true)
            const token = localStorage.getItem("token");// Get token from localStorage
            const data = { productName, quantity, amount };// Data object to send in POST request
            await axios.post('http://localhost:4000/addsales', data, {
                headers: {
                    Authorization: `Bearer ${token}` // Set Authorization header with Bearer token
                }
            })
                .then((result) => {
                    setloading(false)
                    alert('Data Added Successfully')
                })
                .catch((error) => {
                    // Show SweetAlert2 error message if request fails due to authentication
                    Swal.fire({
                        icon: 'error',
                        title: `User not logged in`
                    })
                    navigate('/login') // Redirect to login page if user is not logged in
                })
        } catch (error) {
            setloading(false) // Set loading state to false if there's an error
            console.log(error);
        }
    }
    return (
        <div className='container sales-container'>{/*show content in container box*/}
            <div className="row mt-4 text-center">
                {
                    loading ? <div className="col-md-12">
                        <div className="spinner-border text-primary" role="status">
                        </div>
                    </div> : ''
                }
                <h3>ADD SALES ENTRY</h3>
            </div>
            <form onSubmit={addSale}> {/*form to add sales information*/}
                <label htmlFor="productname" className="form-label">Product Name</label>
                <input type="text" className="form-control mb-3 col-12" id="productname" value={productName} onChange={(e) => { setProductName(e.target.value) }} />
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input type="number" className="form-control mb-3 col-12" id="quantity" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
                <label htmlFor="amount" className="form-label">Amount</label>
                <input type="text" className="form-control mb-3 col-12" id="amount" value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                <button className="btn btn-primary col-12" type="submit">Add-Sale</button>
            </form>
        </div>
    )
}
export default Addsales
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Topsales = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation
    const [sales, setSales] = useState([]);  // State variable to store sales data
    
    // Function to fetch top sales data from backend
    const topsales = () => {
        const token = localStorage.getItem('token');
        try {
            axios.get('http://localhost:4000/topsales', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    // Check if response contains valid data in expected format
                    if (response.data && Array.isArray(response.data.topsales)) {
                        setSales(response.data.topsales);
                    } else {
                        setSales([]); // Set sales to empty array if no data or invalid format
                    }
                })
                .catch((error) => {
                    console.log(error)
                    navigate('/login')
                })
        } catch (error) {

        }

    }
    useEffect(() => {
        topsales() // Call topsales function when component mounts
    }, [])
    return (
        <div className='container registration-container'>
            <div className="row mt-4 text-center">
                <h3>TOP 5 SALES</h3>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Sales ID</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Sale Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center">No sales data available</td>
                        </tr>
                    ) : (
                        // Displaying top 5 sales
                        sales.map((item, index) => (
                            <tr key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item._id}</td>
                                <td>{item.productName}</td>
                                <td>{item.quantity}</td>
                                <td>{item.amount}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Topsales
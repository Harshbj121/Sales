import React from 'react';
import { useState } from 'react';
import axios from 'axios';  // Import axios for making HTTP requests
import './Registration.css'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Registration = () => {
    // Creating state variables
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    // Function to handle registration form 
    const handleRegister = async (event) => {
        event.preventDefault();  // Prevent default form submission behavior
        try {
            setloading(true);
            const requestData = { FirstName: FirstName, LastName: LastName, email: email, password: password };
            await axios.post('http://localhost:4000/registration', requestData)
                .then((result) => {
                    if (result) {
                        setloading(false);
                        Swal.fire({
                            icon: 'success',
                            title: 'User Registered Successfully'
                        })
                        navigate('/login'); // Redirect to login page after successful registration  
                        //Clear state variable value
                        setFirstName('');
                        setLastName('');
                        setemail('');
                        setPassword('');
                    }else{
                        alert('This email is already registered');
                    }
                })
                .catch((error) => {
                    setloading(false);
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Some error occured'
                    })
                })
            console.log('Registration successful'); // Log success message to console
        } catch (error) {
            console.error('Error registering:', error);
        }
    };
    return (
        <div className='container registration-container'> {/*registration form container*/}
            <div className="row mt-4 text-center">
                {/* Conditional rendering of spinner based on loading state */}
                {
                    loading ? <div className="col-md-12">
                        <div className="spinner-border text-primary" role="status">
                        </div>
                    </div> : ''
                }
                <h3>Registration</h3>
            </div>
            {/* Registration form */}
            <form onSubmit={handleRegister}>
                <label htmlFor="firstname" className="form-label">First Name</label>
                <input type="text" className="form-control" value={FirstName} onChange={e => { setFirstName(e.target.value) }} id="firstname" aria-describedby="emailHelp" />
                <label htmlFor="lastname" className="form-label">Last Name</label>
                <input type="text" className="form-control" value={LastName} onChange={e => { setLastName(e.target.value) }} id="lastname" aria-describedby="emailHelp" />
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={e => { setemail(e.target.value) }} id="email" aria-describedby="emailHelp" />
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={e => { setPassword(e.target.value) }} id="password" />
                <button type="submit" className="btn btn-primary col-12 mt-2" >Submit</button>
            </form>
            {/* Link to login page if already registered*/}
            <p className='mt-3'>Already Registered ? <Link to='/login' className='fw-bold fs-5 registerlink'>Login Here</Link></p>
        </div>
    )
}

export default Registration
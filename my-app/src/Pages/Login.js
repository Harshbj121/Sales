import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Swal from 'sweetalert2';

const Login = () => {
    //creating State variable 
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setloading] = useState('');

    const navigate = useNavigate();

    // Function to handle login info
    const handleLogin = async (event) => {
        event.preventDefault();
        setloading(true);
        // Data sending to backend
        const requestData = { email: email, password: password };
        try {
            await axios.post('http://localhost:4000/login', requestData)
                .then((result) => {
                    if (result) {
                        setloading(false);
                        console.log(result);
                        localStorage.setItem('token', result.data.result.token);
                        localStorage.setItem('user', JSON.stringify(result.data.result.user));
                        navigate('/')  // Redirect to home page after successful login
                    }

                    // Clearing state variable values
                    setemail('');
                    setPassword('');
                    console.log(`Login successful`);
                    // navigate('/');
                })
        } catch (error) {
            setloading(false);
            console.error('Error logging in:', error);
            Swal.fire({
                icon: 'error',
                title: 'Some error occured please try again'
            })
        }
    };

    return (
        <div className='container login-container'>
            <div className="row mt-4 text-center">
                {
                    loading ? <div className="col-md-12">
                        <div className="spinner-border text-primary" role="status">
                        </div>
                    </div> : ''
                }
                <h3>Login </h3>
            </div>
            {/*login information detail*/}
            <form onSubmit={handleLogin}> {/* calling login function created above*/}
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control mb-3 col-12" value={email} onChange={(e) => setemail(e.target.value)} id="email" aria-describedby="emailHelp" />
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control mb-3 col-12" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="btn btn-primary col-12" >Submit</button>
            </form>
          <p className='mt-3'>Don't have an account ? <Link to='/registration' className='fw-bold fs-5 registerlink'>Register Here</Link></p>
        </div >
    )
}
export default Login
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in 

    const logout = () => {
        localStorage.removeItem('token');// Remove token from localStorage
        localStorage.removeItem('user');// Remove user from localStorage 
        navigate('/login') // Redirect to login page after logout
    }
    return (
        <div>
            {/* Navbar using Bootstrap classes */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/addsales">Sales App</NavLink>
                    {/* Navbar toggler button for mobile */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/addsales">ADD SALES</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/topsales">TOP 5 SALES</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/todayrevenue">TODAY'S TOTAL REVENUE</NavLink>
                            </li>
                            {/* Conditional rendering based on login state */}
                            {isLoggedIn ? (
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={logout}>LOGOUT</a>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">LOGIN</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/registration">REGISTER</NavLink>
                                    </li>
                                </>)
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
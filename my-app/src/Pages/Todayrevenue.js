import axios from 'axios';
import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState hooks

const Todayrevenue = () => {
  const [todayRevenue, setTodayRevenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayRevenue = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:4000/todayrevenue', {
          headers: {
            Authorization: `Bearer ${token}` // Set Authorization header with Bearer token
          }
        });
        console.log(token)
        setTodayRevenue(response.data.todayrevenue); // Set todayRevenue state with the value from the response
        setLoading(false);
      } catch (error) {
        console.error('Error fetching today\'s revenue:', error);
        setLoading(false);
        // Handle error as needed
      }
    };

    fetchTodayRevenue();
  }, []);  // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div className='container mt-2'>
      <h3 className='text-center'>
        {/* Displayin Today Revenue*/}
        {loading ? 'Loading...' : todayRevenue !== null ? `TODAY'S REVENUE IS ${todayRevenue}` : 'Failed to fetch revenue'}
      </h3>
    </div>
  );
};

export default Todayrevenue;

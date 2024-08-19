import './App.css';
import Addsales from './Pages/Addsales';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import Todayrevenue from './Pages/Today-revenue';
import Topsales from './Pages/Top-5-sales';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router> {/*to show content on particular path*/}
        <Navbar />{/*to add navbar on each page*/}
        <Routes>
          <Route exact path='/addsales' element={<Addsales />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/' element={<Addsales />}></Route>
          <Route exact path='/totalrevenue' element={<Todayrevenue />}></Route>
          <Route exact path='/registration' element={<Registration />}></Route>
          <Route exact path='/topsales' element={<Topsales/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

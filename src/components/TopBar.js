import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {   logout } from '../redux/logSlice';
import { useSelector } from 'react-redux';


function TopBar() {
    
      
  

    const dispatch = useDispatch();
    const {isLoggedIn, username} = useSelector(store => ({
        isLoggedIn: store.log.isLoggedIn,
        username: store.log.username,
       

    }))

    
    const onClickLogout = () => {
        dispatch(logout());
    }


    

  

    let links = (
        <ul className="navbar-nav ">
            <li>
                <Link className="nav-link" to="/login" style={{ color: 'white', fontWeight: 'bold' }}>Giriş Yap</Link>
            </li>
            <li>
                <Link className="nav-link" to="/signup" style={{ color: 'white', fontWeight: 'bold' }}>Üye Ol</Link>
            </li>
          </ul>
    )

    if(isLoggedIn){
        links = (
            <ul className="navbar-nav ">
            <li>
                <Link className="nav-link" to={`/profile`} style={{ color: 'white', fontWeight: 'bold' }}>{username}</Link>
            </li>

            <li>
                <Link className="nav-link" to="/weathers"  style={{ color: 'white', fontWeight: 'bold' }}>Hava Durumları</Link>
            </li>
            
            <li>
                <Link className="nav-link" to="/" onClick={onClickLogout} style={{ color: 'white', fontWeight: 'bold' }}>Çıkış</Link>
            </li>
            
          </ul>
        )
    }




    return (
        <div>
        
        <div className="shadow-sm" style={{ backgroundColor: '#f4f4f4', padding: '8px 350px 8px 0', margin: '0 0 0 0' }}>
  
</div>


        <div className="shadow-sm" style={{ marginBottom: '60px',marginTop:"0 0 0 0", backgroundColor: '#91cfec', padding: '0 350px 0 0' }}>
          {/* Mevcut Navbar */}
          <nav className="navbar navbar-dark  navbar-expand" style={{ padding: '0 0 0 0',marginTop:"0 0 0 0" }}>
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">

              </Link>
              {links}
            </div>
          </nav>
        </div>


        
      
      </div>
      

        
    )
  }






export default TopBar
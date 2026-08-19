import {Link} from 'react-router-dom'
import React from "react";
import logo from "./Error-404.svg"; 

function NotFound() {
  return (
    <div>
      <img className="vh-100  " src={logo} alt="Logo"  />
      <Link className='btn btn-secondary' to={'/'}>Back to Home</Link>
    </div>
  );
}

export default NotFound;
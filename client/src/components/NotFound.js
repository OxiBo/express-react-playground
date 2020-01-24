// https://medium.com/@rose.espiritu1/creating-a-custom-404-notfound-page-with-react-routers-3cc9106de84


//https://stackoverflow.com/questions/42929472/react-router-v4-default-pagenot-found-page

import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../assets/images/PageNotFound.png';
const NotFound = () => (
<div>
<img src={PageNotFound} alt="" style={{ height: 400, display: 'block', margin: 'auto', position: 'relative' }} />
<center><Link to="/home">Return to Home Page</Link></center>
</div>
);
export default NotFound;
import React from 'react';
import HomePage from '../HomePage/HomePage';
import Reviews from '../Reviews/Reviews';
import Footer from '../Shared/Footer/Footer';


const Home = () => {
    return (
        <div>
           
            <HomePage></HomePage>
            <Reviews></Reviews>
            <Footer></Footer>
        </div>
    );
};

export default Home;
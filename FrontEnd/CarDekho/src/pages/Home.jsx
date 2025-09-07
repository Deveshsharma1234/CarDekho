import React from 'react';
import AllBrands from '../components/Cars/AllBrands';
import WhyUs from '../components/Cars/WhyUs';
import AllCity from '../components/Cars/AllCity';

const Home = () => {
    return (
        <div className='hero p-20 glass flex flex-col justify-center items-center ' >
            {/* <h1 className=''>Home</h1> */}
            <WhyUs/>
            <AllBrands/>
            <AllCity/>
        </div>
    );
}

export default Home;

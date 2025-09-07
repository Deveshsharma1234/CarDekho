import React from 'react';
import AllBrands from '../components/Cars/AllBrands';
import WhyUs from '../components/Cars/WhyUs';
import AllCity from '../components/Cars/AllCity';

const Home = () => {
    return (
        <div className='hero p-20 glass flex flex-col justify-center items-center ' >

            <WhyUs />
            <div className='grid grid-cols-2 gap-4 w-full mt-10'>
                <AllBrands />
                <AllCity />

            </div>

        </div>
    );
}

export default Home;

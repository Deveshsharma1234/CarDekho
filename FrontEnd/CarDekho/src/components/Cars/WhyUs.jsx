import React from 'react';

const WhyUs = () => {
    return (
        <div className="card bg-gradient-to-br from-black to-pink-950 text-white shadow-xl p-6 rounded-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Why Us?</h1>

      <div className="collapse collapse-arrow bg-black/40 rounded-lg">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">
          Learn why choosing us makes sense 🚗
        </div>
        <div className="collapse-content text-sm leading-loose">
          <p>
            Are you planning on buying a  car? With so many options, it’s
            tough to find one that suits your needs. That’s why we’ve put
            together a complete list of new cars.
          </p>
          <p className="mt-2">
            <span className="font-semibold">Popular brands:</span> Maruti Suzuki,
            Mahindra, and Tata – catering to a wide spectrum of budgets and
            needs, from fuel-efficient hatchbacks to spacious SUVs.
          </p>
          <p className="mt-2">
            <span className="font-semibold">Top 5 cars:</span> Mahindra Scorpio N,
            Hyundai Creta, Tata Nexon, Maruti Suzuki Brezza, and Mahindra XUV 3XO.
          </p>
          <p className="mt-2">
            Apply filters like <span className="italic">budget, fuel type, body type</span> 
            and explore the complete list to find the car that suits you best.
          </p>
          
        </div>
      </div>
    </div>
    );
}

export default WhyUs;
